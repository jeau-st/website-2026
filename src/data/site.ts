/**
 * Alle inhoud die op meerdere plekken terugkomt staat hier, zodat een
 * wijziging op één plek gebeurt. Alles met `todo: true` of een TODO-tekst
 * wordt op de pagina zichtbaar gemarkeerd en staat in de oplevernotitie.
 */

export const bedrijf = {
  naam: "Jeau.st",
  persoon: "Joost Beers",
  plaats: "'s-Hertogenbosch",
  kvk: "88930343",
  email: "joost@jeau.st",
  linkedin: "https://www.linkedin.com/in/jfbeers",
} as const;

/*
 * Hier stond het mobiele nummer, en het stond daardoor in de voet van elke
 * pagina, op /contact, in de JSON-LD en in llms.txt. Het is eraf gehaald en
 * niet achter een knop gezet: een knop houdt alleen de scrapers tegen die
 * de html lezen en niet die met een echte browser eronder, en in de
 * gestructureerde data stond het er sowieso leesbaar naast.
 *
 * Een mobiel nummer is aan de persoon gekoppeld: het trekt acquisitie en
 * scamrondes, het kan gespoofd worden richting klanten, en het is bij veel
 * diensten de herstelroute van een account. Mail is wel verplicht als
 * snelle en rechtstreekse contactmogelijkheid, een telefoonnummer niet.
 *
 * Bereikbaar blijven gaat via de afspraakplanner hieronder en via mail.
 */

/** De enige primaire actie op de site. */
export const cta = {
  label: "Plan een belafspraak",
  toelichting: "30 minuten, via Teams",
  /** Microsoft Bookings, met de boekingscode in de link. */
  url: "https://bookings.cloud.microsoft/bookwithme/user/2ef78e3c29ec43bca11be33f576a3e10@jeau.st/meetingtype/nlsRujOTgECJL73BYpJDlg2?bookingcode=abdaab6c-d3a2-44a2-a511-83faa3f1733e&anonymous&ismsaljsauthenabled&ep=mlink",
} as const;

/**
 * Cloudflare Web Analytics: cookieloos, dus geen cookiemelding nodig.
 * TODO: vul het token uit het Cloudflare-dashboard in. Leeg betekent
 * dat de beacon niet geladen wordt.
 */
export const analyticsToken = "";

export type Pijnpunt = {
  citaat: string;
  uitleg: string;
};

export const pijnpunten: Pijnpunt[] = [
  {
    citaat: "Data staat in vijf systemen",
    uitleg:
      "Een klant staat in de mailbox, in een Excel, in de boekhouding en in het CRM. Elke vraag over omzet begint dus met uitzoeken in plaats van kijken.",
  },
  {
    citaat: "Iedereen doet het op zijn eigen manier",
    uitleg:
      "Twee verkopers, drie werkwijzen. Dat gaat goed tot iemand uitvalt of er iemand bij komt.",
  },
  {
    citaat: "Automatiseren wil ik wel, maar waar begin ik",
    uitleg:
      "Je ziet dat het handwerk tijd kost, maar niet welke stap je als eerste moet pakken. Dus blijft het bij een voornemen en typt iedereen door.",
  },
];

export type Denkstap = {
  nummer: string;
  titel: string;
  tekst: string;
};

/**
 * De ruggengraat van de site: niet wat ik doe, maar in welke volgorde.
 * Dit is een rondje en geen rechte lijn, dus de vierde stap wijst terug
 * naar de eerste. De processtappen verderop zijn de projectvolgorde;
 * deze vier zijn de denkwijze en gaan voor.
 */
export const denkwijze: Denkstap[] = [
  {
    nummer: "01",
    titel: "Eerst het proces",
    tekst:
      "We leggen vast hoe het nu echt gaat, inclusief de omwegen die niemand opschrijft. Daarna kiezen we één manier van werken in plaats van drie. Sla je die stap over, dan gaat de rommel straks alleen sneller.",
  },
  {
    nummer: "02",
    titel: "Dan pas automatiseren",
    tekst:
      "En niet alles. We beginnen waar de meeste tijd in gaat zitten.",
  },
  {
    nummer: "03",
    titel: "Dan meetbaar maken",
    tekst:
      "Een paar cijfers waar je iets aan hebt. Want je verbetert alleen waar je zicht op hebt.",
  },
  {
    nummer: "04",
    titel: "Dan opnieuw",
    tekst:
      "Je bedrijf verandert, dus het proces verandert mee. Er komt geen moment waarop je klaar bent. Reken erop dat je dit rondje blijft maken.",
  },
];

