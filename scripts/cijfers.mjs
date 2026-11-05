/**
 * De cijfers op de homepage: nakijken en ijken.
 *
 * Twee van de vier lopen op, en dat gebeurt met een curve door echte
 * metingen. Waarom het zo werkt staat in src/data/cijfers.ts; dit
 * scriptje is het gereedschap eromheen.
 *
 *   npm run cijfers              wat de homepage nu laat zien
 *   npm run cijfers -- --check   valt om als het ijkpunt te oud is
 *   npm run cijfers -- --meting 2027-02-01 140 310 "bron"
 *
 * De formules staan hier opnieuw en niet via een import, want dit is
 * node en cijfers.ts is typescript dat Astro compileert. Twee plekken dus,
 * en `npm run cijfers` is precies de controle die zegt of ze nog
 * hetzelfde rekenen: het getal hieronder moet gelijk zijn aan wat er in
 * de gebouwde html staat.
 */
import { readFileSync, writeFileSync } from "node:fs";

const PAD = "src/data/cijfers.json";
const DAG = 86400000;

const ruw = JSON.parse(readFileSync(PAD, "utf8"));

const args = process.argv.slice(2);
const vlag = (naam) => args.includes(naam);

/** Middernacht lokaal, net als in cijfers.ts. */
function opDatum(datum) {
  const [j, m, d] = datum.split("-").map(Number);
  return new Date(j, m - 1, d).getTime();
}

/* Een nieuwe meting erbij. Dit is het enige dat de curve mag verschuiven. */
if (vlag("--meting")) {
  const i = args.indexOf("--meting");
  const [datum, auto, perdag, ...rest] = args.slice(i + 1);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(datum ?? "") || !auto || !perdag) {
    throw new Error(
      'Gebruik: npm run cijfers -- --meting JJJJ-MM-DD <automatiseringen> <perdag> "bron"',
    );
  }
  const bron = rest.join(" ").trim();
  if (!bron) throw new Error("Een meting zonder bron is een verzonnen cijfer. Zet erbij waar je het hebt geteld.");
  if (ruw.ijkpunten.some((p) => p.datum === datum)) {
    throw new Error(`Er staat al een ijkpunt op ${datum}.`);
  }
  ruw.ijkpunten.push({
    datum,
    automatiseringen: Number(auto),
    uitvoeringenPerDag: Number(perdag),
    bron,
  });
  ruw.ijkpunten.sort((a, b) => (a.datum < b.datum ? -1 : 1));
  writeFileSync(PAD, `${JSON.stringify(ruw, null, 2)}\n`);
  console.log(`Ijkpunt ${datum} toegevoegd. Nu ${ruw.ijkpunten.length} metingen.`);
}

const ijkpunten = [...ruw.ijkpunten].sort((a, b) => (a.datum < b.datum ? 1 : -1));
const anker = ijkpunten[0];
if (!anker) throw new Error(`${PAD} heeft geen ijkpunten.`);
const ankerTijd = opDatum(anker.datum);

/* De exponent per dag: gefit zodra er twee metingen zijn, anders aangenomen. */
const k = (() => {
  if (ijkpunten.length < 2) return Math.log(ruw.groeiPerJaar) / 365;
  const punten = ijkpunten.map((p) => ({
    x: (opDatum(p.datum) - ankerTijd) / DAG,
    y: Math.log(p.uitvoeringenPerDag),
  }));
  const n = punten.length;
  const gx = punten.reduce((s, p) => s + p.x, 0) / n;
  const gy = punten.reduce((s, p) => s + p.y, 0) / n;
  const boven = punten.reduce((s, p) => s + (p.x - gx) * (p.y - gy), 0);
  const onder = punten.reduce((s, p) => s + (p.x - gx) ** 2, 0);
  return onder === 0 ? Math.log(ruw.groeiPerJaar) / 365 : boven / onder;
})();

const nu = Date.now();
const d = new Date(nu);
const start =
  ruw.venster === "maand"
    ? new Date(d.getFullYear(), d.getMonth(), 1).getTime()
    : ruw.venster === "jaar"
      ? new Date(d.getFullYear(), 0, 1).getTime()
      : new Date(2024, 0, 1).getTime();

const a = (start - ankerTijd) / DAG;
const b = (nu - ankerTijd) / DAG;
const uitvoeringen = Math.max(
  0,
  Math.floor(
    k === 0
      ? anker.uitvoeringenPerDag * (b - a)
      : (anker.uitvoeringenPerDag / k) * (Math.exp(k * b) - Math.exp(k * a)),
  ),
);
const automatiseringen = Math.floor(anker.automatiseringen * Math.exp(k * b));
const ouderdom = Math.floor((nu - ankerTijd) / DAG);
const nl = new Intl.NumberFormat("nl-NL");

const labels = {
  maand: "Uitvoeringen deze maand",
  jaar: "Uitvoeringen dit jaar",
  sinds: "Uitvoeringen sinds 2024",
};

console.log(`Ijkpunt    ${anker.datum}, ${ouderdom} dagen oud`);
console.log(`           ${anker.automatiseringen} actief, ${anker.uitvoeringenPerDag} per dag`);
console.log(`           ${anker.bron}`);
console.log(
  `Groei      ${ijkpunten.length < 2 ? "aangenomen" : `gefit op ${ijkpunten.length} metingen`}, maal ${(Math.exp(k * 365)).toFixed(2)} per jaar`,
);
console.log(`Tempo nu   ${(anker.uitvoeringenPerDag * Math.exp(k * b)).toFixed(1)} per dag`);
console.log("");
for (const v of ruw.vast) console.log(`${v.label.padEnd(26)} ${v.getal}`);
console.log(`${"Automatiseringen actief".padEnd(26)} ${nl.format(automatiseringen)}`);
console.log(`${labels[ruw.venster].padEnd(26)} ${nl.format(uitvoeringen)}`);

if (ouderdom > ruw.houdbaarDagen) {
  const bericht = `Het nieuwste ijkpunt is ${ouderdom} dagen oud, en ${ruw.houdbaarDagen} is de grens. Meet opnieuw via de n8n-koppelingen en zet het erbij met --meting.`;
  if (vlag("--check")) {
    console.error(`\nFout: ${bericht}`);
    process.exit(1);
  }
  console.warn(`\nLet op: ${bericht}`);
} else if (vlag("--check")) {
  console.log(`\nNog ${ruw.houdbaarDagen - ouderdom} dagen houdbaar.`);
}
