import { MessageVariant } from './types';

export interface VariantPrompt {
  variant: MessageVariant;
  prompt: string;
}

export const DEFAULT_PROMPTS: Record<MessageVariant, string> = {
  base: 'Przekaż następujący komunikat w standardowym, wyważonym formacie:\n\n{baseContent}',

  subsections: 'Przekształć następujący komunikat, dzieląc go na wyraźne sekcje z nagłówkami. Użyj pogrubienia dla nagłówków sekcji:\n\n{baseContent}',

  detailed: 'Rozwiń następujący komunikat, dodając więcej szczegółów, kontekstu i dodatkowych informacji. Cel: 300-400 słów:\n\n{baseContent}',

  short: 'Skróć następujący komunikat do absolutnego minimum - tylko najważniejsze punkty. Cel: 50-100 słów:\n\n{baseContent}',

  bullets: 'Przekształć następujący komunikat w formę wypunktowaną (bullet points). Użyj • lub - dla punktów:\n\n{baseContent}',

  'tldr-first': 'Przepisz następujący komunikat umieszczając na początku krótkie podsumowanie TL;DR (3-4 zdania), a dopiero potem pełne szczegóły:\n\n{baseContent}',

  'action-oriented': 'Przekształć następujący komunikat skupiając się na konkretnych akcjach do wykonania. Wyraźnie oznacz kroki, deadliny i odpowiedzialności:\n\n{baseContent}',

  faq: 'Przekształć następujący komunikat w format FAQ (pytania i odpowiedzi). Zidentyfikuj najważniejsze pytania, które mogą pojawić się u odbiorców:\n\n{baseContent}',

  visual: 'Przepisz następujący komunikat dodając odpowiednie emoji (✅, 📅, 💡, etc.), ikony i wizualną strukturę. Użyj także separatorów (---) gdzie pasują:\n\n{baseContent}',

  formal: 'Przepisz następujący komunikat w bardzo formalnym, korporacyjnym tonie. Użyj profesjonalnego języka, bez skrótów i kolokwializmów:\n\n{baseContent}',

  casual: 'Przepisz następujący komunikat w przyjaznym, konwersacyjnym tonie - jakby pisał kolega. Zachowaj profesjonalizm ale bądź luźniejszy:\n\n{baseContent}',

  'data-driven': 'Przepisz następujący komunikat skupiając się na konkretach - liczbach, datach, faktach. Dodaj konkretne dane gdzie możliwe (nawet jeśli szacunkowe):\n\n{baseContent}',

  english: 'Translate the following message to English. Maintain a professional business tone suitable for corporate communication:\n\n{baseContent}',

  staropolski: 'Przepisz następujący komunikat w imitacji staropolszczyzny (XVI-XVII wiek). KONIECZNIE zacznij od "Mocium Panie," i używaj archaicznych form, takich jak: "iżby", "acz", "niezmiernie", "raczyć", "pojąć", itd. Zachowaj profesjonalny charakter komunikacji firmowej, ale w staropolskim stylu:\n\n{baseContent}',

  'super-casual': 'Przepisz ten komunikat MEGA LUŹNO, jakby pisała osoba z Gen Z do ziomali. Użyj DUŻO emotek 😎🔥💯, slangu (np. "spoko", "git", "mega", "totalnie", "vibes", "no kurde"), skrótów (np. "np.", "tbh", "ngl"), casual language. Zero formalności, zero korporacyjnych sformułowań. Ma brzmieć jak wiadomość na discordzie albo messengerze. Przesadź z luz-vibe:\n\n{baseContent}',
};

export const BASE_PROMPT = `Jesteś ekspertem od komunikacji wewnętrznej w firmie. Na podstawie poniższych kluczowych informacji napisz profesjonalny komunikat firmowy w języku polskim.

Kluczowe informacje:
{keyPoints}

Wytyczne:
- Użyj profesjonalnego ale przystępnego tonu
- Struktura: krótkie wprowadzenie, główna treść, zakończenie
- Długość: 150-250 słów
- Jasny i zrozumiały język

Napisz tylko treść komunikatu, bez tytułu czy nagłówków.`;
