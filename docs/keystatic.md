# Keystatic: zelf de tekst bijwerken

De tekst die verandert staat niet meer in TypeScript maar in formulieren.
Dit document legt uit waar wat staat, hoe je het lokaal gebruikt en wat
er nog moet gebeuren voordat het ook op de live site werkt.

## Wat er in het CMS zit

| Scherm | Bestanden | Wat het is |
| --- | --- | --- |
| Diensten | `src/inhoud/diensten/*.yaml` | De vijf dienstpagina's, inclusief de verhaalblokken |
| Opdrachten | `src/inhoud/opdrachten/*.yaml` | Wat op /werk staat |
| Veelgestelde vragen | `src/inhoud/vragen/*.yaml` | De uitklappers op /aanpak |
| Homepage | `src/inhoud/homepage.yaml` | De vinkjes in de hero en het blok In het kort |
| Bedrijfsgegevens | `src/inhoud/bedrijf.yaml` | Naam, plaats, KvK, mail, LinkedIn, de afspraakknop en het analyticstoken |

Wat er bewust **niet** in zit: de pijnpunten, de denkwijze, de niveaus op
/aanpak, de Pipedrive-functies, de processtappen en de bouwstenen van de
ring. Die hangen aan iconen, aan de geometrie van de tekeningen of aan de
opbouw van een pagina. Een formulier dat daaraan mag zitten is een
formulier waarmee je een tekening stil kunt breken. Ze staan in
`src/data/site.ts`.

Bij elk veld staat de huisregel als helptekst, zodat je hem leest
terwijl je typt en niet achteraf in `SCHRIJFWIJZER.md`.

## Hoe het aan elkaar hangt

```
Keystatic  ->  src/inhoud/*.yaml  ->  src/data/inhoud.ts  ->  src/data/site.ts  ->  de pagina's
```

`inhoud.ts` leest de yaml bij de build met `import.meta.glob`, niet met
de reader van Keystatic: die leest met `node:fs`, en het prerenderen
gebeurt in de Cloudflare-runtime, waar geen bestandssysteem is.

`site.ts` geeft alles ongewijzigd door. Daardoor hoeft geen enkele
pagina te weten of iets uit een formulier komt of uit code. Importeer
dus altijd uit `site.ts`.

De bezoeker krijgt gewone statische html. Er draait geen CMS achter de
site; alleen `/keystatic` en `/api/keystatic` draaien op de server.

## Lokaal werken

```
npm run cms
```

Daarna http://localhost:4321/keystatic. Wat je opslaat komt als gewone
wijziging in je werkmap te staan, en jij bepaalt wanneer je het commit.

Dit is een aparte opdracht naast `npm run dev`, en dat heeft een reden.
`npm run dev` draait de server in de Cloudflare-runtime, zodat je lokaal
hetzelfde ziet als live. Die runtime heeft geen bestandssysteem, dus
Keystatic kan er niet lokaal in schrijven. `npm run cms` laat de adapter
weg en draait op Node, waar dat wel kan. Voor de pagina's zelf maakt het
niets uit: `astro build` draait altijd met de adapter.

Draait er al een dev server, dan start de tweede niet. Eerst
`npx astro dev stop`.

## Live opslaan via GitHub

Op de live site schrijft Keystatic niet op schijf maar maakt hij een
commit in `jeau-st/website-2026`. Daarvoor is een GitHub App nodig. Dat
is nog niet gedaan; dit zijn de stappen.

1. Ga naar `/keystatic/setup` op de site en doorloop de wizard. GitHub
   maakt dan een App aan met de juiste rechten en stuurt je terug met de
   drie waarden.
2. Zet ze lokaal in `.env.local` (zie `.env.example`), zodat je het kunt
   proberen zonder uit te rollen.
3. Zet dezelfde waarden op de Worker:

   ```
   npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_ID
   npx wrangler secret put KEYSTATIC_GITHUB_CLIENT_SECRET
   npx wrangler secret put KEYSTATIC_SECRET
   ```

   `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` is geen secret maar wordt bij de
   build in de pagina gebakken. Die hoort dus bij de buildvariabelen van
   Cloudflare, niet bij de secrets.
4. Zet in Cloudflare een build op bij elke push naar `main`
   (Workers Builds). Zonder dat verandert er na een commit uit het CMS
   niets aan de site: de pagina's zijn statisch en worden bij de build
   gemaakt.

Wie kan opslaan, bepaalt GitHub: iedereen met schrijfrechten op de repo.
`/keystatic` zelf is openbaar bereikbaar, maar zonder zo'n account kom
je niet verder dan het inlogscherm.

## Als er iets stukgaat

- **"exports is not defined" op /keystatic of /api/keystatic.** Een
  afhankelijkheid van Keystatic is nog CommonJS en de Cloudflare-runtime
  kent dat niet. De `environments`-regels in `astro.config.mjs` laten
  Vite alles meebundelen. Die regels staan er expres niet bij
  `npm run cms`, want op Node gaat bundelen juist stuk op "module is not
  defined".
- **"not supported with storage: local".** Je draait `npm run dev` in
  plaats van `npm run cms`.
- **Een nieuw veld komt niet op de site.** Voeg het ook toe aan het type
  in `src/data/inhoud.ts`. Keystatic en de typen zijn twee aparte
  waarheden; `npm run typecheck` zegt het als ze uit elkaar lopen.
- **De volgorde klopt niet.** Keystatic sorteert een collectie op
  bestandsnaam. Daarom heeft elk bestand een veld `volgorde`, en daarop
  sorteert `inhoud.ts`. Laag staat bovenaan.
