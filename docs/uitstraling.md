# Uitstraling: weg van de generieke AI-look

Aanleiding: de site leest als iets dat een taalmodel heeft gemaakt. Dit
stuk zoekt uit wat mensen daar precies mee bedoelen, meet na wat
apostrophecms.com technisch doet, en zet daar een plan tegenover. Alleen
analyse en plan, nog geen wijziging.

## Wat men een AI-site noemt

Er is geen officiele definitie. Wat terugkomt in de stukken die erover
gaan, en de cijfers die daarin staan komen van bureaus zelf, dus neem ze
als richting en niet als meting:

Visuele kenmerken:

- Inter, of helemaal geen bewuste fontkeuze
- Een verloop van indigo naar paars. Wordt het hardste genoemd
- Drie afgeronde kaarten naast elkaar, met een icoontje bovenin
- De Lucide-iconenset en ongewijzigde shadcn-componenten
- Gecentreerde koppen met een pil-labeltje erboven
- Secties die invliegen bij het scrollen
- Donker glas met oplichtende panelen, bento-rasters

Kenmerken in de tekst:

- Overgebleven placeholders en dode `#`-links
- Emoji als pictogram in een kaart
- Verzonnen cijfers en testimonials
- Hero-tekst vol holle woorden

Bronnen: [buildtolaunch](https://buildtolaunch.substack.com/p/fix-ai-slop-website-design),
[925studios](https://925studios.co/blog/ai-slop-design-tells),
[sailop](https://sailop.com/blog/ai-slop-2026-state-of-the-ai-generated-web),
[Wikipedia over AI slop](https://en.wikipedia.org/wiki/AI_slop).
Over waarom het gebeurt: modellen leunen op wat het vaakst in hun
materiaal zat, dus de uitkomst zakt naar het midden
([daily.dev](https://daily.dev/posts/hey-claude-why-do-ai-generated-interfaces-all-look-the-same--xv3xjdrma),
[shadcn-val](https://freedesignmd.com/blog/shadcn-looks-generic)).

## Waar wij niet in trappen

Bijna de hele lijst hierboven raakt ons niet. Geen verlopen, geen
shadcn, geen Lucide, geen emoji, geen verzonnen cijfers, geen
invliegende secties, geen gecentreerde koppen, en het palet is uit een
schilderij gemeten in plaats van uit een standaardset gepakt.

## Waar wij er wel in zitten

Dit is mijn eigen oordeel na het naast elkaar zetten, niet iets uit een
bron.

1. **Een ronding, negen keer dezelfde.** `rounded-sm`, 2 px, en verder
   niets. Een enkele waarde die nergens varieert leest als een waarde
   die niemand heeft gekozen
2. **De pagina bestaat volledig uit tekst in randjes.** Op de hele site
   staat een foto, op `/over`. Alles daarbuiten is letter plus lijn. Dat
   is precies het beeld van een gegenereerd antwoordvlak
3. **Elke kaart weegt hetzelfde.** Zelfde rand, zelfde vulling, zelfde
   binnenruimte, zelfde grijs. Er is geen materiaalhierarchie, dus het
   oog krijgt nergens een rangorde aangeboden
4. **De pijltjeslijst in een omlijnde kaart** op de homepage is het
   meest herkenbare element van allemaal. Dat is letterlijk hoe een
   chatantwoord eruitziet
5. **Weinig maatcontrast.** De h1 is 48 px, de lopende tekst 18 px, de
   labels 14 px. Alles zit dicht bij elkaar, dus niets springt
6. **Inter staat zelf op de lijst.** Dat is een ongemakkelijke, want we
   hebben hem net bewust gekozen

## Wat apostrophecms technisch doet

Gemeten op 1280 px, uit de berekende stijl, niet uit het hoofd.

| Onderdeel | Meting |
| --- | --- |
| Rondingen | Een schaal: 6 px (91x), 12 px (64x), 8 px (46x), 10 px (43x), 4 px (41x), plus volledig rond (41x) en 24 en 32 px voor de grote blokken |
| Knoppen | Volledig rond. Tekst 12 tot 14 px, gewicht 400, letterspatiering plus 0,3 px. Hoogte 36 tot 50 px. Overgang 200 ms, alleen kleur |
| Kaartranden | 0,57 px. Een subpixel-haarlijn, bewust onder de 1 px |
| Schaduwen | Meest gebruikt `0 1px 2px rgba(0,0,0,.06)`, 20 keer. Daarnaast een paar zware voor zwevende mockups |
| Raster | `gap-px` met een randkleur eronder, afgerond op 24 px en afgesneden. Scheidslijnen zonder borders te stapelen |
| Beeld | 34 afbeeldingen, 204 svg's, 1 video, codeblokken met kleur. Het beeld draagt de pagina, niet de typografie |
| Koppen | h1 51 px, gewicht 400, letterspatiering min 1,5 px, regelhoogte 1,02. Tegenover knoppen van 12 px |
| Secties | 80 px boven en onder, en dat varieert per blok |
| Wayfinding | Boven elke sectiekop een mono-labeltje met een nummer, bijvoorbeeld `01 EXTEND` |

De kern: hun pagina wordt gedragen door productbeeld. Die weg hebben wij
niet, want we hebben geen product om te fotograferen en verzonnen
schermen mogen niet.

## Het plan

Acht punten, van meest naar minst effect.

1. **Een rondingsschaal in plaats van een waarde.** Drie tokens in
   `global.css`: klein 6 px voor knoppen en labels, gewoon 10 px voor
   kaarten, groot 16 px voor de dragende blokken. Alle negen
   `rounded-sm` gaan om. Dit is direct wat je vroeg
2. **De tekeningen worden het beeld.** `Schema`, `Cyclus`,
   `Stappentabel`, `Niveau` en `AiStap` zijn er al en staan nu klein
   weggestopt. Die krijgen de ruimte die apostrophecms aan zijn
   screenshots geeft: breder, meer lucht, en op elke lange pagina
   minstens een. Dat is ons eerlijke equivalent van productbeeld
3. **Verschil in gewicht tussen kaarten.** Drie niveaus in plaats van
   een: een haarlijnraster met `gap-px` voor rijtjes, de omlijnde kaart
   voor een afgerond blok, en helemaal geen rand voor wat alleen lucht
   nodig heeft. Nu is alles het middelste
4. **De pijltjeslijst weg.** De vijf kernpunten worden een haarlijnraster
   van vijf cellen, of gewone regels zonder markering. Het pijltje gaat
   er hoe dan ook uit
5. **Maatcontrast omhoog.** De h1 naar een `clamp` die op desktop boven
   de 60 px uitkomt, de mono-labels omlaag naar 12 px met positieve
   letterspatiering. Dan is er weer een boven- en een onderkant
6. **Knoppen lichter.** Van 16 px semibold naar 14 px medium met plus
   0,3 px letterspatiering en meer horizontale ruimte. Een knop die
   schreeuwt leest als een sjabloon
7. **Genummerde mono-labels boven de sectiekoppen.** Links uitgelijnd,
   niet gecentreerd. Kost niets en geeft een lange pagina houvast
8. **Ritme in de secties.** Nu overal `py-24`. Binnen een groep krapper,
   tussen groepen ruimer, zodat de pagina ademt in plaats van tikt

## De keuzes, beslist

Dit is wat bij apostrophecms mooi werkt maar botst met wat in
`CLAUDE.md` staat. Per punt mijn advies, en daaronder wat het is
geworden.

| Keuze | Besluit |
| --- | --- |
| A. Ronde pilknoppen | Nee. Wel de rondingsschaal: 6, 10 en 16 px |
| B. Schaduwen | Nee |
| C. Haarlijnen onder de pixel | Nee, wel een lichtere randvariant binnen rasters |
| D. Ander tekstfont | Ja: Manrope vervangt Inter |
| E. Tweede accentkleur | Nee |
| F. Gecentreerde sectiekoppen | Alleen het genummerde label, niet de centrering |
| G. Invliegen bij het scrollen | Nee |
| H. Portret op de homepage | Ja |

### Waarom Manrope

Niet omdat Inter fout is. Inter is het best leesbare schermfont dat er
is, en het bewijs dat hij een AI-kenmerk zou zijn komt uit een enkele
bureaublog. Het punt is dat Inter neutraal langs het merk heen leest,
terwijl Manrope platte, licht vierkante rondingen heeft die aansluiten
op het pixelwoordmerk. Het font gaat meedoen in plaats van wegvallen.

Nagekeken voor het besluit viel: Manrope staat als
`@fontsource/manrope` op Fontsource onder OFL-1.1, met gewichten 200 tot
800, dus de 400 en de 600 die de site gebruikt zitten erin. De subsets
`latin` en `latin-ext` dekken de Nederlandse accenten. Er is geen
cursief, en dat is geen bezwaar: de site gebruikt nergens cursief.
Dezelfde Astro fonts-API als nu, zelf gehost, geen verzoek naar buiten.

Wat er bij de bouw nog moet blijken: of Manrope op 18 px over een lange
alinea net zo rustig leest als Inter. Zo niet, dan is de uitwijk Manrope
op de koppen en Inter op de lopende tekst, niet een zwaarder gewicht.

**A. Volledig ronde knoppen.** Hun knoppen zijn pillen. Het staat fris
en het is de snelste manier om Tailwind-achtig te ogen. Maar het
woordmerk is een pixelvorm, recht en hoekig, en een pil ernaast vecht
daarmee. *Advies: niet doen voor de primaire knop. Hooguit voor kleine
secundaire labels.*

**B. Schaduwen.** Zij gebruiken een zachte `0 1px 2px` onder bijna alles.
`CLAUDE.md` zegt dat de rand het werk doet en de kaart maar 1,1:1
lichter is. Schaduw toevoegen is juist de kortste weg naar standaard
Tailwind. *Advies: niet doen.*

**C. Haarlijnen onder de pixel.** Hun randen zijn 0,57 px. Mooi
ingetogen. Bij ons zou dat op een scherm zonder hoge dichtheid wegvallen,
en de contrastregel voor `rand` haal je dan niet meer. *Advies: 1 px
houden, maar een lichtere randvariant toestaan binnen een raster.*

**D. Een ander tekstfont.** Inter staat op de lijst met verdachte
keuzes. Geist zou dat oplossen, maar Geist is zelf hard op weg de
volgende standaard te worden, dus je ruilt het ene merkloze font voor
het andere. *Advies: Inter houden. Het karakter moet uit het woordmerk
en de tekeningen komen, niet uit de lopende tekst. Wil je toch wisselen,
dan iets met echt karakter en geen tweede grotesk.*

**E. Een tweede accentkleur.** In hun interface zit paars naast het
zwart-wit. `CLAUDE.md` zegt: het accent is de enige warme kleur en staat
alleen op de primaire knop, de focusring en de naamknop. *Advies: niet
doen.*

**F. Gecentreerde sectiekoppen.** Hun middenblokken met een kop en een
knop eronder zien er rustig uit. Onze pagina's lezen van links. *Advies:
het genummerde labeltje overnemen, de centrering niet.*

**G. Invliegen bij het scrollen.** Zij doen het. Het staat ook op de
lijst met AI-kenmerken, en het botst met onze regel dat beweging alleen
bij een gebaar hoort. *Advies: niet doen.*

**H. Een foto op de homepage.** Wat hun pagina menselijk maakt is beeld.
Het enige eerlijke beeld dat wij hebben is jij. Een portret bij het
blokje over wie dit doet zou meer schelen dan alle acht punten hierboven
samen. *Advies: doen, als je het prettig vindt.*

## Wat er bij de bouw uitkwam

Alle acht punten staan er, met de keuzes zoals hierboven. Dit is wat het
opleverde en wat er onderweg veranderde.

- **De rondingsschaal werkt.** Nagemeten in de browser: nog maar drie
  waarden op de pagina, 6 px (22 keer), 10 px (14 keer) en 16 px (3
  keer). De 2 px van voorheen komt nergens meer voor
- **Manrope staat erop**, acht bestanden, `latin` en `latin-ext`, zelf
  geserveerd. De h1 komt op 60 px uit met tracking min 1,8 px. Op 18 px
  over een lange alinea leest hij rustig, dus de uitwijk naar Inter voor
  de lopende tekst was niet nodig
- **Het portret stond al op de homepage**, niet alleen op `/over`. Dat
  had ik in de analyse mis. Van keuze H bleef dus over dat hij meer
  gewicht krijgt: `max-w-lg` in plaats van `max-w-md`, en de ronding van
  16 px
- **Het tekeningvlak moest strakker.** Over de volle breedte van de
  kolom stond de tekening in een vlak dat voor de helft leeg was. `Schema`
  krijgt nu `sm:w-fit`, `Cyclus` een `max-w-3xl`
- **De hero past nog steeds op 1280 bij 800.** Gemeten op 756 px. Het
  haarlijnraster staat vanaf `sm` in twee kolommen met de laatste cel
  over de volle breedte, en dat wint de hoogte terug die het vlak om de
  tekening kost
- **De pijltjeslijst zat op twee plekken**, niet op een: de homepage en
  het blok "Wat dat concreet is" op elke dienstpagina. Allebei vervangen
- `rand-zacht` haalt 1,22:1 tegen de kaart in donker en 1,17:1 in licht.
  Dat is bewust laag: het is een scheidslijn binnen een raster en geen
  buitenrand, en de wikkel eromheen staat gewoon op de volle `rand`

Niet gedaan, en dus nog open: `Stappentabel` heeft geen eigen vlak
gekregen, want een tabel met `border-collapse` en een ronding is
gedoe en de tabel heeft die structuur al. En op `/aanpak` staat boven de
eerste sectie `01` terwijl de kaarten eronder ook met `01` beginnen. Dat
zijn twee verschillende schalen, en in maat en kleur verschillen ze
duidelijk, maar het is het bekijken waard.

Nog steeds open uit de vorige ronde: een `prefers-contrast: more` die de
randen versterkt, en het kruimelpad op `/st` en `/privacy`.