export type Dienst = {
  /** Wordt de URL: /diensten/<slug>. Niet wijzigen zonder redirect. */
  slug: string;
  titel: string;
  tekst: string;
  /**
   * Een regel van een woord of vijf, voor het menu en de band op de
   * homepage. `tekst` is de volle alinea van de pagina zelf: in een rijtje
   * van vijf wordt dat vijf afgekapte halve zinnen.
   */
  kort: string;
  /** Het Lucide-icoon uit `src/icons`, zonder .svg. Zie Icoon.astro. */
  icoon: string;
  punten: string[];
  /** De h1 op de eigen pagina. Mag langer zijn dan de titel in de lijst. */
  kop: string;
  /** Meta description van die pagina. Eén zin, met het zoekwoord erin. */
  meta: string;
  /** Voor wie deze dienst is. Staat onder de kop op de eigen pagina. */
  voorWie?: string;
  /** Het inhoudelijke stuk. Zonder deze blokken is de pagina te dun. */
  verhaal?: { kop: string; alineas: string[] }[];
  /**
   * Blokken die niet uit `verhaal` komen maar uit een eigen lijst in dit
   * bestand. Ze stonden op /pipedrive, een losse pagina naast /diensten.
   * Die pagina ging over het product en niet over het werk, en wie hem
   * las had daarna alsnog de inrichting nodig. Nu staan ze op de dienst
   * waar ze bij horen. Zie `src/pages/diensten/[slug].astro`.
   */
  extra?: ("functies" | "ai")[];
};

