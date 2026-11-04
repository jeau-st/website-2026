# Structuurvoorstel jeau.st

Datum: 4 november 2026.

Stand van zaken: het hele voorstel is gebouwd. `/diensten`, `/over`,
`/pipedrive` en de vijfde dienst `/diensten/website-en-mail` bestaan, het
menu heeft vijf items met een uitklapper onder lg, de homepage is terug naar
acht korte blokken, en het kruimelpad, `llms.txt` en de schema-aanvullingen
staan er. Wat er nog aan tekst ontbreekt staat in `OPLEVERING.md`.

Vier keuzes zijn gemaakt, ze staan verwerkt in dit document:

- Geen partnerclaim op de site. Pipedrive Authorized Partner staat op naam
  van FortCRM en wordt hier niet genoemd.
- Website en mail wordt een vijfde dienst, met een eigen pagina.
- "Waar dit het beste werkt" wordt een blok op `/diensten`.
- Geen prijzen op de site, dus geen `/tarieven`.

## Wat er nu mis is

1. **De homepage doet het werk van vier pagina's.** Elf secties, waarvan vier
   hetzelfde zeggen als een onderliggende pagina: de volgorde staat er en op
   `/aanpak`, de processtappen staan er en op `/aanpak`, de cases staan er
   verkort en voluit op `/werk`, en "Over mij" staat alleen daar. Wie de
   homepage leest, hoeft nergens meer heen. Dat is geen simpele homepage, dat
   is een eenpagina-site met vier bijlagen.
2. **Diensten zitten niet in het menu.** Er zijn vier dienstpagina's met
   serieuze inhoud, maar ze hangen alleen aan een sectie halverwege de
   homepage en aan de voet. Dat is de duurste inhoud van de site en de minst
   vindbare plek.
3. **Er is geen overzichtspagina voor diensten.** Een menu-item moet ergens
   naartoe. Nu zou "Diensten" een anker in de homepage worden, en dan blijft
   het probleem bestaan.
4. **Over mij heeft geen eigen pagina.** Dat is precies wat een AI-assistent
   zoekt bij "wie is Joost Beers" en "wie doet Pipedrive-implementaties in
   Brabant": één pagina over één persoon.
5. **De Pipedrive-functies ontbreken.** Wat Pipedrive concreet kan, staat
   nergens, terwijl dat het grootste zoekwoord van de site is.

## De structuur

```
/                            homepage, kort, zes blokken die doorlinken
/diensten                    NIEUW: overzicht van de vijf diensten
  /diensten/crm-inrichting
  /diensten/koppelingen-en-automatisering
  /diensten/cijfers-en-ai
  /diensten/ondersteuning-en-training
  /diensten/website-en-mail  NIEUW
/pipedrive                   NIEUW: wat Pipedrive kan, en AI erop
/aanpak                      denkwijze, processtappen, na de oplevering, FAQ
/werk                        de vier cases
/over                        NIEUW: Joost, achtergrond, waarom
/contact                     planner, mail, telefoon
/privacy                     ongewijzigd
/st                          ongewijzigd, blijft alleen in de voet
```

Geen bestaande URL verandert, dus er is geen redirect nodig. Er komen vier
pagina's bij.

**Menu:** Diensten · Aanpak · Werk · Over · Contact, plus de knop.

Dat zijn vijf items. Op mobiel passen er nu drie naast het woordmerk, de
themaknop en de knop, dus hier hoort een mobiel menu bij (uitklapper, of de
links op een tweede regel). Dat is werk dat nu niet in de Kop zit.

## Waarom zo, voor zoekmachines en AI

Eén pagina, één onderwerp. Een pagina die over vier dingen gaat, verliest van
een pagina die over één ding gaat. Dat staat al in de code van
`/diensten/[slug]`, maar de homepage doet nu het omgekeerde.

Hub en spaken. `/diensten` is de hub voor de vijf dienstpagina's en linkt
naar elk, elke dienstpagina linkt terug en naar zijn buren. Zo weet een
crawler welke pagina's bij elkaar horen en welke de belangrijkste is. Nu
loopt al die autoriteit via de homepage, die over alles tegelijk gaat.

Diepte blijft diep. Een korte homepage kost niets zolang de lange inhoud
onder de juiste kop staat. AI-assistenten citeren de pagina die het antwoord
geeft, niet de pagina met de meeste woorden. De dienstverhalen van 300 woorden
zijn goud, en ze staan straks op een pagina met een kop die bij de vraag past.

Wat erbij hoort te komen:

- **Kruimelpad** op `/diensten/<slug>`, met `BreadcrumbList`-schema. Nu ziet
  een crawler niet dat die pagina's onder een hub hangen.
