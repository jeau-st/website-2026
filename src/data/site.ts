/**
 * De inhoud die op meerdere plekken terugkomt. Importeer altijd hieruit,
 * ook wat uit Keystatic komt: dan hoeft een pagina niet te weten of iets
 * in een formulier staat of hier.
 *
 * Wat Joost zelf bijwerkt staat in `src/inhoud` als yaml en wordt bij de
 * build gelezen door `inhoud.ts`. Zie `keystatic.config.ts`.
 *
 * Wat hieronder staat blijft bewust in code. Het hangt aan iconen, aan
 * de geometrie van de tekeningen of aan de opbouw van een pagina, en een
 * formulier dat dat mag veranderen is een formulier waarmee je een
 * tekening stil kunt breken.
 *
 * Alles met `todo: true` of een TODO-tekst wordt op de pagina zichtbaar
 * gemarkeerd en staat in de oplevernotitie.
 */

export {
  bedrijf,
  cta,
  analyticsToken,
  diensten,
  cases,
  vragen,
  kernpunten,
  inHetKort,
} from "./inhoud";
export type { Dienst, Case, Vraag } from "./inhoud";

/*
 * Er stond hier een mobiel nummer, en het stond daardoor in de voet van
 * elke pagina, op /contact, in de JSON-LD en in llms.txt. Het is eraf
 * gehaald en niet achter een knop gezet: een knop houdt alleen de
 * scrapers tegen die de html lezen en niet die met een echte browser
 * eronder, en in de gestructureerde data stond het er sowieso leesbaar
 * naast.
 *
 * Een mobiel nummer is aan de persoon gekoppeld: het trekt acquisitie en
 * scamrondes, het kan gespoofd worden richting klanten, en het is bij
 * veel diensten de herstelroute van een account. Mail is wel verplicht
 * als snelle en rechtstreekse contactmogelijkheid, een telefoonnummer
 * niet.
 *
 * Bereikbaar blijven gaat via de afspraakplanner en via mail.
 */

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
      "Pipedrive heeft een MCP-server, en daarmee praat Claude of ChatGPT rechtstreeks met je eigen cijfers. Je vraagt in gewone taal welke offertes te lang openstaan, je laat deals bijwerken terwijl jij meekijkt, en een grote bulkwijziging kan er ook mee.",
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

