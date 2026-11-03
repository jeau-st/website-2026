# Wat Joost nog moet invullen

Alles hieronder staat als zichtbare TODO op de site of in de code. Zolang
het er staat, kan de site niet live.

## Blokkerend voor livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| URL afspraakplanner | `src/data/site.ts`, `cta.url` | De primaire actie op elke pagina. Zolang dit leeg is, rendert de knop een TODO in plaats van een dode link. |
| Verwerkerslijst privacy | `src/pages/privacy.astro` | Noem Pipedrive, Cloudflare en je mailprovider, en laat de tekst juridisch nalezen. |
| Open Graph-afbeelding | `public/og.png` | De layout verwijst ernaar, het bestand bestaat nog niet. 1200 bij 630 px. |

## Inhoud die nu op placeholders staat

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Twee cases | `src/data/site.ts`, `cases` | Situatie, aanpak en resultaat, geanonimiseerd. Zonder deze inhoud is `/werk` een lege pagina; haal hem dan uit het menu in `src/components/Kop.astro`. |
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
