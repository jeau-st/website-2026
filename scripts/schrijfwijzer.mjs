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

const WORTEL = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const BRON = join(WORTEL, "src");

/** Woorden en vormen die er altijd uit moeten. Zie "Niet gebruiken". */
const FOUT = [
  [/\u2014|\u2013/, "em dash of en dash"],
  [/\w!/, "uitroepteken"],
  [/\bniet alleen\b[^.]{0,80}?\b(maar ook|ook)\b/i, '"niet alleen X, maar ook Y"'],
  [/\bis geen\b[^.]{0,60}?\bmaar\b/i, '"het is geen X, het is Y"'],
  [/^\s*Niet\b[^.]{0,80}?,\s*maar\b/i, '"Niet X, maar Y"'],
  [/\bSLA\b/, '"SLA", gebruik onderhoudsabonnement'],
  // Op de stam en niet op het hele woord, anders glipt "naadloze" erdoor
  [/\b(naadlo|moeitelo|ontgrendel|crucia|essenti|robuust|holistisch|synergie|toekomstbestendig|empower)/i, "woord van de verboden lijst"],
  [/\bhoger niveau\b|\bdigitale landschap\b|\bgame changer\b/i, "uitdrukking van de verboden lijst"],
];

/** Tegenstellingen. Toegestaan, maar niet te vaak. Zie "Tegenstellingen". */
const LETOP = [
  [/,\s*niet\b/i, '"X, niet Y"'],
  [/,\s*geen\b|^\s*Geen\b/i, '"Geen X, geen Y"'],
  [/\bin plaats van\b/i, '"X in plaats van Y"'],
  [/\bliever\b.{0,60}?\bdan\b/i, '"Liever X dan Y"'],
  [/\b(zelden|nauwelijks)\b/i, '"X is zelden het probleem"'],
  [/\bnergens anders\b/i, '"en nergens anders"'],
  [/\boplossing/i, '"oplossing", zeg wat het is'],
  [/\boptimaliser/i, '"optimaliseren", zeg wat er beter wordt'],
];

async function bestanden(map) {
  const uit = [];
  for (const item of await readdir(map, { withFileTypes: true })) {
    const pad = join(map, item.name);
    if (item.isDirectory()) uit.push(...(await bestanden(pad)));
    else if (/\.(astro|ts)$/.test(item.name)) uit.push(pad);
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
      const regel = schoon.slice(0, m.index).split("\n").length;
      stukken.push({ regel, tekst: ruw.replace(/\s+/g, " ").trim() });
    }
  }
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
  for (const { regel, tekst } of tekstUit(readFileSync(pad, "utf8"))) {
    for (const zin of tekst.split(/(?<=[.?])\s+/)) {
      const woorden = zin.trim().split(/\s+/).filter(Boolean);
      if (woorden.length < 3) continue;
      lengtes.push(woorden.length);
      for (const [patroon, naam] of FOUT) {
        if (patroon.test(zin)) {
          meldingen.push(`${kort}:${regel} - fout: ${naam}\n    ${zin}`);
          fouten++;
        }
      }
      for (const [patroon, naam] of LETOP) {
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
