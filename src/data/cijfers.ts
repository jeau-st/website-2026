import ruw from "./cijfers.json";
import type { PerTaal } from "./taal";

/**
 * De cijfers boven "In het kort" op de homepage.
 *
 * Twee van de vier staan stil ("Sinds" en "Implementaties"), twee lopen op.
 * Oplopen kan hier niet door te meten: de site is statisch en wordt op
 * Cloudflare gebouwd, en daar is geen n8n-sleutel. Een sleutel in de repo
 * mag niet, en een endpoint dat live telt zou vier instances moeten
 * aanspreken bij elke bezoeker. Dus wordt het gemodelleerd: een echte
 * meting als ijkpunt, en daartussen een curve.
 *
 * Dat is een schatting en geen meting, en dat is precies waar de regel
 * "geen verzonnen cijfers" over gaat. Daarom drie remmen:
 *
 * 1. Elk ijkpunt in cijfers.json is een echte meting, met de bron erbij.
 *    `npm run cijfers -- --meting` zet er een nieuwe bij en schuift de
 *    curve dus naar de werkelijkheid toe.
 * 2. Met twee ijkpunten of meer komt de groei uit de metingen zelf, via
 *    een rechte lijn door de logaritmes. Met één ijkpunt is er niets om
 *    een groei uit te halen, dus geldt `groeiPerJaar` uit cijfers.json:
 *    1,5 per jaar, bewust laag. De enige twee metingen die ik nu heb
 *    (287 per dag over dertig dagen, 340 over de laatste dag) zouden op
 *    57 per jaar uitkomen, en dat is ruis en geen groei.
 * 3. `houdbaarDagen` is de vervaldatum. Staat het nieuwste ijkpunt langer
 *    dan 120 dagen stil, dan valt `npm run cijfers -- --check` om. Zo
 *    kan de curve nooit jaren doorrekenen op een meting van toen.
 *
 * De getallen worden naar beneden afgerond, nooit naar boven. Wat er
 * staat is dus altijd lager dan wat het model zegt.
 */

type Ijkpunt = {
  datum: string;
  automatiseringen: number;
  uitvoeringenPerDag: number;
  bron: string;
};

export type Venster = "maand" | "jaar" | "sinds";

export const ijkpunten: Ijkpunt[] = ruw.ijkpunten;
export const groeiPerJaar: number = ruw.groeiPerJaar;
export const houdbaarDagen: number = ruw.houdbaarDagen;
export const venster = ruw.venster as Venster;
/**
 * De twee stilstaande getallen. Het label staat er per taal bij: `label`
 * is Nederlands en `labelEn` Engels, want dit is tekst die Joost zelf
 * invult en die naast het getal in hetzelfde bestand hoort te staan.
 */
export const vast: { label: string; labelEn: string; getal: string }[] =
  ruw.vast;

const DAG = 86400000;

/** Het ijkpunt waar de curve omheen draait: de nieuwste meting. */
const anker = [...ijkpunten].sort((a, b) =>
  a.datum < b.datum ? 1 : -1,
)[0];

if (!anker) throw new Error("cijfers.json heeft geen ijkpunten.");

/** Middernacht lokaal, zodat een datum uit de json geen tijdzone meesleept. */
function opDatum(datum: string) {
  const [j, m, d] = datum.split("-").map(Number);
  return new Date(j!, m! - 1, d!).getTime();
}

export const ankerTijd = opDatum(anker.datum);

/**
 * De exponent per dag. Met twee metingen of meer is het de helling van de
 * kleinste-kwadratenlijn door ln(waarde) tegen de tijd, want een
 * exponentiele curve is in logaritmes een rechte lijn. Met een enkele
 * meting valt er niets te fitten en geldt de aangenomen jaargroei.
 */
export const k = (() => {
  if (ijkpunten.length < 2) return Math.log(groeiPerJaar) / 365;
  const punten = ijkpunten.map((p) => ({
    x: (opDatum(p.datum) - ankerTijd) / DAG,
    y: Math.log(p.uitvoeringenPerDag),
  }));
  const n = punten.length;
  const gx = punten.reduce((s, p) => s + p.x, 0) / n;
  const gy = punten.reduce((s, p) => s + p.y, 0) / n;
  const boven = punten.reduce((s, p) => s + (p.x - gx) * (p.y - gy), 0);
  const onder = punten.reduce((s, p) => s + (p.x - gx) ** 2, 0);
  return onder === 0 ? Math.log(groeiPerJaar) / 365 : boven / onder;
})();

/** Uitvoeringen per dag op een moment, volgens de curve. */
export function tempoPerDag(op: number) {
  return anker!.uitvoeringenPerDag * Math.exp((k * (op - ankerTijd)) / DAG);
}

/** Begin van het venster waarover geteld wordt. */
export function vensterStart(nu: number, soort: Venster = venster) {
  const d = new Date(nu);
  if (soort === "maand") return new Date(d.getFullYear(), d.getMonth(), 1).getTime();
  if (soort === "jaar") return new Date(d.getFullYear(), 0, 1).getTime();
  return new Date(2024, 0, 1).getTime();
}

/**
 * Het aantal uitvoeringen tussen twee momenten: de oppervlakte onder de
 * curve. Van een exponent is dat weer een exponent, dus het is een formule
 * en geen som over de dagen.
 */
export function uitvoeringenTussen(van: number, tot: number) {
  const a = (van - ankerTijd) / DAG;
  const b = (tot - ankerTijd) / DAG;
  const T = anker!.uitvoeringenPerDag;
  if (k === 0) return T * (b - a);
  return (T / k) * (Math.exp(k * b) - Math.exp(k * a));
}

/** Wat er nu op de homepage hoort te staan. */
export function uitvoeringenNu(nu: number, soort: Venster = venster) {
  return Math.max(0, Math.floor(uitvoeringenTussen(vensterStart(nu, soort), nu)));
}

export function automatiseringenNu(nu: number) {
  return Math.floor(
    anker!.automatiseringen * Math.exp((k * (nu - ankerTijd)) / DAG),
  );
}

/**
 * Het label boven het oplopende getal, per taal. De twee stilstaande
 * labels staan in cijfers.json, want die horen bij het getal dat Joost
 * daar invult; dit label hoort bij het venster en dus bij de code.
 */
export const automatiseringenLabel: PerTaal<string> = {
  nl: "Automatiseringen actief",
  en: "Automations running",
};

export const vensterLabel: Record<Venster, PerTaal<string>> = {
  maand: { nl: "Uitvoeringen deze maand", en: "Runs this month" },
  jaar: { nl: "Uitvoeringen dit jaar", en: "Runs this year" },
  sinds: { nl: "Uitvoeringen sinds 2024", en: "Runs since 2024" },
};

/** Dagen dat het nieuwste ijkpunt oud is. Boven houdbaarDagen is het te oud. */
export function ouderdom(nu: number) {
  return Math.floor((nu - ankerTijd) / DAG);
}
