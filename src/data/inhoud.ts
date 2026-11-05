import { parse } from "yaml";

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
 * De bestanden uit één map, op het veld `volgorde`. Een collectie staat
 * bij Keystatic op bestandsnaam, en dat is zelden de volgorde waarin je
 * iets wilt lezen, dus die staat in het bestand zelf.
 */
function collectie<T extends { volgorde: number }>(map: string) {
  const rijen = Object.entries(bestanden)
    .filter(([pad]) => pad.startsWith(`../inhoud/${map}/`))
    .map(([pad, tekst]) => ({
      slug: pad.slice(`../inhoud/${map}/`.length).replace(/\.yaml$/, ""),
      entry: parse(tekst) as T,
    }));
  if (rijen.length === 0) {
    throw new Error(`Geen inhoud gevonden in src/inhoud/${map}.`);
  }
  return rijen.sort((a, b) => a.entry.volgorde - b.entry.volgorde);
}

/** Eén los bestand, zoals bedrijf.yaml. */
function los<T>(naam: string): T {
  const tekst = bestanden[`../inhoud/${naam}.yaml`];
  if (!tekst) throw new Error(`src/inhoud/${naam}.yaml ontbreekt.`);
  const inhoud = parse(tekst) as T | null;
  if (!inhoud) throw new Error(`src/inhoud/${naam}.yaml is leeg.`);
  return inhoud;
}

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
  "slug" | "voorWie" | "verhaal" | "extra"
> & {
  volgorde: number;
  voorWie: string;
  verhaal: { kop: string; alineas: string[] }[];
  extra: ("functies" | "ai")[];
};

export const diensten: Dienst[] = collectie<DienstBestand>("diensten").map(
  ({ slug, entry }) => ({
    slug,
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
  }),
);

export const cases: Case[] = collectie<Case & { volgorde: number }>(
  "opdrachten",
).map(({ entry }) => ({
  titel: entry.titel,
  kort: entry.kort,
  opbrengst: entry.opbrengst,
  bouwstenen: entry.bouwstenen ?? [],
  situatie: entry.situatie ?? [],
  aanpak: entry.aanpak ?? [],
  resultaat: entry.resultaat ?? [],
  todo: entry.todo ?? false,
}));

export const vragen: Vraag[] = collectie<Vraag & { volgorde: number }>(
  "vragen",
).map(({ entry }) => ({
  vraag: entry.vraag,
  antwoord: entry.antwoord,
  todo: entry.todo ?? false,
}));

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
  analyticsToken?: string;
};

const gegevens = los<Bedrijfsbestand>("bedrijf");

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
};

/** De enige primaire actie op de site. */
export const cta = {
  label: gegevens.afspraakLabel,
  toelichting: gegevens.afspraakToelichting,
  url: gegevens.afspraakUrl,
};

/** Leeg betekent: geen meting, en dus ook geen beacon in de pagina. */
export const analyticsToken = gegevens.analyticsToken ?? "";

const startpagina = los<{
  kernpunten: string[];
  inHetKort: { vraag: string; antwoord: string }[];
}>("homepage");

/**
 * De vinkjes in de hero. Expres ongelijk van lengte en vorm: vijf punten
 * met hetzelfde ritme lazen als een gegenereerd lijstje.
 */
export const kernpunten: string[] = startpagina.kernpunten;

/**
 * De samenvatting onder de hero: de vijf W's en de H. Wie op de homepage
 * landt en niet doorleest, moet na dit blok weten wie dit is, wat het
 * oplevert en wat de eerste stap is. Elk antwoord staat op één regel,
 * want zodra het een alinea wordt is het geen samenvatting meer.
 */
export const inHetKort = startpagina.inHetKort;
