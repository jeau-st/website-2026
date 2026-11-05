# De Engelse versie

Datum: 5 november 2026. Dit was een voorstel en is nu de beschrijving van wat
er staat. De keuzes hieronder zijn de keuzes die gemaakt zijn, met de
afwijkingen erbij genoemd.

Stand van zaken: gebouwd, alle vijf de fasen. De site staat in twee talen,
Nederlands in de wortel en Engels onder `/en/` met Engelse slugs. Alle negen
pagina's bestaan in beide talen, inclusief de vijf dienstpagina's,
`llms.txt` en de sitemap. `npm run typecheck` is schoon, `npm run build`
groen met 26 pagina's, `npm run meta` past op alle 26, en
`npm run schrijfwijzer` geeft 0 fout.

Wat er nog niet is: een Engelse afspraakplanner. Zolang `afspraakUrlEn` leeg
is, wijst de knop op `/en/` naar de Nederlandse Bookings-pagina. Dat staat in
`OPLEVERING.md`. En de Engelse tekst is nog niet door iemand gelezen die
Engels spreekt.

Twee dingen zijn anders gelopen dan hieronder voorgesteld:

- **De taalkeuze blijft niet in `localStorage` staan.** Zie keuze 3. Een
  opgeslagen keuze doet alleen iets als een later bezoek ergens anders
  uitkomt dan waar je op klikte, en dat is precies het stilletjes verruilen
  dat dezelfde keuze verbiedt. Op een statische pagina zou je bovendien eerst
  de verkeerde taal zien en dan de omslag.
- **De dubbelcheck in `npm run meta` bleef over beide talen heen.** Zie keuze
  5. Twee pagina's met dezelfde titel zijn een fout, ook als de ene Engels is:
  `Contact | Jeau.st` kan maar één keer bestaan.
- **De sitemap zet de alternatieve taal er niet bij.** De `i18n`-instelling
  van `@astrojs/sitemap` koppelt twee talen door het taaldeel in het pad te
  verruilen, en dat kan niet met vertaalde slugs: `/aanpak` hoort bij
  `/en/approach`. Met die instelling erin stonden er alternates bij de twee
  pagina's waar het pad toevallig klopt en bij de acht andere niet. Nu staan
  ze in de head van elke pagina, compleet en met `x-default`.

## Waar het om gaat

De site is nu eentalig, en dat zit niet in één bestand. De tekst staat op drie
plekken, en alle drie moeten mee:

| Waar | Wat erin staat | Hoeveel |
| --- | --- | --- |
| `src/inhoud/*.yaml` | diensten, opdrachten, vragen, homepageteksten, bedrijfsgegevens | 19 bestanden |
| `src/data/site.ts` | denkwijze, niveaus, processtappen, Pipedrive-functies, AI-stappen, pijnpunten, bouwstenen, het ritme na de oplevering | 8 lijsten |
| `src/pages` en `src/components` | de koppen boven de secties, de labels, de losse regels tussen de blokken | ongeveer 32 koppen plus de tekst eromheen |

Daarbij hangt aan de taal ook de techniek: `<html lang>`, de canonical, de
hreflang-verwijzingen, de sitemap, `llms.txt`, de schema.org-blokken en de
schrijfwijzercontrole. Die controle is nu Nederlands en valt over Engelse tekst
heen, want "essential" en "crucial" staan op de verboden lijst als stam.

Het zwaarste stuk is niet het vertalen. Het is dat `inhoud.ts` en `site.ts` nu
losse constanten exporteren die geen taal kennen. Daar moet een taal bij, en
dat raakt elke pagina.

## De keuzes

### 1. Voor wie is de Engelse versie

Dit bepaalt de rest, dus hij staat eerst.

**Voorstel: voor bedrijven die in Nederland zitten maar in het Engels werken,
en voor doorverwijzingen uit het Pipedrive-netwerk buiten Nederland.** Dus geen
andere markt, wel een andere taal. Dat betekent dat de inhoud hetzelfde blijft:
dezelfde diensten, dezelfde werkwijze, hetzelfde adres in 's-Hertogenbosch, en
dezelfde Nederlandse voornamen in de kop op de homepage. Die namen komen uit de
Nederlandse beroepsbevolking, en als de klant daar zit, hoort de kop daar ook
te zitten.

