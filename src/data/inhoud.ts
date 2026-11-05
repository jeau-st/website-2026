import { parse } from "yaml";
import { TALEN, type PerTaal, type Taal } from "./taal";

/**
 * De inhoud die Joost zelf bijwerkt, gelezen uit `src/inhoud`. Dat zijn
 * de yaml-bestanden die Keystatic schrijft, zie `keystatic.config.ts`.
 *
 * De bestanden worden bij de build ingelezen door Vite en in de bundel
 * gezet, net als de iconen in `Icoon.astro`. Niet met de reader van
 * Keystatic: die leest met `node:fs`, en het prerenderen gebeurt hier in
 * de Cloudflare-runtime, waar geen bestandssysteem is. De yaml is toch de
 * bron, dus dat scheelt alleen een omweg.
 *
 * De bezoeker krijgt gewoon statische html: er draait geen CMS achter de
 * site. Alleen /keystatic zelf draait op de server, en dat raakt dit
 * bestand niet.
 *
 * Tweetalig werkt met twee bomen: Nederlands staat in `src/inhoud`, Engels
 * in `src/inhoud/en`, met dezelfde mappen erin. De koppeling tussen een
 * Nederlandse en een Engelse dienst gaat via het veld `paar` in het
 * Engelse bestand, en niet via de bestandsnaam: de slugs verschillen juist,
 * want die staat in de URL en is dus tekst die meetelt.
 *
 * Wat niet per taal verschilt, staat een keer. Het adres, het KvK-nummer,
 * het mailadres en de LinkedIn-pagina staan in `bedrijf.yaml` en niet twee
 * keer: een tweede kopie van een huisnummer is een tweede plek waar het
 * fout kan staan. De knoptekst en de regel eronder staan daar wel per
 * taal, want dat is tekst.
 *
 * `site.ts` geeft alles hieronder ongewijzigd door, zodat de pagina's en
 * de componenten niet hoeven te weten waar het vandaan komt. Blijf dus
 * uit site.ts importeren en niet hieruit.
 */

/** Alles onder src/inhoud, als tekst, met het pad als sleutel. */
const bestanden = import.meta.glob<string>("../inhoud/**/*.yaml", {
  query: "?raw",
  import: "default",
  eager: true,
});

/**
 * De map waar de inhoud van deze taal staat. Nederlands staat in de
 * wortel van `src/inhoud`, Engels een laag dieper.
 */
function basis(taal: Taal) {
  return taal === "nl" ? "../inhoud/" : "../inhoud/en/";
}

/**
 * De bestanden uit één map, op het veld `volgorde`. Een collectie staat
 * bij Keystatic op bestandsnaam, en dat is zelden de volgorde waarin je
 * iets wilt lezen, dus die staat in het bestand zelf.
 *
 * De Nederlandse filter pakt `../inhoud/diensten/` en dus niet
 * `../inhoud/en/diensten/`: het voorvoegsel verschilt, dus de twee bomen
 * lopen elkaar niet in de weg.
 */
function collectie<T extends { volgorde: number }>(taal: Taal, map: string) {
  const voorvoegsel = `${basis(taal)}${map}/`;
  const rijen = Object.entries(bestanden)
    .filter(([pad]) => pad.startsWith(voorvoegsel))
    .map(([pad, tekst]) => ({
      slug: pad.slice(voorvoegsel.length).replace(/\.yaml$/, ""),
      entry: parse(tekst) as T,
    }));
  if (rijen.length === 0) {
    throw new Error(
      `Geen inhoud gevonden in ${voorvoegsel.replace("../", "src/")}.`,
    );
  }
  return rijen.sort((a, b) => a.entry.volgorde - b.entry.volgorde);
}

/** Eén los bestand, zoals bedrijf.yaml. */
function los<T>(taal: Taal, naam: string): T {
  const pad = `${basis(taal)}${naam}.yaml`;
  const tekst = bestanden[pad];
  if (!tekst) throw new Error(`${pad.replace("../", "src/")} ontbreekt.`);
  const inhoud = parse(tekst) as T | null;
  if (!inhoud) throw new Error(`${pad.replace("../", "src/")} is leeg.`);
  return inhoud;
}