export const diensten: Dienst[] = [
  {
    slug: "crm-inrichting",
    extra: ["functies", "ai"],
    kort: "Pipedrive op jouw verkoopproces, en wat het kan",
    icoon: "settings-2",
    titel: "CRM-inrichting",
    kop: "Pipedrive inrichten op jouw verkoopproces",
    meta: "Pipedrive ingericht op hoe jij verkoopt, inclusief migratie uit Excel of een oud systeem, en wat er in Pipedrive zit. Door een Pipedrive-consultant uit 's-Hertogenbosch.",
    voorWie:
      "Voor bedrijven die nog met Excel-bestanden werken, of met een CRM dat niemand echt gebruikt. Dat systeem is dan slecht ingericht, het hangt nergens aan vast, of allebei. Een nieuw systeem kiezen is zo gebeurd. De vraag is wat er met je bestaande gegevens gebeurt.",
    verhaal: [
      {
        kop: "De migratie is het eigenlijke werk",
        alineas: [
          "Gegevens overzetten klinkt als kopiëren. Dat is het niet. In een oude database of een Excel staat elke kolom er met een reden, en die reden staat nergens opgeschreven. Een veld dat status heet, betekent bij verkoop iets anders dan bij de administratie. Voordat er iets overgaat, zoek ik uit hoe die gegevens tot stand zijn gekomen.",
          "Daarna gaan ze het nieuwe proces in, en dat is één manier van werken voor iedereen. Soms betekent dat samenvoegen, soms weggooien, en soms blijkt dat twee afdelingen hetzelfde woord voor iets anders gebruiken. Die gesprekken horen bij de inrichting.",
          "Je kunt ook fris beginnen. Dat is sneller en het gebeurt vaker dan je zou denken. Toch neem ik de historie mee, want een klant van vier jaar geleden kan morgen bellen. Op dat moment wil je zien wat je destijds hebt afgesproken.",
        ],
      },
    ],
    tekst:
      "Pipedrive ingericht op hoe jij verkoopt, inclusief de stappen die alleen bij jou zo gaan.",
    punten: [
      "Pipelines en fases die je proces volgen",
      "Migratie uit Excel, mailbox of een oud systeem",
      "Velden, rechten en rapportage",
    ],
  },
  {
    slug: "koppelingen-en-automatisering",
    kort: "Systemen aan elkaar, niets twee keer invoeren",
    icoon: "workflow",
    titel: "Koppelingen en automatisering",
    kop: "Je systemen aan elkaar koppelen",
    meta: "Koppelingen tussen CRM, administratie en mail, gebouwd met n8n, zodat niemand hetzelfde twee keer invoert.",
    voorWie:
      "Voor bedrijven waar dezelfde gegevens in meerdere systemen moeten staan, en waar iemand dat nu met de hand bijhoudt. Een koppeling is geen vast ding: het kan een knop zijn die je indrukt, een sync die elke nacht loopt, of iets dat afgaat zodra er in het ene systeem iets verandert.",
    verhaal: [
      {
        kop: "Hoe vaak moet het overgaan?",
        alineas: [
          "Dat is de eerste vraag, en het antwoord volgt uit je proces. Een offerte die akkoord is, mag meteen door naar de boekhouding. Een urenregistratie kan prima een nachtje wachten. Real-time klinkt altijd beter, maar het kost meer onderhoud en je merkt het verschil alleen als iemand binnen het uur iets met die gegevens doet.",
          "We kiezen daarom wat minimaal nodig is om het goed te laten werken. Dat is goedkoper om te bouwen en er gaat minder stuk.",
        ],
      },
      {
        kop: "Eerst kijken of het al bestaat",
        alineas: [
          "Pipedrive heeft een marktplaats, en een flink aantal partijen heeft er een eigen integratie voor gebouwd. DocuSign om documenten te laten ondertekenen, CloudTalk voor je telefonie. Werkt zo'n kant-en-klare koppeling voor jouw situatie, dan scheelt dat een hoop bouwwerk.",
          "Zelf bouwen komt daarna. Een voorbeeld van wat dat oplevert: de koppeling tussen een telefooncentrale en het CRM. Een gemiste oproep of een voicemail komt automatisch bij de juiste persoon te staan, en de accountmanager van die klant krijgt de taak om terug te bellen of het bericht af te luisteren.",
        ],
      },
      {
        kop: "Zelf in beheer, en in stukken",
        alineas: [
          "Ik bouw met n8n. Dat is van een Duits bedrijf en de cloudversie draait op servers in de EU. Het werkt goed samen met AI-modellen, en je kunt het in eigen beheer houden. Dat laatste weegt voor mij het zwaarst: je ziet precies welke informatie wanneer waarheen gaat. Mis je iets in een systeem, dan zie je waar het is blijven steken. Wil je zelf meekijken als er iets misgaat, dan kan dat.",
          "Eén grote workflow die alles doet, is één ding dat kan omvallen. Ik hak ze daarom op in stukken met elk hun eigen foutafhandeling, zodat de rest doorloopt als er ergens iets vastloopt. Die stukken zijn ook herbruikbaar: contactgegevens bijwerken, of kijken of iemand al bestaat voordat er een tweede contact wordt aangemaakt. Dat komt in bijna elk project terug.",
        ],
      },
      {
        kop: "Wat je niet moet verwachten",
        alineas: [
          "Dat het een knop is die je omzet en dat het daarna werkt zoals jij het wil. Een koppeling is maatwerk, en als je proces verandert, moet de koppeling mee veranderen. Daar denk ik in mee.",
        ],
      },
    ],
    tekst:
      "Systemen die elkaar iets doorgeven, zodat niemand hetzelfde twee keer invoert.",
    punten: [
      "Koppelingen tussen CRM, administratie en mail",
      "Terugkerend handwerk weg",
    ],
  },
  {
    slug: "cijfers-en-ai",
    kort: "Rapportage en AI op je eigen cijfers",
    icoon: "chart-column",
    titel: "Cijfers waar je op kunt sturen",
    kop: "Cijfers waar je op kunt sturen, en AI die je data kent",
    meta: "Rapportage op wat je echt wilt weten, signalen als er iets misgaat, en AI die met je eigen cijfers werkt via Claude en MCP.",
    voorWie:
      "Voor bedrijven die wel rapportages hebben maar er niet op sturen, en voor wie AI op de eigen gegevens wil loslaten.",
    verhaal: [
      {
        kop: "Het dashboard van een auto",
        alineas: [
          "Daar staan twee soorten cijfers op. Snelheid, toerental en temperatuur heb je nu nodig, daar stuur je op terwijl je rijdt. Het aantal gereden kilometers, de buitentemperatuur en wanneer je moet tanken zeggen iets over de komende tijd. Een rapportage werkt net zo, en als je die twee door elkaar zet kijkt niemand er meer naar.",
          "Welke cijfers dat bij jou zijn, verschilt per bedrijf. Meestal gaat het over nieuwe aanvragen, hoe die ervoor staan, welke activiteiten eraan vasthangen, en wat er financieel aan zit te komen tegenover wat er binnen is.",
        ],
      },
      {
        kop: "AI die je eigen cijfers kent",
        alineas: [
          "Pipedrive heeft een MCP-server. Daarmee praat Claude rechtstreeks met je CRM, en krijg je antwoord op vragen waar je anders zelf lang voor had zitten zoeken. Een filter of een eenmalig inzicht is zo gemaakt, en een grote bulkwijziging kun je er ook mee doen.",
        ],
      },
      {
        kop: "Dan moet je data wel kloppen",
        alineas: [
          "Een AI die het verkeerde antwoord geeft omdat een veld leeg was, is erger dan geen AI. Datakwaliteit hoort daarom in het proces te zitten en niet in een opschoonactie achteraf. In Pipedrive kun je velden verplicht maken, ze als belangrijk markeren, of juist afschermen zodat niet iedereen ze kan wijzigen. Dan blijft kloppen wat erin staat zonder dat iemand erachteraan moet.",
        ],
      },
      {
        kop: "Waar je gegevens heengaan",
        alineas: [
          "Klantgegevens kun je niet zomaar naar een server sturen, binnen de EU of daarbuiten. Daar moet een grondslag voor zijn en het hoort in je privacyverklaring te staan. Voor AI geldt hetzelfde: wat je in een prompt zet, gaat naar de aanbieder van dat model.",
          "Ik kijk daarom mee met hoe je er qua AVG voor staat en welke punten aandacht verdienen. Welke gegevens er wel en niet in mogen, leggen we vast voordat er iets aanstaat.",
        ],
      },
    ],
    tekst:
      "Een paar getallen die kloppen zijn meer waard dan een dashboard waar niemand naar kijkt.",
    punten: [
      "Rapportage op wat je wilt weten",
      "Signalen als er iets misgaat",
      "AI die je eigen cijfers kent, via Claude en MCP",
      "Afspraken over wat er wel en niet in de AI gaat",
    ],
  },
  {
    slug: "ondersteuning-en-training",
    kort: "Training en onderhoud na de oplevering",
    icoon: "graduation-cap",
    titel: "Ondersteuning en training",
    kop: "Training en onderhoud na de oplevering",
    meta: "Training op je eigen werkwijze en een onderhoudsabonnement, zodat het systeem ook een half jaar later nog gebruikt wordt.",
    voorWie:
      "Een systeem inrichten op hoe de wereld er vandaag uitziet is één ding. Zorgen dat het over een half jaar nog klopt en nog gebruikt wordt, is een tweede.",
    verhaal: [
      {
        kop: "Wat een onderhoudsabonnement is",
        alineas: [
          "Dat ik de telefoon opneem. Ik reserveer een aantal uur per maand voor je, zodat kleine wijzigingen snel doorgevoerd worden en je niet achteraan een wachtrij staat. En elke twee weken spreek ik één of twee van je superusers over hoe het loopt en wat er op dat moment speelt.",
        ],
      },
      {
        kop: "Training stopt niet bij de oplevering",
        alineas: [
          "Je traint de mensen die er op dat moment mee moeten werken. Maar een team wisselt van samenstelling, en de collega die over een jaar begint was er niet bij. Daarom hoort er naslagwerk te liggen waarin staat hoe het proces is ingericht en waar je wat vindt.",
          "Dit is waar CRM-trajecten vaak stuklopen. Er komt iemand langs die vertelt hoe het moet werken, wijst waar alles staat, en vertrekt weer. Een half jaar later werkt de helft van het team er weer omheen.",
        ],
      },
      {
        kop: "Superusers als borging",
        alineas: [
          "Daarom dring ik erop aan dat er binnen je bedrijf één of meer superusers zijn. Zij zijn intern het eerste aanspreekpunt, ze verzamelen de wensen die er leven en toetsen die aan hoe het systeem bedoeld is. Technisch groeien ze mee, zodat ze richting mij als opdrachtgever kunnen optreden.",
          "Het doel is dat je mij niet meer nodig hebt. Als je intern de mensen hebt die het snappen, help ik ze daar graag naartoe.",
        ],
      },
      {
        kop: "En een stuk cultuur",
        alineas: [
          "Kwam iedereen uit een situatie waarin je je eigen maniertjes had, dan is standaardiseren ook een gewoonte afleren. Er moet minder ruimte komen voor een eigen Excel naast het systeem, en daar stuur je op. Wil iemand iets anders, dan stemt die dat af met een superuser, zodat de nieuwe manier meteen voor het hele team geldt.",
          "Verbeterideeën zijn daarbij welkom. Er zijn altijd mensen die een betere manier zien, en daar hoort iets mee te gebeuren. Werk je zo, dan wordt je systeem over een half jaar nog gebruikt en klopt het nog.",
          "Af komt het trouwens nooit. Standaardiseren, automatiseren en meten brengen je vanzelf bij het volgende dat beter kan. Dat is een prettige cyclus om samen in te zitten.",
        ],
      },
    ],
    tekst:
      "Een systeem werkt pas als het team het gebruikt, ook een half jaar later nog.",
    punten: [
      "Training op de eigen werkwijze",
      "Een onderhoudsabonnement als je me vast bij de hand wilt",
      "Bijsturen als het proces verandert",
    ],
  },
  {
    slug: "website-en-mail",
    kort: "Eén snelle site, en mail die aankomt",
    icoon: "globe",
    titel: "Website en mail",
    kop: "Je website en je mail op orde, en vast aan je CRM",
    meta: "Eén snelle site die je zelf beheert, een formulier dat doorloopt naar Pipedrive, en mail die bij je klant aankomt.",
    voorWie:
      "Voor bedrijven met een site die is blijven staan, of met een paar sites uit verschillende jaren die naast elkaar leven. En voor wie merkt dat mail vanaf het eigen domein in de spam belandt. Dit is de laag onder je CRM: hier komen je aanvragen vandaan.",
    verhaal: [
      {
        kop: "Waarom dit bij het CRM hoort",
        alineas: [
          "Een aanvraag via je site is de eerste stap van je verkoopproces. Komt die binnen als los mailtje, dan begint elke aanvraag met overtypen, en weet je een week later niet meer welke je al hebt opgepakt. Loopt het formulier door naar Pipedrive, dan staat de aanvraag er meteen in, met de velden die je nodig hebt om er iets mee te doen.",
          "Bij een architectenbureau staat er zo'n vragenformulier op de site. Wat iemand invult komt in het CRM, en diegene kan aansluitend zelf een moment inplannen. Daardoor komen er aanvragen binnen waar je meteen mee verder kunt, en zie je per klant waar die in het proces zit.",
        ],
      },
      {
        kop: "Mail die aankomt",
        alineas: [
          "Mail vanaf je eigen domein moet langs drie controles: SPF, DKIM en DMARC. Staan die records niet goed, dan belandt je bericht bij de ontvanger in de spam, of komt het er helemaal niet. Je merkt dat laat, want aan jouw kant ziet het eruit alsof het verstuurd is.",
          "Bij een webshop bleek dat de reden dat een bestelling of een vraag soms onbeantwoord bleef. De mailinstellingen en de bijbehorende records zijn rechtgezet, en daarna kwamen berichten weer aan.",
        ],
      },
      {
        kop: "Waarmee ik bouw",
        alineas: [
          "Een verbouwing begint met kijken wat er al werkt. Welke pagina's brengen bezoekers binnen en op welke zoekwoorden gebeurt dat? Dat is een SEO-audit, en die gaat voor op het ontwerp. Verdwijnen er oude adressen, dan zet ik redirects klaar, zodat je vindbaarheid niet weglekt.",
          "Ik bouw met Astro en host op Cloudflare. Dat levert een site op die snel is en vrijwel niets kost om te draaien. Er kan een eenvoudige editor bij, zodat je zelf schrijft zonder mij. Mail, domeinen en DNS zet ik op accounts die van jou zijn, want anders ben je afhankelijk van degene die ze ooit heeft aangemaakt.",
        ],
      },
      {
        kop: "Waar dit ophoudt",
        alineas: [
          "Dit gaat over het moderniseren van wat er al staat. Een site die is blijven hangen, een paar oude sites die samen moeten, een formulier dat nergens heen gaat, mail die niet aankomt.",
          "Moet het er totaal anders uit komen te zien, met veel nieuwe functionaliteit erbij, dan ben je bij een designbureau beter af. Dat zeg ik dan ook meteen in het eerste gesprek.",
        ],
      },
    ],
    tekst:
      "De plek waar je aanvragen binnenkomen en je antwoorden aankomen, vast aan de rest.",
    punten: [
      "Eén site waar er nu meerdere zijn",
      "Een formulier dat doorloopt naar je CRM",
      "Mail, domeinen en DNS op eigen accounts",
    ],
  },
];

