# website-2026

Nieuwe website voor jeau.st, de eigen site van Jeau.st. Eigenaar: Jeau.st | Klant: n.v.t.

## Stack

- Astro 7, Tailwind v4 via `@tailwindcss/vite`, hosting Cloudflare Workers via `@astrojs/cloudflare`
- Fonts: Manrope voor de koppen, Inter voor de lopende tekst, IBM Plex Mono voor de labels, alle drie via de Astro fonts-API met de Fontsource-provider, zelf gehost, geen verzoek naar Google. Het woordmerk is geen font maar een pad in `src/components/Woordmerk.astro`
- Primaire actie: Pipedrive-afspraakplanner. Geen contactformulier
- Twee talen via de i18n van Astro: Nederlands in de wortel, Engels onder `/en/` met Engelse slugs. Geen automatische omschakeling op `Accept-Language`

Output is statisch. De adapter staat er zodat losse endpoints of server islands later kunnen, zonder herinrichting. De vorige site staat in `C:\Users\joost\dev\Website Jeau.st\jeau-st-site` (statische HTML, Tailwind v4, GitHub Pages) en dient als referentie voor content en huisstijl.

## Commando's

```
npm install
npm run dev
npm run cms
npm run build
npm run typecheck
npm run schrijfwijzer
npm run meta
npm run preview
npm run deploy
```

Astro houdt de dev server als los proces in leven. Draait er al een, dan start `npx astro dev` niet; gebruik `npx astro dev --force` of eerst `npx astro dev stop`. Een wijziging in `astro.config.mjs` vraagt altijd om een herstart.

De build schrijft de pagina's naar `dist/client` en de Worker naar `dist/server`, met `wrangler.json` ernaast. Daarom lopen preview en deploy via `-c dist/server/wrangler.json`; de wrangler config in de wortel bevat alleen naam, compatibiliteitsdatum en flags.

`npm run cms` opent de beheerschermen op `/keystatic`. Dat is een aparte dev server, want hij laat de Cloudflare-adapter weg en draait op Node: Keystatic schrijft lokaal met het bestandssysteem, en dat heeft de Cloudflare-runtime niet. Zie `docs/keystatic.md`.

## Waar staat wat

- `src/data/site.ts`: alle herhaalde inhoud, per taal. `site(taal)` geeft wat uit Keystatic komt plus de lijsten die in code blijven
- `src/data/inhoud.ts`: leest `src/inhoud/*.yaml` en `src/inhoud/en/*.yaml` bij de build. Importeer hier niet uit, maar uit `site.ts`
- `src/inhoud`: de yaml die Keystatic schrijft, met het Engels in `src/inhoud/en`. Niet met de hand bijwerken als het ook via `npm run cms` kan
- `src/data/taal.ts`: de talen, de taalcodes, `taalUitPad` en de routetabel met het pad per taal. Hier staat geen tekst
- `src/data/teksten.ts`: alle vaste tekst van de pagina's en de componenten, twee keer: `teksten.nl` en `teksten.en`. Het type dwingt af dat er niets ontbreekt
- `src/data/paden.ts`: welke pagina de tegenhanger is in de andere taal, voor de taalknop en de hreflang. Staat los van `taal.ts` omdat het de dienstenlijst nodig heeft
- `src/paginas`: de pagina's zelf, één component per pagina met `taal` als prop. `src/pages` heeft er alleen de routes van, twee per pagina
- `keystatic.config.ts`: welke schermen en velden er zijn, met de huisregel per veld als helptekst
- `docs/keystatic.md`: wat er in het CMS zit, hoe je het lokaal draait en wat er nog moet voor GitHub-modus
- `src/data/namen.ts`: de namen waaruit de kop op de homepage kiest, en de functie die er een uitzoekt
- `OPLEVERING.md`: wat Joost nog moet invullen voor livegang
- `SCHRIJFWIJZER.md`: stem, verboden woorden en werkwijze voor alle tekst op de site, met een eigen sectie voor het Engels
- `docs/engelse-versie.md`: waarom de Engelse versie zo in elkaar zit, welke keuzes zijn gemaakt en wat er nog open staat
- `docs/brand-persona.md`: wie er spreekt, de ideale klant, karakter en toon. Lees die voor je tekst schrijft
- `docs/dns-verhuizing.md`: het draaiboek om jeau.st van Cloud86 naar Cloudflare te halen, met de DNS-inventaris en de volgorde waarin de mail heel blijft
- `docs/layoutvoorstel.md`: waarom de opmaak is zoals hij is, met de gemeten contrastcijfers
- `docs/structuurvoorstel.md`: de paginastructuur, waarom elk blok staat waar het staat, en wat er nog bij komt
- `docs/palet.html`: het palet met stalen, gemeten aandelen en contrastcijfers. Staat buiten `src/pages` en `public`, dus de build neemt hem niet mee. Open hem vanaf schijf
- `src/pages/llms.txt.ts`: de inhoudsopgave voor taalmodellen, gegenereerd uit `site.ts`
- `src/data/cijfers.json`: de ijkpunten onder de cijferband op de homepage, elk een echte meting met de bron erbij. `src/data/cijfers.ts` rekent er de curve uit, `scripts/cijfers.mjs` is het gereedschap (`npm run cijfers`)
- `scripts/og.mjs`: maakt `public/og.png` uit het woordmerk en de huisstijlkleuren, draait met `npm run og`
- `scripts/schrijfwijzer.mjs`: controleert de zichtbare tekst tegen die wijzer, draait met `npm run schrijfwijzer`
- `scripts/meta.mjs`: meet de titel en de meta description van elke gebouwde pagina. Draait met `npm run meta` en staat als integratie aan het eind van de build, dus een te lange titel laat de build vallen
- `src/pages`: routes, een bestand per pagina per taal, elk niet meer dan een component uit `src/paginas` met de juiste taal
- `src/components`: Sectie, Kaart, Knop, Doorlink, Bouwstenen, Kop, Voet, Todo, Inhoudsopgave, MetOpgave en de inhoudsblokken. `Sectie` met `vol` laat de breedte over aan het raster eromheen, wat de pagina's met een inhoudsopgave doen
- `src/layouts`: layouts, `Basis.astro` verzorgt head, taal en canonical
- `src/styles/global.css`: Tailwind-import en alle kleur- en fonttokens
- `public`: bestanden die ongewijzigd worden geserveerd
- `wrangler.jsonc`: Workers-config in de wortel