export type Dienst = {
  /** Wordt de URL: /diensten/<slug> of /en/services/<slug>. */
  slug: string;
  /**
   * De slug van dezelfde dienst in de andere taal, zodat de taalknop en
   * de hreflang-verwijzing weten waar de tegenhanger staat. Staat in het
   * Engelse bestand en wijst naar de Nederlandse slug.
   */
  paar?: string;
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
  /** Wat de dienst is, puntsgewijs. */
  punten: string[];
  /** Wat hij oplevert, puntsgewijs. Staat ernaast op de eigen pagina. */
  oplevert: string[];
  /** De h1 op de eigen pagina. Mag langer zijn dan de titel in de lijst. */
  kop: string;
  /** Meta description van die pagina. Eén zin, met het zoekwoord erin. */
  meta: string;
  /** Voor wie deze dienst is. Staat onder de kop op de eigen pagina. */
  voorWie?: string;
  /** Het inhoudelijke stuk. Zonder deze blokken is de pagina te dun. */
  verhaal?: { kop: string; alineas: string[] }[];
  /**
   * Blokken die niet uit `verhaal` komen maar uit een eigen lijst in
   * `site.ts`. Ze stonden op /pipedrive, een losse pagina naast
   * /diensten. Die pagina ging over het product en niet over het werk, en
   * wie hem las had daarna alsnog de inrichting nodig. Nu staan ze op de
   * dienst waar ze bij horen. Zie `src/pages/diensten/[slug].astro`.
   */
  extra?: ("functies" | "ai")[];
};

export type Case = {
  titel: string;
  /** Een paar woorden, voor het labeltje op de homepage. */
  kort: string;
  /**
   * Wat deze opdracht opleverde, in een of twee korte zinnen. Dit is wat
   * er op de homepage staat. Daar stonden eerst de eerste drie punten
   * van `resultaat`, en drie keer drie bullets naast elkaar las als een
   * opsomming van een opsomming.
   */
  opbrengst: string;
  /**
   * Wat er in deze opdracht is aangepakt, als icoonnaam uit `bouwstenen`.
   * Zag je ze op de ring in de hero, dan herken je ze hier terug.
   */
  bouwstenen: string[];
  /** Puntsgewijs. Een opdracht is een opsomming en geen verhaal. */
  situatie: string[];
  aanpak: string[];
  resultaat: string[];
  todo: boolean;
};

export type Vraag = {
  vraag: string;
  antwoord: string;
  todo?: boolean;
};

type DienstBestand = Omit<
  Dienst,
  "slug" | "voorWie" | "verhaal" | "extra" | "paar"
> & {
  volgorde: number;
  voorWie: string;
  verhaal: { kop: string; alineas: string[] }[];
  extra: ("functies" | "ai")[];
  paar?: string;
};

function dienstenVan(taal: Taal): Dienst[] {
  return collectie<DienstBestand>(taal, "diensten").map(({ slug, entry }) => ({
    slug,
    paar: entry.paar || undefined,
    titel: entry.titel,
    tekst: entry.tekst,
    kort: entry.kort,
    icoon: entry.icoon,
    kop: entry.kop,
    meta: entry.meta,
    punten: entry.punten ?? [],
    oplevert: entry.oplevert ?? [],
    voorWie: entry.voorWie || undefined,
    verhaal: entry.verhaal ?? [],
    extra: entry.extra ?? [],
  }));
}

function casesVan(taal: Taal): Case[] {
  return collectie<Case & { volgorde: number }>(taal, "opdrachten").map(
    ({ entry }) => ({
      titel: entry.titel,
      kort: entry.kort,
      opbrengst: entry.opbrengst,
      bouwstenen: entry.bouwstenen ?? [],
      situatie: entry.situatie ?? [],
      aanpak: entry.aanpak ?? [],
      resultaat: entry.resultaat ?? [],
      todo: entry.todo ?? false,
    }),
  );
}

function vragenVan(taal: Taal): Vraag[] {
  return collectie<Vraag & { volgorde: number }>(taal, "vragen").map(
    ({ entry }) => ({
      vraag: entry.vraag,
      antwoord: entry.antwoord,
      todo: entry.todo ?? false,
    }),
  );
}

type Bedrijfsbestand = {
  naam: string;
  persoon: string;
  /** Straat en huisnummer. Staat op /contact en in de gestructureerde data. */
  straat: string;
  postcode: string;
  plaats: string;
  /** Het verzamelpand of de studio waar Jeau.st onder valt. Mag leeg. */
  onderdeelVan?: string;
  kvk: string;
  email: string;
  linkedin: string;
  afspraakLabel: string;
  afspraakUrl: string;
  afspraakToelichting: string;
  /**
   * De Engelse kant van de knop. De planner-URL mag leeg blijven: dan
   * staat er de Nederlandse, en dat is een keuze en geen vergissing. Zie
   * OPLEVERING.md.
   */
  afspraakLabelEn: string;
  afspraakUrlEn?: string;
  afspraakToelichtingEn: string;
  analyticsToken?: string;
};