export type Niveau = {
  nummer: string;
  titel: string;
  herkenning: string;
  begin: string;
};

/**
 * De vier niveaus vallen samen met de vier stappen uit `denkwijze`: waar je
 * staat bepaalt waar je begint. Leesbaar bedoeld, zodat iemand zichzelf
 * herkent zonder vragenlijst. De interactieve scan staat in ST-50.
 */
export const niveaus: Niveau[] = [
  {
    nummer: "01",
    titel: "Het zit in hoofden",
    herkenning:
      "Iedereen werkt op zijn eigen manier en dat gaat goed zolang er niemand uitvalt. Een klant staat op vier plekken en welke klopt, weet niemand zeker.",
    begin: "Begin bij het proces. Vastleggen en standaardiseren.",
  },
  {
    nummer: "02",
    titel: "Het proces staat, het handwerk ook",
    herkenning:
      "Er is één manier van werken en die staat ergens opgeschreven. Alleen tikt iedereen de hele dag dingen over van het ene scherm naar het andere.",
    begin: "Begin bij het handwerk waar de meeste tijd in gaat zitten.",
  },
  {
    nummer: "03",
    titel: "Het loopt, maar je vliegt op gevoel",
    herkenning:
      "De systemen geven elkaar door wat nodig is. Of het beter gaat dan vorig kwartaal is een kwestie van gevoel, want de cijfers staan verspreid of kloppen niet.",
    begin: "Begin bij meten. Een paar getallen waar je iets aan hebt.",
  },
  {
    nummer: "04",
    titel: "Je stuurt op wat je ziet",
    herkenning:
      "Je weet waar het stokt en je kunt een verandering doorrekenen voordat je hem doorvoert.",
    begin: "Blijf rondjes maken. Daar hoef ik niet per se bij te zijn.",
  },
];

