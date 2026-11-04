# Wat Joost nog moet invullen

Op de site staat geen zichtbare TODO meer. Alle tekst is ingevuld. Wat
hieronder staat, is werk dat nog moet gebeuren voordat de site live kan.

## Blokkerend voor livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Privacytekst juridisch laten nalezen | `src/pages/privacy.astro` | De verwerkerslijst staat er nu: Cloudflare, Microsoft, Pipedrive en Google Maps. Laat het geheel nalezen door iemand die er verstand van heeft voordat de site live gaat. |

## Instellen voor of na livegang

| Wat | Waar | Toelichting |
| --- | --- | --- |
| Cloudflare Web Analytics | `src/data/site.ts`, `analyticsToken` | Cookieloos, dus geen cookiemelding nodig. De beacon laadt alleen met een token. |
| Domein jeau.st koppelen | Cloudflare-dashboard | De zone staat bij Cloud86 en moet naar Cloudflare voordat dit kan. Draaiboek in `docs/dns-verhuizing.md`. De site staat intussen live op https://website-2026.joostbeers.workers.dev. |

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