Zou de Engelse versie wel een andere markt moeten aanspreken, dan is het geen
vertaling maar een tweede site: ander bewijs, andere voorbeelden, andere
diensten. Dat is een veel groter project en het staat niet in dit voorstel.

### 2. Welke adressen

**Voorstel: Nederlands blijft op de wortel, Engels komt onder `/en/`.**

```
/                         /en/
/diensten                 /en/services
/diensten/crm-inrichting  /en/services/crm-setup
/aanpak                   /en/approach
/werk                     /en/work
/over                     /en/about
/contact                  /en/contact
/privacy                  /en/privacy
/st                       /en/st
```

Astro heeft dit ingebouwd: `i18n` in `astro.config.mjs` met `nl` als
standaardtaal en `prefixDefaultLocale: false`. Daarmee verandert er geen enkel
bestaand adres, en dat is de reden voor deze vorm: de Nederlandse pagina's
staan in de sitemap, in `llms.txt` en straks in de index van Google. Een
verhuizing naar `/nl/` levert niets op en kost je elke bestaande link.

Een subdomein `en.jeau.st` kan ook, maar dan heb je twee zones om te beheren,
twee keer een certificaat en een splitsing van wat een zoekmachine als één site
ziet. Voor één extra taal is dat te veel apparaat.

De paden zijn Engels, niet Nederlands met een voorvoegsel. Een slug is tekst
die een bezoeker leest en waar een zoekmachine op zoekt, dus
`/en/services/crm-setup` en niet `/en/diensten/crm-inrichting`. Dat vraagt wel
een tweede slugveld, zie keuze 4.

### 3. Hoe je wisselt van taal

**Voorstel: een knop in de kop naast de themaknop, met NL en EN, en geen
automatische omschakeling.**

De knop wijst naar dezelfde pagina in de andere taal. Bestaat die niet, dan
wijst hij naar de homepage van die taal en zegt hij dat ook. Nooit stilletjes
ergens anders uitkomen.

Geen omleiding op `Accept-Language`. Daar zijn drie redenen voor. De uitvoer is
statisch, dus zo'n omleiding moet op de Worker en dat is precies het stuk
techniek dat er nu niet is. Een Nederlander met een Engelse telefoon krijgt de
verkeerde taal. En een zoekmachine die alle pagina's wil zien, moet ze kunnen
ophalen zonder dat er iets tussen zit. Dit is dezelfde regel als bij het thema:
de systeemvoorkeur schakelt niet automatisch om.

Voorgesteld was om de keuze in `localStorage` te bewaren, net als het thema.
Dat is er niet gekomen, en de reden staat bovenaan: een bewaarde keuze doet
alleen iets als een volgend bezoek je ergens anders brengt dan waar je op
klikte, en dat verbiedt deze keuze zelf.

De knop is een link en geen knop, dus hij werkt zonder javascript en een
zoekmachine ziet de andere taal. Hij staat in `src/components/Taalknop.astro`,
en welke pagina de tegenhanger is komt uit `src/data/paden.ts`.

### 4. Waar de Engelse tekst staat

**Voorstel: drie sporen, elk op de plek waar het soort tekst nu al staat.**

**De yaml krijgt een tweede boom.** `src/inhoud/en/diensten/crm-setup.yaml`
naast `src/inhoud/diensten/crm-inrichting.yaml`. Keystatic krijgt een tweede
set collecties met "(Engels)" achter het label, zodat je in het CMS twee
schermen hebt in plaats van een formulier met alles dubbel erin. Het koppelen
van de twee gebeurt met een veld `paar` in het Engelse bestand dat de
Nederlandse slug noemt. Dat is nodig voor de hreflang-verwijzing en voor de
taalknop, en het moet een veld zijn en geen bestandsnaam, want de slugs
verschillen juist.

Het alternatief is per veld twee talen in één bestand (`titel: {nl, en}`). Dat
is in het CMS een formulier van dubbele lengte waarin je bij elk veld langs de
andere taal moet, en in code raakt het elke bestaande lezer van die velden. Dus
niet.

