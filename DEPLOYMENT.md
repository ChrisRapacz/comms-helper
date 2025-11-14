# 🚀 Deployment Guide - Bezpieczne wdrożenie na VPS

## 📋 Spis treści
1. [Bezpieczeństwo API Key](#bezpieczeństwo-api-key)
2. [Metody przekazywania klucza](#metody-przekazywania-klucza)
3. [Deployment krok po kroku](#deployment-krok-po-kroku)
4. [Automatyzacja z systemd](#automatyzacja-z-systemd)
5. [Monitoring i logi](#monitoring-i-logi)

---

## 🔒 Bezpieczeństwo API Key

### Jak działa bezpieczeństwo w Next.js?

W Next.js zmienne środowiskowe są bezpieczne domyślnie:

| Zmienna | Dostępność | Bezpieczeństwo |
|---------|-----------|----------------|
| `ANTHROPIC_API_KEY` | ✅ **TYLKO backend** | ✅ Bezpieczne |
| `NEXT_PUBLIC_*` | ❌ Frontend + Backend | ❌ NIE używaj dla kluczy! |

### Gdzie jest używany klucz?

```
/app/api/generate-variants/route.ts  ← TYLKO TU (server-side)
```

Frontend **NIGDY** nie ma dostępu do `ANTHROPIC_API_KEY`.

---

## 🔑 Metody przekazywania klucza

### Metoda 1: Inline podczas docker-compose up (NAJPROSTSZA)

```bash
ANTHROPIC_API_KEY=sk-ant-your-key docker-compose up -d --build
```

**Zalety:**
- ✅ Najprostsza
- ✅ Klucz nie jest zapisany w żadnym pliku
- ✅ Działa od razu

**Wady:**
- ❌ Trzeba podawać przy każdym uruchomieniu
- ❌ Widoczny w historii bash (można wyłączyć - patrz poniżej)

**Jak ukryć z historii bash:**
```bash
# Wyłącz historię dla tej sesji
set +o history

# Uruchom aplikację
ANTHROPIC_API_KEY=sk-ant-your-key docker-compose up -d --build

# Włącz historię z powrotem
set -o history
```

---

### Metoda 2: Export zmiennej środowiskowej (ZALECANE dla VPS)

```bash
# Eksportuj w bieżącej sesji
export ANTHROPIC_API_KEY=sk-ant-your-key

# Uruchom aplikację
docker-compose up -d --build

# Sprawdź status
docker-compose ps
```

**Zalety:**
- ✅ Prosta i czysta
- ✅ Można łatwo zmienić klucz
- ✅ Zmienna dostępna dla wszystkich komend w sesji

**Wady:**
- ❌ Znika po zamknięciu sesji SSH
- ❌ Trzeba exportować przy każdym logowaniu

---

### Metoda 3: Permanentna zmienna w .bashrc (AUTOMATYCZNA)

```bash
# Dodaj do .bashrc (tylko dla Twojego użytkownika)
echo 'export ANTHROPIC_API_KEY=sk-ant-your-key' >> ~/.bashrc

# Załaduj od razu
source ~/.bashrc

# Teraz zawsze dostępna
docker-compose up -d --build
```

**Zalety:**
- ✅ Automatyczna przy każdym logowaniu
- ✅ Nie trzeba pamiętać o exportowaniu
- ✅ Prywatna dla Twojego użytkownika

**Wady:**
- ❌ Zapisana w pliku tekstowym (ale tylko Ty masz dostęp)

**Zwiększenie bezpieczeństwa .bashrc:**
```bash
# Ustaw uprawnienia tylko dla siebie
chmod 600 ~/.bashrc

# Sprawdź uprawnienia
ls -la ~/.bashrc
# Powinno być: -rw------- (tylko właściciel może czytać/pisać)
```

---

### Metoda 4: Plik .env.local (NIE commitowany do Git)

Jeśli koniecznie chcesz użyć pliku:

```bash
# Stwórz .env.local (NIE .env)
cat > .env.local << 'EOF'
ANTHROPIC_API_KEY=sk-ant-your-key
EOF

# Ustaw bezpieczne uprawnienia
chmod 600 .env.local

# Zmodyfikuj docker-compose.yml aby używał .env.local
```

Zaktualizuj `docker-compose.yml`:
```yaml
services:
  comms-helper:
    env_file:
      - .env.local  # Dodaj tę linię
    environment:
      - NODE_ENV=production
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
```

**WAŻNE:** Dodaj `.env.local` do `.gitignore` (jest już dodany)

---

## 🚀 Deployment krok po kroku

### Przygotowanie na lokalnej maszynie

```bash
# 1. Upewnij się że wszystko działa lokalnie
npm run build

# 2. Stwórz archiwum (bez node_modules i .next)
tar -czf comms-helper.tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  --exclude=.env \
  .
```

### Deployment na VPS

```bash
# 1. Prześlij na serwer
scp comms-helper.tar.gz user@your-vps:/tmp/

# 2. Zaloguj się na serwer
ssh user@your-vps

# 3. Rozpakuj
mkdir -p ~/apps/comms-helper
cd ~/apps/comms-helper
tar -xzf /tmp/comms-helper.tar.gz
rm /tmp/comms-helper.tar.gz

# 4. Przekaż klucz API (WYBIERZ JEDNĄ METODĘ)

## OPCJA A: Inline
ANTHROPIC_API_KEY=sk-ant-your-key docker-compose up -d --build

## OPCJA B: Export
export ANTHROPIC_API_KEY=sk-ant-your-key
docker-compose up -d --build

## OPCJA C: Permanent
echo 'export ANTHROPIC_API_KEY=sk-ant-your-key' >> ~/.bashrc
source ~/.bashrc
docker-compose up -d --build

# 5. Sprawdź status
docker-compose ps
docker-compose logs -f

# 6. Test
curl http://localhost:3000
```

---

## 🔄 Automatyzacja z systemd (opcjonalne)

Jeśli chcesz aby aplikacja startowała automatycznie po restarcie serwera:

```bash
# 1. Stwórz service file
sudo nano /etc/systemd/system/comms-helper.service
```

```ini
[Unit]
Description=Comms Helper - AI Communication Demo
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/your-user/apps/comms-helper
Environment="ANTHROPIC_API_KEY=sk-ant-your-key"
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
User=your-user

[Install]
WantedBy=multi-user.target
```

```bash
# 2. Włącz i uruchom
sudo systemctl daemon-reload
sudo systemctl enable comms-helper
sudo systemctl start comms-helper

# 3. Sprawdź status
sudo systemctl status comms-helper
```

---

## 📊 Monitoring i logi

### Sprawdzanie logów

```bash
# Wszystkie logi
docker-compose logs -f

# Tylko ostatnie 100 linii
docker-compose logs --tail=100

# Tylko błędy
docker-compose logs | grep -i error
```

### Sprawdzanie użycia zasobów

```bash
# Statystyki kontenera
docker stats comms-helper

# Procesy w kontenerze
docker top comms-helper
```

### Restart aplikacji

```bash
# Restart bez rebuildu
docker-compose restart

# Restart z rebuildem
docker-compose up -d --build --force-recreate
```

### Update aplikacji

```bash
# 1. Zatrzymaj
docker-compose down

# 2. Pobierz nowe zmiany (jeśli używasz git)
git pull

# 3. Uruchom z rebuildem
ANTHROPIC_API_KEY=sk-ant-your-key docker-compose up -d --build
```

---

## 🔍 Weryfikacja bezpieczeństwa

### Test 1: Sprawdź czy klucz nie jest w frontend

```bash
# Zbuduj aplikację
docker-compose exec comms-helper npm run build

# Przeszukaj bundle - NIE powinno znaleźć klucza
docker-compose exec comms-helper grep -r "sk-ant" .next/static/ || echo "✅ Klucz nie jest w frontend!"
```

### Test 2: Sprawdź uprawnienia plików

```bash
# .bashrc powinien być 600 (tylko właściciel)
ls -la ~/.bashrc

# .env.local (jeśli używasz) powinien być 600
ls -la .env.local
```

### Test 3: Sprawdź czy klucz działa

```bash
# Test API endpoint (z serwera)
curl -X POST http://localhost:3000/api/generate-variants \
  -H "Content-Type: application/json" \
  -d '{"keyPoints": "Test message"}'
```

---

## 🆘 Troubleshooting

### Problem: "Anthropic API key is not configured"

```bash
# Sprawdź czy zmienna jest ustawiona
echo $ANTHROPIC_API_KEY

# Sprawdź zmienne w kontenerze
docker-compose exec comms-helper env | grep ANTHROPIC
```

### Problem: Klucz nie działa po restarcie serwera

To normalne jeśli używałeś `export`. Rozwiązania:
1. Dodaj do `.bashrc` (Metoda 3)
2. Użyj systemd service (patrz wyżej)

### Problem: Port 3000 zajęty

```bash
# Sprawdź co używa portu
sudo lsof -i :3000

# Zmień port w docker-compose.yml
# ports:
#   - "8080:3000"  # Host:Container
```

---

## 📝 Checklist deploymentu

- [ ] Klucz API nigdy nie commitowany do Git
- [ ] `.env` w `.gitignore`
- [ ] Klucz przekazany przez zmienną środowiskową
- [ ] Aplikacja działa: `curl http://localhost:3000`
- [ ] API działa: test endpoint `/api/generate-variants`
- [ ] Logi wyglądają OK: `docker-compose logs`
- [ ] Reverse proxy skonfigurowany (jeśli potrzebny)
- [ ] SSL/HTTPS skonfigurowany (produkcja)
- [ ] Backup klucza API w bezpiecznym miejscu

---

## 🎯 Rekomendacja dla VPS

**Dla najprostszego i najbezpieczniejszego deploymentu:**

1. Użyj **Metody 3** (permanent w `.bashrc`)
2. Ustaw `chmod 600 ~/.bashrc`
3. Jeśli chcesz auto-restart: użyj **systemd service**

Gotowe! 🚀