export type Nastap = {
  titel: string;
  tekst: string;
};

/**
 * Het ritme na de oplevering. Dit is zelf een verkoopargument, dus het
 * staat als eigen sectie op de pagina en niet als voetnoot bij support.
 * Het onderhoudsabonnement stond hier als derde. Die titel past niet op
 * één regel in het raster, en wat het is staat al op de pagina van
 * ondersteuning en training. Twee blokken die passen zeggen het beter
 * dan drie waarvan er één omvalt.
 */
export const nabouw: Nastap[] = [
  {
    titel: "Eén of twee superusers",
    tekst:
      "Binnen je bedrijf worden één of twee mensen de vraagbaak. Zij kennen het systeem van binnenuit, dus een collega met een vraag hoeft niet op mij te wachten.",
  },
  {
    titel: "Elke twee weken overleg",
    tekst:
      "Met die mensen loop ik langs wat er af is, wat er nog loopt en wat er nieuw bij komt. Nieuwe wensen maken we scherp en zetten we op volgorde, zodat we aan het juiste werken.",
  },
];

export type AiStap = { nummer: string; titel: string; tekst: string };

/**
 * Drie manieren waarop AI op je eigen gegevens werkt. Bewust zonder
 * productnamen waar het kan: wat de knoppen heten verandert sneller dan
 * wat ze doen.
 */
