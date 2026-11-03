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
  telefoon: "+31 6 496 88 771",
  telefoonLink: "tel:+31649688771",
  linkedin: "https://www.linkedin.com/in/jfbeers",
} as const;

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
  titel: string;
  tekst: string;
  punten: string[];
};

export const diensten: Dienst[] = [
  {
    titel: "CRM-inrichting",
    tekst:
      "Pipedrive ingericht op hoe jij verkoopt, inclusief de stappen die alleen bij jou zo gaan.",
    punten: [
      "Pipelines en fases die je proces volgen",
      "Migratie uit Excel, mailbox of een oud systeem",
      "Velden, rechten en rapportage",
    ],
  },
  {
    titel: "Koppelingen en automatisering",
    tekst:
      "Systemen die elkaar iets doorgeven, zodat niemand hetzelfde twee keer invoert.",
    punten: [
      "Koppelingen tussen CRM, administratie en mail",
      "Terugkerend handwerk weg",
    ],
  },
  {
    titel: "Cijfers waar je op kunt sturen",
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
    titel: "Ondersteuning en training",
    tekst:
      "Een systeem werkt pas als het team het gebruikt, ook een half jaar later nog.",
    punten: [
      "Training op de eigen werkwijze",
      "Een onderhoudsabonnement als je me vast bij de hand wilt",
      "Bijsturen als het proces verandert",
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
 * Het abonnement krijgt wel een vorm en geen prijs: prijzen staan niet
 * op deze site.
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
  {
    titel: "Een onderhoudsabonnement",
    tekst:
      "Wil je me vast bij de hand hebben, dan kan dat met een onderhoudsabonnement. Je krijgt het tweewekelijks overleg, een vraagbaak voor je superusers en de kleine aanpassingen die onderweg nodig zijn.",
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
    antwoord: "TODO: noem een realistische bandbreedte, bijvoorbeeld voor een kleine inrichting en voor een migratie met koppelingen.",
    todo: true,
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

export type Case = {
  titel: string;
  situatie: string;
  aanpak: string;
  resultaat: string;
  todo: boolean;
};

/** Nog geen cases vrijgegeven. Vul deze in of verwijder de sectie. */
export const cases: Case[] = [
  {
    titel: "TODO: korte omschrijving van de klant, zonder naam",
    situatie: "TODO: wat was de situatie",
    aanpak: "TODO: wat heb je gedaan",
    resultaat: "TODO: wat leverde het op",
    todo: true,
  },
  {
    titel: "TODO: korte omschrijving van de klant, zonder naam",
    situatie: "TODO: wat was de situatie",
    aanpak: "TODO: wat heb je gedaan",
    resultaat: "TODO: wat leverde het op",
    todo: true,
  },
];
