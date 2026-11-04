# Layoutvoorstel: donker, korrelige koppen, kaarten

Dit stuk legt vast wat er aan de opmaak verandert en welke regels in
`CLAUDE.md` daarvoor moeten worden herschreven. De structuur zelf blijft
staan zoals die in `docs/structuurvoorstel.md` is afgesproken: dit gaat
alleen over hoe het eruitziet.

De aanleiding is apostrophecms.com. Wat daar werkt, is overgenomen. Wat
daar werkt omdat het een ander merk is, niet.

## Wat daar is gemeten

Gemeten op 1024 px breed, niet uit het hoofd:

| Onderdeel | Hoe het daar werkt |
| --- | --- |
| Titelfont | Alleen de h1 en de grote sectiekoppen staan in een afwijkend font (KMR Apparat), 51 px, gewicht 400 tot 500, letter-spacing min 1,3 px, regelhoogte 1,02. Alles daaronder staat in de gewone UI-sans |
| Geen banen | `body` is zwart, elke `section` is doorzichtig. Groeperen gebeurt met kaarten binnen de sectie |
| Contrast | Achtergrond zwart, tekst bijna wit, ongeveer 20:1 |
| Krimpende kop | `position: fixed`, 88 px hoog, bij scrollen 64 px, logo van 35 naar 29 px |
| Dropdown | Gesplitste trigger: de menu-link blijft een gewone link, met een apart knopje met een pijltje ernaast dat het paneel opent |
| Inhoudsopgave | `position: sticky` onder de kop, kop "On this page", het huidige item krijgt `aria-current="location"` |

## De keuzes

### Titelfont: teruggedraaid naar Inter semibold

Hieronder staat waarom Redaction 35 was gekozen, en dat klopte voor een
enkele kop. Op een lange pagina werd elke h2 een gebeurtenis, en dat is
precies wat de koppen niet moeten doen. De koppen staan daarom weer in
Inter semibold met tracking -0.02em, en het karakter zit weer waar het
hoort: in het woordmerk en in de kantlijnlabels in de mono. De rest van
dit stuk, het palet en de kaarten, staat gewoon overeind.

### Wat Redaction 35 was

Redaction is ontworpen door Jeremy Mickel (MCKL) met creatieve regie van
Forest Young, voor The Redaction van Titus Kaphar en Reginald Dwayne Betts
bij MoMA PS1. Het is gebaseerd op de letters van Amerikaanse
rechtbankdocumenten. Het getal is de mate van korrel: 35 ziet eruit als een
document dat een paar keer te vaak is gekopieerd.

Waarom dat past: het woordmerk is al een pixelvorm. Een korrelige letter
ernaast is dezelfde gedachte, één trap fijner. En het is geen font dat je
op tien andere adviessites tegenkomt.

- Licentie SIL Open Font License 1.1, en hij staat als
  `@fontsource/redaction-35` op Fontsource. Dus zelfgehost via dezelfde
  Astro fonts-API als Inter en de mono, geen verzoek naar buiten
- Alleen gewicht 400. Eén bestand, geen bold en geen cursief
- Alleen de h1 en de h2, en nooit onder 28 px. De korrel is niet gehint,
  dus op kleine maten wordt hij vlekkerig. De h3, de labels, de lijsten en
  alle platte tekst blijven in Inter en de mono
- Nieuw token `--font-titel`. De tracking gaat naar 0, want min 0,02em was
  op Inter afgestemd en een serif met korrel plakt dan aan elkaar

Wat ik nog moet nakijken zodra het staat: of de dunne lijnen op een donkere
achtergrond niet wegvallen. Zo ja, dan is Redaction 20 (fijnere korrel,
steviger lijn) de uitwijk, niet een zwaarder gewicht.

### Donker als standaard, en meer contrast

