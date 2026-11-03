# Wat Joost nog moet invullen

Alles hieronder staat als zichtbare TODO op de site of in de code. Zolang
het er staat, kan de site niet live.

## Blokkerend voor livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Verwerkerslijst privacy | `src/pages/privacy.astro` | Noem Pipedrive, Cloudflare, Microsoft Bookings en je mailprovider, en laat de tekst juridisch nalezen. |
| Open Graph-afbeelding | `public/og.png` | De layout verwijst ernaar, het bestand bestaat nog niet. 1200 bij 630 px. |

## Inhoud die nu op placeholders staat

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Voorbeeld per dienst | `src/pages/diensten/[slug].astro` | De vier dienstpagina's hebben nu alleen de tekst uit de lijst op de homepage. Dat is te weinig om op te ranken. Schrijf per dienst een voorbeeld: wat je tegenkwam, wat je deed, wat het opleverde. |
| Toestemming van de architect | `src/data/site.ts`, `cases` | Case 03 is herkenbaar voor wie in die hoek zit, terwijl erboven staat dat de cases geanonimiseerd zijn. Vraag toestemming, en dan mag zijn naam er ook bij, of maak de omschrijving vager. |
| Antwoord op "Hoe lang duurt een traject?" | `src/data/site.ts`, `vragen` | Een realistische bandbreedte, bijvoorbeeld apart voor een kleine inrichting en voor een migratie met koppelingen. |

## Instellen voor of na livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Cloudflare Web Analytics | `src/data/site.ts`, `analyticsToken` | Cookieloos, dus geen cookiemelding nodig. De beacon laadt alleen met een token. |
| Domein jeau.st koppelen | Cloudflare-dashboard | De site deployt met `npm run deploy`. |

## Gecontroleerd en akkoord

- Contrast licht: veen op krijt 14.2:1, wilg 8.5:1, accent 5.3:1
- Contrast donker: krijt op veen 14.2:1, hooi 7.2:1, accent 5.2:1
- Geen horizontale scroll op 375 px, hero past op 1280 bij 800
- Eén h1 per pagina, zichtbare focusring, skip-link naar de inhoud
- FAQ werkt zonder JavaScript
- Geen verzonnen klantnamen, cijfers, testimonials of partnerlogo's