**De lijsten in `site.ts` worden per taal.** `denkwijze`, `niveaus`,
`processtappen`, `pipedriveFuncties`, `aiStappen`, `nabouw`, `pijnpunten` en de
labels bij `bouwstenen` worden `Record<Taal, ...>`. Ze blijven in code, want ze
hangen aan iconen en aan de geometrie van de tekeningen, en de volgorde op de
ring moet in beide talen gelijk zijn. Een lijst die in twee talen een andere
lengte heeft, is een fout die TypeScript kan vinden, dus het type dwingt af dat
ze even lang zijn.

**De tekst in de templates gaat naar `src/data/teksten.ts`.** Eén object per
taal met geneste sleutels, getypeerd als `Record<Taal, Teksten>`. Dan faalt
`npm run typecheck` zodra een sleutel in één taal mist. Dit is het grootste
stuk handwerk: het zijn de koppen boven de secties, de labels in de kop en de
voet, de kruimels, de inhoudsopgave en de losse regels tussen de blokken.

### 5. Wat de controlescripts moeten doen

`npm run meta` leest de gebouwde html en vindt `/en/` dus vanzelf. Twee dingen
moeten erbij: de titel van een Engelse pagina mag dezelfde lengtegrens houden,
maar de dubbelcontrole moet per taal kijken. Nu is twee keer dezelfde titel een
fout, en dat hoort zo te blijven binnen een taal.

`npm run schrijfwijzer` moet per taal een eigen patronenlijst krijgen, gekozen
op het pad van het bestand. De harde regels blijven: geen em dash, geen
uitroepteken, geen "niet alleen X maar ook Y". De woordenlijst wordt Engels:
seamless, effortless, unlock, crucial, essential, robust, holistic, synergy,
future-proof, empower, en "take it to the next level". Zonder deze aanpassing
faalt het script op elke Engelse pagina, en dan kun je het niet meer gebruiken
om de Nederlandse tekst te controleren.

`llms.txt` wordt er twee: `/llms.txt` en `/en/llms.txt`, uit dezelfde generator.
De Nederlandse noemt de Engelse en omgekeerd.

`npm run og` blijft zoals hij is. De afbeelding is het woordmerk met de
huisstijlkleuren, en daar staat geen tekst in.

### 6. Wat er niet vertaald wordt

- Het woordmerk, de favicon en de OG-afbeelding.
- Het adres, het KvK-nummer en het mailadres. Bij KvK komt in het Engels wel
  "Dutch chamber of commerce" erachter, want anders is het een nummer zonder
  betekenis.
- De privacytekst wordt vertaald, met één regel erbij: bij verschil geldt de
  Nederlandse versie. Dat voorkomt dat een vertaling een juridische belofte
  wordt die niet nagelezen is.

## Wat er nog beslist moest worden

**Brits Engels.** Beslist: Brits. Het staat in de harde lijst van
`npm run schrijfwijzer`, dus `-ize` of `color` laat het script vallen.

**De afspraakplanner.** Nog open. `afspraakUrl` wijst naar één Bookings-pagina, en die is
Nederlands. Een Engelse bezoeker komt daarmee na de enige knop op de site in
het Nederlands uit. Je kunt in Bookings een tweede meeting type in het Engels
aanmaken. Het veld staat er al: `afspraakUrlEn` in de bedrijfsgegevens, nu
leeg, met de Nederlandse link als terugval. Doe je het niet, dan is dat een
keuze en geen vergissing, maar hij is wel zichtbaar.

## Het stappenplan

Vijf fasen. Fase 1 is techniek zonder tekst, fase 2 tot 4 is de tekst zelf,
fase 5 is wat er daarna anders is. Ze zijn alle vijf gedaan; ze staan hier nog
omdat ze zeggen waarom iets staat zoals het staat.

### Fase 1. De taal als begrip, zonder dat er iets verandert

Alle pagina's blijven Nederlands en blijven op hun huidige adres. Wat er
gebeurt is dat de taal overal een parameter wordt.

- `astro.config.mjs`: `i18n` erbij met `nl` en `en`, `prefixDefaultLocale:
  false`. De `i18n`-instelling van `@astrojs/sitemap` is er weer uit, zie
  bovenaan.
- `src/data/taal.ts`: het type `Taal`, de taal uit een pad halen, en het pad
  van de tegenhanger uitrekenen.
- `inhoud.ts` en `site.ts`: van losse constanten naar een functie die de inhoud
  voor één taal teruggeeft. Elke pagina roept die aan met `"nl"`.
