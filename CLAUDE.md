# CLAUDE.md

Kontext für Claude Code in diesem Repository.

## Projekt

Safari-Userscript, das im BrandMeister-Dashboard Klicks auf Rufzeichen auf das
zugehörige QRZ.com-Profil umleitet. Betrieben mit der App „Userscripts" (quoid)
unter Safari auf macOS.

Ein einzelnes Script. Kein Build, keine Abhängigkeiten, kein Node, kein
Paketmanager.

## Struktur

- `brandmeister-qrz.user.js` — das gesamte Script
- `README.md` — Englisch, für Außenstehende
- `CLAUDE.md` — diese Datei
- `LICENSE` — MIT
- `.gitignore`

## Harte Regeln

1. `@inject-into content` im Metadatenblock **nicht** auf `page` ändern.
   brandmeister.network setzt eine Content Security Policy, die Injektion im
   Seitenkontext blockiert.
2. Kein `@downloadURL` / `@updateURL`. Die Installation erfolgt bewusst manuell
   per Copy-Paste in die Userscripts-App.
3. Keine `@grant`-Funktionen, keine externen Bibliotheken. Reines Vanilla-JS,
   das in Safari ohne Transpilation läuft.
4. Bei jeder funktionalen Änderung `@version` erhöhen **und** die Versionsnummer
   in der `console.log`-Zeile mitziehen. Beide müssen übereinstimmen.
5. Keine Commits oder Pushes ohne ausdrückliche Rückfrage.

## Fachlicher Hintergrund

BrandMeister nutzt Hash-Routing. Profil-URLs haben die Form:

    https://brandmeister.network/#/profile/DO2BX

Einen `?call=`-Query-Parameter gibt es nicht mehr — genau das war die Ursache,
dass Version 2.0 aufhörte zu funktionieren.

Die Rufzeichenerkennung läuft deshalb dreistufig:

1. Hash-Pfad `#/profile/<CALL>` — der aktuelle Weg
2. Query-Parameter `?call=` — Altbestand, aus Kompatibilität behalten
3. Linktext gegen ein Rufzeichen-Muster — Rückfallebene

Stufe 3 ist die unsicherste: Texte wie „TG262" können fälschlich als Rufzeichen
durchgehen. Wer die Erkennung anfasst, muss genau hier gegenprüfen.

## Testen

Es gibt keine automatisierten Tests. Manueller Testfall:

1. Script in die Userscripts-App einfügen und speichern
2. `https://brandmeister.network/` in Safari öffnen
3. Konsole öffnen (⌥⌘C) und den Kontext unten rechts auf den
   Erweiterungs-Kontext umschalten — sonst fehlt die `[QRZ]`-Logzeile
4. Auf ein Rufzeichen klicken: ein neuer Tab mit
   `https://www.qrz.com/db/<CALL>` muss sich öffnen, und die BrandMeister-Seite
   darf *nicht* navigieren

## Bekannte Stolpersteine

- **Safari-Berechtigung:** Unter Einstellungen → Erweiterungen → Userscripts muss
  `brandmeister.network` auf „Erlauben" stehen, nicht „Für einen Tag erlauben".
  Letzteres läuft ab und sieht aus wie ein Fehler im Script.
- **iCloud:** Liegt das Script-Verzeichnis der Userscripts-App in iCloud Drive,
  kann macOS die Datei auslagern; die Erweiterung liest sie dann nicht mehr.
- **Konsolen-Kontext:** Logausgaben erscheinen nicht im Seiten-Kontext.
- **Fremdfehler:** 404 auf `hamface.brandmeister.network/*.jpg` sowie
  „Unable to post message to google.com/youtube.com" stammen von der Seite selbst
  und sind nicht projektbezogen.

## Konventionen

- Antworten und Code-Kommentare auf Englisch, `README.md` auf Englisch.
- Commit-Nachrichten auf Englisch, imperativ, einzeilig
  (z. B. `Add hash route detection for profile links`).
- Branch: `main`. Kein Branching für Einzeländerungen.
- Vor destruktiven Operationen Schritt für Schritt rückfragen.