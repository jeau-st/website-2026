/**
 * Controleert de zichtbare tekst van de site tegen SCHRIJFWIJZER.md.
 *
 * Draaien met `npm run schrijfwijzer`. Leest alles onder src, haalt de
 * tekst uit de strings en de tekstknopen, en kijkt naar twee dingen:
 *
 *   fout   de harde lijst uit "Niet gebruiken". Hier faalt het script op.
 *   let op tegenstellingen. Die mogen bestaan, dus dit is een telling en
 *          geen fout. Loop ze langs met de wegstreeptoets uit de wijzer.
 *
 * Zoeken op losse woorden is niet genoeg: een tegenstelling is zinsbouw.
 * Daarom staan hieronder patronen en geen woordenlijst alleen.
 */
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { parse } from "yaml";

const WORTEL = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const BRON = join(WORTEL, "src");

/**
 * De site staat in twee talen, en een verboden woord is niet hetzelfde
 * woord. "Naadloos" bestaat niet in de Engelse tekst en "seamless" niet
 * in de Nederlandse, dus een lijst met allebei zegt per bestand maar de
 * helft. Daarom drie sets: wat altijd fout is, wat in het Nederlands
 * fout is, en wat in het Engels fout is. Welke erbij horen hangt aan het
 * pad, zie `talenVan`.
 */

/** Vormfouten. Die staan los van de taal: dit is opmaak, geen woordkeus. */
const FOUT = [
  [/—|–/, "em dash of en dash"],
  [/\w!/, "uitroepteken"],
  [/\bSLA\b/, '"SLA", gebruik onderhoudsabonnement'],
];

/** Nederlands. Zie "Niet gebruiken" in SCHRIJFWIJZER.md. */
const FOUT_NL = [
  [/\bniet alleen\b[^.]{0,80}?\b(maar ook|ook)\b/i, '"niet alleen X, maar ook Y"'],
  [/\bis geen\b[^.]{0,60}?\bmaar\b/i, '"het is geen X, het is Y"'],
  [/^\s*Niet\b[^.]{0,80}?,\s*maar\b/i, '"Niet X, maar Y"'],
  // Op de stam en niet op het hele woord, anders glipt "naadloze" erdoor
  [/\b(naadlo|moeitelo|ontgrendel|crucia|essenti|robuust|holistisch|synergie|toekomstbestendig|empower)/i, "woord van de verboden lijst"],
  [/\bhoger niveau\b|\bdigitale landschap\b|\bgame changer\b/i, "uitdrukking van de verboden lijst"],
];

/**
 * Engels. Dezelfde soort woorden als in het Nederlands, plus de
 * spelling: de site staat in Brits Engels, want wie dit leest zit in
 * Nederland en is Europees Engels gewend. Dus -ise en niet -ize, en
 * colour en niet color.
 */
const FOUT_EN = [
  [/\bnot only\b[^.]{0,80}?\bbut also\b/i, '"not only X but also Y"'],
  [/\bit is not\b[^.]{0,60}?\bit is\b/i, '"it is not X, it is Y"'],
  [/\b(seamless|effortless|unlock|crucial|essential|robust|holistic|synerg|future-proof|empower|leverag|cutting.edge|best.in.class|delve)/i, "woord van de verboden lijst"],
  [/\bnext level\b|\bgame.changer\b|\bdigital landscape\b|\bdeep dive\b/i, "uitdrukking van de verboden lijst"],
  [/\b\w{3,}iz(e|es|ed|ing|ation|ations)\b/i, "Amerikaanse spelling, schrijf -ise"],
  [/\b\w{3,}yz(e|es|ed|ing)\b/i, "Amerikaanse spelling, schrijf -yse"],
  [/\b(colors?|behaviors?|favorite|centers?|fulfill|traveled|canceled)\b/i, "Amerikaanse spelling"],
];

/** Tegenstellingen. Toegestaan, maar niet te vaak. Zie "Tegenstellingen". */
const LETOP_NL = [
  [/,\s*niet\b/i, '"X, niet Y"'],
  [/,\s*geen\b|^\s*Geen\b/i, '"Geen X, geen Y"'],
  [/\bin plaats van\b/i, '"X in plaats van Y"'],
  [/\bliever\b.{0,60}?\bdan\b/i, '"Liever X dan Y"'],
  [/\b(zelden|nauwelijks)\b/i, '"X is zelden het probleem"'],
  [/\bnergens anders\b/i, '"en nergens anders"'],
  [/\boplossing/i, '"oplossing", zeg wat het is'],
  [/\boptimaliser/i, '"optimaliseren", zeg wat er beter wordt'],
];

/** Hetzelfde in het Engels. Dezelfde wegstreeptoets geldt. */
const LETOP_EN = [
  [/,\s*not\b/i, '"X, not Y"'],
  [/\binstead of\b/i, '"X instead of Y"'],
  [/\brather than\b/i, '"X rather than Y"'],
  [/\b(rarely|seldom|hardly ever)\b/i, '"X is rarely the problem"'],
  [/\bnowhere else\b/i, '"and nowhere else"'],
  [/\bsolution/i, '"solution", zeg wat het is'],
  [/\boptimis/i, '"optimise", zeg wat er beter wordt'],
];

/**
 * Welke lijsten over een bestand heen gaan. De Engelse yaml staat in een
 * eigen map, dus die is aan het pad te zien. `teksten.ts` heeft beide
 * talen in één bestand, want daar staan de twee versies van dezelfde
 * regel naast elkaar; dat bestand krijgt dus beide lijsten. De rest van
 * src is Nederlands.
 */
