import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { MESSAGE_VARIANTS } from '@/lib/variants';

// Increase timeout for this route to 2 minutes (default is 60s)
export const maxDuration = 120;

export async function POST(request: NextRequest) {
  try {
    const { keyPoints, customPrompts, basePrompt, useAsBase } = await request.json();

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

    let baseContent: string;

    // If useAsBase is true, use keyPoints directly as baseContent without AI generation
    if (useAsBase) {
      baseContent = keyPoints;
    } else {
      // First, generate the base content using Sonnet
      const defaultBasePrompt = `Jesteś ekspertem od komunikacji wewnętrznej w firmie. Na podstawie poniższych kluczowych informacji napisz profesjonalny komunikat firmowy w języku polskim.

Kluczowe informacje:
${keyPoints}

Wytyczne:
- Użyj profesjonalnego ale przystępnego tonu
- Struktura: krótkie wprowadzenie, główna treść, zakończenie
- Długość: 150-250 słów
- Jasny i zrozumiały język

Napisz tylko treść komunikatu, bez tytułu czy nagłówków.`;

      const finalBasePrompt = basePrompt
        ? basePrompt.replace('{keyPoints}', keyPoints)
        : defaultBasePrompt;

      const baseResponse = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        messages: [{ role: 'user', content: finalBasePrompt }],
      });

      baseContent = baseResponse.content[0].type === 'text'
        ? baseResponse.content[0].text
        : '';
    }

    // Generate variants in parallel using Haiku (faster and cheaper for simple transformations)
    const variantPromises = MESSAGE_VARIANTS.map(async (variant) => {
      const variantPrompt = getVariantPrompt(variant.id, baseContent, customPrompts);

      const response = await anthropic.messages.create({
        model: 'claude-haiku-4-20250514', // Use Haiku for faster responses
        max_tokens: 800, // Reduced from 1024
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

function getVariantPrompt(variantId: string, baseContent: string, customPrompts?: Record<string, string>): string {
  // Use custom prompts if provided
  if (customPrompts && customPrompts[variantId]) {
    return customPrompts[variantId].replace('{baseContent}', baseContent);
  }

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

    english: `Translate the following message to English. Maintain a professional business tone suitable for corporate communication:\n\n${baseContent}`,

    staropolski: `Przepisz następujący komunikat w imitacji staropolszczyzny (XVI-XVII wiek). KONIECZNIE zacznij od "Mocium Panie," i używaj archaicznych form, takich jak: "iżby", "acz", "niezmiernie", "raczyć", "pojąć", itd. Zachowaj profesjonalny charakter komunikacji firmowej, ale w staropolskim stylu:\n\n${baseContent}`,

    'super-casual': `Przepisz ten komunikat MEGA LUŹNO, jakby pisała osoba z Gen Z do ziomali. Użyj DUŻO emotek 😎🔥💯, slangu (np. "spoko", "git", "mega", "totalnie", "vibes", "no kurde"), skrótów (np. "np.", "tbh", "ngl"), casual language. Zero formalności, zero korporacyjnych sformułowań. Ma brzmieć jak wiadomość na discordzie albo messengerze. Przesadź z luz-vibe:\n\n${baseContent}`,
  };

  return prompts[variantId] || prompts.base;
}