Donker is wat je als eerste ziet. Licht komt via de schakelaar. De tint
blijft 204 voor blauw en 28 voor oranje, en de rollen verschillen nog
steeds alleen in lichtheid, dus de meting uit het schilderij blijft de
onderbouwing. Wit en zwart komen er niet in.

Gerekend, niet geschat. Elke voorgrondkleur is de eerste lichtheid die het
doel haalt tegen de krapste van de twee ondergronden, dus niets is lichter
of donkerder dan het contrast vraagt.

| Rol | Donker | Tegen bg | Op kaart | Licht | Tegen bg | Op kaart |
| --- | --- | --- | --- | --- | --- | --- |
| bg | `#090e11` | | | `#f8fafc` | | |
| kaart | `#131b20` | 1,1:1 | | `#ebf1f4` | 1,1:1 | |
| rand | `#2d3a43` | 1,7:1 | 1,5:1 | `#bfcfd9` | 1,5:1 | 1,4:1 |
| tekst | `#f4f6f7` | 17,9:1 | 16,1:1 | `#101519` | 17,6:1 | 16,1:1 |
| kop | `#c4d0d8` | 12,3:1 | 11,1:1 | `#28353e` | 12,0:1 | 11,0:1 |
| zacht | `#6d8595` | 5,0:1 | 4,5:1 | `#577182` | 4,9:1 | 4,5:1 |
| accent | `#c76a19` | 5,1:1 | 4,6:1 | `#a75915` | 4,9:1 | 4,5:1 |

De tekst gaat van 13,0:1 naar bijna 18:1. Het accent blijft per thema
verschillen, want ook met deze achtergronden haalt één oranje het niet in
allebei.

### Kaarten in plaats van banen

De afwisselende banen verdwijnen. Eén doorlopende achtergrond, en inhoud
die bij elkaar hoort staat in een omlijnd vlak. Let op het cijfer hierboven:
een kaart is maar 1,1:1 lichter dan de achtergrond, dus de rand doet het
werk en de vulling geeft alleen diepte. Daar is de rand ook sterk genoeg
voor, 1,5:1 tegen de kaart.

Dat raakt meer dan de opmaak:

- `Sectie.astro` verliest de vlag `vlak`. Alle secties op alle pagina's
  staan nu op dezelfde achtergrond, gescheiden door lucht en de rand van
  1 px die er al is
- Het token `--c-vlak` wordt `--c-kaart`, want het is geen baan meer
- De contrastcijfers in `global.css` en in `OPLEVERING.md` staan nu
  "tegen de vlakke baan gemeten". Dat wordt "tegen de kaart", de krapste
  van de twee
- Een nieuwe component voor de kaart, zodat de rand, de ronding en de
  binnenruimte op één plek staan

### Krimpende kop met dropdown

- De kop wordt `sticky`, 80 px hoog, en krimpt bij scrollen naar 56 px. Het
  woordmerk gaat van `h-7` naar `h-5`. Een klein script zet een klasse op
  de kop zodra je voorbij de eerste 40 px bent
- Diensten krijgt de gesplitste trigger: de link blijft naar `/diensten`
  gaan, en een knopje met een pijltje ernaast klapt de vijf dienstpagina's
  plus Pipedrive uit. Zo blijft de hub bereikbaar, voor bezoekers en voor
  zoekmachines
- Het mobiele menu blijft het `details`-element zonder JavaScript. De
  dropdown geldt alleen vanaf `lg`
- `scroll-margin-top` staat al op 5rem en moet mee met de nieuwe hoogte

### Inhoudsopgave op alle lange pagina's

Een vastgeplakte kolom links op `/aanpak`, `/pipedrive`, `/werk` en de vijf
dienstpagina's. Gebouwd op de id's die de secties al hebben, dus geen tweede
lijst om bij te houden. Het huidige item krijgt `aria-current="location"`,
en op `lg` en kleiner klapt hij in tot een regel boven de inhoud.

Die pagina's gaan daarmee van één kolom naar een raster met een kolom
ernaast vanaf `lg`.

