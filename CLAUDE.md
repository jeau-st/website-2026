# website-2026

Nieuwe website voor jeau.st, de eigen site van Jeau.st. Eigenaar: Jeau.st | Klant: n.v.t.

## Stack

- Astro 7, Tailwind v4 via `@tailwindcss/vite`, hosting Cloudflare Workers via `@astrojs/cloudflare`
- Fonts: Manrope voor de koppen, Inter voor de lopende tekst, IBM Plex Mono voor de labels, alle drie via de Astro fonts-API met de Fontsource-provider, zelf gehost, geen verzoek naar Google. Het woordmerk is geen font maar een pad in `src/components/Woordmerk.astro`
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
- `docs/dns-verhuizing.md`: het draaiboek om jeau.st van Cloud86 naar Cloudflare te halen, met de DNS-inventaris en de volgorde waarin de mail heel blijft
- `docs/layoutvoorstel.md`: waarom de opmaak is zoals hij is, met de gemeten contrastcijfers
- `docs/structuurvoorstel.md`: de paginastructuur, waarom elk blok staat waar het staat, en wat er nog bij komt
- `docs/palet.html`: het palet met stalen, gemeten aandelen en contrastcijfers. Staat buiten `src/pages` en `public`, dus de build neemt hem niet mee. Open hem vanaf schijf
- `src/pages/llms.txt.ts`: de inhoudsopgave voor taalmodellen, gegenereerd uit `site.ts`
- `scripts/og.mjs`: maakt `public/og.png` uit het woordmerk en de huisstijlkleuren, draait met `npm run og`
- `scripts/schrijfwijzer.mjs`: controleert de zichtbare tekst tegen die wijzer, draait met `npm run schrijfwijzer`
- `src/pages`: routes, een bestand per pagina
- `src/components`: Sectie, Kaart, Knop, Doorlink, Bouwstenen, Kop, Voet, Todo, Inhoudsopgave, MetOpgave en de inhoudsblokken. `Sectie` met `vol` laat de breedte over aan het raster eromheen, wat de pagina's met een inhoudsopgave doen
- `src/layouts`: layouts, `Basis.astro` verzorgt head, taal en canonical
- `src/styles/global.css`: Tailwind-import en alle kleur- en fonttokens
- `public`: bestanden die ongewijzigd worden geserveerd
- `wrangler.jsonc`: Workers-config in de wortel

## Regels

