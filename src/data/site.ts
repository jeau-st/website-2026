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
 * Elke lijst staat per taal, als `PerTaal<...>`. Dat type dwingt af dat
 * de Engelse kant bestaat: laat je hem weg, dan valt `npm run typecheck`.
 * Even lang moeten ze ook zijn, want de ring in de hero en de tekening
 * van de volgorde rekenen met het aantal onderdelen. Dat controleert
 * `gelijkLang` hieronder bij de build.
 *
 * Een pagina haalt alles op met `site(taal)`. Dat geeft de lijsten van
 * die taal plus de inhoud uit Keystatic, zodat er in een pagina nooit
 * een losse taalkeuze per lijst staat.
 *
 * Alles met `todo: true` of een TODO-tekst wordt op de pagina zichtbaar
 * gemarkeerd en staat in de oplevernotitie.
 */

import { inhoud, type Inhoud } from "./inhoud";
import { TALEN, type PerTaal, type Taal } from "./taal";

export { bedrijf, analyticsToken } from "./inhoud";
export type { Dienst, Case, Vraag, Cta } from "./inhoud";

/**
 * Twee lijsten die bij elkaar horen, moeten even lang zijn. De tekeningen
 * rekenen met het aantal: `Schema` verdeelt de bouwstenen over 360 graden
 * en `Cyclus` pakt de eerste drie stappen en de vierde als terugloop. Een
 * taal met een onderdeel meer of minder is dus geen tekstfout maar een
 * scheve tekening, en die wil je bij de build zien en niet op de pagina.
 */
function gelijkLang<T>(naam: string, lijsten: PerTaal<T[]>): PerTaal<T[]> {
  const lengtes = TALEN.map((taal) => lijsten[taal].length);
  if (new Set(lengtes).size > 1) {
    throw new Error(
      `De lijst "${naam}" is niet in elke taal even lang: ${TALEN.map(
        (taal, i) => `${taal} ${lengtes[i]}`,
      ).join(", ")}.`,
    );
  }
  return lijsten;
}

export type Pijnpunt = {
  citaat: string;
  uitleg: string;
};

const pijnpunten = gelijkLang<Pijnpunt>("pijnpunten", {
  nl: [
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
  ],
  en: [
    {
      citaat: "Our data sits in five systems",
      uitleg:
        "One customer lives in the mailbox, in a spreadsheet, in the accounts and in the CRM. So every question about revenue starts with digging instead of looking.",
    },
    {
      citaat: "Everyone works their own way",
      uitleg:
        "Two salespeople, three methods. That holds up until someone is off sick or someone new joins.",
    },
    {
      citaat: "I want to automate, but where do I start",
      uitleg:
        "You can see the manual work costs time, but not which step to take first. So it stays an intention and everyone keeps typing.",
    },
  ],
});

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
const denkwijze = gelijkLang<Denkstap>("denkwijze", {
  nl: [
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
  ],
  en: [
    {
      nummer: "01",
      titel: "The process first",
      tekst:
        "We write down how the work really goes, including the detours nobody ever records. Then we pick one way of working instead of three. Skip that step and the mess simply moves faster.",
    },
    {
      nummer: "02",
      titel: "Then automate",
      tekst:
        "And not everything. We start where most of the time goes.",
    },
    {
      nummer: "03",
      titel: "Then measure",
      tekst:
        "A handful of figures you can actually use. You only improve what you can see.",
    },
    {
      nummer: "04",
      titel: "Then round again",
      tekst:
        "Your company changes, so the process changes with it. There is no moment when you are finished. Count on making this round again.",
    },
  ],
});

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
const niveaus = gelijkLang<Niveau>("niveaus", {
  nl: [
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
  ],
  en: [
    {
      nummer: "01",
      titel: "It lives in people's heads",
      herkenning:
        "Everyone works their own way, and that holds up as long as nobody is off. A customer sits in four places and nobody is sure which one is right.",
      begin: "Start with the process. Write it down and standardise it.",
    },
    {
      nummer: "02",
      titel: "The process stands, so does the typing",
      herkenning:
        "There is one way of working and it is written down somewhere. But people spend the day copying things from one screen to another.",
      begin: "Start with the manual work that takes the most time.",
    },
    {
      nummer: "03",
      titel: "It runs, but you fly on instinct",
      herkenning:
        "The systems pass each other what they need. Whether this quarter beats the last is a matter of feeling, because the figures are scattered or wrong.",
      begin: "Start with measuring. A few figures you can actually use.",
    },
    {
      nummer: "04",
      titel: "You steer on what you see",
      herkenning:
        "You know where the work stalls, and you can work through a change before you make it.",
      begin: "Keep making rounds. You do not need me for that.",
    },
  ],
});

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
const nabouw = gelijkLang<Nastap>("nabouw", {
  nl: [
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
  ],
  en: [
    {
      titel: "One or two superusers",
      tekst:
        "One or two people inside your company become the point of contact. They know the system from the inside, so a colleague with a question does not have to wait for me.",
    },
    {
      titel: "A call every two weeks",
      tekst:
        "With those people I go through what is finished, what is still running and what is new. We sharpen up new wishes and put them in order, so we work on the right thing.",
    },
  ],
});

