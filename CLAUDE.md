# website-2026

Nieuwe website voor jeau.st, de eigen site van Jeau.st. Eigenaar: Jeau.st | Klant: n.v.t.

## Stack

- Astro 7, Tailwind v4 via `@tailwindcss/vite`, hosting Cloudflare Workers via `@astrojs/cloudflare`
- Fonts: Inter en IBM Plex Mono via de Astro fonts-API met de Fontsource-provider, zelf gehost, geen verzoek naar Google
- Primaire actie: Pipedrive-afspraakplanner. Geen contactformulier

Output is statisch. De adapter staat er zodat losse endpoints of server islands later kunnen, zonder herinrichting. De vorige site staat in `C:\Users\joost\dev\Website Jeau.st\jeau-st-site` (statische HTML, Tailwind v4, GitHub Pages) en dient als referentie voor content en huisstijl.

## Commando's

```
npm install
npm run dev
npm run build
npm run typecheck
npm run preview
npm run deploy
```

Astro houdt de dev server als los proces in leven. Draait er al een, dan start `npx astro dev` niet; gebruik `npx astro dev --force` of eerst `npx astro dev stop`. Een wijziging in `astro.config.mjs` vraagt altijd om een herstart.

De build schrijft naar `dist/client` en genereert daar `wrangler.json`. Daarom lopen preview en deploy via `-c dist/client/wrangler.json`; de wrangler config in de wortel bevat alleen naam, compatibiliteitsdatum en flags.

## Waar staat wat

- `src/data/site.ts`: alle herhaalde inhoud en de TODO-placeholders
- `OPLEVERING.md`: wat Joost nog moet invullen voor livegang
- `src/pages`: routes, een bestand per pagina
- `src/components`: Sectie, Knop, Kop, Voet, Todo en de inhoudsblokken
- `src/layouts`: layouts, `Basis.astro` verzorgt head, taal en canonical
- `src/styles/global.css`: Tailwind-import en alle kleur- en fonttokens
- `public`: bestanden die ongewijzigd worden geserveerd
- `wrangler.jsonc`: Workers-config in de wortel

## Regels

- Nederlands. Geen em dash.
- Geen verzonnen cijfers, testimonials of klantcases.
- Kleuren en fonts alleen via tokens uit `src/styles/global.css`. Gebruik de roltokens (`bg`, `vlak`, `rand`, `tekst`, `zacht`, `accent`), nooit de vaste merkkleuren: die wisselen niet mee met het thema.
- Licht is de standaard, donker via `data-thema="donker"` op `<html>`. De systeemvoorkeur schakelt niet automatisch om.
- In de lichte modus haalt oker `#D08A45` op linnen maar 2.2:1. Daar geldt `#9D5B20` met 4.1:1. Donker houdt oker.
- Oker is de enige accentkleur en blijft spaarzaam.
- Ontbrekende inhoud wordt een zichtbare TODO, nooit een verzonnen tekst.
- Secrets alleen via `npx wrangler secret put` of `.env.local`, nooit in de repo.
