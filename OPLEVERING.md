# Wat Joost nog moet invullen

Op de site staat geen zichtbare TODO meer. Alle tekst is ingevuld. Wat
hieronder staat, is werk dat nog moet gebeuren voordat de site live kan.

## Blokkerend voor livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Privacytekst juridisch laten nalezen | `src/pages/privacy.astro` | De verwerkerslijst staat er nu: Cloudflare, Microsoft, Pipedrive en Google Maps. Laat het geheel nalezen door iemand die er verstand van heeft voordat de site live gaat. |
| n8n-workflow voor scan en formulier | n8n Jeau.st | Zonder webhook-URL staat er een TODO op /scan en /contact. De payload en de stappen staan in `docs/koppelscan.md`. Zet daarna `PUBLIC_SCAN_WEBHOOK` in de build. |
| Privacytekst bij scan en formulier | `src/data/teksten.ts`, privacy | n8n en Anthropic staan er nu bij als verwerker, en de tekst zegt dat je de AI-analyse naleest voordat je contact opneemt. Gaat de mail ooit automatisch de deur uit, pas dan die zin aan. Neem dit mee in de juridische controle. |

## Instellen voor of na livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Cloudflare Web Analytics | Keystatic, Bedrijfsgegevens, veld Analyticstoken | Cookieloos, dus geen cookiemelding nodig. De beacon laadt alleen met een token. |
| Domein jeau.st koppelen | `wrangler.jsonc` | Wacht op nic.st: zie het draaiboek in `docs/dns-verhuizing.md`. Het routesblok staat klaar in `wrangler.jsonc`, in commentaar. Haal dat weg zodra de zone in Cloudflare actief is. Tot die tijd staat de site op jeau.st via GitHub Pages, en daarvoor staat de repo openbaar. Zet hem daarna weer op privé en haal Pages weg: de stappen staan in het draaiboek bij stap 7. |

## Engelse versie

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Engelse belafspraak in Bookings | Keystatic, Bedrijfsgegevens, veld Link naar de planner (Engels) | Zolang dit veld leeg is, wijst de knop op `/en/` naar de Nederlandse planner, en komt iemand die net Engels las in een Nederlands formulier terecht. Maak een tweede Bookings-pagina in het Engels en zet de link erin. |
| Engelse tekst nalezen door iemand die Engels spreekt | `src/data/teksten.ts` en `src/inhoud/en` | De tekst is geschreven en niet vertaald, en gecontroleerd op Brits Engels en op de verboden woorden. Een moedertaalspreker hoort er nog dingen in die een script niet vindt. |

## Gecontroleerd en akkoord

- Contrast donker, tegen de achtergrond: tekst 17,9:1, kop 12,3:1, zacht 5,0:1, accent 5,1:1
- Contrast licht, tegen de achtergrond: tekst 17,6:1, kop 12,0:1, zacht 4,9:1, accent 4,9:1
- Op een kaart, de krapste ondergrond: tekst 16,1:1, kop 11,1:1, zacht en accent 4,5:1
- Het woordmerk draagt de tekstkleur, dus hetzelfde cijfer in allebei de thema's
- Donker is de standaard. Licht komt via de schakelaar in de kop
- Geen horizontale scroll op 375 px, hero past op 1280 bij 800
- Eén h1 per pagina, zichtbare focusring, skip-link naar de inhoud
- FAQ werkt zonder JavaScript
- Geen verzonnen klantnamen, cijfers, testimonials of partnerlogo's
- Case 03 blijft zoals hij is. Het architectenbureau is herkenbaar voor wie in die hoek zit, en dat is akkoord
- Doorlooptijd op /aanpak: twee tot vier weken voor een kleine inrichting, twee tot vier maanden voor een migratie met koppelingen
- Website en mail gaat over moderniseren. Moet het er totaal anders uitzien met veel nieuwe functionaliteit, dan verwijs je door naar een designbureau
- Geen praktijkvoorbeelden op de dienstpagina's. De vier cases op /werk doen dat werk, en de dienstpagina's leggen uit hoe het werkt
- Open Graph-afbeelding staat in `public/og.png`, 1200 bij 630. Opnieuw maken na een wijziging aan het woordmerk of de belofte: `npm run og`
