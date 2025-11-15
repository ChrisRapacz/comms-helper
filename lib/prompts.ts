import { MessageVariant } from './types';

export interface VariantPrompt {
  variant: MessageVariant;
  prompt: string;
}

export const DEFAULT_PROMPTS: Record<MessageVariant, string> = {
  base: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁY tekst od początku do końca
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu go przepisz bez komentowania
- Zmień TYLKO styl prezentacji, ZERO zmian merytorycznych

Przepisz poniższy komunikat w standardowym, wyważonym formacie. Profesjonalny ale przystępny ton, jasny język:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  subsections: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁY tekst od początku do końca
- Podziel na sekcje z nagłówkami (użyj **pogrubienia**)
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu go przepisz bez komentowania
- Zmień TYLKO strukturę (dodaj nagłówki), ZERO zmian merytorycznych

Przepisz poniższy komunikat dzieląc na wyraźne sekcje tematyczne:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  detailed: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana (300-400 słów)
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁY tekst od początku do końca
- Rozwiń szczegóły (cel: 300-400 słów)
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - rozwiń go w TYM SAMYM tonie bez komentowania
- Dodawaj TYLKO szczegóły które logicznie wynikają z oryginału
- Zmień TYLKO długość (rozwiń), ZERO zmian merytorycznych

Przepisz poniższy komunikat w wersji rozwiniętej z więcej kontekstu:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Czy masz 300-400 słów? Sprawdź przed wysłaniem.`,

  short: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE pomijaj KLUCZOWYCH informacji przy skracaniu
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Zachowaj WSZYSTKIE kluczowe fakty, daty, liczby
- Skróć do 50-100 słów usuwając ozdobniki, NIE fakty
- Jeśli w oryginale jest żart/humor - zachowaj w skróconej formie bez komentowania
- Zmień TYLKO długość (skróć), ZERO zmian merytorycznych

Skróć poniższy komunikat do najważniejszych punktów (50-100 słów):

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy zachowałeś WSZYSTKIE kluczowe info? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  bullets: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - wszystkie punkty wymagane
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść jako bullet points (użyj - lub •)
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu go umieść w punkcie bez komentowania
- Zmień TYLKO format (dodaj bullets), ZERO zmian merytorycznych

Przepisz poniższy komunikat w formę wypunktowaną:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy wszystkie informacje są w punktach? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  'tldr-first': `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - TL;DR + PEŁNA treść wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Dodaj TL;DR na początku (3-4 zdania)
- Potem przepisz CAŁĄ oryginalną treść
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - wspomnij w TL;DR i przepisz pełną wersję bez komentowania
- Zmień TYLKO kolejność (TL;DR + reszta), ZERO zmian merytorycznych

Przepisz poniższy komunikat z TL;DR na początku:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy masz TL;DR + pełną treść? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  'action-oriented': `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść z naciskiem na akcje
- Oznacz kroki numerycznie (1., 2., 3...)
- Dodaj "DO KIEDY:", "KTO:", "CO:" dla każdej akcji
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu go przepisz bez komentowania
- Zmień TYLKO strukturę (dodaj akcje), ZERO zmian merytorycznych

Przepisz poniższy komunikat w formacie zorientowanym na akcje:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  faq: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE wymyślaj odpowiedzi - bazuj TYLKO na oryginale
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz jako FAQ (5-8 pytań i odpowiedzi)
- Format: **P: pytanie?** A: odpowiedź
- WSZYSTKIE odpowiedzi muszą bazować TYLKO na oryginale
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu wyjaśnij w odpowiedzi bez komentowania
- Zmień TYLKO format (FAQ), ZERO zmian merytorycznych

Przepisz poniższy komunikat w formacie FAQ:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy wszystkie odpowiedzi bazują tylko na oryginale? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  visual: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść dodając DUŻO emoji (✅📅💡🎯⚠️😄🎃)
- Zachowaj DOKŁADNIE ten sam tekst, tylko z emoji
- Dodaj separatory (---) między sekcjami
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - dodaj pasujące emoji bez komentowania
- Zmień TYLKO wizualizację (emoji), ZERO zmian merytorycznych

Przepisz poniższy komunikat z dużą ilością emoji i wizualną strukturą:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  formal: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść w bardzo formalnym tonie
- Użyj profesjonalnego języka, pełnych form (bez skrótów)
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - wyraź w formalny sposób bez komentowania (np. "żartobliwa uwaga")
- Zmień TYLKO ton (formalny), ZERO zmian merytorycznych

Przepisz poniższy komunikat w bardzo formalnym, korporacyjnym tonie:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  casual: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść w przyjaznym, konwersacyjnym tonie
- Jakby pisał kolega - luźniej ale profesjonalnie
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - zachowaj i wzmocnij bez komentowania
- Zmień TYLKO ton (casual), ZERO zmian merytorycznych

Przepisz poniższy komunikat w przyjaznym, konwersacyjnym tonie:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  'data-driven': `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść z naciskiem na liczby i dane
- Jeśli w oryginale są liczby - zachowaj DOKŁADNIE
- Możesz rozwinąć o szacunkowe dane TYLKO jeśli wynikają z kontekstu (oznacz "szacunkowo:")
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu go przepisz bez komentowania
- Zmień TYLKO styl (analityczny), ZERO zmian merytorycznych

Przepisz poniższy komunikat w formacie analitycznym z naciskiem na dane:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  english: `⚠️ ABSOLUTELY FORBIDDEN:
- DO NOT add comments like "this is a humorous message" or "the tone is ironic"
- DO NOT evaluate or analyze the original text
- DO NOT end before the original ends - FULL length required
- DO NOT add your own thoughts or observations
- You are a TOOL for rewriting, not a commentator

✅ REQUIRED:
- Translate the ENTIRE text from start to finish
- Preserve ALL facts, dates, numbers, context
- If there is a joke/humor in the original - simply translate it without commenting
- Change ONLY the language (to English), ZERO changes to content

Translate the following message to English:

{baseContent}

🔴 FINAL CHECK: Did you translate EVERYTHING to the very end? Did you NOT add any comments? Check before sending.`,

  staropolski: `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść w imitacji staropolszczyzny (XVI-XVII wiek)
- KONIECZNIE zacznij od "Mocium Panie,"
- Używaj archaicznych form: "iżby", "acz", "niezmiernie", "raczyć", "pojąć"
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - po prostu go przepisz w staropolskim bez komentowania
- Zmień TYLKO język (staropolski), ZERO zmian merytorycznych

Przepisz poniższy komunikat w imitacji staropolszczyzny:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy zacząłeś od "Mocium Panie,"? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,

  'super-casual': `⚠️ ABSOLUTNIE ZAKAZANE:
- NIE dodawaj komentarzy typu "to humorystyczny komunikat" lub "ton jest ironiczny"
- NIE wartościuj ani nie analizuj oryginalnego tekstu
- NIE kończ przed zakończeniem oryginału - PEŁNA długość wymagana
- NIE dodawaj swoich przemyśleń ani obserwacji
- Jesteś NARZĘDZIEM do przepisywania, nie komentatorem

✅ WYMAGANE:
- Przepisz CAŁĄ treść MEGA LUŹNO w stylu Gen Z
- Użyj DUŻO emotek 😎🔥💯✨🤙🎃
- Slang: "spoko", "git", "mega", "vibes"
- Skróty: "tbh", "ngl", "btw"
- Zachowaj WSZYSTKIE fakty, daty, liczby, kontekst
- Jeśli w oryginale jest żart/humor - wzmocnij z emotkami bez komentowania
- Zmień TYLKO ton (mega casual), ZERO zmian merytorycznych

Przepisz poniższy komunikat MEGA LUŹNO w stylu Gen Z:

{baseContent}

🔴 KONTROLA KOŃCOWA: Czy przepisałeś WSZYSTKO do samego końca? Czy NIE dodałeś żadnych komentarzy? Sprawdź przed wysłaniem.`,
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