export const aiStappen: AiStap[] = [
  {
    nummer: "01",
    titel: "AI in je CRM",
    tekst:
      "Pipedrive heeft AI aan boord. Het bereidt een gesprek voor, maakt notities van wat er is besproken en zet de vervolgstap klaar. Jij kijkt het na en keurt goed.",
  },
  {
    nummer: "02",
    titel: "Je eigen AI aan je gegevens",
    tekst:
      "Via de koppeling van Pipedrive praat Claude of ChatGPT rechtstreeks met je eigen cijfers. Je vraagt in gewone taal welke offertes te lang openstaan, en je laat deals bijwerken terwijl jij meekijkt.",
  },
  {
    nummer: "03",
    titel: "Alles praat met elkaar",
    tekst:
      "Pipedrive koppelt goed met je boekhouding, mail, agenda en planning. Offerte akkoord, factuur klaar, project aangemaakt, team op de hoogte. Niemand tikt iets over.",
  },
];

export type Functie = {
  titel: string;
  /** Het Lucide-icoon uit `src/icons`, zonder .svg. Zie Icoon.astro. */
  icoon: string;
  tekst: string;
};

/**
 * Wat er in Pipedrive zit, voor de CRM-inrichting. Bewust zonder
 * abonnementen en zonder prijzen: wat er in welk pakket zit verandert
 * sneller dan wat de functie doet, en prijzen staan niet op deze site.
 * Geen partnerschap claimen: zie docs/brand-persona.md.
 *
 * Eén regel per functie. Dit is naslag en geen betoog: je leest het rijtje
 * af om te zien wat er in zit, en wat je ervan gebruikt volgt uit je
 * proces. Daar gaat de rest van de pagina over.
 */
export const pipedriveFuncties: Functie[] = [
  {
    titel: "Mailsynchronisatie",
    icoon: "mail",
    tekst: "Elke mail bij de juiste klant en de juiste deal, ook die van je collega.",
  },
  {
    titel: "Agendakoppeling",
    icoon: "calendar",
    tekst: "Afspraken uit Outlook of Google staan in Pipedrive, en andersom.",
  },
  {
    titel: "Afspraken laten inplannen",
    icoon: "calendar-check",
    tekst: "Je stuurt een link en de klant kiest zelf een moment uit je agenda.",
  },
  {
    titel: "WhatsApp",
    icoon: "message-square",
    tekst: "Het gesprek blijft bij de klant staan en niet in de telefoon van één collega.",
  },
  {
    titel: "Nova, de AI aan boord",
    icoon: "sparkles",
    tekst: "Kent je klanten en je deals, en helpt gesprekken voorbereiden en vastleggen.",
  },
  {
    titel: "Automatiseringen",
    icoon: "zap",
    tekst: "Een deal die van fase verandert, zet vanzelf een taak of een mail in gang.",
  },
  {
    titel: "Campaigns",
    icoon: "megaphone",
    tekst: "Nieuwsbrieven uit je eigen klantgegevens. Wie opent en klikt, zie je terug.",
  },
  {
    titel: "Projects",
    icoon: "folder-kanban",
    tekst: "Een gewonnen deal wordt een project, met de planning en de taken eraan.",
  },
  {
    titel: "Rapportages",
    icoon: "chart-column",
    tekst: "Wat er in de pijplijn zit, wat er aan omzet aankomt en hoe het per verkoper loopt.",
  },
  {
    titel: "Mobiele app",
    icoon: "smartphone",
    tekst: "Een bezoek leg je vast in de auto, voor je het vergeet.",
  },
];

export type Processtap = {
  nummer: string;
  titel: string;
  ik: string;
  jij: string;
  resultaat: string;
};

export const processtappen: Processtap[] = [
  {
    nummer: "01",
    titel: "Kennismaking",
    ik: "Ik vraag door op waar het nu vastloopt en zeg eerlijk of ik de juiste persoon ben.",
    jij: "Je plant een belafspraak van 30 minuten en vertelt wat er speelt.",
    resultaat: "Je weet of we verder gaan, en waarmee.",
  },
  {
    nummer: "02",
    titel: "Procesanalyse",
    ik: "Ik loop je proces na, spreek de mensen die ermee werken en leg vast wat er echt gebeurt.",
    jij: "Je geeft toegang tot de systemen en maakt een paar uur vrij voor gesprekken.",
    resultaat: "Een procesplaat met de knelpunten, op volgorde van wat het meeste oplevert.",
  },
  {
    nummer: "03",
    titel: "Ontwerp",
    ik: "Ik ontwerp de inrichting, de koppelingen en de automatiseringen, en reken de volgorde door.",
    jij: "Je kiest wat eerst gebouwd wordt en wat later kan.",
    resultaat: "Een ontwerp en een planning waar je ja of nee op kunt zeggen.",
  },
  {
    nummer: "04",
    titel: "Bouwen en koppelen",
    ik: "Ik richt het CRM in, migreer de data en bouw de koppelingen. Je kunt meekijken terwijl het groeit.",
    jij: "Je beantwoordt vragen onderweg en test tussendoor mee.",
    resultaat: "Het systeem staat, met je eigen data erin.",
  },
  {
    nummer: "05",
    titel: "Training en livegang",
    ik: "Ik train het team op de eigen werkwijze en ben erbij op de dag dat het live gaat.",
    jij: "Je maakt tijd vrij voor het team en kiest de datum.",
    resultaat: "Het team werkt ermee en er ligt een korte handleiding op maat.",
  },
  {
    nummer: "06",
    titel: "Onderhoud en bijsturen",
    ik: "Ik spreek elke twee weken je superusers, kijk mee op de cijfers en stuur bij als het proces verandert.",
    jij: "Je wijst één of twee mensen aan die intern het aanspreekpunt worden.",
    resultaat:
      "Het systeem groeit mee, en stap 01 begint opnieuw.",
  },
];

