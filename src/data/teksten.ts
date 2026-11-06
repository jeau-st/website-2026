import type { PerTaal } from "./taal";

/**
 * Alle tekst die in de pagina's en de componenten stond, per taal.
 *
 * Waarom hier en niet in de template: zodra een pagina in twee talen
 * bestaat, is elke zin in een `.astro` een zin die in één taal staat.
 * Door ze hier te zetten, staat de opmaak één keer en de tekst twee keer,
 * in plaats van allebei twee keer.
 *
 * Het type is `PerTaal<typeof nl>`. Dat is geen sier: laat je in de
 * Engelse boom een sleutel weg, dan valt `npm run typecheck` erover, en
 * niet de bezoeker over een lege kop. Nederlands is de maat, want dat is
 * de taal waarin de site is geschreven.
 *
 * Wat hier niet staat: de inhoud die Joost bijwerkt (die staat als yaml in
 * `src/inhoud`, zie `keystatic.config.ts`) en de lijsten die aan iconen of
 * aan de geometrie van een tekening hangen (die staan in `site.ts`). Dit
 * is de tekst die bij de opmaak hoort: koppen, labels, tussenregels en de
 * alinea's die niet zonder hun pagina kunnen.
 *
 * `{naam}` en `{studio}` in een regel worden gevuld met `vul()`
 * hieronder. Dat is er voor de twee plekken waar een bedrijfsgegeven
 * midden in een zin staat: in het Engels staat het lidwoord op een andere
 * plek, en dan kun je de zin niet in stukken knippen zonder dat de
 * vertaling vastzit aan de Nederlandse woordvolgorde.
 *
 * De Engelse tekst is Brits gespeld en geen vertaling van woord tot
 * woord: de Nederlandse tekst heeft korte zinnen en een eigen ritme, en
 * dat haal je niet met een omzetting. Zie het Engelse hoofdstuk in
 * SCHRIJFWIJZER.md.
 */

/** Vult `{sleutel}` in een regel. Zie de toelichting hierboven. */
export function vul(regel: string, waarden: Record<string, string>): string {
  return regel.replace(/\{(\w+)\}/g, (heel, sleutel) =>
    sleutel in waarden ? waarden[sleutel]! : heel,
  );
}

