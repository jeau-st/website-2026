# website-2026

Nieuwe website voor jeau.st, de eigen site van Jeau.st. Eigenaar: Jeau.st | Klant: n.v.t.

## Stack

- Astro 7, Tailwind v4 via `@tailwindcss/vite`, hosting Cloudflare Workers via `@astrojs/cloudflare`
- Fonts: Inter en IBM Plex Mono via de Astro fonts-API met de Fontsource-provider, zelf gehost, geen verzoek naar Google. Het woordmerk is geen font maar een pad in `src/components/Woordmerk.astro`
- Primaire actie: Pipedrive-afspraakplanner. Geen contactformulier

Output is statisch. De adapter staat er zodat losse endpoints of server islands later kunnen, zonder herinrichting. De vorige site staat in `C:\Users\joost\dev\Website Jeau.st\jeau-st-site` (statische HTML, Tailwind v4, GitHub Pages) en dient als referentie voor content en huisstijl.

## Commando's

```
npm install
npm run dev
npm run build
npm run typecheck
npm run schrijfwijzer
npm run preview
npm run deploy
```

Astro houdt de dev server als los proces in leven. Draait er al een, dan start `npx astro dev` niet; gebruik `npx astro dev --force` of eerst `npx astro dev stop`. Een wijziging in `astro.config.mjs` vraagt altijd om een herstart.

De build schrijft naar `dist/client` en genereert daar `wrangler.json`. Daarom lopen preview en deploy via `-c dist/client/wrangler.json`; de wrangler config in de wortel bevat alleen naam, compatibiliteitsdatum en flags.

## Waar staat wat

- `src/data/site.ts`: alle herhaalde inhoud en de TODO-placeholders
- `src/data/namen.ts`: de namen waaruit de kop op de homepage kiest, en de functie die er een uitzoekt
- `OPLEVERING.md`: wat Joost nog moet invullen voor livegang
- `SCHRIJFWIJZER.md`: stem, verboden woorden en werkwijze voor alle tekst op de site
- `docs/brand-persona.md`: wie er spreekt, de ideale klant, karakter en toon. Lees die voor je tekst schrijft
- `docs/structuurvoorstel.md`: de paginastructuur, waarom elk blok staat waar het staat, en wat er nog bij komt
- `docs/palet.html`: het palet met stalen, gemeten aandelen en contrastcijfers. Staat buiten `src/pages` en `public`, dus de build neemt hem niet mee. Open hem vanaf schijf
- `src/pages/llms.txt.ts`: de inhoudsopgave voor taalmodellen, gegenereerd uit `site.ts`
- `scripts/og.mjs`: maakt `public/og.png` uit het woordmerk en de huisstijlkleuren, draait met `npm run og`
- `scripts/schrijfwijzer.mjs`: controleert de zichtbare tekst tegen die wijzer, draait met `npm run schrijfwijzer`
- `src/pages`: routes, een bestand per pagina
- `src/components`: Sectie, Knop, Kop, Voet, Todo en de inhoudsblokken
- `src/layouts`: layouts, `Basis.astro` verzorgt head, taal en canonical
- `src/styles/global.css`: Tailwind-import en alle kleur- en fonttokens
- `public`: bestanden die ongewijzigd worden geserveerd
- `wrangler.jsonc`: Workers-config in de wortel

## Regels

- Nederlands, je-vorm, geen em dash. Voor alle tekst geldt `SCHRIJFWIJZER.md`. Draai `npm run schrijfwijzer` na elke tekstwijziging: fout betekent herschrijven, let op betekent zelf beoordelen.
- Geen verzonnen cijfers, testimonials of klantcases.
- Koppen krijgen hun kleur uit `--c-kop`, niet uit een utility in de opmaak: een donker blauwgrijs in licht, een licht blauwgrijs in donker. Beide staan los van de tekstkleur.
- Koppen staan in Inter, kleine labels en de tekeningen in IBM Plex Mono. Het woordmerk is een svg: als pixelfont werd het vlekkerig door de rasterizer, als pad schaalt het schoon. Kop en Voet zetten alleen de hoogte.
- Kleuren en fonts alleen via tokens uit `src/styles/global.css`. Gebruik de roltokens (`bg`, `vlak`, `rand`, `tekst`, `zacht`, `accent`), nooit de vaste merkkleuren: die wisselen niet mee met het thema.
- Licht is de standaard, donker via `data-thema="donker"` op `<html>`. De systeemvoorkeur schakelt niet automatisch om.
- Het palet is gemeten uit de museumscan van Van Gogh, Zelfportret met grijze vilthoed (s0016V1962), met k-means in Lab en een telling per kleurfamilie. Het doek is voor 49,6% blauw en voor 3,3% groen, dus het palet is blauw. De twee grootste clusters zijn staal `#41515C` en lei `#56646D`, samen 43% van het doek. Warm is oker `#816447` en vlam `#8D531F`, de oranje stippen. Alle rollen erven tint 204 (blauw) of tint 28 (oranje) en verschillen alleen in lichtheid.
- Het accent verschilt per thema, want één oranje haalt niet in allebei de contrastnorm voor tekst op de knop. Licht gebruikt `#9E5514`, donker `#E1791C`. Allebei 4,6:1 op de vlakke baan, de krapste van de twee.
- Het accent is de enige warme kleur in de interface en staat alleen op de primaire knop, de focusring en de naamknop in de kop op de homepage. Niet op links, lijsten of pijltjes.
- Het woordmerk draagt geen accent maar `merk`: zwart in licht, wit in donker, dezelfde waarde als de tekst.
- Ontbrekende inhoud wordt een zichtbare TODO, nooit een verzonnen tekst.
- Secrets alleen via `npx wrangler secret put` of `.env.local`, nooit in de repo.
