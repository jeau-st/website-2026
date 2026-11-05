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
commit in `jeau-st/website-2026`. Dat staat ingericht:

- De GitHub App heet **jeau-st Keystatic**, staat onder de organisatie
  `jeau-st` en is geinstalleerd op de repo website-2026.
- De drie sleutels staan in `.env` voor lokaal en als secret op de
  Worker. Nakijken welke er staan: `npx wrangler secret list`. De
  waarden zelf zijn niet meer op te vragen; raak je ze kwijt, dan maak
  je in de App-instellingen een nieuw clientgeheim aan.
- De slug `jeau-st-keystatic` staat in `astro.config.mjs` en niet in
  `.env`. Hij is niet geheim, hij staat gewoon in de openbare URL
  https://github.com/apps/jeau-st-keystatic. Zo kan een build hem niet
  missen en hoeft hij nergens als variabele bij.

Wie kan opslaan, bepaalt GitHub: iedereen met schrijfrechten op de repo.
`/keystatic` is openbaar bereikbaar, maar zonder zo'n account kom je
niet verder dan het inlogscherm.

### Moet je het ooit opnieuw doen

De setup-wizard draait alleen op een dev server op Node. In de
Worker-build staat letterlijk "App setup only allowed in development",
dus op de live site loopt hij dood zodra GitHub je terugstuurt. Start
dan:

```
npm run cms -- --github
```

Dat is dezelfde Node-server, maar met GitHub-opslag in plaats van
opslaan op schijf. Ga naar `/keystatic/setup`, vul bij Deployed App URL
de live URL in en bij organisatie `jeau-st`, en laat GitHub de App
aanmaken. De sleutels komen in `.env`; zet ze daarna met
`npx wrangler secret put` ook op de Worker.

### Wat er daarna gebeurt

Niets meer, met de hand. Sinds 5 november 2026 staat Workers Builds aan:
Cloudflare bouwt en rolt uit bij elke push naar `main`, dus ook bij een
commit die Keystatic zelf maakt. Dat is nodig omdat de pagina's statisch
zijn en bij de build worden gemaakt; de commit alleen verandert de site
niet.

Zo staat het ingesteld:

| Veld | Waarde |
| --- | --- |
| Repository | `jeau-st/website-2026` |
| Productiebranch | `main` |
| Buildcommando | `npm run build` |
| Deploycommando | `npx wrangler deploy -c dist/server/wrangler.json` |
| Versiecommando | `npx wrangler versions upload -c dist/server/wrangler.json` |

De `-c` is geen franje. De build schrijft de Worker naar `dist/server`
met zijn eigen `wrangler.json` ernaast; zonder dat pad pakt wrangler de
config in de wortel, en daar staat alleen de naam en de
compatibiliteitsdatum in.

Omgevingsvariabelen zijn er niet voor nodig: de sleutels zijn
Worker-secrets en worden pas bij het draaien gelezen, en de slug staat
in `astro.config.mjs`.

De GitHub-app van Cloudflare staat op de organisatie `jeau-st` en is
beperkt tot deze ene repository. `npm run deploy` werkt nog gewoon, voor
als je niet op een build wilt wachten.

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
