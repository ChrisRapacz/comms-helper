export interface MessageTemplate {
  id: string;
  title: string;
  subject: string;
  content: string;
}

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: 'remote-work',
    title: 'Przejście firmy na pracę zdalną',
    subject: 'Nowa polityka pracy zdalnej',
    content: `Od 1 stycznia 2025 wprowadzamy nowy model pracy hybrydowej:

- 3 dni w tygodniu w biurze (wtorek, środa, czwartek)
- 2 dni pracy zdalnej (poniedziałek, piątek)
- Elastyczne godziny rozpoczęcia pracy: 7:00-10:00
- Obowiązkowa obecność na spotkaniach zespołowych we wtorki o 10:00
- Szczegółowe wytyczne dostępne w intranecie w sekcji HR
- Pytania proszę kierować do swojego managera lub działu HR

Zmiana wejdzie w życie po świętach Bożego Narodzenia.`,
  },
  {
    id: 'q3-results',
    title: 'Wyniki za Q3 2025',
    subject: 'Wyniki finansowe Q3 2025',
    content: `Mam przyjemność podzielić się wynikami naszej firmy za trzeci kwartał 2025:

📊 Najważniejsze liczby:
- Przychody: 15,2 mln PLN (wzrost o 23% r/r)
- EBITDA: 3,8 mln PLN (marża 25%)
- Liczba nowych klientów: 47
- Wskaźnik retencji: 94%

🎯 Kluczowe osiągnięcia:
- Udane wdrożenie systemu CRM w całej firmie
- Otwarcie nowego biura w Krakowie
- Certyfikat ISO 27001 uzyskany

💪 Wyzwania:
- Zwiększona konkurencja w segmencie enterprise
- Opóźnienia w projekcie X (teraz nadrabiamy)

Dziękuję całemu zespołowi za ciężką pracę! Szczegółowa prezentacja wyników będzie dostępna w piątek.`,
  },
  {
    id: 'performance-review',
    title: 'Zmiana formuły ocen kwartalnych',
    subject: 'Nowy system ocen kwartalnych',
    content: `Wprowadzamy ulepszony system ocen kwartalnych, który będzie bardziej transparentny i rozwojowy:

🔄 Co się zmienia:
- Oceny będą odbywać się co kwartał (dotychczas: pół roku)
- Nowy formularz z 5 obszarami oceny zamiast 10
- 360° feedback od współpracowników (opcjonalne)
- Automatyczne wskazówki rozwojowe od AI

📅 Harmonogram:
- 15-20 listopada: szkolenie dla managerów
- 1 grudnia: start nowego systemu
- Pierwsze oceny: styczeń 2026

💡 Dlaczego wprowadzamy zmiany:
- Szybsza reakcja na potrzeby rozwojowe
- Mniej czasu na administrację, więcej na rozmowę
- Lepsze dostosowanie do dynamiki rynku

Link do materiałów szkoleniowych: [intranet/hr/oceny-2025]`,
  },
  {
    id: 'christmas-party',
    title: 'Ogłoszenie Christmas Party',
    subject: '🎄 Christmas Party 2025 - Save the date!',
    content: `Ho ho ho! 🎅

Zapraszamy na tegoroczne Christmas Party!

📅 Kiedy: 20 grudnia 2025, godz. 18:00
📍 Gdzie: Hotel Marriott, Sala Balowa (ul. Marszałkowska 1)
👥 Dla kogo: wszyscy pracownicy + jedna osoba towarzysząca

🎉 Program wieczoru:
18:00 - Przywitanie i cocktail powitalny
19:00 - Kolacja (menu do wyboru: mięsne/rybne/vege)
20:30 - Podsumowanie roku przez CEO
21:00 - Losowanie nagród (pula 50 000 PLN!)
22:00 - DJ i parkiet taneczny do białego rana

🎁 Dress code: Elegancki (ale wygodne buty do tańczenia!)

✅ Potwierdzenie obecności: do 1 grudnia przez formularz [link]
- Wybierz menu dla siebie i osoby towarzyszącej
- Podaj preferencje dietetyczne jeśli masz

Transport: organizujemy busy z centrum (szczegóły wkrótce)

Do zobaczenia na parkiecie! 🕺💃`,
  },
  {
    id: 'ai-policy',
    title: 'Wdrożenie polityki AI w firmie',
    subject: 'Nowa polityka wykorzystania AI w pracy',
    content: `Wprowadzamy oficjalną politykę wykorzystania narzędzi AI w naszej firmie.

✅ Co jest dozwolone:
- ChatGPT, Claude, Gemini do draftu dokumentów i emaili
- GitHub Copilot do programowania
- AI do generowania grafik marketingowych (Midjourney, DALL-E)
- Automatyzacja powtarzalnych zadań
- Tłumaczenia i korekta tekstów

❌ Co jest zabronione:
- Przekazywanie danych klientów do publicznych AI
- Wykorzystanie AI do podejmowania decyzji HR
- Generowanie kodu produkcyjnego bez code review
- Udostępnianie internal know-how w promptach

🛡️ Bezpieczeństwo:
- Używamy tylko wersji enterprise z umowami DPA
- Nigdy nie kopiuj haseł, tokenów, kluczy API
- W razie wątpliwości - pytaj zespół Security

📚 Szkolenia:
- 25 listopada: "AI w praktyce" - warsztat dla wszystkich
- Materiały dostępne: [link do kursu e-learning]

Polityka wchodzi w życie 1 grudnia 2025.`,
  },
  {
    id: 'buddy-program',
    title: 'Wprowadzenie programu Buddy dla nowych pracowników',
    subject: 'Startujemy z programem Buddy!',
    content: `Wprowadzamy program Buddy - każdy nowy pracownik dostanie doświadczonego opiekuna!

🤝 Czym jest program Buddy?
Buddy to doświadczony pracownik, który przez pierwsze 3 miesiące wspiera nową osobę w aklimatyzacji w firmie.

👥 Dla kogo:
- Każdy nowy pracownik (od stycznia 2026)
- Buddy: osoby z minimum 1 rokiem doświadczenia w firmie

📋 Zadania Buddy:
- Wprowadzenie w kulturę firmy
- Pomoc w nawigacji po procesach i systemach
- Wsparcie w budowaniu sieci kontaktów
- Regularne check-iny (min. raz w tygodniu)

🎁 Benefity dla Buddy:
- Dodatek 500 PLN/miesiąc przez 3 miesiące opieki
- Certyfikat i punkty w programie rozwojowym
- Networking i rozwój kompetencji mentoringowych

✍️ Jak zostać Buddy?
Formularz zgłoszeniowy: [link]
Termin zgłoszeń: do 15 grudnia 2025

Krótkie szkolenie dla Buddy: 10 stycznia 2026`,
  },
  {
    id: 'zombie-apocalypse',
    title: 'Przygotowanie firmy na apokalipsę zombie',
    subject: '🧟 PILNE: Procedury na wypadek apokalipsy zombie',
    content: `W związku z rosnącym ryzykiem apokalipsy zombie, zarząd postanowił wdrożyć procedury awaryjne.

⚠️ PLAN EWAKUACJI:
- Punkt zborny: dach budynku (zombie nie potrafią chodzić po schodach)
- Zapasy żywności: piwnicy magazynowej (rating: 30 dni dla 50 osób)
- Dostęp do broni: szafa BHP (poziom -1) - kod: 2012

🏢 PROCEDURA LOCKDOWN:
1. Alarm zostanie uruchomiony przez systemy monitoringu AI
2. Automatyczne blokowanie wszystkich wejść (stal pancerna)
3. WAŻNE: Mimo apokalipsy zombie, praca TYLKO z biura - praca zdalna zabija kulturę organizacyjną (nawet bardziej niż zombie)

🛡️ WYPOSAŻENIE:
- Każdy desk ma zestaw przetrwania (woda, batonik, maczeta)
- IT zabezpiecza serwery (zombie mogą atakować również cyfrowo)
- HR organizuje szkolenie z pierwszej pomocy po ugryzieniu

📱 KOMUNIKACJA:
- Slack channel: #zombie-alert
- Emergency hotline: 997 (policja zombie)
- Backup: gołębie pocztowe (w razie braku internetu)

❗ To nie jest żart. Przygotujmy się razem.
Szkolenie: 1 kwietnia 2026

PS: Jeśli czytasz to będąc zombie - HR prosi o wypełnienie formularza ZUS Z-3 (zmiana statusu pracownika)`,
  },
  {
    id: 'fruit-thursday',
    title: 'Owocowe czwartki zmieniają się w marchewkowe wtorki',
    subject: '🥕 Zmiana: Marchewkowe wtorki zamiast owocowych czwartków',
    content: `Drodzy Pracownicy,

Z przykrością informuję, że z przyczyn logistyczno-budżetowych musimy zmienić nasz ukochany benefit.

📅 Co się zmienia:
- ❌ Owocowe czwartki → ✅ Marchewkowe wtorki
- Dzień: czwartek → wtorek
- Asortyment: mix owoców → wyłącznie marchew

🥕 Dlaczego marchew?
- Tańsza o 73% (oszczędność 12 000 PLN/rok)
- Dłuższa trwałość (mniej marnowania)
- Dobra dla wzroku (pracujemy przy monitorach!)
- Jedna marchewka = 5 porcji (oszczędniej!)

😢 Rozumiemy Wasze rozczarowanie
Zdajemy sobie sprawę, że to niepopularna decyzja. Otrzymaliśmy już 47 maili z pytaniem "czy to żart?". Niestety nie.

💡 Alternatywy:
- Możesz przynieść własne owoce (nie będziemy zabierać!)
- Co-funding: jeśli zbierzecie 50 chętnych, firma dopłaci 50% do owoców
- Marchew można jeść na 127 sposobów (poradnik od HR już wkrótce)

🗳️ Masz zdanie?
Wypełnij ankietę: [link] (choć decyzja już zapadła)

Pierwsze marchewkowe wtorki: 7 stycznia 2026

Przepraszamy i liczymy na zrozumienie.
Zarząd

PS: Oczywiście jemy żart. Owocowe czwartki zostają! 😄
Happy Halloween! 🎃`,
  },
  {
    id: 'ceo-bugatti',
    title: 'Prezes pochwalił się nowym Bugatti',
    subject: '🏎️ Gratulacje dla Prezesa!',
    content: `Drodzy Współpracownicy!

Mam ogromną przyjemność poinformować, że nasz CEO - Janusz Kowalski - został dumnym właścicielem Bugatti Chiron Super Sport! 🎉

🚗 Specyfikacja:
- Moc: 1600 KM (więcej niż cały nasz dział IT razem wzięty)
- Prędkość max: 440 km/h (szybciej niż nasz deployment pipeline)
- Cena: 3,5 mln EUR (mniej więcej budżet marketingu na 5 lat)
- Kolor: Racing Blue (matching z logo firmy!)

💬 Słowo od Prezesa:
"Ciężka praca się opłaca! Każdy z Was też może mieć Bugatti - wystarczy zostać CEO. Pozycja jest wolna za jakieś 20-30 lat, więc macie czas się przygotować. 😉"

🎊 Zachęcamy do:
- Wysyłania gratulacji na adres: ceo@firma.pl
- Polubienia zdjęcia na LinkedIn (link w intranecie)
- Podziwiania samochodu na parkingu (miejsce VIP-001)
- NIE dotykania (alarm czułości 10/10)

🚀 Dla motywacji:
Prezes obiecał, że jeśli firma osiągnie 100 mln PLN przychodu w 2026, zorganizuje okrążenie toru dla całego zespołu! (Co prawda będziemy siedzieć w busie, ale zobaczymy jak Bugatti jedzie obok!)

📸 Zdjęcia z delivery day dostępne w kanale #ceo-lifestyle na Slacku.

Jeszcze raz - gratulacje dla Prezesa! 🍾

---
Dział PR & Internal Comms

PS: Tak, dalej mamy budżet na owocowe czwartki. Nie, to nie dlatego nie dostaliście podwyżek. Tak, to lekki cringe. Nie, nie możesz pożyczyć na weekend.`,
  },
];