- **`Person`-schema op `/over`**, met `worksFor` naar het bedrijf en `sameAs`
  naar LinkedIn. Dit is de pagina waarmee je in een AI-antwoord terechtkomt.
- **`ItemList` op `/diensten`** met de vijf diensten.
- **De FAQ verhuist naar `/aanpak`**, inclusief het `FAQPage`-schema. De zes
  vragen gaan bijna allemaal over hoe een traject loopt, dus daar horen ze.
  Per dienstpagina mogen er twee dienstspecifieke vragen bij.
- **`public/llms.txt`**: een platte lijst van de pagina's met per pagina één
  regel waar hij over gaat. Dat is de goedkoopste AI-vindbaarheidswinst die
  er is, en de sitemap doet dat niet voor je.
- **`robots.txt` nalopen** op de crawlers van AI-aanbieders. Als je gevonden
  wilt worden, moeten die erin mogen.

## Waar elk bestaand blok heen gaat

| Blok nu op de homepage | Straks |
| --- | --- |
| Hero met naamwissel en vijf kernpunten | Blijft. De kernpunten zijn precies wat een AI uit een pagina trekt |
| Eerst de basis, dan AI (`aiStappen`) | Naar `/pipedrive`, sectie AI. Op de homepage één alinea met een link |
| Komt dit bekend voor? (`pijnpunten`) | Blijft, drie regels. Dit is de haak |
| Waar dit het beste werkt | Naar `/diensten` als blok onder de kaarten. Hoort bij de vraag "is dit voor mij" |
| De volgorde is het werk (`Cyclus`) | Tekening blijft op de homepage, de twee alinea's eronder vervallen. Die staan al op `/aanpak` |
| Wat ik doe (`diensten`) | Blijft als korte kaarten, met een link naar `/diensten` en naar elke dienst |
| Hoe een traject loopt (`Stappenbalk`) | Van de homepage af. Staat als `Stappentabel` al voluit op `/aanpak` |
| Betrokkenheid na livegang (`nabouw`) | Naar `/aanpak`, onder de processtappen. Ook naar `/diensten/ondersteuning-en-training` |
| Voorbeelden van werk (`werkKort`) | Blijft, drie kolommen, met de link naar `/werk` |
| Over mij | Naar `/over`. Op de homepage de foto, twee regels en een link |
| Veelgestelde vragen | Naar `/aanpak` |
| Plan een belafspraak | Blijft |

De homepage houdt zo zeven blokken over die allemaal kort zijn, en elk blok
heeft precies één uitgang naar de pagina waar het verhaal staat.

## De nieuwe pagina's

### `/pipedrive`

Hier komt wat er nu op fortcrm.nl staat, maar dan in de ik-vorm.
`docs/brand-persona.md` zegt: alles valt onder Jeau.st en FortCRM wordt
nergens genoemd. Dus geen "wij", en de teksten worden herschreven in plaats
van gekopieerd. Het partnerschap blijft eraf. Wat er wel staat, is wat te
bewijzen is: drie volledige implementaties, inclusief migraties en maatwerk.

Opzet van de pagina:

1. Kop: wat Pipedrive voor je team doet.
2. De functies, elk één of twee regels: mailsynchronisatie, agendakoppeling,
   afspraken laten inplannen, WhatsApp, Nova (AI-notities), automatiseringen,
   Campaigns, Projects, rapportages, mobiele app.
3. Sectie AI: de drie stappen die nu op de homepage staan (AI in je CRM, je
   eigen AI aan je gegevens, alles praat met elkaar).
4. Doorlink naar `/diensten/crm-inrichting` (zo richt ik het in) en naar
   `/diensten/cijfers-en-ai` (zo komt het aan je cijfers).

Deze pagina staat los van de diensten, want het is geen dienst: het is het
product. Hij hangt aan het menu via `/diensten`, aan de homepage, en aan twee
dienstpagina's. Een zesde menu-item vind ik niet nodig, een link vanaf de
dienstenhub wel.

### `/diensten`

Kort. Eén alinea over wat de diensten samen zijn, dan de vijf kaarten met hun
eigen punten, dan het blok "waar dit het beste werkt" dat van de homepage af
komt, dan de link naar `/pipedrive` en de knop. Deze pagina is het doel van
het menu-item en het anker voor het zoekwoord Pipedrive-consultant.

Let op: de intro boven de dienstenlijst zegt nu "Dezelfde vier stappen, nu in
wat er concreet gebouwd wordt". Met vijf diensten en vier denkstappen klopt
die regel niet meer. De eerste vier blijven de denkwijze volgen, website en
mail valt erbuiten: dat is de laag eronder. Die regel moet dus herschreven
worden, op de homepage en op `/diensten`.