export type AiStap = { nummer: string; titel: string; tekst: string };

/**
 * Drie manieren waarop AI op je eigen gegevens werkt. Bewust zonder
 * productnamen waar het kan: wat de knoppen heten verandert sneller dan
 * wat ze doen.
 */
const aiStappen = gelijkLang<AiStap>("aiStappen", {
  nl: [
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
  ],
  en: [
    {
      nummer: "01",
      titel: "AI inside your CRM",
      tekst:
        "Pipedrive has AI on board. It prepares a call, takes notes on what was discussed and sets up the next step. You check it and approve it.",
    },
    {
      nummer: "02",
      titel: "Your own AI on your own data",
      tekst:
        "Pipedrive has an MCP server, which lets Claude or ChatGPT talk straight to your own figures. You ask in plain language which quotes have been open too long, you have deals updated while you watch, and a large bulk change works the same way.",
    },
    {
      nummer: "03",
      titel: "Everything talks to everything",
      tekst:
        "Pipedrive connects well to your accounts, mail, calendar and planning. Quote signed, invoice ready, project created, team informed. Nobody retypes a thing.",
    },
  ],
});

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
const pipedriveFuncties = gelijkLang<Functie>("pipedriveFuncties", {
  nl: [
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
  ],
  en: [
    {
      titel: "Mail sync",
      icoon: "mail",
      tekst: "Every message on the right customer and the right deal, your colleague's too.",
    },
    {
      titel: "Calendar sync",
      icoon: "calendar",
      tekst: "Meetings from Outlook or Google show up in Pipedrive, and the other way round.",
    },
    {
      titel: "Scheduling links",
      icoon: "calendar-check",
      tekst: "You send a link and the customer picks a slot from your calendar.",
    },
    {
      titel: "WhatsApp",
      icoon: "message-square",
      tekst: "The conversation stays with the customer instead of on one colleague's phone.",
    },
    {
      titel: "Nova, the AI on board",
      icoon: "sparkles",
      tekst: "Knows your customers and your deals, and helps prepare and record calls.",
    },
    {
      titel: "Automations",
      icoon: "zap",
      tekst: "A deal that moves stage sets off a task or an email by itself.",
    },
    {
      titel: "Campaigns",
      icoon: "megaphone",
      tekst: "Newsletters from your own customer data. You see who opens and who clicks.",
    },
    {
      titel: "Projects",
      icoon: "folder-kanban",
      tekst: "A won deal becomes a project, with the planning and the tasks attached.",
    },
    {
      titel: "Reporting",
      icoon: "chart-column",
      tekst: "What is in the pipeline, what revenue is coming and how each rep is doing.",
    },
    {
      titel: "Mobile app",
      icoon: "smartphone",
      tekst: "You record a visit in the car, before you forget it.",
    },
  ],
});

export type Processtap = {
  nummer: string;
  titel: string;
  ik: string;
  jij: string;
  resultaat: string;
};