const nl = {
  algemeen: {
    naarInhoud: "Naar de inhoud",
    todoAchtervoegsel: ", nog in te vullen:",
    knopTodo: "TODO: URL afspraakplanner",
    kvk: "KvK",
    opDezePagina: "Op deze pagina",
    kruimelpad: "Kruimelpad",
    themaLicht: "Lichte modus aanzetten",
    themaDonker: "Donkere modus aanzetten",
    land: "Nederland",
  },

  taal: {
    /** Hoe deze taal zichzelf noemt. Voor een plek waar hij uitgeschreven moet. */
    naam: "Nederlands",
    naarAndere: "Deze pagina in het Engels",
    naarAndereHome: "Naar de Engelse homepage",
  },

  kop: {
    hoofdmenu: "Hoofdmenu",
    menu: "Menu",
    dienstenTonen: "Alle diensten tonen",
    dienstenVerbergen: "Alle diensten verbergen",
    paneelkop: "Vijf soorten werk",
    menuLinks: {
      diensten: "Diensten",
      aanpak: "Aanpak",
      werk: "Werk",
      over: "Over",
      contact: "Contact",
    },
  },

  voet: {
    belofte: "CRM en procesautomatisering voor mkb en scale-ups.",
    onderdeelVan1: "{naam} is onderdeel van",
    onderdeelVan2: "collectief {studio}",
    diensten: "Diensten",
    linkedin: "Connect op LinkedIn",
    privacy: "Privacy",
    st: ".st?!",
  },

  tekeningen: {
    schema:
      "Eén ring met alles erop wat bij het werk hoort. Aan de ene kant wat je nu al hebt: de mailbox, de boekhouding, offertes, WhatsApp, de telefoon, de website en de agenda. Aan de andere kant wat je eruit haalt: projecten, rapportages, slimme workflows, AI en databases.",
    cyclusKort: ["proces", "automatiseren", "meten"],
    cyclusOpnieuw: "opnieuw",
    kaartTitel: "Kaart van São Tomé en Príncipe in de Golf van Guinee",
  },

  stappen: {
    caption: "De zes stappen van een traject, met per stap de rolverdeling",
    stap: "Stap",
    ik: "Ik doe",
    jij: "Jij doet",
    eind: "Aan het eind",
  },

  opdracht: {
    situatie: "Situatie",
    aanpak: "Aanpak",
    resultaat: "Resultaat",
  },

  home: {
    titel: "Jeau.st - CRM en procesautomatisering voor mkb en scale-ups",
    beschrijving:
      "Joost Beers richt Pipedrive in, koppelt je systemen en automatiseert handwerk. Voor mkb en scale-ups die vastlopen in losse systemen en Excel.",
    kopVoor: "Dat doet ",
    kopNa: " altijd",
    naamTitel: "Kies een andere naam",
    leadVoor: "Tot ",
    leadMidden:
      " op vakantie is. Dan blijkt dat het proces alleen in ",
    leadNa:
      " hoofd zat. Ik zorg voor een systeem dat werkt voor je hele team. Met gegevens die zo kloppen dat je AI er iets mee kan.",
    herkenningKop: "Komt dit bekend voor?",
    herkenningIntro: "Drie dingen die ik bijna elk gesprek hoor.",
    volgordeKop: "De volgorde is het werk",
    volgordeIntro:
      "Eerst vastleggen hoe het nu echt gaat, dan één manier van werken kiezen. Daarna automatiseren, meten en continu verbeteren.",
    volgordeLink: "Lees waarom de volgorde zo is",
    dienstenKop: "Wat ik doe",
    dienstenIntro:
      "Vijf soorten werk.",
    dienstenLink: "Bekijk alle diensten",
    werkKop: "Resultaten",
    werkIntro:
      "Drie opdrachten, en wat er na de oplevering anders is. De iconen zijn de onderdelen uit de ring hierboven die zijn aangepakt.",
    werkLink: "Lees de opdrachten uitgewerkt",
    overKop: "Over Jeau.st",
    fotoAlt: "{naam}, achter zijn bureau",
    overTekst:
      "Jeau.st zit in {plaats}, bij {studio}. Achter de naam staat {naam}, koppelkoning en procesnerd, met tien jaar ervaring in salesteams, data-analyse, systeemimplementaties en koppelingen.",
    overLink: "Lees waar die ervaring vandaan komt",
    plannenKop: "Vertel eerst eens wat er vastloopt",
    plannenTekst:
      "Dertig minuten, via Teams. Ik vraag door en zeg eerlijk of ik de juiste persoon ben. Zo niet, dan weet ik vaak wel iemand.",
  },

  diensten: {
    titel: "Diensten: CRM, koppelingen en automatisering | Jeau.st",
    beschrijving:
      "Pipedrive inrichten, je systemen koppelen, cijfers waar je op kunt sturen, en ondersteuning na de oplevering. Door Joost Beers uit 's-Hertogenbosch.",
    schemaNaam: "Diensten van Jeau.st",
    kop: "CRM, koppelingen en automatisering",
    intro:
      "Vijf soorten werk. De eerste vier volgen de volgorde waarin ik ze aanpak: eerst je proces in Pipedrive, dan de koppelingen eraan, dan de cijfers erover, en daarna loopt de ondersteuning door. De vijfde is de laag eronder, waar je aanvragen binnenkomen.",
    trajectLink: "Lees hoe een traject verloopt",
    functiesLink: "Bekijk wat er in Pipedrive zit",
    plannenKop: "Welke hiervan je nodig hebt",
    plannenTekst:
      "Dat hoor ik in een gesprek van 30 minuten. Soms is het er één, en vaker begint het bij het proces.",
  },

  dienst: {
    watKrijgJe: "Wat het is en wat het oplevert",
    watHetIs: "Wat het is",
    watHetOplevert: "Wat het oplevert",
    functies: "Wat er in Pipedrive zit",
    ai: "AI op je eigen gegevens",
    functiesSlot:
      "Dit hoeft niet allemaal aan. Welke hiervan je gebruikt, volgt uit je proces, en dat is precies de volgorde waarin ik werk.",
    aiIntro:
      "AI is zo goed als de gegevens eronder. Staat je proces in een systeem en klopt wat erin staat, dan kun je er wat mee.",
    aiSlot:
      "Een AI die het verkeerde antwoord geeft omdat een veld leeg was, is erger dan geen AI. Datakwaliteit hoort daarom in de inrichting te zitten: velden die verplicht zijn waar het telt, en afgeschermd waar niet iedereen ze hoort te wijzigen.",
    verder: "De andere diensten",
    trajectLink: "Lees hoe een traject verloopt",
    todo:
      "vertel hier hoe {dienst} in de praktijk gaat: wat je tegenkomt, welke keuze jij maakt die een ander niet maakt, en wat mensen verkeerd verwachten. Zonder dat is deze pagina te dun om op te ranken.",
    plannenKop: "Is dit wat je zoekt?",
    plannenTekst:
      "Vertel in een half uur wat er vastloopt. Ik zeg eerlijk of ik de juiste persoon ben.",
  },

  aanpak: {
    titel: "Aanpak: eerst het proces, dan automatiseren | Jeau.st",
    beschrijving:
      "Eerst het proces vastleggen en standaardiseren, dan automatiseren waar de meeste tijd in gaat zitten, dan meetbaar maken. En dan opnieuw.",
    kop: "Eerst het proces, dan de techniek",
    intro:
      "Automatiseren is niet moeilijk. Het moeilijke is weten wat je moet automatiseren. Daarom gaat het bij mij altijd in dezelfde vier stappen, en is de laatste stap om terug te gaan naar de eerste.",
    delen: {
      volgorde: "De vier stappen",
      niveaus: "Waar sta jij?",
      stappen: "Zo loopt een opdracht",
      daarna: "Betrokkenheid na livegang",
      werkwijze: "Hoe ik werk",
      vragen: "Veelgestelde vragen",
    },
    niveausIntro:
      "Niet iedereen begint bij 01. Lees deze vier door en kijk welke het meest op jouw bedrijf lijkt.",
    niveausSlot:
      "Zit je ertussenin, dan is dat normaal. Verkoop staat vaak op een ander niveau dan de administratie.",
    stappenIntro:
      "De vier stappen hierboven zijn de denkwijze. Hieronder staat hoe dat in de praktijk verloopt, met per stap wat ik doe, wat jij doet en wat er aan het eind ligt.",
    daarnaIntro: "De oplevering is het begin. Dit is het ritme daarna.",
    daarnaLink: "Lees wat ondersteuning en training inhoudt",
    werkwijzePunten: [
      {
        kop: "Als niemand behalve ik het begrijpt, is het te slim gebouwd",
        tekst:
          "De simpelste versie die werkt, wint. Slim bouwen mag, maar alleen waar het echt iets scheelt. Want een constructie die alleen ik kan onderhouden, maakt je afhankelijk van mij. Dat wil je niet en ik ook niet.",
      },
      {
        kop: "Je praat met de persoon die het bouwt",
        tekst:
          "Dezelfde persoon zit aan tafel bij het eerste gesprek en bij de oplevering.",
      },
      {
        kop: "Het team beslist of het werkt",
        tekst:
          "Een systeem dat niemand gebruikt, is weggegooid geld. Daarom spreek ik de mensen die ermee gaan werken al tijdens de analyse, en hoort training bij het werk in plaats van erna.",
      },
      {
        kop: "Liever volgende maand iets dat werkt",
        tekst: "Dan een plan dat over een jaar af is.",
      },
    ],
    plannenKop: "Waar jouw rondje begint, weet ik nog niet",
    plannenTekst:
      "Dat hoor ik in een gesprek van 30 minuten. Daarna weet je of het zin heeft om verder te praten.",
  },

  werk: {
    titel: "Werk: voorbeelden uit de praktijk | Jeau.st",
    beschrijving:
      "Geanonimiseerde voorbeelden van CRM-implementaties, koppelingen en automatiseringen, opgebouwd als situatie, aanpak en resultaat.",
    kop: "Voorbeelden van werk",
    intro:
      "Geanonimiseerd, omdat het over de systemen en cijfers van klanten gaat. Opgebouwd als situatie, aanpak en resultaat, zodat je kunt zien of het op jouw situatie lijkt.",
    todo:
      "deze pagina staat nog volledig op placeholders. Vul de opdrachten in Keystatic in, of haal Werk uit het menu tot er inhoud is.",
    plannenKop: "Lijkt dit op wat jij nodig hebt?",
    plannenTekst:
      "In een gesprek van 30 minuten hoor je of jouw situatie hierop lijkt en wat er voor nodig is.",
  },

  over: {
    titel: "Joost Beers, CRM-consultant in 's-Hertogenbosch | Jeau.st",
    beschrijving:
      "Jeau.st doet Pipedrive-implementaties, koppelingen en automatisering vanuit 's-Hertogenbosch. Achter de naam staat Joost Beers, tien jaar ervaring.",
    functie: "CRM-consultant en procesautomatiseerder",
    label: "Over",
    kop: "Systemen die met elkaar praten",
    intro:
      "Jeau.st richt CRM's in, koppelt systemen aan elkaar en haalt het handwerk ertussenuit. Vanuit {plaats}, bij {studio}.",
    fotoAlt: "{naam} achter het bureau",
    wieKop: "Wie je spreekt",
    wieAlineas: [
      "{naam}, koppelkoning en procesnerd. Ik houd van systemen die met elkaar praten en van processen die kloppen omdat ze doordacht zijn, niet omdat ze altijd zo gingen.",
      "Wie bij het eerste gesprek aan tafel zit, bouwt het ook. Daarom neem ik geen opdrachten aan waarvan ik denk dat iemand anders ze beter kan.",
    ],
    achtergrondKop: "Waar ik het heb geleerd",
    achtergrondAlineas: [
      "Tien jaar ervaring, met salesteams, data-analyse, systeemimplementaties en koppelingen. Hetzelfde systeem dus vanuit de bouw, vanuit het gebruik en vanuit de cijfers. De laatste jaren deed ik drie volledige Pipedrive-implementaties, met migratie en maatwerk.",
      "En overal zag ik hetzelfde: wat ingewikkeld is, wordt niet gebruikt. Iemand verzint er een omweg voor, en die omweg wordt het proces.",
      "Daar komt mijn belangrijkste regel vandaan. Als niemand behalve ik het begrijpt, is het te slim gebouwd.",
      "Die regel geldt ook voor AI, en dat zit inmiddels in bijna alles wat ik bouw. Een stap die tekst leest en eruit haalt wat in het systeem moet, of een MCP-server waarmee Claude rechtstreeks met je CRM praat. Prima, zolang je kunt nakijken wat het heeft gedaan. Kan dat niet, dan gaat het er niet in.",
    ],
    achtergrondLink: "Lees hoe ik werk",
    waaromKop: "Waar ik het voor doe",
    waaromAlineas: [
      "Een klein bedrijf verdient net zo'n strak proces en net zulke goede systemen als een groot bedrijf, en inmiddels hoort daar ook AI bij. Bij een klein bedrijf zie ik bovendien meteen wat mijn werk oplevert.",
      "Dat zie je terug in hoe het werk loopt. Je hebt één aanspreekpunt, van het eerste gesprek tot een half jaar na de oplevering, en dat is iemand die het systeem zelf heeft gebouwd.",
    ],
    linkedin: "Laten we connecten op LinkedIn",
    stLink: "Waarom het domein op .st eindigt",
    plannenKop: "Dan weet ik nu graag wie jij bent",
    plannenTekst:
      "Dertig minuten, via Teams. Je vertelt wat er vastloopt en ik vraag door.",
  },

  contact: {
    titel: "Contact: plan een belafspraak | Jeau.st",
    beschrijving:
      "Plan een belafspraak van 30 minuten met Joost Beers, of neem contact op via mail of LinkedIn.",
    kop: "Plan een belafspraak",
    intro:
      "Dertig minuten, via Teams. Je vertelt wat er vastloopt, ik vraag door en zeg eerlijk of ik de juiste persoon ben. Daar zit geen verplichting aan vast.",
    gegevensKop: "Liever direct contact",
    gegevensIntro:
      "Een gesprek plannen werkt het snelst, maar een mailtje kan ook.",
    mail: "Mail",
    linkedin: "LinkedIn",
    onderdeelVan: "Onderdeel van {studio}",
  },

  privacy: {
    titel: "Privacy en wat er met je gegevens gebeurt | Jeau.st",
    beschrijving:
      "Hoe Jeau.st omgaat met je gegevens: cookieloze bezoekstatistieken, en op een enkele pagina een kaart van OpenStreetMap.",
    kop: "Privacy",
    intro:
      "Kort, omdat er weinig te melden valt. Deze site zelf zet geen cookies en volgt je niet. Eén pagina laat een kaart zien die ergens anders vandaan komt.",
    /** Leeg in het Nederlands: dat is de versie die geldt. */
    voorrang: "",
    statistiekKop: "Bezoekstatistieken",
    statistiekTekst:
      "Ik gebruik Cloudflare Web Analytics. Dat werkt zonder cookies en zonder een profiel van je op te bouwen. Ik zie hoeveel mensen welke pagina bekijken, niet wie je bent.",
    contactKop: "Als je contact opneemt",
    contactTekst:
      "Mail je of bel je, dan bewaar ik wat je stuurt zolang dat nodig is om je te kunnen helpen. Plan je een belafspraak, dan loopt dat via de afsprakenplanner van Microsoft Bookings en komen je naam, mailadres en het gekozen tijdstip bij Microsoft en daarna in mijn CRM te staan.",
    rechtenKop: "Je rechten",
    rechtenVoor:
      "Je mag opvragen welke gegevens ik van je heb, ze laten corrigeren of laten verwijderen. Een mail naar ",
    rechtenNa: " is genoeg.",
    kaartKop: "De kaart op de pagina over .st",
    kaartTekst:
      "Op die ene pagina staat een kaart van OpenStreetMap. Zodra je er langs scrollt, laadt je browser die bij OpenStreetMap en ziet die je IP-adres. Scroll je er niet heen, dan gebeurt er niets. Op de rest van de site staat geen enkel onderdeel van een ander bedrijf. Hier heeft Google Maps gestaan; OpenStreetMap is een stichting die geen advertenties verkoopt, dus dat scheelt je een partij die belang heeft bij wie je bent.",
    verwerkersKop: "Verwerkers",
    verwerkersIntro:
      "Dit zijn de partijen waar gegevens terechtkomen als je deze site bezoekt of contact opneemt.",
    verwerkers: [
      {
        naam: "Cloudflare",
        waarvoor:
          "Hosting van deze site en de bezoekstatistieken. Je IP-adres passeert hun netwerk om de pagina bij je te krijgen.",
      },
      {
        naam: "Microsoft",
        waarvoor:
          "Mijn mail en agenda draaien op Microsoft 365, en de afspraakplanner is Microsoft Bookings. Wat je daar invult en wat je mailt, staat dus bij Microsoft.",
      },
      {
        naam: "Pipedrive",
        waarvoor:
          "Mijn CRM. Neem je contact op of plan je een afspraak, dan leg ik je naam, je bedrijf en waar we het over hadden daar vast.",
      },
      {
        naam: "OpenStreetMap",
        waarvoor:
          "Alleen de kaart op de pagina over .st, en alleen als je daarheen scrollt. OpenStreetMap is een stichting en geen advertentiebedrijf.",
      },
    ],
    gegevensKop: "Contact",
  },

  st: {
    titel: "Waarom .st? Over Sao Tome en Principe | Jeau.st",
    beschrijving:
      "Jeau.st eindigt op .st, het landendomein van Sao Tome en Principe. Over de geschiedenis van die eilanden, ook de Nederlandse, en waarom je er heen gaat.",
    kop: ".st?!",
    introVoor:
      "Jeau.st eindigt op .st omdat mijn naam daar toevallig in past. Dat is het landendomein van ",
    land: "São Tomé en Príncipe",
    introNa:
      ". Ik ben er twee keer geweest, en sindsdien vertel ik graag waar die twee letters vandaan komen.",
    alineas: [
      "São Tomé en Príncipe ligt in de Golf van Guinee, een paar honderd kilometer voor de kust van Gabon. Twee vulkanische eilanden met regenwoud tot aan het water, een paar kleine eilandjes eromheen, en de evenaar die er dwars doorheen loopt. Er wonen ruim tweehonderdduizend mensen en de taal is Portugees. Op de Seychellen na is het het kleinste land van Afrika.",
      "Toen Portugese zeevaarders rond 1470 aankwamen, woonde er niemand. Dat maakte de eilanden bruikbaar voor wat erna kwam. Er werd suikerriet geplant en het werk werd gedaan door mensen die van het vasteland werden weggehaald en tot slaaf gemaakt. São Tomé groeide uit tot een doorvoerhaven in de trans-Atlantische slavenhandel, met Brazilië als bestemming.",
      "In de negentiende eeuw kwamen cacao en koffie, verbouwd op grote plantages die roças heten. Begin twintigste eeuw was dit land een van de grootste cacao-exporteurs ter wereld. De slavernij was toen officieel afgeschaft, het werk op de roças bleef dwangarbeid onder een andere naam. In 1975 werd het land onafhankelijk van Portugal.",
      "In 1641 voer een vloot van de West-Indische Compagnie onder Cornelis Jol, bijgenaamd Houtebeen, de haven van São Tomé binnen en nam het eiland in. Datzelfde jaar viel Luanda. Dat was geen toeval: de WIC had Nederlands-Brazilië in handen en wilde ook de aanvoer van tot slaaf gemaakte mensen die de suikerplantages daar draaiende hield.",
      "Lang duurde het niet. Het klimaat sloopte de bezetting en in 1648 stuurde Salvador Correia de Sá, gouverneur van Rio de Janeiro, een vloot om het gebied terug te halen. Luanda viel als eerste, kort daarna gaven de Nederlanders ook São Tomé op. Zeven jaar Nederlands bestuur, en het ging van begin tot eind over slavenhandel. Je vindt het nauwelijks terug in de Nederlandse geschiedenisles.",
      "Het land is arm en kwetsbaar. Vrijwel alles komt per schip binnen, inclusief de brandstof voor de elektriciteitscentrales, dus een prijsstijging op de wereldmarkt komt hier hard aan. Stroomuitval is gewoon. De cacao is nog steeds de belangrijkste export, tegenwoordig vaak biologisch en met een keurmerk voor de Europese markt.",
      "Werk is schaars, dus jonge mensen vertrekken naar Portugal. Er is jaren gehoopt op olie voor de kust, die hoop heeft tot nu toe niets opgeleverd. Toerisme groeit langzaam en is een van de weinige manieren waarop geld in het land zelf terechtkomt.",
      "En toch: het is er veilig. Criminaliteit tegen bezoekers is zeldzaam en de sfeer is rustig en vriendelijk, iets wat vrijwel iedereen die er geweest is als eerste noemt. Ook mooi: regenwoud dat tot aan zee doorloopt, lege zwarte en gele stranden, en de Pico Cão Grande, een rotspijp van ruim driehonderd meter die uit het groen omhoog steekt.",
      "Je kunt er slapen op een oude roça, cacao volgen van boon tot reep, zeeschildpadden zien die eieren leggen en tussen juli en oktober bultruggen voor de kust. Er komen weinig toeristen, dus je staat nergens in de rij.",
    ],
    fotos: {
      kerk: "Een wit kerkje op de rotsen waar een rivier in zee uitkomt, met een rode houten brug ernaartoe en mensen onder de luifel.",
      paleis:
        "Vier schoolmeisjes in uniform lopen langs het roze presidentieel paleis, met de vlag van Sao Tome en Principe ernaast.",
      muur: "Een verweerde muur met een verbleekte verkiezingsmuurschildering: een gezicht dat grotendeels is weggesleten, met de woorden Vota, Vida en Amor ernaast.",
      kinderen:
        "Een groep kinderen en een jongeman op een grasveld, poserend voor de camera met een bal bij hun voeten.",
      pico: "De Pico Cao Grande, een smalle rotspijp die uit het beboste heuvelland omhoog steekt, met wolkenflarden eromheen.",
      baai: "Uitzicht vanaf een heuvel over bos en palmen op een baai, met een landtong en een rotspunt die vaag in de nevel staan.",
    },
    reizenIntro: "Ga je zelf? Er zijn twee makkelijke manieren om er te komen.",
    reizen: [
      { tekst: "saoferias.st", uitleg: "voor een reis die je zelf invult" },
      { tekst: "Djoser", uitleg: "voor een groepsrondreis" },
    ],
  },

  llms: {
    belofte:
      "{naam} richt Pipedrive in, koppelt je systemen aan elkaar en automatiseert handwerk. Voor mkb en scale-ups met projecten die lang duren, vanuit {plaats}.",
    paginas: "Pagina's",
    diensten: "Diensten",
    contact: "Contact",
    andereTaal: "Deze site in het Engels",
    regels: {
      home: "Wat Jeau.st doet, voor wie, en de vier soorten werk in het kort.",
      diensten:
        "Overzicht van de diensten, en waar deze aanpak het beste werkt.",
      aanpak:
        "De vier stappen van de denkwijze, de zes stappen van een opdracht, het ritme na de oplevering en de veelgestelde vragen.",
      werk: "Vier geanonimiseerde opdrachten als situatie, aanpak en resultaat.",
      over:
        "Wie je spreekt, waar de achtergrond vandaan komt en waarom dit werk gedaan wordt.",
      contact: "Een belafspraak van 30 minuten plannen of mailen.",
      privacy: "Welke gegevens de site verwerkt en welke niet.",
      st: "Het verhaal achter het domein en achter Sao Tome en Principe.",
    },
    titels: {
      home: "Home",
      diensten: "Diensten",
      aanpak: "Aanpak",
      werk: "Werk",
      over: "Over Jeau.st",
      contact: "Contact",
      privacy: "Privacy",
      st: "Waarom .st",
    },
  },
};

