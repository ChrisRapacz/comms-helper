import { MessageVariant } from './types';

export interface VariantPrompt {
  variant: MessageVariant;
  prompt: string;
}

export const DEFAULT_PROMPTS: Record<MessageVariant, string> = {
  base: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj go w 100%. Jeśli są konkretne informacje - nie zmieniaj ich. Zmień TYLKO styl prezentacji, NIE treść merytoryczną.\n\nPrzekaż następujący komunikat w standardowym, wyważonym formacie. Zachowaj profesjonalny ale przystępny ton, używaj jasnego języka, struktura powinna być logiczna i łatwa do przyswojenia:\n\n{baseContent}',

  subsections: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj go w 100%. Jeśli są konkretne informacje - nie zmieniaj ich. Zmień TYLKO strukturę i format, NIE treść merytoryczną.\n\nPrzekształć następujący komunikat, dzieląc go na wyraźne sekcje z nagłówkami. Każda sekcja powinna mieć wyraźny nagłówek (użyj **pogrubienia** dla nagłówków), a treść powinna być podzielona tematycznie. Zachowaj wszystkie informacje z oryginału:\n\n{baseContent}',

  detailed: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj go i rozwiń w tym samym tonie. Rozwijaj TYLKO szczegóły związane z oryginalną treścią, NIE dodawaj nowych faktów które nie wynikają z oryginału.\n\nRozwiń następujący komunikat, dodając więcej szczegółów, kontekstu i wyjaśnień. Cel: 300-400 słów. Rozwijaj tło, potencjalne pytania odbiorców, szczegóły implementacji - ale TYLKO w kontekście tego co jest w oryginale. Zachowaj dokładnie ten sam wydźwięk i charakter komunikatu:\n\n{baseContent}',

  short: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE kluczowe fakty, daty, liczby i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj go w skróconej formie. Skracaj poprzez usunięcie ozdobników i zbędnych słów, NIE poprzez usunięcie istotnych informacji.\n\nSkróć następujący komunikat do absolutnego minimum - tylko najważniejsze punkty. Cel: 50-100 słów. Usuń ozdobniki i rozwinięcia, ale zachowaj esencję wszystkich kluczowych informacji:\n\n{baseContent}',

  bullets: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj go w punktach. Zmień TYLKO format na wypunktowany, NIE treść.\n\nPrzekształć następujący komunikat w formę wypunktowaną (bullet points). Użyj - lub • dla głównych punktów. Każdy punkt musi zawierać konkretną informację z oryginału. Zachowaj wszystko co istotne:\n\n{baseContent}',

  'tldr-first': '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - KONIECZNIE wspomnij o tym w TL;DR. Zmień TYLKO kolejność (TL;DR na początku), NIE treść.\n\nPrzepisz następujący komunikat umieszczając NA POCZĄTKU krótkie podsumowanie "TL;DR:" (3-4 zdania maksymalnie). TL;DR MUSI zawierać wszystkie kluczowe informacje włącznie z wydźwiękiem i charakterem oryginalnej wiadomości. Dopiero po TL;DR umieść pełne szczegóły:\n\n{baseContent}',

  'action-oriented': '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj kontekst. Przekształć w akcje TYLKO to co faktycznie wymaga działania, zachowaj resztę kontekstu.\n\nPrzekształć następujący komunikat skupiając się na konkretnych akcjach. Wyraźnie oznacz kroki numerycznie (1., 2., 3...), podaj deadliny "DO KIEDY:", osoby odpowiedzialne "KTO:", i "CO:". Na początku lub końcu zachowaj pełny kontekst z oryginału:\n\n{baseContent}',

  faq: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - wyjaśnij to w FAQ. Odpowiedzi MUSZĄ być w 100% zgodne z oryginałem, nie zmyślaj dodatkowych faktów.\n\nPrzekształć następujący komunikat w format FAQ. Zidentyfikuj 5-8 pytań które mogą pojawić się u odbiorców. WSZYSTKIE odpowiedzi muszą bazować TYLKO na informacjach z oryginału. Format: **P: pytanie?** A: odpowiedź:\n\n{baseContent}',

  visual: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj go i podkreśl emoji. Dodawaj TYLKO emoji i formatowanie, NIE zmieniaj treści.\n\nPrzepisz następujący komunikat dodając DUŻO emoji (✅📅💡🎯⚠️😄🎃 etc.) i wizualną strukturę. Użyj emoji do podkreślenia kluczowych punktów. Dodaj separatory (---) między sekcjami. Zachowaj dokładnie ten sam tekst, tylko z emoji:\n\n{baseContent}',

  formal: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - MUSISZ go zachować, tylko wyraź w bardziej formalny sposób. Zmień TYLKO ton i styl, NIE znaczenie.\n\nPrzepisz następujący komunikat w bardzo formalnym, korporacyjnym tonie. Użyj profesjonalnego języka, pełnych form (bez skrótów), korporacyjnej nomenklatury. Zachowaj dokładnie ten sam przekaz i wydźwięk, tylko w formalnej formie:\n\n{baseContent}',

  casual: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - świetnie, zachowaj go i wzmocnij w casual tonie. Zmień TYLKO ton na bardziej swobodny, NIE treść.\n\nPrzepisz następujący komunikat w przyjaznym, konwersacyjnym tonie - jakby pisał kolega. Zachowaj profesjonalizm ale bądź luźniejszy, użyj prostego języka, dodaj przyjazne zwroty (np. "Hej!", "Dzięki!"). Zachowaj wszystkie informacje:\n\n{baseContent}',

  'data-driven': '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - zachowaj kontekst. Jeśli są już liczby - zachowaj je DOKŁADNIE. Dodawaj dane TYLKO jeśli wynikają z kontekstu oryginału.\n\nPrzepisz następujący komunikat skupiając się maksymalnie na konkretach - liczbach, datach, faktach, procentach. Jeśli w oryginale są już liczby - zachowaj je dokładnie. Możesz rozwinąć o szacunkowe dane TYLKO jeśli wynikają z kontekstu i wyraźnie oznacz je jako szacunkowe. Format analityczny:\n\n{baseContent}',

  english: '⚠️ CRITICALLY IMPORTANT: Preserve ALL facts, dates, numbers, context and tone from the original message. If there is a joke/humor - you MUST preserve it in English. Change ONLY the language, NOT the content or meaning. Maintain 100% accuracy.\n\nTranslate the following message to English. Ensure ALL key information is conveyed accurately including jokes, humor, and tone. The translation must maintain the exact same meaning and feeling as the original:\n\n{baseContent}',

  staropolski: '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - KONIECZNIE zachowaj go w staropolskim stylu. Zmień TYLKO język na staropolski, NIE treść.\n\nPrzepisz następujący komunikat w imitacji staropolszczyzny (XVI-XVII wiek). KONIECZNIE zacznij od "Mocium Panie," i używaj archaicznych form: "iżby", "acz", "niezmiernie", "raczyć", "pojąć". Zachowaj DOKŁADNIE tę samą treść i wydźwięk, tylko w staropolskim języku:\n\n{baseContent}',

  'super-casual': '⚠️ KRYTYCZNIE WAŻNE: Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst i wydźwięk z oryginalnej wiadomości. Jeśli w oryginale jest żart/humor - SUPER, wzmocnij go w Gen Z stylu z emotkami. Zmień TYLKO ton na mega casual, NIE treść merytoryczną.\n\nPrzepisz ten komunikat MEGA LUŹNO w stylu Gen Z. Użyj DUŻO emotek 😎🔥💯✨🤙🎃, slangu ("spoko", "git", "mega", "vibes"), skrótów ("tbh", "ngl", "btw"). ZERO formalności. Jak wiadomość na messengerze do ziomka. Ale WSZYSTKIE info z oryginału muszą być:\n\n{baseContent}',
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