- Nederlands, je-vorm, geen em dash. Voor alle tekst geldt `SCHRIJFWIJZER.md`. Draai `npm run schrijfwijzer` na elke tekstwijziging: fout betekent herschrijven, let op betekent zelf beoordelen.
- Geen verzonnen cijfers, testimonials of klantcases.
- Koppen krijgen hun kleur uit `--c-kop`, niet uit een utility in de opmaak: een donker blauwgrijs in licht, een licht blauwgrijs in donker. Beide staan los van de tekstkleur.
- Koppen staan in Manrope, de lopende tekst in Inter, kleine labels en de tekeningen in IBM Plex Mono. Manrope heeft platte, licht vierkante rondingen die aansluiten op het pixelwoordmerk, dus de koppen doen mee met het merk; over een alinea van tien regels is Inter rustiger, dus die draagt de tekst. Manrope laadt alleen gewicht 600, want de koppen hebben geen ander. Tracking per kopmaat: h1 -0.03em, h2 -0.02em, h3 -0.01em. Het kleine mono-labeltje gaat via de klasse `label`, die 12 px en positieve letterspatiering zet. Het woordmerk is een svg: als pixelfont werd het vlekkerig door de rasterizer, als pad schaalt het schoon. Kop en Voet zetten alleen de hoogte.
- Kleuren en fonts alleen via tokens uit `src/styles/global.css`. Gebruik de roltokens (`bg`, `kaart`, `rand`, `rand-zacht`, `tekst`, `zacht`, `kop`, `accent`), nooit de vaste merkkleuren: die wisselen niet mee met het thema.
- `rand-zacht` is alleen voor scheidslijnen binnen een raster, waar de volle rand te veel lawaai geeft. Nooit als buitenrand: daar moet de rand het contrast halen. Gemeten tegen de kaart: 1,22:1 in donker, 1,17:1 in licht.
- Rondingen via de schaal, nooit een losse waarde: `rounded-klein` (6 px) voor knoppen en labels, `rounded-kaart` (10 px) voor het standaardvlak, `rounded-groot` (16 px) voor de dragende blokken en de tekeningen. Geen volledig ronde pillen: het woordmerk is een pixelvorm en gaat daarmee vechten.
- Geen schaduwen op kaarten. De rand doet het werk, en op `#090e11` is een zwarte schaduw toch onzichtbaar. De enige uitzondering is een zwevend paneel zoals de uitklapper in de kop, dat los van de pagina moet liggen.
- Donker is de standaard, licht via `data-thema="licht"` op `<html>`. De systeemvoorkeur schakelt niet automatisch om.
- Geen afwisselende banen. De hele pagina staat op een achtergrond, en wat bij elkaar hoort staat in een `Kaart`. Een kaart is maar 1,1:1 lichter dan de achtergrond: de rand doet het werk.
- Een kaart is er voor iets dat je aanwijst of indrukt, niet voor een stuk tekst dat je leest. De niveaus op `/aanpak` zijn een kaart, want je moet jezelf in één ervan herkennen; de vragen daaronder ook, want een uitklapper moet een klikvlak hebben. Een rijtje stellingen, stappen of functies is dat niet: dat wordt een haarlijnraster. Een lege `Kaart` is altijd een fout.
- `Kaart` heeft drie gewichten: `stil` (alleen ruimte), `kaart` (het standaardvlak) en `groot` (het dragende blok op een pagina). Niet alles op hetzelfde gewicht zetten: als elke kaart even zwaar is, krijgt het oog nergens een rangorde.
- Geen opsommingen met een pijltje in een omlijnde kaart. Dat is precies hoe een chatantwoord eruitziet. Een rijtje korte stellingen wordt een haarlijnraster: een wikkel met `bg-rand-zacht`, cellen met `bg-kaart` en `gap-px` ertussen, zodat de lijnen uit de achtergrond komen en er nooit een dubbele rand staat.
- Een link naar een andere pagina van de site gaat via `Doorlink`: de tekst met een Lucide-pijltje erachter dat bij hover drie pixels opschuift. Alleen voor pagina's, niet voor contactgegevens of links naar buiten: daar belooft een pijltje iets wat er niet is.
- Een sectie op een lange pagina krijgt een genummerd mono-labeltje boven de kop, links en niet gecentreerd, en `aria-hidden`. Het nummer komt uit dezelfde lijst als de inhoudsopgave, zodat de twee niet uit elkaar kunnen lopen.
- De tekeningen (`Schema`, `Cyclus`) zijn echte schema's in svg, met iconen, en staan zonder kader. Dit is wat de site aan beeld heeft, dus ze mogen de ruimte van een afbeelding krijgen: `Schema` vult de rechterhelft van de hero. Elke tekening heeft twee opmaken, een liggende vanaf `sm` en een staande daaronder, want een schema schaalt niet mee naar een telefoon.
- De onderdelen op de ring in de hero en de bouwstenen bij een opdracht komen uit dezelfde lijst `bouwstenen` in `src/data/site.ts`, en staan via `Bouwstenen.astro` als rijtje iconen onder de titel van een opdracht. Dat is de brug tussen de homepage en /werk: je herkent aan het icoon welk stuk van de ring is aangepakt. Een opdracht noemt alleen wat in zijn eigen tekst ook staat.
- Een opdracht op /werk staat puntsgewijs, niet in alinea's: het is een opsomming van wat er stond, wat er is gedaan en wat het werd.
- Iconen komen uit Lucide. De gebruikte bestanden staan als los svg in `src/icons`, gekopieerd uit `lucide-static` (ISC), zodat in de repo te zien is welke de site gebruikt en een update van het pakket geen tekening stil verandert. Gebruik ze via `Icoon.astro`: binnen een svg rechtstreeks, in html met een `<svg viewBox="0 0 24 24">` eromheen.
- Het palet is gemeten uit de museumscan van Van Gogh, Zelfportret met grijze vilthoed (s0016V1962), met k-means in Lab en een telling per kleurfamilie. Het doek is voor 49,6% blauw en voor 3,3% groen, dus het palet is blauw. De twee grootste clusters zijn staal `#41515C` en lei `#56646D`, samen 43% van het doek. Warm is oker `#816447` en vlam `#8D531F`, de oranje stippen. Alle rollen erven tint 204 (blauw) of tint 28 (oranje) en verschillen alleen in lichtheid.
- Het accent verschilt per thema, want één oranje haalt niet in allebei de contrastnorm voor tekst op de knop. Donker gebruikt `#C76A19`, licht `#A75915`. Op een kaart, de krapste ondergrond, haalt allebei 4,5:1.
- Het accent is de enige warme kleur in de interface en staat alleen op de primaire knop, de focusring, de naamknop in de kop op de homepage en de vinkjes bij de kernpunten in de hero. Niet op links, lijsten, pijltjes, de uitklapper in de kop of de inhoudsopgave.
- Het woordmerk draagt geen accent maar `merk`: zwart in licht, wit in donker, dezelfde waarde als de tekst.
- Alles wat je kunt indrukken krijgt zichtbare feedback bij het aanraken, via de klasse `drukbaar` of een `active:`-variant. Op een telefoon bestaat hover niet, dus zonder dat gebeurt er tussen tikken en navigeren niets.
- Beweging alleen met transform en opacity, 150 ms, en een menu komt uit zijn eigen knop vandaan via `transform-origin`. Geen bounce zonder gebaar.
- De kop is doorschijnend met een blur. Kan de browser dat niet, of staat `prefers-reduced-transparency` aan, dan wordt hij dekkend. Allebei staan in `Kop.astro`.
- Ontbrekende inhoud wordt een zichtbare TODO, nooit een verzonnen tekst.
- Secrets alleen via `npx wrangler secret put` of `.env.local`, nooit in de repo.
