# Comms Helper - AI Personalized Communication Demo

Aplikacja demonstracyjna pokazująca personalizację komunikacji firmowej z wykorzystaniem AI.

**Temat prezentacji:** "Jeden rozmiar pasuje do nikogo: Jak AI pomaga mówić językiem każdego pracownika"

## 🎯 Funkcjonalności

### Panel Komunikatora (Admin)
- Wprowadzenie kluczowych informacji o komunikacie
- Automatyczne generowanie 12 wariantów wiadomości przez AI
- Edycja każdego wariantu przed wysyłką
- Wysyłka spersonalizowanych wersji do wszystkich pracowników

### Panel Pracownika (Inbox)
- 12 różnych person pracowników z unikalnymi preferencjami
- Interfejs podobny do Gmail
- Wyświetlanie wiadomości dopasowanych do preferencji
- Przykładowe maile w każdej skrzynce

## 🚀 Szybki start

### Wymagania
- Node.js 20+
- Docker & Docker Compose (do deploymentu)
- OpenAI API Key

### Lokalne uruchomienie

1. **Sklonuj repozytorium**
```bash
git clone <repository-url>
cd comms-helper
```

2. **Zainstaluj zależności**
```bash
npm install
```

3. **Skonfiguruj zmienne środowiskowe**
```bash
cp .env.example .env
# Edytuj .env i dodaj swój OPENAI_API_KEY
```

4. **Uruchom w trybie deweloperskim**
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## 🐳 Deployment z Docker

### Budowanie i uruchomienie

1. **Skonfiguruj zmienne środowiskowe**
```bash
cp .env.example .env
# Edytuj .env i dodaj swój OPENAI_API_KEY
```

2. **Zbuduj i uruchom kontener**
```bash
docker-compose up -d --build
```

3. **Sprawdź status**
```bash
docker-compose ps
docker-compose logs -f
```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

### Zatrzymanie aplikacji
```bash
docker-compose down
```

### Deployment na VPS (Mikrus lub inny)

1. **Prześlij pliki na serwer**
```bash
scp -r ./* user@your-vps-ip:/path/to/comms-helper/
```

2. **Zaloguj się na serwer**
```bash
ssh user@your-vps-ip
cd /path/to/comms-helper
```

3. **Skonfiguruj zmienne środowiskowe**
```bash
nano .env
# Dodaj OPENAI_API_KEY
```

4. **Uruchom z Docker Compose**
```bash
docker-compose up -d --build
```

5. **Konfiguracja reverse proxy (opcjonalnie)**

Jeśli chcesz wystawić aplikację na domenie, skonfiguruj nginx jako reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📚 Struktura projektu

```
comms-helper/
├── app/
│   ├── admin/          # Panel komunikatora
│   ├── inbox/          # Panel pracowników (Gmail-like)
│   ├── api/            # API routes (generowanie wariantów)
│   └── layout.tsx      # Root layout
├── lib/
│   ├── types.ts        # Definicje TypeScript
│   ├── store.ts        # Zustand store (state management)
│   ├── personas.ts     # Definicje 12 pracowników
│   ├── variants.ts     # Konfiguracja wariantów komunikatów
│   └── sample-emails.ts # Przykładowe maile
├── components/         # Komponenty React (reusable)
├── docker-compose.yml  # Docker Compose config
├── Dockerfile          # Docker build config
└── package.json        # Dependencies
```

## 🎨 Warianty komunikatów

Aplikacja generuje 12 różnych wariantów:

1. **Bazowa wersja** - Standardowy format
2. **Z podsekcjami** - Podzielona na sekcje z nagłówkami
3. **Szczegółowa** - Rozbudowana z pełnym kontekstem
4. **Skrócona** - Tylko najważniejsze punkty
5. **Bullet Points** - W formie wypunktowanych punktów
6. **TL;DR First** - Podsumowanie na górze
7. **Action-Oriented** - Skupiona na akcjach do wykonania
8. **FAQ Format** - W formie pytań i odpowiedzi
9. **Visual/Emoji** - Z emoji i wizualną strukturą
10. **Formalny** - Bardzo profesjonalny ton
11. **Casual** - Przyjazny, konwersacyjny ton
12. **Data-Driven** - Skupiony na liczbach i faktach

## 👥 Persony pracowników

Aplikacja zawiera 12 person pracowników reprezentujących różne pokolenia i preferencje:

- **Boomers** (2) - Preferują szczegółowe, formalne komunikaty
- **Gen X** (3) - Cenią zwięzłość i praktyczność
- **Millennials** (4) - Lubią strukturę i współpracę
- **Gen Z** (3) - Preferują wizualizacje i konkretne dane

Każdy pracownik ma:
- Unikalną personę i opis
- Avatar (z Pravatar)
- Preferencję komunikacyjną
- Przykładowe maile w skrzynce

## 🔧 Konfiguracja

### Zmienne środowiskowe (.env)

```env
OPENAI_API_KEY=sk-...your-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Porty

- Aplikacja: `3000` (domyślnie)
- Można zmienić w `docker-compose.yml` sekcja `ports`

## 📖 Jak używać podczas prezentacji

1. **Rozpocznij od strony głównej** - wyjaśnij koncepcję
2. **Przejdź do Panelu Komunikatora**:
   - Wprowadź przykładowy komunikat (np. o nowej polityce pracy zdalnej)
   - Kliknij "Wygeneruj warianty"
   - Pokaż różne wersje - przeglądaj warianty
   - Wyślij komunikat
3. **Przełącz się do Panelu Pracownika**:
   - Wybierz różnych pracowników
   - Pokaż jak ta sama wiadomość wygląda w różnych wersjach
   - Zwróć uwagę na oznaczenia "Dopasowano do Twoich preferencji"

## 🛠️ Troubleshooting

### Problem: Błąd przy generowaniu wariantów
- Sprawdź czy `OPENAI_API_KEY` jest poprawnie ustawiony w `.env`
- Sprawdź limity API w OpenAI dashboard

### Problem: Aplikacja nie startuje w Docker
- Sprawdź logi: `docker-compose logs -f`
- Upewnij się że port 3000 nie jest zajęty

### Problem: Błędy TypeScript
- Uruchom: `npm install` aby zainstalować wszystkie zależności

## 📝 Licencja

Demo stworzone na potrzeby prezentacji. Wszystkie prawa zastrzeżone.

## 👨‍💻 Autor

Stworzono do prezentacji: "Jeden rozmiar pasuje do nikogo: Jak AI pomaga mówić językiem każdego pracownika"
