import { MessageVariant } from './types';

export interface VariantPrompt {
  variant: MessageVariant;
  prompt: string;
}

export const DEFAULT_PROMPTS: Record<MessageVariant, string> = {
  base: 'Przekaż następujący komunikat w standardowym, wyważonym formacie. Zachowaj profesjonalny ale przystępny ton, używaj jasnego języka, struktura powinna być logiczna i łatwa do przyswojenia. Upewnij się, że wszystkie kluczowe informacje są zawarte i zrozumiałe:\n\n{baseContent}',

  subsections: 'Przekształć następujący komunikat, dzieląc go na wyraźne sekcje z nagłówkami. Każda sekcja powinna mieć wyraźny nagłówek (użyj **pogrubienia**), a treść powinna być podzielona tematycznie. Struktura powinna ułatwić szybkie skanowanie wzrokiem i znalezienie konkretnych informacji. Upewnij się, że każda sekcja jest kompletna i zrozumiała:\n\n{baseContent}',

  detailed: 'Rozwiń następujący komunikat, dodając znacznie więcej szczegółów, kontekstu i dodatkowych informacji pomocnych w pełnym zrozumieniu tematu. Cel: 300-400 słów. Dodaj tło decyzji, potencjalne pytania i odpowiedzi, przykłady zastosowania, szczegóły implementacji. Nie pomijaj żadnych istotnych informacji, upewnij się że odbiorca ma pełny obraz sytuacji:\n\n{baseContent}',

  short: 'Skróć następujący komunikat do absolutnego minimum - tylko najważniejsze punkty, które KONIECZNIE musi znać odbiorca. Cel: 50-100 słów. Usuń wszelkie ozdobniki, kontekst, szczegóły - zostaw tylko esencję. Komunikat musi być ultra-zwięzły ale kompletny - odbiorca musi wiedzieć CO, KIEDY i CO MA ZROBIĆ:\n\n{baseContent}',

  bullets: 'Przekształć następujący komunikat w formę wypunktowaną (bullet points). Każdy punkt powinien być zwięzły, konkretny i niezależny. Użyj • lub - dla głównych punktów, wcięcia dla podpunktów jeśli potrzeba. Struktura powinna być hierarchiczna i łatwa do szybkiego przeskanowania. Upewnij się, że wszystkie kluczowe informacje są ujęte w punktach:\n\n{baseContent}',

  'tldr-first': 'Przepisz następujący komunikat umieszczając NA SAMYM POCZĄTKU krótkie, zwięzłe podsumowanie TL;DR (3-4 zdania maksymalnie), które zawiera absolutnie najważniejsze informacje. Podsumowanie powinno być oznaczone wyraźnie jako "TL;DR:" lub "PODSUMOWANIE:". Dopiero po nim umieść pełne szczegóły, wyjaśnienia i kontekst. Odbiorca powinien móc przeczytać tylko TL;DR i wiedzieć o co chodzi:\n\n{baseContent}',

  'action-oriented': 'Przekształć następujący komunikat skupiając się całkowicie na konkretnych akcjach do wykonania przez odbiorcę. Wyraźnie oznacz każdy krok numerycznie (1., 2., 3...), podaj dokładne deadliny w formacie "DO KIEDY:", osoby odpowiedzialne "KTO:", i co dokładnie ma być zrobione "CO:". Komunikat powinien być praktyczny actionable checklist. Priorytet to jasność - co mam zrobić, kiedy i jak:\n\n{baseContent}',

  faq: 'Przekształć następujący komunikat w format FAQ (pytania i odpowiedzi). Zidentyfikuj 5-8 najważniejszych pytań, które mogą pojawić się u odbiorców i udziel na nie wyczerpujących odpowiedzi. Pytania powinny być realistyczne (np. "Czy to mnie dotyczy?", "Od kiedy?", "Co jeśli...?"). Każda odpowiedź powinna być kompletna i nie wymagać szukania informacji gdzie indziej. Format: **P: pytanie?** A: odpowiedź.:\n\n{baseContent}',

  visual: 'Przepisz następujący komunikat dodając DUŻO odpowiednich emoji (✅📅💡🎯⚠️📊🔔 etc.) i wizualną strukturę. Użyj emoji do podkreślenia kluczowych punktów, dat, akcji. Dodaj separatory (---) do podziału sekcji, użyj wyliczających emoji (1️⃣ 2️⃣ 3️⃣) dla kroków. Dodaj kolorowe boksy ASCII jeśli pasują. Komunikat powinien być wizualnie atrakcyjny i łatwy do skanowania wzrokiem, ale nadal profesjonalny:\n\n{baseContent}',

  formal: 'Przepisz następujący komunikat w bardzo formalnym, korporacyjnym tonie zgodnym z najwyższymi standardami komunikacji biznesowej. Użyj profesjonalnego, wyważonego języka, pełnych form (bez skrótów), korporacyjnej nomenklatury. Zachowaj dystans i profesjonalizm. Komunikat powinien brzmieć jak oficjalne pismo z sekretariatu zarządu międzynarodowej korporacji. Unikaj kolokwializmów, slangu, emocjonalnych określeń:\n\n{baseContent}',

  casual: 'Przepisz następujący komunikat w przyjaznym, konwersacyjnym tonie - jakby pisał kolega z zespołu, a nie szef czy HR. Zachowaj profesjonalizm (to nadal komunikat służbowy!) ale bądź znacznie luźniejszy, użyj prostego języka, możesz dodać przyjazne zwroty (np. "Hej!", "Dzięki!"). Brzmi to jak email od sympatycznego współpracownika, nie jak oficjalne pismo. Ciepło, przyjaźnie, ale merytorycznie:\n\n{baseContent}',

  'data-driven': 'Przepisz następujący komunikat skupiając się maksymalnie na konkretach - liczbach, datach, faktach, statystykach, procentach, kwotach. Dodaj KONKRETNE DANE wszędzie gdzie to możliwe (nawet jeśli są szacunkowe - zaznacz to). Każda informacja powinna mieć liczby: nie "niedługo" ale "za 14 dni", nie "wielu" ale "73%", nie "wzrost" ale "wzrost o 23%". Format powinien przypominać raport analityczny z konkretnymi wskaźnikami, KPI, metrykami:\n\n{baseContent}',

  english: 'Translate the following message to English. Maintain a professional, clear business tone suitable for international corporate communication. Ensure all key information is conveyed accurately. The translation should sound natural and native, not mechanical. Use proper business English terminology and maintain the same level of formality as the original:\n\n{baseContent}',

  staropolski: 'Przepisz następujący komunikat w imitacji staropolszczyzny (XVI-XVII wiek). KONIECZNIE zacznij od "Mocium Panie," i używaj konsekwentnie archaicznych form językowych: "iżby" (aby), "acz" (jednak), "niezmiernie" (bardzo), "raczyć" (zechcieć), "pojąć" (zrozumieć), "rzeczone" (wspomniane), "nadto" (ponadto). Zachowuj profesjonalny charakter komunikacji firmowej, ale w staropolskim stylu. Powinno brzmieć jak list z czasów Rzeczpospolitej, ale o współczesnych sprawach firmowych:\n\n{baseContent}',

  'super-casual': 'Przepisz ten komunikat MEGA MEGA LUŹNO, jakby pisała osoba z Gen Z do swoich ziomali na discordzie. Użyj NAPRAWDĘ DUŻO emotek 😎🔥💯✨🤙💪😅, dużo slangu młodzieżowego ("spoko", "git", "mega", "totalnie", "vibes", "no kurde", "faktycznie", "lowkey", "highkey"), dużo skrótów ("np.", "tbh", "ngl", "btw", "fyi"), bardzo casual language. ZERO formalności, ZERO korporacyjnych sformułowań. Ma brzmieć jak wiadomość na prywatnym chacie na messengerze do bliskiego kolegi. Przesadź z tym luz-vibe, ale informacja musi być kompletna:\n\n{baseContent}',
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
