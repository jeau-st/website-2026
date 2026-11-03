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
  /** TODO: vervang door de Pipedrive-afspraakplanner. */
  url: "",
} as const;

export type Pijnpunt = {
  citaat: string;
  uitleg: string;
};

export const pijnpunten: Pijnpunt[] = [
  {
    citaat: "Data staat in vijf systemen",
    uitleg:
      "Een klant staat in de mailbox, in een Excel, in de boekhouding en in het CRM. Welke klopt, weet niemand. Elke vraag over omzet of pipeline begint met uitzoeken in plaats van kijken.",
  },
  {
    citaat: "Iedereen doet het op zijn eigen manier",
    uitleg:
      "Twee verkopers, drie werkwijzen. Dat gaat goed tot iemand uitvalt of er iemand bij komt. Dan blijkt dat het proces in hoofden zat en niet in het systeem.",
  },
  {
    citaat: "Automatiseren wil ik wel, maar waar begin ik",
    uitleg:
      "Je ziet dat het handwerk je tijd kost, maar niet welke stap je als eerste moet pakken. Dus blijft het bij een voornemen en typt iedereen door.",
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
      "Pipedrive ingericht op hoe jij verkoopt, niet op hoe de standaardinstelling het bedoelt. Inclusief migratie van wat er nu staat.",
    punten: [
      "Pipelines en fases die je proces volgen",
      "Migratie uit Excel, mailbox of een oud systeem",
      "Velden, rechten en rapportage",
    ],
  },
  {
    titel: "Koppelingen en automatisering",
    tekst:
      "Systemen die elkaar iets doorgeven, zodat niemand hetzelfde twee keer invoert. Gebouwd met n8n, Airtable en de API's die er al zijn.",
    punten: [
      "Koppelingen tussen CRM, administratie en mail",
      "Terugkerend handwerk weg",
      "Signalen als er iets misgaat",
    ],
  },
  {
    titel: "AI op je eigen data",
    tekst:
      "AI die je eigen gegevens kent in plaats van algemene antwoorden geeft. Via MCP en Claude, binnen de grenzen die je zelf stelt.",
    punten: [
      "Vragen stellen aan je eigen cijfers",
      "Voorbereiding en samenvattingen",
      "Afspraken over wat er wel en niet in gaat",
    ],
  },
  {
    titel: "Ondersteuning en training",
    tekst:
      "Een systeem werkt pas als het team het gebruikt. Daarom hoort uitleg en meekijken erbij, ook na de livegang.",
    punten: [
      "Training op de eigen werkwijze",
      "Aanspreekpunt bij vragen",
      "Bijsturen als het proces verandert",
    ],
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
    resultaat: "Een helder beeld of we verder gaan, en waarmee.",
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
    resultaat: "Een werkende omgeving met je eigen data erin.",
  },
  {
    nummer: "05",
    titel: "Training en livegang",
    ik: "Ik train het team op de eigen werkwijze en ben erbij op de dag dat het live gaat.",
    jij: "Je maakt tijd vrij voor het team en kiest de datum.",
    resultaat: "Een team dat ermee werkt, en een korte handleiding op maat.",
  },
  {
    nummer: "06",
    titel: "Bijsturen en support",
    ik: "Ik blijf bereikbaar, kijk periodiek mee en pas aan als je proces verandert.",
    jij: "Je laat het weten als iets knelt of als er iets nieuws bij komt.",
    resultaat: "Een systeem dat meegroeit in plaats van veroudert.",
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
      "Een systeem verandert mee met je bedrijf. Ik blijf bereikbaar voor vragen en kijk periodiek mee. Hoe intensief dat is, spreken we af op basis van wat je nodig hebt.",
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