## Regels

- Nederlands, je-vorm, geen em dash. Voor alle tekst geldt `SCHRIJFWIJZER.md`. Draai `npm run schrijfwijzer` na elke tekstwijziging: fout betekent herschrijven, let op betekent zelf beoordelen. Het script kiest de woordenlijst op het pad: Engels voor `src/inhoud/en`, beide voor `src/data/teksten.ts`, Nederlands voor de rest.
- De Engelse tekst is Brits Engels en geen vertaling: dezelfde zin opnieuw gezegd. Amerikaanse spelling staat in de harde lijst van de schrijfwijzer, dus `-ize` laat het script vallen.
- Nieuwe tekst zet je in `teksten.ts` als hij in de opmaak staat, en in Keystatic als hij verandert. In beide gevallen in beide talen: `PerTaal` is een `Record`, dus een ontbrekende taal is een typefout. Lijsten die aan een tekening hangen gaan door `gelijkLang`, want een ring met vier onderdelen in de ene taal en vijf in de andere is een kapotte tekening.
- Een interne link gaat via `routes` uit `taal.ts` of via `dienstPad`, nooit als letterlijk pad: anders staat de Engelse pagina ineens naar het Nederlandse `/diensten` te wijzen. Ankers (`#volgorde`, `#functies`) blijven Nederlands in beide talen, zodat een gedeelde link in allebei werkt.
- Een Engelse dienst wijst met het veld `paar` naar de Nederlandse slug. Daarop staat de taalknop en daaruit komt de hreflang. Wijst `paar` naar een slug die niet bestaat, dan valt de build.
- Geen verzonnen cijfers, testimonials of klantcases.
- Koppen krijgen hun kleur uit `--c-kop`, niet uit een utility in de opmaak: een donker blauwgrijs in licht, een licht blauwgrijs in donker. Beide staan los van de tekstkleur.
- Koppen staan in Manrope, de lopende tekst in Inter, kleine labels en de tekeningen in IBM Plex Mono. Manrope heeft platte, licht vierkante rondingen die aansluiten op het pixelwoordmerk, dus de koppen doen mee met het merk; over een alinea van tien regels is Inter rustiger, dus die draagt de tekst. Manrope laadt alleen gewicht 600, want de koppen hebben geen ander. Tracking per kopmaat: h1 -0.03em, h2 -0.02em, h3 -0.01em. Het kleine mono-labeltje gaat via de klasse `label`, die 12 px en positieve letterspatiering zet. Het woordmerk is een svg: als pixelfont werd het vlekkerig door de rasterizer, als pad schaalt het schoon. Kop en Voet zetten alleen de hoogte.
- Kleuren en fonts alleen via tokens uit `src/styles/global.css`. Gebruik de roltokens (`bg`, `kaart`, `kaart-hover`, `rand`, `rand-zacht`, `tekst`, `zacht`, `kop`, `accent`), nooit de vaste merkkleuren: die wisselen niet mee met het thema.
- Een alinea die je leest staat in `tekst`, ook in een kaart. `zacht` is voor labels, bijschriften en losse woorden. Reden: `zacht` is afgesteld op de ondergrens, 5,0:1 op de achtergrond en 4,5:1 op een kaart. Voor drie woorden is dat genoeg, voor vier regels niet, en met de achtergrond is het niet te repareren: tegen puur zwart haalt `zacht` in donker niet meer dan 5,44:1. Dat plafond ligt te laag, dus de kleur van de tekst is de enige knop die werkt.
- `kaart-hover` is één stap lichter dan de kaart in donker en één stap donkerder in licht. Alleen voor een kaart die je kunt indrukken, op het moment dat je hem aanwijst. Een kaart die nergens heen gaat, krijgt hem niet.
- `rand-zacht` is alleen voor scheidslijnen binnen een raster, waar de volle rand te veel lawaai geeft. Nooit als buitenrand: daar moet de rand het contrast halen. Gemeten tegen de kaart: 1,22:1 in donker, 1,17:1 in licht.
- Rondingen via de schaal, nooit een losse waarde: `rounded-klein` (6 px) voor knoppen en labels, `rounded-kaart` (10 px) voor het standaardvlak, `rounded-groot` (16 px) voor de dragende blokken en de tekeningen. Geen volledig ronde pillen: het woordmerk is een pixelvorm en gaat daarmee vechten. De enige uitzondering is de themaschakelaar in de kop, die volledig rond is met een rond blokje erin: een schakelaar is een vorm die iedereen van zijn telefoon kent, en die herkenning weegt zwaarder dan de ronding.
- Geen schaduwen op kaarten. De rand doet het werk, en op `#090e11` is een zwarte schaduw toch onzichtbaar. De enige uitzondering is een zwevend paneel zoals de uitklapper in de kop, dat los van de pagina moet liggen.
- Donker is de standaard, licht via `data-thema="licht"` op `<html>`. De systeemvoorkeur schakelt niet automatisch om.
- Het verticale ritme kent twee maten en niet meer: 112 px tussen twee onderwerpen, oplopend naar 128 vanaf `sm`, en de helft daarvan, 56 en 64, voor een blok dat bij het vorige hoort (`aansluitend`). Onder de kop van een sectie staat overal `mt-10`.
- Elke hero begint met `px-4 pb-0 pt-14 sm:px-6 sm:pt-16`, dus op de kleine maat. De balk bovenaan hoort bij de pagina eronder, dus de hero sluit erop aan zoals een blok op het blok ervoor. Binnen de hero: de h1, de lopende tekst op `mt-6` en de primaire actie op `mt-10`. Staat er een rijtje tussen, zoals de kernpunten op de homepage, dan krijgt dat `mt-8`, zodat de afstanden oplopen naar de knop toe.
- Een `Sectie` heeft alleen bovenruimte. Het gat tussen twee blokken is van de sectie die begint, de onderruimte van de vorige is nul, en de ruimte onder de laatste sectie komt van `main` in `Basis.astro`. Een hero zet daarom `pb-0`.
- De lucht tussen twee blokken hoort bij één van de twee. Een `Sectie` brengt zijn eigen ruimte mee, en een blok dat ertussen staat, zoals de cijferband, bezit de ruimte aan allebei zijn kanten terwijl de buren die van hen op nul zetten. Dragen ze allebei iets bij, dan is het gat de som van twee getallen waar niemand naar gekeken heeft: zo stond er 104 px boven de band en 48 eronder.
- Meet na elke wijziging aan de opmaak van een pagina de afstand boven en onder een band of een raster, op 375, 700 en 1100 px. Die hoort gelijk te zijn. Het oog ziet een scheve verhouding meteen, maar in de klassenlijst is hij onzichtbaar, want de twee helften staan in verschillende bestanden.
- Haal je een kop uit een sectie, loop dan de ruimte eromheen na. `aansluitend` en de marges onder een kop zijn afgestemd op een kop die er daarna niet meer staat.
- Let op de volgorde van Tailwind bij ruimte per breekpunt: `sm:py-6` wint van een kale `pt-0`, want de variant komt later in de css. Wil je de bovenruimte van een cel weghalen, zet er dan ook `sm:pt-0` bij.
- Geen afwisselende banen. De hele pagina staat op een achtergrond, en wat bij elkaar hoort staat in een `Kaart`. Een kaart is maar 1,1:1 lichter dan de achtergrond: de rand doet het werk.
- De vijf diensten staan op de homepage als vijf losse kaarten, elk helemaal klikbaar, met `kaart-hover` eronder. Dat was één band van vijf cellen, en dan lees je het als één ding met vijf regels in plaats van vijf plekken waar je heen kunt.
- Een dienstpagina opent met twee rijtjes naast elkaar: wat de dienst is (`punten`) en wat hij oplevert (`oplevert`). Zonder vlak eromheen, want het is een opsomming die je leest.
- Een kaart is er voor iets dat je aanwijst of indrukt, niet voor een stuk tekst dat je leest. De niveaus op `/aanpak` zijn een kaart, want je moet jezelf in één ervan herkennen; de vragen daaronder ook, want een uitklapper moet een klikvlak hebben. Een rijtje stellingen, stappen of functies is dat niet: dat wordt een haarlijnraster. Een lege `Kaart` is altijd een fout.
- `Kaart` heeft drie gewichten: `stil` (alleen ruimte), `kaart` (het standaardvlak) en `groot` (het dragende blok op een pagina). Niet alles op hetzelfde gewicht zetten: als elke kaart even zwaar is, krijgt het oog nergens een rangorde.
- Geen opsommingen met een pijltje in een omlijnde kaart. Dat is precies hoe een chatantwoord eruitziet. Een rijtje korte stellingen wordt een haarlijnraster: een wikkel met `bg-rand-zacht`, cellen met `bg-kaart` en `gap-px` ertussen, zodat de lijnen uit de achtergrond komen en er nooit een dubbele rand staat.
- Een link naar een andere pagina van de site gaat via `Doorlink`: de tekst met een Lucide-pijltje erachter dat bij hover drie pixels opschuift. Alleen voor pagina's, niet voor contactgegevens of links naar buiten: daar belooft een pijltje iets wat er niet is.
- Een sectie op een lange pagina krijgt een genummerd mono-labeltje boven de kop, links en niet gecentreerd, en `aria-hidden`. Het nummer komt uit dezelfde lijst als de inhoudsopgave, zodat de twee niet uit elkaar kunnen lopen.
- De tekeningen (`Schema`, `Cyclus`) zijn echte schema's in svg, met iconen, en staan zonder kader. Dit is wat de site aan beeld heeft, dus ze mogen de ruimte van een afbeelding krijgen: `Schema` vult de rechterkolom van de hero, 45% breed. `Cyclus` heeft twee opmaken, een liggende vanaf `sm` en een staande daaronder, want drie stations passen nog naast elkaar op een telefoon. `Schema` niet: twaalf onderdelen met een label ernaast worden op 360 px een rondje met afkortingen eromheen, dus daar staat onder `sm` niets. De kop van de hero mag daarvoor omslaan bij een lange naam.
- De onderdelen op de ring in de hero en de bouwstenen bij een opdracht komen uit dezelfde lijst `bouwstenen` in `src/data/site.ts`, en staan via `Bouwstenen.astro` als rijtje iconen onder de titel van een opdracht. Dat is de brug tussen de homepage en /werk: je herkent aan het icoon welk stuk van de ring is aangepakt. Een opdracht noemt alleen wat in zijn eigen tekst ook staat.
- Een opdracht op /werk staat puntsgewijs, niet in alinea's: het is een opsomming van wat er stond, wat er is gedaan en wat het werd.
- Iconen komen uit Lucide. De gebruikte bestanden staan als los svg in `src/icons`, gekopieerd uit `lucide-static` (ISC), zodat in de repo te zien is welke de site gebruikt en een update van het pakket geen tekening stil verandert. Gebruik ze via `Icoon.astro`: binnen een svg rechtstreeks, in html met een `<svg viewBox="0 0 24 24">` eromheen.
- Het palet is gemeten uit de museumscan van Van Gogh, Zelfportret met grijze vilthoed (s0016V1962), met k-means in Lab en een telling per kleurfamilie. Het doek is voor 49,6% blauw en voor 3,3% groen, dus het palet is blauw. De twee grootste clusters zijn staal `#41515C` en lei `#56646D`, samen 43% van het doek. Warm is oker `#816447` en vlam `#8D531F`, de oranje stippen. Alle rollen erven tint 204 (blauw) of tint 28 (oranje) en verschillen alleen in lichtheid.
- Het accent verschilt per thema, want één oranje haalt niet in allebei de contrastnorm voor tekst op de knop. Donker gebruikt `#C76A19`, licht `#A75915`. Op een kaart, de krapste ondergrond, haalt allebei 4,5:1.
- Het accent is de enige warme kleur in de interface en staat alleen op de primaire knop, de focusring, de naamknop in de kop op de homepage, de vinkjes bij de kernpunten in de hero en het vierkantje rechtsonder in de punt van het woordmerk, dat ook de favicon is. Niet op links, lijsten, pijltjes, de uitklapper in de kop of de inhoudsopgave.
- Het woordmerk staat helemaal in `zacht`, met het blokje rechtsonder in de punt in het accent. Dat is de favicon, dus de tabbalk en de pagina tonen hetzelfde teken. Het heeft in `merk` gestaan, zwart in licht en wit in donker, en dan zat het hardste contrast van de pagina in het ene element dat nergens heen wijst; dat token bestaat niet meer. Op 24 en 28 px is het accent een kleurverschil en geen tekening: het is bedoeld voor het merk op formaat.
- De punt in het woordmerk is vier vierkantjes, 2 bij 2, en daarmee zelf een vierkant. In het pixelfont waren het er twee naast elkaar en dat las als een streepje. `public/favicon.svg` is dat blok los, met het vierkantje rechtsonder in het accent en de andere drie in `zacht`. Twee vaste kleuren en geen `prefers-color-scheme`: een favicon staat op de tabbalk, niet op de site, dus het thema van de site zegt daar niets over. Beide halen op elke gangbare tabbalk meer dan 3,4:1.
- Alles wat je kunt indrukken krijgt zichtbare feedback bij het aanraken, via de klasse `drukbaar` of een `active:`-variant. Op een telefoon bestaat hover niet, dus zonder dat gebeurt er tussen tikken en navigeren niets.
- Beweging alleen met transform en opacity, 150 ms, en een menu komt uit zijn eigen knop vandaan via `transform-origin`. Geen bounce zonder gebaar.
- De kop is doorschijnend met een blur. Kan de browser dat niet, of staat `prefers-reduced-transparency` aan, dan wordt hij dekkend. Allebei staan in `Kop.astro`.
- Een titel is maximaal 60 tekens en een meta description maximaal 155, inclusief het achtervoegsel ` | Jeau.st`. Daarboven kapt Google af en staat er een halve zin in het zoekresultaat. `npm run meta` meet het op de gebouwde html, want de titel van een dienstpagina is `kop` uit de yaml plus dat achtervoegsel, en in de bron meet je dat niet mee. Twee pagina's met dezelfde titel of beschrijving zijn ook een fout: dan kiest Google er zelf een.
- De cijferband op de homepage staat buiten Keystatic, in `src/data/cijfers.json`. Twee getallen staan stil, twee lopen op langs een exponentiele curve. Dat is een schatting en geen meting, dus er zitten drie remmen op: elk ijkpunt is een echte telling met de bron erbij, de groei wordt uit de metingen gefit zodra het er twee zijn (daarvoor geldt `groeiPerJaar`, bewust laag), en boven `houdbaarDagen` valt `npm run cijfers -- --check` om. Alles rondt naar beneden af. Meet opnieuw met de n8n-koppelingen en zet het erbij via `npm run cijfers -- --meting`, nooit met de hand in de json.
- "Uitvoeringen deze maand" is niet afgerond en wordt bij het openen van de pagina opnieuw gerekend, met dezelfde formule als de server: een statische pagina kan maanden oud zijn. Zonder javascript staat er het getal van de build. Op de eerste van de maand begint hij bijna op nul; `venster` in de json zet hem desgewenst op `jaar` of `sinds`, en het label gaat mee.
- Ontbrekende inhoud wordt een zichtbare TODO, nooit een verzonnen tekst.
- Wat in Keystatic zit is de tekst die verandert: diensten, opdrachten, vragen, de homepageteksten en de bedrijfsgegevens. Wat aan iconen, geometrie of de opbouw van een pagina hangt blijft in `site.ts`. Een nieuw veld voeg je op twee plekken toe: in `keystatic.config.ts` en in het type in `inhoud.ts`. `npm run typecheck` zegt het als ze uit elkaar lopen.
- Secrets alleen via `npx wrangler secret put` of `.env.local`, nooit in de repo.