const en: typeof nl = {
  algemeen: {
    naarInhoud: "Skip to content",
    todoAchtervoegsel: ", still to be written:",
    knopTodo: "TODO: booking link",
    kvk: "Dutch trade register",
    opDezePagina: "On this page",
    kruimelpad: "Breadcrumb",
    themaLicht: "Switch to light mode",
    themaDonker: "Switch to dark mode",
    land: "the Netherlands",
  },

  taal: {
    naam: "English",
    naarAndere: "This page in Dutch",
    naarAndereHome: "To the Dutch home page",
  },

  kop: {
    hoofdmenu: "Main menu",
    menu: "Menu",
    dienstenTonen: "Show all services",
    dienstenVerbergen: "Hide all services",
    paneelkop: "Five kinds of work",
    menuLinks: {
      diensten: "Services",
      aanpak: "Approach",
      werk: "Work",
      over: "About",
      contact: "Contact",
    },
  },

  voet: {
    belofte: "CRM and process automation for small and mid-sized companies.",
    onderdeelVan1: "{naam} is part of the",
    onderdeelVan2: "{studio} collective",
    diensten: "Services",
    linkedin: "Connect on LinkedIn",
    privacy: "Privacy",
    st: ".st?!",
  },

  tekeningen: {
    schema:
      "One ring with everything the work touches on it. On one side what you already have: the mailbox, the accounts, quotes, WhatsApp, the phone, the website and the calendar. On the other side what you get out of it: projects, reporting, workflows, AI and databases.",
    cyclusKort: ["process", "automate", "measure"],
    cyclusOpnieuw: "again",
    kaartTitel: "Map of São Tomé and Príncipe in the Gulf of Guinea",
  },

  stappen: {
    caption: "The six steps of a project, and who does what in each one",
    stap: "Step",
    ik: "I do",
    jij: "You do",
    eind: "At the end",
  },

  opdracht: {
    situatie: "Situation",
    aanpak: "Approach",
    resultaat: "Result",
  },

  home: {
    titel: "Jeau.st - CRM and process automation for growing companies",
    beschrijving:
      "Joost Beers sets up Pipedrive, connects your systems and takes the manual work out. For growing companies stuck in loose systems and spreadsheets.",
    kopVoor: "",
    kopNa: " always does that",
    naamTitel: "Pick another name",
    leadVoor: "Until ",
    leadMidden: " goes on holiday. Then it turns out the process only lived in ",
    leadNa:
      " head. I build a system that works for your whole team, with data clean enough for your AI to use.",
    herkenningKop: "Sound familiar?",
    herkenningIntro: "Three things I hear in almost every conversation.",
    volgordeKop: "The order is the work",
    volgordeIntro:
      "First write down how the work really goes, then pick one way of working. After that: automating, measuring and getting better round after round.",
    volgordeLink: "Read why the order is what it is",
    dienstenKop: "What I do",
    dienstenIntro:
      "Five kinds of work.",
    dienstenLink: "See all services",
    werkKop: "Results",
    werkIntro:
      "Three projects, and what changed after go-live. The icons are the parts of the ring above that were tackled.",
    werkLink: "Read the projects in full",
    overKop: "About Jeau.st",
    fotoAlt: "{naam} at the desk",
    overTekst:
      "Jeau.st sits in {plaats}, at {studio}. Behind the name is {naam}, integration king and process nerd, with ten years in sales teams, data analysis, system implementations and integrations.",
    overLink: "Read where that experience comes from",
    plannenKop: "Start by telling me what gets stuck",
    plannenTekst:
      "Thirty minutes, over Teams. I ask questions and say honestly whether I am the right person. If I am not, I usually know someone who is.",
  },

  diensten: {
    titel: "Services: CRM, integrations and automation | Jeau.st",
    beschrijving:
      "Setting up Pipedrive, connecting your systems, figures you can steer on, and support after go-live. By Joost Beers in 's-Hertogenbosch.",
    schemaNaam: "Services from Jeau.st",
    kop: "CRM, integrations and automation",
    intro:
      "Five kinds of work. The first four follow the order I tackle them in: your process in Pipedrive first, then the integrations onto it, then the figures about it, and the support runs on from there. The fifth is the layer underneath, where your enquiries come in.",
    trajectLink: "Read how a project runs",
    functiesLink: "See what Pipedrive can do",
    plannenKop: "Which of these you need",
    plannenTekst:
      "That comes out in a 30-minute call. Sometimes it is one of them, and more often it starts with the process.",
  },

  dienst: {
    watKrijgJe: "What it is and what it gives you",
    watHetIs: "What it is",
    watHetOplevert: "What it gives you",
    functies: "What Pipedrive can do",
    ai: "AI on your own data",
    functiesSlot:
      "You do not need all of this switched on. Which of it you use follows from your process, and that is exactly the order I work in.",
    aiIntro:
      "AI is only as good as the data under it. If your process sits in a system and what is in there is right, you can do something with it.",
    aiSlot:
      "An AI that gives the wrong answer because a field was empty is worse than no AI. Data quality belongs in the setup: fields that are required where it counts, and locked down where not everyone should be changing them.",
    verder: "The other services",
    trajectLink: "Read how a project runs",
    todo:
      "describe here how {dienst} goes in practice: what you run into, which choice you make that someone else would not, and what people expect wrongly. Without that, this page is too thin to rank.",
    plannenKop: "Is this what you are looking for?",
    plannenTekst:
      "Tell me in half an hour what gets stuck. I will say honestly whether I am the right person.",
  },

  aanpak: {
    titel: "Approach: the process first, then automation | Jeau.st",
    beschrijving:
      "First write down and standardise the process, then automate where most of the time goes, then make it measurable. And then round again.",
    kop: "The process first, then the technology",
    intro:
      "Automating is not hard. The hard part is knowing what to automate. That is why it always goes in the same four steps here, and why the last step is to go back to the first.",
    delen: {
      volgorde: "The four steps",
      niveaus: "Where are you now?",
      stappen: "How a project runs",
      daarna: "Staying involved after go-live",
      werkwijze: "How I work",
      vragen: "Frequently asked questions",
    },
    niveausIntro:
      "Not everyone starts at 01. Read these four and see which one looks most like your company.",
    niveausSlot:
      "If you sit somewhere in between, that is normal. Sales is often at a different level than the back office.",
    stappenIntro:
      "The four steps above are the thinking. Below is how that runs in practice, with what I do, what you do and what is there at the end of each step.",
    daarnaIntro: "Go-live is the beginning. This is the rhythm after it.",
    daarnaLink: "Read what support and training covers",
    werkwijzePunten: [
      {
        kop: "If nobody but me understands it, it is built too cleverly",
        tekst:
          "The simplest version that works wins. Clever is allowed, but only where it really saves something. A construction only I can maintain makes you dependent on me. You do not want that, and neither do I.",
      },
      {
        kop: "You talk to the person who builds it",
        tekst:
          "The same person sits at the table for the first conversation and at go-live.",
      },
      {
        kop: "The team decides whether it works",
        tekst:
          "A system nobody uses is money thrown away. So I speak to the people who will work with it during the analysis, and training is part of the work instead of coming after it.",
      },
      {
        kop: "I would rather give you something next month that works",
        tekst: "Than a plan that is finished in a year.",
      },
    ],
    plannenKop: "Where your round starts, I do not know yet",
    plannenTekst:
      "That comes out in a 30-minute call. After it you know whether talking further makes sense.",
  },

  werk: {
    titel: "Work: examples from practice | Jeau.st",
    beschrijving:
      "Anonymised examples of CRM implementations, integrations and automations, written up as situation, approach and result.",
    kop: "Examples of work",
    intro:
      "Anonymised, because it covers the systems and figures of clients. Written up as situation, approach and result, so you can see whether it looks like your situation.",
    todo:
      "this page is still entirely placeholders. Fill in the projects in Keystatic, or take Work out of the menu until there is content.",
    plannenKop: "Does this look like what you need?",
    plannenTekst:
      "In a 30-minute call you will hear whether your situation looks like this and what it would take.",
  },

  over: {
    titel: "Joost Beers, CRM consultant in 's-Hertogenbosch | Jeau.st",
    beschrijving:
      "Jeau.st does Pipedrive implementations, integrations and automation from 's-Hertogenbosch. Behind the name is Joost Beers, with ten years of experience.",
    functie: "CRM consultant and process automation specialist",
    label: "About",
    kop: "Systems that talk to each other",
    intro:
      "Jeau.st sets up CRMs, connects systems to each other and takes the manual work out from between them. From {plaats}, at {studio}.",
    fotoAlt: "{naam} at the desk",
    wieKop: "Who you are talking to",
    wieAlineas: [
      "{naam}, integration king and process nerd. I like systems that talk to each other, and processes that make sense because they were thought through, not because they always went that way.",
      "Whoever sits at the table for the first conversation also builds it. So I turn down work when I think someone else would do it better.",
    ],
    achtergrondKop: "Where I learned it",
    achtergrondAlineas: [
      "Ten years of experience, with sales teams, data analysis, system implementations and integrations. The same system seen from the build, from the use and from the figures. In recent years that meant three full Pipedrive implementations, migration and custom work included.",
      "And everywhere I saw the same thing: what is complicated does not get used. Someone invents a detour around it, and the detour becomes the process.",
      "That is where my main rule comes from. If nobody but me understands it, it is built too cleverly.",
      "The rule holds for AI too, and AI is in almost everything I build by now. A step that reads text and pulls out what has to go into the system, or an MCP server that lets Claude talk straight to your CRM. Fine, as long as you can check what it did. If you cannot, it does not go in.",
    ],
    achtergrondLink: "Read how I work",
    waaromKop: "Why I do it",
    waaromAlineas: [
      "A small company deserves as tight a process and as good a set of systems as a large one, and AI belongs in that by now. At a small company I also see straight away what my work is worth.",
      "You see that in how the work runs. You have one point of contact, from the first conversation to half a year after go-live, and that is the person who built the system.",
    ],
    linkedin: "Let's connect on LinkedIn",
    stLink: "Why the domain ends in .st",
    plannenKop: "Now I would like to know who you are",
    plannenTekst:
      "Thirty minutes, over Teams. You tell me what gets stuck and I ask questions.",
  },

  contact: {
    titel: "Contact: book a call | Jeau.st",
    beschrijving:
      "Book a 30-minute call with Joost Beers to talk through what gets stuck, or get in touch by email or LinkedIn.",
    kop: "Book a call",
    intro:
      "Thirty minutes, over Teams. You tell me what gets stuck, I ask questions and say honestly whether I am the right person. There is no obligation attached.",
    gegevensKop: "Rather get in touch directly",
    gegevensIntro:
      "Booking a call is the quickest, but an email works too.",
    mail: "Email",
    linkedin: "LinkedIn",
    onderdeelVan: "Part of {studio}",
  },

  privacy: {
    titel: "Privacy and what happens to your data | Jeau.st",
    beschrijving:
      "How Jeau.st handles your data: cookie-free visitor statistics, and a map from OpenStreetMap on one page.",
    kop: "Privacy",
    intro:
      "Short, because there is little to report. This site sets no cookies and does not track you. One page shows a map that comes from somewhere else.",
    voorrang:
      "This is a translation of the Dutch page. If the two differ, the Dutch version applies.",
    statistiekKop: "Visitor statistics",
    statistiekTekst:
      "I use Cloudflare Web Analytics. It works without cookies and without building a profile of you. I see how many people look at which page, not who you are.",
    contactKop: "If you get in touch",
    contactTekst:
      "If you email or call, I keep what you send for as long as I need it to help you. If you book a call, that runs through Microsoft Bookings, so your name, email address and the slot you picked end up with Microsoft and after that in my CRM.",
    rechtenKop: "Your rights",
    rechtenVoor:
      "You can ask which data I hold about you, have it corrected or have it deleted. An email to ",
    rechtenNa: " is enough.",
    kaartKop: "The map on the page about .st",
    kaartTekst:
      "That one page shows a map from OpenStreetMap. As soon as you scroll past it, your browser loads it from OpenStreetMap and they see your IP address. If you do not scroll there, nothing happens. On the rest of the site there is no component from another company at all. Google Maps used to be here; OpenStreetMap is a foundation that sells no advertising, which saves you a party with an interest in who you are.",
    verwerkersKop: "Processors",
    verwerkersIntro:
      "These are the parties that data reaches when you visit this site or get in touch.",
    verwerkers: [
      {
        naam: "Cloudflare",
        waarvoor:
          "Hosting for this site and the visitor statistics. Your IP address passes through their network to get the page to you.",
      },
      {
        naam: "Microsoft",
        waarvoor:
          "My mail and calendar run on Microsoft 365, and the booking page is Microsoft Bookings. So what you fill in there and what you email sits with Microsoft.",
      },
      {
        naam: "Pipedrive",
        waarvoor:
          "My CRM. If you get in touch or book a call, I record your name, your company and what we talked about there.",
      },
      {
        naam: "OpenStreetMap",
        waarvoor:
          "Only the map on the page about .st, and only if you scroll to it. OpenStreetMap is a foundation and not an advertising company.",
      },
    ],
    gegevensKop: "Contact",
  },

  st: {
    titel: "Why .st? About Sao Tome and Principe | Jeau.st",
    beschrijving:
      "Jeau.st ends in .st, the country domain of Sao Tome and Principe. About the history of those islands, the Dutch part included, and why you would go.",
    kop: ".st?!",
    introVoor:
      "Jeau.st ends in .st because my name happens to fit it. That is the country domain of ",
    land: "São Tomé and Príncipe",
    introNa:
      ". I have been there twice, and ever since I have been glad to tell people where those two letters come from.",
    alineas: [
      "São Tomé and Príncipe lies in the Gulf of Guinea, a few hundred kilometres off the coast of Gabon. Two volcanic islands with rainforest running down to the water, a handful of smaller islands around them, and the equator straight through the middle. Just over two hundred thousand people live there and the language is Portuguese. After the Seychelles it is the smallest country in Africa.",
      "When Portuguese sailors arrived around 1470, nobody lived there. That made the islands usable for what came next. Sugar cane was planted and the work was done by people taken from the mainland and enslaved. São Tomé grew into a transit port in the transatlantic slave trade, with Brazil as the destination.",
      "In the nineteenth century came cocoa and coffee, grown on large plantations called roças. By the early twentieth century this country was one of the largest cocoa exporters in the world. Slavery had officially been abolished by then; the work on the roças stayed forced labour under another name. In 1975 the country became independent from Portugal.",
      "In 1641 a fleet of the Dutch West India Company under Cornelis Jol, nicknamed Peg Leg, sailed into the harbour of São Tomé and took the island. Luanda fell the same year. That was no coincidence: the company held Dutch Brazil and wanted the supply of enslaved people that kept the sugar plantations there running.",
      "It did not last long. The climate wrecked the occupying force, and in 1648 Salvador Correia de Sá, governor of Rio de Janeiro, sent a fleet to take the territory back. Luanda fell first, and shortly after that the Dutch gave up São Tomé as well. Seven years of Dutch rule, and it was about the slave trade from beginning to end. You will hardly find it in a Dutch history lesson.",
      "The country is poor and exposed. Almost everything arrives by ship, including the fuel for the power stations, so a price rise on the world market lands hard here. Power cuts are normal. Cocoa is still the main export, these days often organic and certified for the European market.",
      "Work is scarce, so young people leave for Portugal. For years there was hope of oil off the coast, and so far that hope has produced nothing. Tourism grows slowly and is one of the few ways money ends up in the country itself.",
      "And still: it is safe there. Crime against visitors is rare and the mood is calm and friendly, which is the first thing almost everyone who has been mentions. Also worth it: rainforest that runs all the way to the sea, empty black and yellow beaches, and the Pico Cão Grande, a rock spire of over three hundred metres sticking up out of the green.",
      "You can sleep on an old roça, follow cocoa from bean to bar, watch sea turtles laying eggs, and between July and October humpbacks off the coast. Few tourists come, so you queue for nothing.",
    ],
    fotos: {
      kerk: "A small white church on the rocks where a river meets the sea, with a red wooden bridge to it and people under the canopy.",
      paleis:
        "Four schoolgirls in uniform walking past the pink presidential palace, with the flag of Sao Tome and Principe beside it.",
      muur: "A weathered wall with a faded election mural: a face largely worn away, with the words Vota, Vida and Amor next to it.",
      kinderen:
        "A group of children and a young man on a patch of grass, posing for the camera with a ball at their feet.",
      pico: "The Pico Cao Grande, a narrow rock spire rising out of forested hills, with wisps of cloud around it.",
      baai: "A view from a hill over forest and palms onto a bay, with a headland and a rock point faint in the haze.",
    },
    reizenIntro:
      "Going yourself? There are two easy ways to get there.",
    reizen: [
      { tekst: "saoferias.st", uitleg: "for a trip you put together yourself" },
      { tekst: "Djoser", uitleg: "for a group tour, in Dutch" },
    ],
  },

  llms: {
    belofte:
      "{naam} sets up Pipedrive, connects your systems to each other and automates manual work. For small and growing companies with long-running projects, from {plaats}.",
    paginas: "Pages",
    diensten: "Services",
    contact: "Contact",
    andereTaal: "This site in Dutch",
    regels: {
      home: "What Jeau.st does, who for, and the four kinds of work in short.",
      diensten: "An overview of the services, and where this approach works best.",
      aanpak:
        "The four steps of the thinking, the six steps of a project, the rhythm after go-live and the frequently asked questions.",
      werk: "Four anonymised projects as situation, approach and result.",
      over:
        "Who you are talking to, where the experience comes from and why this work gets done.",
      contact: "Booking a 30-minute call, or getting in touch by email.",
      privacy: "Which data the site processes and which it does not.",
      st: "The story behind the domain and behind Sao Tome and Principe.",
    },
    titels: {
      home: "Home",
      diensten: "Services",
      aanpak: "Approach",
      werk: "Work",
      over: "About Jeau.st",
      contact: "Contact",
      privacy: "Privacy",
      st: "Why .st",
    },
  },
};

export type Teksten = typeof nl;

export const teksten: PerTaal<Teksten> = { nl, en };