## Wat er in CLAUDE.md moet veranderen

| Regel nu | Wordt |
| --- | --- |
| "Koppen staan in Inter, kleine labels en de tekeningen in IBM Plex Mono" | De h1 en h2 in Redaction 35, nooit onder 28 px. De h3 en lager in Inter, labels en tekeningen in de mono |
| "Licht is de standaard, donker via `data-thema="donker"`" | Donker is de standaard, licht via `data-thema="licht"`. De systeemvoorkeur schakelt nog steeds niet automatisch om |
| "Gebruik de roltokens (`bg`, `vlak`, `rand`, ...)" | `vlak` wordt `kaart` |
| De contrastcijfers in het palet en bij het accent | De cijfers uit de tabel hierboven, gemeten tegen de kaart |
| "Het accent is de enige warme kleur ... alleen op de primaire knop, de focusring en de naamknop" | Blijft staan. De dropdown en de inhoudsopgave krijgen geen accent |

## De ronde langs de Apple-principes

Na de bouw is de site langs de ontwerpprincipes gelegd. Acht punten zijn
doorgevoerd:

1. Zichtbare feedback bij indrukken, via de klasse `drukbaar` en
   `active:`-varianten op de rijen in de menu's. Er stond nergens een
   `:active`, en op een telefoon bestaat hover niet
2. De zwevende knop op mobiel is een balk over de hele breedte geworden.
   Als pil lag hij midden op de kaart met de kernpunten. Hij gaat weg
   zodra de echte knop in beeld komt
3. De kop was `bg-bg/95` met een blur, en bij 95 procent dekking zie je
   van die blur niets. Nu `bg-bg/70` met `backdrop-blur-xl`, een echt
   materiaal
4. Met een terugval naar dekkend als de browser geen blur kan of als
   `prefers-reduced-transparency` aanstaat
5. Het dienstenpaneel schaalt open vanuit de knop waar het bij hoort, en
   gaat langs dezelfde weg terug. Het mobiele menu doet hetzelfde bij het
   opengaan; dichtgaan is direct, want dat is wat een `details` doet
6. De themawissel is een overgang van 200 ms in plaats van een harde
   sprong. De overgang staat alleen aan tijdens het wisselen zelf
7. De dienstenlijst was op mobiel een tikdoel van 24 px hoog. De hele
   kaart is nu het trefvlak, gemeten 281 px
8. De kop Diensten in de voet was 17 px hoog en is nu 44

Niet gedaan, en dus nog open: tracking per kopmaat, positieve tracking op
de kleine mono-labels, een `prefers-contrast: more` die de randen
versterkt, en het kruimelpad op `/pipedrive`, `/st` en `/privacy`.

## Wat er bij de bouw uitkwam

Alles hierboven staat er. Dit is wat het opleverde en wat er onderweg
veranderde.

- De contrastcijfers zijn na de bouw in de browser nagemeten en komen
  precies uit op de tabel hierboven, in allebei de thema's
- Redaction 35 heeft de accenten die het Nederlands nodig heeft. De korrel
  houdt stand op een donkere achtergrond, op 375 px en op 1280 px, dus
  Redaction 20 was niet nodig
- De `og.png` is opnieuw gemaakt en staat nu in het donkere thema, met de
  belofte in Redaction in plaats van Inter
- De hero is ingekort. De kaart om de kernpunten maakte hem zo'n 100 px
  hoger, en daarmee paste hij niet meer op 1280 bij 800. Minder lucht
  boven de tekening, een krappe kaart en minder ondermarge lossen dat op
- De inhoudsopgave laat zichzelf weg onder de drie regels. Een dienst
  zonder verhaalblokken houdt er twee over en krijgt er dus geen
- Op `/werk` wijst de opgave niet naar secties maar naar de vier cases,
  want die pagina heeft maar een sectie. Een case die nog een TODO is,
  krijgt geen regel