export type Vraag = {
  vraag: string;
  antwoord: string;
  todo?: boolean;
};

export const vragen: Vraag[] = [
  {
    vraag: "Hoe lang duurt een traject?",
    antwoord:
      "Een kleine inrichting staat in twee tot vier weken. Gaat er een migratie met koppelingen achteraan, reken dan op twee tot vier maanden. Wat het verschil maakt: hoeveel data er over moet, uit hoeveel systemen die komt, en hoe snel ik antwoord krijg op de vragen die onderweg opkomen.",
  },
  {
    vraag: "Met welke tools werk je?",
    antwoord:
      "Pipedrive voor CRM, n8n voor koppelingen en automatisering, Airtable waar een database handiger is dan een spreadsheet, en Claude met MCP voor AI op je eigen data. Daarnaast de API's van wat je al gebruikt.",
  },
  {
    vraag: "Werk je ook met systemen die we al hebben?",
    antwoord:
      "Ja. Meestal is vervangen niet nodig. Als je boekhouding, mail en offertetool bevallen, dan koppel ik die aan elkaar in plaats van er iets naast te zetten. Vervangen stel ik alleen voor als het systeem het proces echt in de weg zit.",
  },
  {
    vraag: "Wat gebeurt er na de oplevering?",
    antwoord:
      "Binnen je bedrijf worden één of twee mensen superuser. Met hen zit ik elke twee weken samen: wat loopt er, wat is af en wat komt er nieuw bij. Wil je me vaster bij de hand hebben, dan heet dat een onderhoudsabonnement.",
  },
  {
    vraag: "We hebben geen tijd voor een procesanalyse. Kan het niet sneller?",
    antwoord:
      "Het kan sneller, maar dan bouw ik op een aanname. Dat kost later meer tijd dan het nu scheelt. Het goede nieuws is dat de analyse klein mag blijven: vaak zijn een paar gesprekken en een middag meekijken genoeg om te zien waar het echt knelt.",
  },
  {
    vraag: "Hoe begint het?",
    antwoord:
      "Met een belafspraak van 30 minuten. Je vertelt wat er vastloopt, ik vraag door en zeg eerlijk of ik de juiste persoon ben. Daar zit geen verplichting aan vast.",
  },
];

/**
 * De onderdelen die bij een bedrijf horen: de ring in de hero, en de
 * bouwstenen die per opdracht genoemd worden. Eén lijst, want het is
 * hetzelfde rijtje. Zag je iets op de homepage op de ring staan, dan wil
 * je het bij een opdracht aan hetzelfde icoon herkennen.
 *
 * De volgorde is de volgorde op de ring, met de klok mee vanaf boven.
 * Schema.astro rekent daar de hoek uit, dus een onderdeel verplaatsen
 * betekent hier verplaatsen. `kort` is voor de telefoon, waar het volle
 * label niet naast de cirkel past.
 */
export type Bouwsteen = { icoon: string; label: string; kort?: string };

export const bouwstenen: Bouwsteen[] = [
  { icoon: "mail", label: "mailbox" },
  { icoon: "folder-kanban", label: "projecten" },
  { icoon: "chart-column", label: "rapportages" },
  { icoon: "workflow", label: "slimme workflows", kort: "workflows" },
  { icoon: "sparkles", label: "AI" },
  { icoon: "database", label: "databases" },
  { icoon: "calculator", label: "boekhouding" },
  { icoon: "file-text", label: "offertes" },
  { icoon: "message-square", label: "WhatsApp" },
  { icoon: "phone", label: "telefoon" },
  { icoon: "globe", label: "website" },
  { icoon: "calendar", label: "agenda" },
];

/** Opzoeken op icoonnaam, voor de opdrachten en de homepage. */
export const bouwsteen = (icoon: string) => {
  const gevonden = bouwstenen.find((b) => b.icoon === icoon);
  if (!gevonden) {
    throw new Error(`Bouwsteen "${icoon}" staat niet in de lijst.`);
  }
  return gevonden;
};

export type Case = {
  titel: string;
  /** Een paar woorden, voor het labeltje op de homepage. */
  kort: string;
  /**
   * Wat er in deze opdracht is aangepakt, als icoonnaam uit `bouwstenen`.
   * Zag je ze op de ring in de hero, dan herken je ze hier terug. Alleen
   * wat hieronder ook echt genoemd wordt: het is een samenvatting van de
   * tekst en geen etalage.
   */
  bouwstenen: string[];
  /**
   * Puntsgewijs. Een opdracht is een opsomming van wat er stond, wat er is
   * gedaan en wat het werd. Als alinea wordt daar een verhaal van dat
   * langer leest dan het is, en dan slaat iedereen het over.
   */
  situatie: string[];
  aanpak: string[];
  resultaat: string[];
  todo: boolean;
};