const processtappen = gelijkLang<Processtap>("processtappen", {
  nl: [
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
  ],
  en: [
    {
      nummer: "01",
      titel: "First call",
      ik: "I ask about where the work stalls now and say honestly whether I am the right person.",
      jij: "You book a 30-minute call and tell me what is going on.",
      resultaat: "You know whether we go on, and with what.",
    },
    {
      nummer: "02",
      titel: "Process analysis",
      ik: "I walk through your process, speak to the people who work with it and record what really happens.",
      jij: "You give access to the systems and free up a few hours for conversations.",
      resultaat: "A process map with the bottlenecks, ordered by what pays off most.",
    },
    {
      nummer: "03",
      titel: "Design",
      ik: "I design the setup, the integrations and the automations, and work through the order.",
      jij: "You choose what gets built first and what can wait.",
      resultaat: "A design and a schedule you can say yes or no to.",
    },
    {
      nummer: "04",
      titel: "Building and connecting",
      ik: "I set up the CRM, migrate the data and build the integrations. You can watch it grow.",
      jij: "You answer questions along the way and test as we go.",
      resultaat: "The system stands, with your own data in it.",
    },
    {
      nummer: "05",
      titel: "Training and go-live",
      ik: "I train the team on their own way of working and I am there on the day it goes live.",
      jij: "You free up time for the team and pick the date.",
      resultaat: "The team works with it, and there is a short guide written for them.",
    },
    {
      nummer: "06",
      titel: "Upkeep and steering",
      ik: "I speak to your superusers every two weeks, watch the figures and adjust when the process changes.",
      jij: "You name one or two people who become the point of contact inside the company.",
      resultaat: "The system grows with you, and step 01 starts again.",
    },
  ],
});

/**
 * De onderdelen die bij een bedrijf horen: de ring in de hero, en de
 * bouwstenen die per opdracht genoemd worden. Eén lijst, want het is
 * hetzelfde rijtje. Zag je iets op de homepage op de ring staan, dan wil
 * je het bij een opdracht aan hetzelfde icoon herkennen.
 *
 * De volgorde is de volgorde op de ring, met de klok mee vanaf boven.
 * Schema.astro rekent daar de hoek uit, dus een onderdeel verplaatsen
 * betekent hier verplaatsen, en in beide talen tegelijk: het icoon is de
 * sleutel, het label is alleen de naam ernaast.
 */
export type Bouwsteen = { icoon: string; label: string };

const bouwstenen = gelijkLang<Bouwsteen>("bouwstenen", {
  nl: [
    { icoon: "mail", label: "mailbox" },
    { icoon: "folder-kanban", label: "projecten" },
    { icoon: "chart-column", label: "rapportages" },
    { icoon: "workflow", label: "slimme workflows" },
    { icoon: "sparkles", label: "AI" },
    { icoon: "database", label: "databases" },
    { icoon: "calculator", label: "boekhouding" },
    { icoon: "file-text", label: "offertes" },
    { icoon: "message-square", label: "WhatsApp" },
    { icoon: "phone", label: "telefoon" },
    { icoon: "globe", label: "website" },
    { icoon: "calendar", label: "agenda" },
  ],
  en: [
    { icoon: "mail", label: "mailbox" },
    { icoon: "folder-kanban", label: "projects" },
    { icoon: "chart-column", label: "reporting" },
    { icoon: "workflow", label: "workflows" },
    { icoon: "sparkles", label: "AI" },
    { icoon: "database", label: "databases" },
    { icoon: "calculator", label: "accounting" },
    { icoon: "file-text", label: "quotes" },
    { icoon: "message-square", label: "WhatsApp" },
    { icoon: "phone", label: "phone" },
    { icoon: "globe", label: "website" },
    { icoon: "calendar", label: "calendar" },
  ],
});

export type SiteInhoud = Inhoud & {
  pijnpunten: Pijnpunt[];
  denkwijze: Denkstap[];
  niveaus: Niveau[];
  nabouw: Nastap[];
  aiStappen: AiStap[];
  pipedriveFuncties: Functie[];
  processtappen: Processtap[];
  bouwstenen: Bouwsteen[];
  /** Opzoeken op icoonnaam, voor de opdrachten en de homepage. */
  bouwsteen: (icoon: string) => Bouwsteen;
};

/**
 * Alles wat een pagina nodig heeft, in één taal. Componenten die zelf
 * inhoud ophalen, zoals de kop, de voet en de tekeningen, lezen de taal
 * uit het pad met `taalUitPad`: elke pagina staat op een adres dat de
 * taal al zegt.
 */
export function site(taal: Taal): SiteInhoud {
  const stenen = bouwstenen[taal];
  return {
    ...inhoud[taal],
    pijnpunten: pijnpunten[taal],
    denkwijze: denkwijze[taal],
    niveaus: niveaus[taal],
    nabouw: nabouw[taal],
    aiStappen: aiStappen[taal],
    pipedriveFuncties: pipedriveFuncties[taal],
    processtappen: processtappen[taal],
    bouwstenen: stenen,
    bouwsteen: (icoon: string) => {
      const gevonden = stenen.find((b) => b.icoon === icoon);
      if (!gevonden) {
        throw new Error(`Bouwsteen "${icoon}" staat niet in de lijst.`);
      }
      return gevonden;
    },
  };
}
