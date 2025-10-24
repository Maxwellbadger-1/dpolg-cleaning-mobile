# DPolG Putzplan - Mobile Web App 🧹

Mobile Web-Anwendung für Putzkräfte zum Anzeigen und Verwalten von Reinigungsaufgaben.

## Features

- ✅ **7-Tage-Ansicht** - Heute, Morgen und die nächsten 5 Tage
- 📱 **Mobile-optimiert** - Funktioniert auf allen Smartphones
- 🔄 **Auto-Refresh** - Aktualisiert sich alle 5 Minuten automatisch
- ✨ **Offline-fähig** - Kann als PWA installiert werden
- 🐕 **Service-Icons** - Zeigt Hund, Bettwäsche, Gästezahl an
- ⚠️ **Priority Flags** - Hebt Same-Day Check-ins hervor
- ✅ **Status Toggle** - Aufgaben als erledigt markieren

## Tech Stack

- **Pure HTML/CSS/JavaScript** - Kein Build-Prozess nötig
- **Turso Database** - SQLite in der Cloud
- **Vercel** - Hosting

## Deployment

### Option 1: Vercel CLI (Schnell)

```bash
# Vercel CLI installieren (falls noch nicht installiert)
npm install -g vercel

# In dieses Verzeichnis wechseln
cd dpolg-cleaning-mobile

# Deployen
vercel

# Production Deployment
vercel --prod
```

### Option 2: GitHub + Vercel (Automatisch)

1. Erstelle neues GitHub Repository
2. Push diesen Ordner dorthin
3. Gehe zu [vercel.com](https://vercel.com)
4. Klicke "Import Project"
5. Wähle das GitHub Repo
6. Deploy!

## Lokales Testen

Öffne einfach `index.html` in deinem Browser. Für CORS-freien Test:

```bash
# Mit Python
python3 -m http.server 8000

# Dann Browser öffnen: http://localhost:8000
```

## Konfiguration

Die Turso-Credentials sind direkt in `index.html` eingebunden:

```javascript
const TURSO_URL = 'https://dpolg-cleaning-maxwellbadger-1.aws-eu-west-1.turso.io';
const TURSO_TOKEN = '...';
```

**Wichtig:** In Production sollten diese über Environment Variables kommen!

## URL für Putzkräfte

Nach dem Deployment wird die URL etwa so aussehen:
```
https://dpolg-cleaning.vercel.app
```

Diese URL können die Putzkräfte dann als Lesezeichen auf ihrem Handy speichern.

## Features erklärt

### 7-Tage-Tabs
Zeigt Aufgaben für Heute, Morgen und die nächsten 5 Tage

### Priority System
- **HIGH** (rot): Same-Day Check-in nach Check-out
- **NORMAL** (grün): Normale Reinigung

### Service-Tags
- 🐕 **Hund** - Zimmer hatte Hund als Gast
- 🛏️ **Bettwäsche** - Bettwäsche muss gewechselt werden
- 👥 **X Gäste** - Anzahl der Gäste

### Status Toggle
- Klick auf Button → Aufgabe als "erledigt" markieren
- Grüner Button → Bereits erledigt
- Grauer Button → Noch zu tun

## Synchronisation

Die Desktop-App sendet Daten an Turso:
1. Buchungsverantwortlicher klickt in Desktop-App auf "Sync"
2. Daten werden zu Turso hochgeladen
3. Mobile-App zeigt sie innerhalb von Sekunden an

## Browser-Kompatibilität

- ✅ iOS Safari (iPhone/iPad)
- ✅ Android Chrome
- ✅ Desktop Chrome/Firefox/Safari
- ⚠️ IE11 NICHT unterstützt (aber 2025 sollte das kein Problem sein 😄)

## Troubleshooting

**"Keine Daten erhalten"**
→ Check Turso Token in Console

**"Fehler beim Laden"**
→ Check Internet-Verbindung & CORS

**Tasks werden nicht aktualisiert**
→ Refresh-Button drücken (🔄)

---

Made with ❤️ for DPolG