/**
 * Geanonimiseerd: de namen zijn niet vrijgegeven, en het type organisatie
 * zegt genoeg om je erin te herkennen. Zie OPLEVERING.md.
 *
 * De eerste drie staan ook op de homepage, bij Resultaten. Daar stond
 * eerst een eigen lijstje met dezelfde regels erin. Nu is dit de enige
 * bron, dus de homepage kan niets beloven wat hier niet staat.
 */
export const cases: Case[] = [
  {
    titel: "Maatschappelijke organisatie die gezinnen en oppassen koppelt",
    kort: "Maatschappelijke organisatie",
    bouwstenen: [
      "database",
      "workflow",
      "file-text",
      "calculator",
      "chart-column",
    ],
    situatie: [
      "Het werk liep door losse systemen en een rij Excel-bestanden.",
      "Dezelfde gegevens moesten overal kloppen, dus er ging veel tijd in overtypen zitten.",
      "Aanmeldingen kwamen ongestructureerd binnen, dus elke aanmelding begon met uitzoeken.",
    ],
    aanpak: [
      "Pipedrive leidend gemaakt voor de contacten en de matches.",
      "Een database erachter voor de urenadministratie, met n8n aan Pipedrive geknoopt.",
      "De documentflow voor de verslaglegging naar partners eraan vast.",
      "Intakes en gewonnen deals gaan terug naar Google Ads.",
    ],
    resultaat: [
      "De incasso- en excassobatches worden vanzelf aangemaakt.",
      "Na elke stap staat er een opvolgtaak klaar.",
      "Een aanmelding komt binnen in een vorm waar je meteen mee verder kunt.",
      "Een stuk minder handwerk, en rapportages waar je op kunt bouwen.",
    ],
    todo: false,
  },
  {
    titel: "Organisatie die zich inzet voor welzijn in wijken",
    kort: "Welzijnsorganisatie",
    bouwstenen: ["calendar", "mail", "workflow", "globe", "sparkles"],
    situatie: [
      "De systemen waren versnipperd.",
      "De communicatie met mensen werd ergens anders bijgehouden dan hun voortgang, dus wie in welke fase zat moest je bij elkaar zoeken.",
      "Dat bijhouden was handwerk.",
    ],
    aanpak: [
      "Pipedrive centraal gezet, met de contactpersonen, de organisaties en de voortgang van iedereen erin.",
      "De rest hangt er met n8n aan.",
      "De dubbele records opgeruimd.",
      "Een ticketsysteem aan het CRM voor de events.",
    ],
    resultaat: [
      "Per event zie je wie is uitgenodigd, wie zich aanmeldde, wie er was en wat de opvolging is.",
      "Eén plek waar je kijkt, in plaats van twee lijsten naast elkaar.",
      "Er wordt een stuk minder overgetypt en de aanmeldflow is aangescherpt.",
      "Een basis die strak genoeg is om AI op in te zetten.",
    ],
    todo: false,
  },
  {
    titel: "Architectenbureau",
    kort: "Architectenbureau",
    bouwstenen: ["globe", "mail", "calendar", "workflow"],
    situatie: [
      "Verschillende websites, allemaal verouderd.",
      "Mail, domeinen en hosting lagen bij verschillende aanbieders.",
      "Er was geen plek waar aanvragen samenkwamen, dus overzicht krijgen was elke keer uitzoekwerk.",
    ],
    aanpak: [
      "Eerst een SEO-audit.",
      "Alles samengevoegd tot één site op Astro en Cloudflare, met redirects vanaf de oude adressen.",
      "Nederlands en Engels, met Keystatic om zelf te schrijven.",
      "Een vragenformulier dat doorloopt naar Pipedrive.",
      "Mail, domeinen en DNS op eigen accounts.",
    ],
    resultaat: [
      "Eén snelle site die het bureau zelf beheert.",
      "Via het formulier komen aanvragen binnen die meteen een afspraak kunnen inplannen.",
      "Je ziet per klant waar die in het proces zit.",
      "De randzaken eromheen bij elkaar in één systeem.",
    ],
    todo: false,
  },
  {
    titel: "Webshop in antieke en designlampen",
    kort: "Webshop in lampen",
    bouwstenen: ["globe", "mail"],
    situatie: [
      "De webshop was sterk verouderd.",
      "Mail kwam bij klanten in de spam terecht, dus een bestelling of een vraag bleef soms onbeantwoord zonder dat iemand het doorhad.",
    ],
    aanpak: [
      "De webshop vernieuwd.",
      "De mailinstellingen en de bijbehorende DNS-records op orde gebracht.",
      "Nagelopen of mail vanaf het eigen domein aankomt.",
    ],
    resultaat: [
      "Mail vanaf het eigen domein komt aan in plaats van in de spam.",
      "Klanten vinden de winkel weer en kunnen hem bereiken.",
      "De verkoop trok aan.",
    ],
    todo: false,
  },
];