function talenVan(pad) {
  if (pad.includes("/inhoud/en/")) return ["en"];
  if (pad.endsWith("src/data/teksten.ts")) return ["nl", "en"];
  return ["nl"];
}

const FOUT_PER_TAAL = { nl: FOUT_NL, en: FOUT_EN };
const LETOP_PER_TAAL = { nl: LETOP_NL, en: LETOP_EN };

async function bestanden(map) {
  const uit = [];
  for (const item of await readdir(map, { withFileTypes: true })) {
    const pad = join(map, item.name);
    if (item.isDirectory()) uit.push(...(await bestanden(pad)));
    else if (/\.(astro|ts|yaml)$/.test(item.name)) uit.push(pad);
  }
  return uit.sort();
}

/** Haalt tekst uit een bestand, met het regelnummer waar hij begint. */
function tekstUit(bron) {
  // Commentaar telt niet mee: dat staat niet op de pagina.
  const schoon = bron
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => " ".repeat(m.length))
    .replace(/\/\*[\s\S]*?\*\//g, (m) => " ".repeat(m.length))
    .replace(/^[ \t]*\/\/.*$/gm, (m) => " ".repeat(m.length));

  const stukken = [];
  const patronen = [/"([^"\n]{14,})"/g, />\s*([^<>{}][^<>{}]{13,}?)\s*</g];
  for (const patroon of patronen) {
    for (const m of schoon.matchAll(patroon)) {
      const ruw = m[1];
      // Klassen, paden en losse code eruit
      if (/^[a-z-]+:|^\/|^#|\bpx-\d|\btext-\w|\bgrid\b|\bflex\b|\bmt-\d|https?:|=>|\bclass\b/.test(ruw)) continue;
      // Coordinaten van een tekening en andere data: in lopende tekst is
      // ruim negen van de tien tekens een letter of een spatie.
      const letters = (ruw.match(/[a-zà-ÿ ]/gi) || []).length;
      if (letters / ruw.length < 0.6) continue;
      const regel = schoon.slice(0, m.index).split("\n").length;
      stukken.push({ regel, tekst: ruw.replace(/\s+/g, " ").trim() });
    }
  }
  return stukken;
}

/**
 * Hetzelfde voor yaml, de inhoud die uit Keystatic komt. Daar staat de
 * tekst niet tussen aanhalingstekens maar als kale waarde, dus het
 * patroon hierboven ziet hem niet. De boom aflopen is betrouwbaarder dan
 * er een regex op loslaten.
 *
 * Het regelnummer is bij benadering: we zoeken de eerste regel waar het
 * begin van de tekst op staat. Bij een waarde over meerdere regels wijst
 * hij dus naar de eerste.
 */
function tekstUitYaml(bron) {
  const stukken = [];
  const regels = bron.split(/\r?\n/);
  const loop = (knoop) => {
    if (typeof knoop === "string") {
      if (knoop.trim().split(/\s+/).length < 3) return;
      const begin = knoop.slice(0, 24);
      const nr = regels.findIndex((r) => r.includes(begin));
      stukken.push({
        regel: nr < 0 ? 1 : nr + 1,
        tekst: knoop.replace(/\s+/g, " ").trim(),
      });
    } else if (Array.isArray(knoop)) {
      knoop.forEach(loop);
    } else if (knoop && typeof knoop === "object") {
      Object.values(knoop).forEach(loop);
    }
  };
  loop(parse(bron));
  return stukken;
}

const paden = await bestanden(BRON);
let fouten = 0;
let tegenstellingen = 0;
const lengtes = [];

for (const pad of paden) {
  // Backslashes naar slashes, zodat het pad in de terminal klikbaar is
  const kort = relative(WORTEL, pad).split(sep).join("/");
  const meldingen = [];
  const talen = talenVan(kort);
  const fout = [...FOUT, ...talen.flatMap((taal) => FOUT_PER_TAAL[taal])];
  const letop = talen.flatMap((taal) => LETOP_PER_TAAL[taal]);
  const lezer = pad.endsWith(".yaml") ? tekstUitYaml : tekstUit;
  for (const { regel, tekst } of lezer(readFileSync(pad, "utf8"))) {
    for (const zin of tekst.split(/(?<=[.?])\s+/)) {
      const woorden = zin.trim().split(/\s+/).filter(Boolean);
      if (woorden.length < 3) continue;
      lengtes.push(woorden.length);
      for (const [patroon, naam] of fout) {
        if (patroon.test(zin)) {
          meldingen.push(`${kort}:${regel} - fout: ${naam}\n    ${zin}`);
          fouten++;
        }
      }
      for (const [patroon, naam] of letop) {
        if (patroon.test(zin)) {
          meldingen.push(`${kort}:${regel} - let op: ${naam}\n    ${zin}`);
          tegenstellingen++;
        }
      }
    }
  }
  if (meldingen.length) console.log(`\n## ${kort}\n\n${meldingen.join("\n")}`);
}

const gem = lengtes.reduce((a, b) => a + b, 0) / lengtes.length;
console.log(
  `\n${lengtes.length} zinnen, gemiddeld ${gem.toFixed(1)} woorden, langste ${Math.max(...lengtes)}.`,
);
console.log(
  `${fouten} fout, ${tegenstellingen} tegenstelling${tegenstellingen === 1 ? "" : "en"}.`,
);
if (gem >= 12) console.log("Gemiddeld 12 woorden of meer: korter maken.");
if (tegenstellingen > 15)
  console.log("Veel tegenstellingen. Loop ze langs met de wegstreeptoets.");

process.exit(fouten > 0 ? 1 : 0);
