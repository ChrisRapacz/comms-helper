import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { MESSAGE_VARIANTS } from '@/lib/variants';

export async function POST(request: NextRequest) {
  try {
    const { keyPoints } = await request.json();

    if (!keyPoints) {
      return NextResponse.json(
        { error: 'keyPoints is required' },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API key is not configured' },
        { status: 500 }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // First, generate the base content
    const basePrompt = `Jesteś ekspertem od komunikacji wewnętrznej w firmie. Na podstawie poniższych kluczowych informacji napisz profesjonalny komunikat firmowy w języku polskim.

Kluczowe informacje:
${keyPoints}

Wytyczne:
- Użyj profesjonalnego ale przystępnego tonu
- Struktura: krótkie wprowadzenie, główna treść, zakończenie
- Długość: 150-250 słów
- Jasny i zrozumiały język

Napisz tylko treść komunikatu, bez tytułu czy nagłówków.`;

    const baseResponse = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      messages: [{ role: 'user', content: basePrompt }],
    });

    const baseContent = baseResponse.content[0].type === 'text'
      ? baseResponse.content[0].text
      : '';

    // Generate variants in parallel
    const variantPromises = MESSAGE_VARIANTS.map(async (variant) => {
      const variantPrompt = getVariantPrompt(variant.id, baseContent);

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        messages: [{ role: 'user', content: variantPrompt }],
      });

      const content = response.content[0].type === 'text'
        ? response.content[0].text
        : baseContent;

      return {
        variant: variant.id,
        content,
      };
    });

    const variantResults = await Promise.all(variantPromises);

    // Build variants object
    const variants: Record<string, string> = {};
    variantResults.forEach(({ variant, content }) => {
      variants[variant] = content;
    });

    return NextResponse.json({
      baseContent,
      variants,
    });
  } catch (error: any) {
    console.error('Error generating variants:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate variants' },
      { status: 500 }
    );
  }
}

function getVariantPrompt(variantId: string, baseContent: string): string {
  const prompts: Record<string, string> = {
    base: `Przekaż następujący komunikat w standardowym, wyważonym formacie:\n\n${baseContent}`,

    subsections: `Przekształć następujący komunikat, dzieląc go na wyraźne sekcje z nagłówkami. Użyj pogrubienia dla nagłówków sekcji:\n\n${baseContent}`,

    detailed: `Rozwiń następujący komunikat, dodając więcej szczegółów, kontekstu i dodatkowych informacji. Cel: 300-400 słów:\n\n${baseContent}`,

    short: `Skróć następujący komunikat do absolutnego minimum - tylko najważniejsze punkty. Cel: 50-100 słów:\n\n${baseContent}`,

    bullets: `Przekształć następujący komunikat w formę wypunktowaną (bullet points). Użyj • lub - dla punktów:\n\n${baseContent}`,

    'tldr-first': `Przepisz następujący komunikat umieszczając na początku krótkie podsumowanie TL;DR (3-4 zdania), a dopiero potem pełne szczegóły:\n\n${baseContent}`,

    'action-oriented': `Przekształć następujący komunikat skupiając się na konkretnych akcjach do wykonania. Wyraźnie oznacz kroki, deadliny i odpowiedzialności:\n\n${baseContent}`,

    faq: `Przekształć następujący komunikat w format FAQ (pytania i odpowiedzi). Zidentyfikuj najważniejsze pytania, które mogą pojawić się u odbiorców:\n\n${baseContent}`,

    visual: `Przepisz następujący komunikat dodając odpowiednie emoji (✅, 📅, 💡, etc.), ikony i wizualną strukturę. Użyj także separatorów (---) gdzie pasują:\n\n${baseContent}`,

    formal: `Przepisz następujący komunikat w bardzo formalnym, korporacyjnym tonie. Użyj profesjonalnego języka, bez skrótów i kolokwializmów:\n\n${baseContent}`,

    casual: `Przepisz następujący komunikat w przyjaznym, konwersacyjnym tonie - jakby pisał kolega. Zachowaj profesjonalizm ale bądź luźniejszy:\n\n${baseContent}`,

    'data-driven': `Przepisz następujący komunikat skupiając się na konkretach - liczbach, datach, faktach. Dodaj konkretne dane gdzie możliwe (nawet jeśli szacunkowe):\n\n${baseContent}`,
  };

  return prompts[variantId] || prompts.base;
}