const gegevens = los<Bedrijfsbestand>("nl", "bedrijf");

/**
 * De bedrijfsgegevens. Die staan een keer en niet per taal: een adres en
 * een KvK-nummer veranderen niet door de taal van de pagina. Wat er in het
 * Engels anders heet, zoals "Dutch chamber of commerce" voor KvK, staat in
 * `teksten.ts`.
 */
export const bedrijf = {
  naam: gegevens.naam,
  persoon: gegevens.persoon,
  straat: gegevens.straat,
  postcode: gegevens.postcode,
  plaats: gegevens.plaats,
  onderdeelVan: gegevens.onderdeelVan ?? '',
  kvk: gegevens.kvk,
  email: gegevens.email,
  linkedin: gegevens.linkedin,
  /* Het adres als link naar Google Maps, hier uitgerekend zodat de voet
     en de contactpagina niet elk hun eigen variant krijgen. Dit is de
     officiële zoek-url van Maps: geen sleutel nodig, en hij werkt op een
     telefoon ook als de app ervoor openspringt. */
  kaartUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      `${gegevens.straat}, ${gegevens.postcode} ${gegevens.plaats}`,
    ),
};

/*
 * Er stond hier een mobiel nummer, en het stond daardoor in de voet van
 * elke pagina, op /contact, in de JSON-LD en in llms.txt. Het is eraf
 * gehaald en niet achter een knop gezet: een knop houdt alleen de
 * scrapers tegen die de html lezen en niet die met een echte browser
 * eronder, en in de gestructureerde data stond het er sowieso leesbaar
 * naast.
 */

export type Cta = { label: string; toelichting: string; url: string };

/** De enige primaire actie op de site, per taal. */
const ctas: PerTaal<Cta> = {
  nl: {
    label: gegevens.afspraakLabel,
    toelichting: gegevens.afspraakToelichting,
    url: gegevens.afspraakUrl,
  },
  en: {
    label: gegevens.afspraakLabelEn,
    toelichting: gegevens.afspraakToelichtingEn,
    /* Geen eigen Engelse planner? Dan de Nederlandse, want een knop die
       nergens heen gaat is erger dan een planner in de verkeerde taal.
       Dat het er een hoort te zijn, staat in OPLEVERING.md. */
    url: gegevens.afspraakUrlEn || gegevens.afspraakUrl,
  },
};

/** Leeg betekent: geen meting, en dus ook geen beacon in de pagina. */
export const analyticsToken = gegevens.analyticsToken ?? "";

type Startpagina = {
  kernpunten: string[];
  inHetKort: { vraag: string; antwoord: string }[];
};

export type Inhoud = {
  diensten: Dienst[];
  cases: Case[];
  vragen: Vraag[];
  /**
   * De vinkjes in de hero. Expres ongelijk van lengte en vorm: vijf punten
   * met hetzelfde ritme lazen als een gegenereerd lijstje.
   */
  kernpunten: string[];
  /**
   * De samenvatting onder de hero: de vijf W's en de H. Wie op de homepage
   * landt en niet doorleest, moet na dit blok weten wie dit is, wat het
   * oplevert en wat de eerste stap is. Elk antwoord staat op één regel,
   * want zodra het een alinea wordt is het geen samenvatting meer.
   */
  inHetKort: { vraag: string; antwoord: string }[];
  cta: Cta;
};

function inhoudVan(taal: Taal): Inhoud {
  const startpagina = los<Startpagina>(taal, "homepage");
  return {
    diensten: dienstenVan(taal),
    cases: casesVan(taal),
    vragen: vragenVan(taal),
    kernpunten: startpagina.kernpunten,
    inHetKort: startpagina.inHetKort,
    cta: ctas[taal],
  };
}

/**
 * De inhoud van beide talen. Alles wordt bij de build gelezen, dus een
 * ontbrekend bestand valt hier om en niet pas op de pagina.
 */
export const inhoud = Object.fromEntries(
  TALEN.map((taal) => [taal, inhoudVan(taal)]),
) as PerTaal<Inhoud>;