### `/diensten/website-en-mail`

De vijfde dienst. Dit is het werk uit de case van het architectenbureau en de
case van de webshop: één site in plaats van vier verouderde, redirects vanaf
de oude adressen, een SEO-audit, Astro en Cloudflare, een formulier dat
doorloopt naar Pipedrive, en mail, domeinen en DNS op eigen accounts met
records die kloppen zodat berichten niet in de spam belanden.

De invalshoek is niet "ik maak websites". Het is de laag waar je aanvragen
binnenkomen en je berichten aankomen, en die hoort aan hetzelfde systeem te
hangen als de rest. Zonder die invalshoek concurreert de pagina met elk
webbureau in Nederland en wint hij niet.

Wat ik van jou nodig heb: het `voorWie`-blok en één of twee verhaalblokken,
zoals bij de andere vier. Anders staat er een TODO op de pagina, en dan is
hij te dun om op te ranken. Dat is precies wat `/diensten/[slug]` nu al
afdwingt.

Praktisch: in `[slug].astro` heet de sectie onderaan nu "De andere drie". Die
kop wordt afgeleid van het aantal, of gewoon "De andere diensten".

### `/over`

Het blok dat nu op de homepage staat, uitgebreid: foto, de drie alinea's,
waar je vandaan komt, waarom je dit doet, en een link naar `/st` voor het
domeinverhaal. Krijgt `Person`-schema.

## Wat jij nog moet schrijven

Dit kan ik niet verzinnen, en een placeholder wordt een zichtbare TODO:

1. **Het verhaal bij website en mail:** voor wie het is, en één of twee
   blokken over hoe het in de praktijk gaat. Wat kom je tegen, welke keuze
   maak jij die een ander niet maakt, en wat verwachten mensen verkeerd.
2. **De doorlooptijd** uit de FAQ. Die vraag staat nu op een TODO en gaat mee
   naar `/aanpak`, dus hij wordt daar zichtbaar.

## Volgorde van bouwen

1. `/diensten` met de hub, het menu-item en het blok "waar dit het beste
   werkt", plus het mobiele menu in de Kop.
2. De homepage inkorten, en de blokken verplaatsen die al ergens anders
   staan (processtappen, FAQ, nabouw, over).
3. `/over` met `Person`-schema.
4. `/pipedrive`.
5. `/diensten/website-en-mail`, zodra jij het verhaal hebt. De pagina kan
   er eerder staan, maar dan met een TODO erop.
6. Kruimelpad, `llms.txt` en de schema-aanvullingen.

Stap 1 en 2 zijn samen de helft van de winst en raken geen enkele URL.


## Wat er sinds dit voorstel is veranderd

`/pipedrive` bestaat niet meer. Die pagina ging over het product en niet
over het werk, en wie hem las had daarna alsnog de inrichting nodig. De
twee inhoudelijke blokken, wat er in Pipedrive zit en wat AI met je eigen
gegevens doet, staan nu op `/diensten/crm-inrichting` als sectie 03 en 04.
De oude URL stuurt met een 301 door, zie `redirects` in `astro.config.mjs`.
Daarmee is de menustructuur ook weer gewoon vijf diensten, zonder zesde
regel onder een streepje.

De homepage heeft er een blok bij: `In het kort`, direct onder de hero.
Dat zijn de vijf W's en de H in zes regels, voor wie niet verder leest.
`Voorbeelden van werk` heet `Resultaten` en noemt concrete uitkomsten in
plaats van een samenvatting in situatie, aanpak en resultaat. Elke regel
komt uit het `resultaat` van een van de vier cases. `Wie dit doet` heet
`Over mij`.

De opdrachten op `/werk` staan niet meer in een kaart en niet meer in
alinea's. Elke opdracht is een rij met haarlijnen ertussen, en situatie,
aanpak en resultaat staan puntsgewijs. Onder de titel staat een rijtje
iconen: de onderdelen uit de ring in de hero die in die opdracht zijn
aangepakt. Die ring en die rijtjes komen uit dezelfde lijst `bouwstenen`
in `src/data/site.ts`, dus wat je op de homepage op de cirkel ziet staan,
herken je bij een opdracht aan hetzelfde icoon terug.

`Resultaten` op de homepage laat daarom nu drie opdrachten zien in plaats
van zes losse regels: hetzelfde labeltje, dezelfde iconen en de eerste
drie punten uit het resultaat. Het eigen lijstje dat daar stond is weg,
dus de homepage kan niets beloven wat op `/werk` niet uitgewerkt staat.