- `src/data/teksten.ts`: alle tekst uit de templates erin, voorlopig alleen
  Nederlands.
- `Basis.astro`: een `taal`-prop die `<html lang>`, `og:locale`, `inLanguage`
  en de hreflang-verwijzingen zet.
- `schrijfwijzer.mjs` en `meta.mjs`: per taal kijken.

Klaar als: `npm run build`, `npm run typecheck`, `npm run meta` en
`npm run schrijfwijzer` draaien, en de site is in de browser niet van de
huidige te onderscheiden. Dit is één wijziging zonder tekstverandering, dus
makkelijk na te kijken: wat eruit komt moet gelijk zijn aan wat er nu staat.

### Fase 2. De Engelse kant van de techniek

Nog steeds geen vertaalde tekst, maar de Engelse pagina's bestaan.

- De routes onder `/en/`, met de Engelse paden uit keuze 2.
- De taalknop in de kop.
- `src/inhoud/en/` met de mappen erin, en het veld `paar`.
- De tweede set collecties in `keystatic.config.ts`.
- `/en/llms.txt`.

De Engelse tekst is in deze fase een zichtbare TODO, via `Todo.astro`. Dat is
de huisregel: ontbrekende inhoud wordt zichtbaar en nooit verzonnen. In deze
fase gaat de Engelse kant dus niet live, of hij gaat live met TODO's erin en
dan weet je dat.

Klaar als: `/en/` en alle onderliggende pagina's bestaan, de taalknop werkt
heen en terug, en elke pagina heeft een hreflang die naar de juiste tegenhanger
wijst.

### Fase 3. De dragende pagina's in het Engels

De route waar een bezoeker binnenkomt en afspraak maakt:

- `/en/` met de hero, de cijfers, de samenvatting en de dienstenblokken
- `/en/services` en de vijf dienstpagina's
- `/en/contact`

Dit is geen vertaling maar een herschrijving. De Nederlandse tekst heeft korte
zinnen en een eigen ritme, en dat haal je niet met een woord-voor-woordomzetting.
`SCHRIJFWIJZER.md` krijgt daarom een Engels hoofdstuk: wat de stem in het
Engels is, welke woorden eruit blijven en hoe de je-vorm zich vertaalt.
`docs/brand-persona.md` krijgt er een regel bij.

Klaar als: `npm run schrijfwijzer` schoon is op de Engelse bestanden,
`npm run meta` geen te lange titel of beschrijving vindt, en er staat geen TODO
meer op deze pagina's.

### Fase 4. De rest

`/en/approach`, `/en/work`, `/en/about`, `/en/privacy` en `/en/st`. Zelfde
werkwijze, zelfde controle. Hierna staat er geen TODO meer op de Engelse kant.

### Fase 5. Wat er daarna anders is

- Elke tekstwijziging is er twee, of een bewuste keuze om één taal bij te
  werken. Een veld dat in één taal gevuld is en in de andere niet, moet een
  zichtbare TODO worden en niet de Nederlandse tekst op een Engelse pagina.
- Een nieuwe dienst betekent twee yaml-bestanden en twee slugs.
- `OPLEVERING.md` krijgt een regel voor de Engelse afspraakplanner, zolang die
  er niet is.
- `docs/keystatic.md` beschrijft de tweede set schermen.
- `CLAUDE.md` krijgt de regels uit dit document: waar de Engelse tekst staat,
  dat slugs per taal verschillen, en dat de schrijfwijzer per taal kijkt.

## Wat het ongeveer kost

Fase 1 is het meeste echte werk en het minst zichtbare: het raakt elke pagina,
maar er verandert niets aan de site. Fase 2 is kleiner en goed af te bakenen.
Fase 3 en 4 zijn vooral schrijven, en de kwaliteit daarvan bepaalt of de
Engelse versie iets toevoegt of dat hij eruitziet als een vertaalde site. Die
twee fasen zijn het werk waar jij zelf naar moet kijken, want ik kan de
schrijfwijzer wel draaien maar niet horen of het klinkt zoals jij praat.

Mijn advies: fase 1 en 2 in één keer doen, want een halve taalstructuur is
lastiger te beoordelen dan een hele. Daarna pas beslissen of fase 3 nu moet of
na de livegang van het Nederlandse deel.
