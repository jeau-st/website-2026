/**
 * Controleert de titel en de meta description van elke gebouwde pagina.
 *
 * Draaien met `npm run meta`, en hij draait zelf mee aan het eind van
 * `npm run build`: `metaControle()` staat als integratie in
 * astro.config.mjs. Een te lange titel is daarmee een gebroken build en
 * geen ding dat je maanden later in Search Console terugziet.
 *
 * Waarom op de gebouwde html en niet op de bron: de titel van een
 * dienstpagina is `kop` uit de yaml met " | Jeau.st" erachter. Wie alleen
 * de bron leest, meet dat achtervoegsel niet mee en denkt dat het goed
 * zit. In dist staat wat de bezoeker krijgt.
 *
 * De grenzen zijn tekens en geen pixels. Google kapt op breedte af, en
 * een regel vol i's past verder dan een regel vol m's, dus dit is een
 * benadering. Hij ligt expres iets onder de plek waar het afkappen
 * begint, zodat een woord erbij geen afbreuk is.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

/** Boven de 60 tekens kapt Google de titel af met een beletselteken. */
export const TITEL_MAX = 60;
/** Onder de 25 staat er te weinig om op te klikken. Dit is een waarschuwing. */
export const TITEL_MIN = 25;
/**
 * Afkappen begint rond de 160. 155 houdt ruimte voor het geval Google
 * er zelf een datum of een breedte-eenheid bij rekent.
 */
export const BESCHRIJVING_MAX = 155;
/** Onder de 80 laat je ruimte liggen die je gratis krijgt. Waarschuwing. */
export const BESCHRIJVING_MIN = 80;

const WORTEL = new URL("..", import.meta.url);

/** Haalt de inhoud van een tag of een meta uit de html. */
function uitHtml(html, patroon) {
  const m = html.match(patroon);
  if (!m) return null;
  return m[1]
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlBestanden(map) {
  const uit = [];
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) uit.push(...htmlBestanden(pad));
    else if (naam.endsWith(".html")) uit.push(pad);
  }
  return uit.sort();
}

/**
 * Leest elke pagina onder `map` en geeft per pagina de url, de titel en
 * de beschrijving met hun lengte, plus de fouten en waarschuwingen.
 */
export function controleer(map) {
  const paginas = [];
  const fouten = [];
  const letops = [];

  for (const pad of htmlBestanden(map)) {
    const html = readFileSync(pad, "utf8");
    // Een pagina die niet in de index komt, hoeft geen nette titel: de
    // doorstuurpagina's van de tussenoplossing op GitHub Pages zijn dat.
    if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;

    const url =
      "/" +
      relative(map, pad)
        .split(sep)
        .join("/")
        .replace(/(^|\/)index\.html$/, "$1");
    const titel = uitHtml(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const beschrijving = uitHtml(
      html,
      /<meta\s+name="description"\s+content="([\s\S]*?)"/i,
    );

    paginas.push({ url, titel, beschrijving });

    if (!titel) fouten.push(`${url} heeft geen titel`);
    else if (titel.length > TITEL_MAX)
      fouten.push(
        `${url} titel is ${titel.length} tekens, maximaal ${TITEL_MAX}`,
      );
    else if (titel.length < TITEL_MIN)
      letops.push(`${url} titel is maar ${titel.length} tekens`);

    if (!beschrijving) fouten.push(`${url} heeft geen beschrijving`);
    else if (beschrijving.length > BESCHRIJVING_MAX)
      fouten.push(
        `${url} beschrijving is ${beschrijving.length} tekens, maximaal ${BESCHRIJVING_MAX}`,
      );
    else if (beschrijving.length < BESCHRIJVING_MIN)
      letops.push(`${url} beschrijving is maar ${beschrijving.length} tekens`);
  }

  // Twee pagina's met dezelfde titel laten Google kiezen welke hij toont,
  // en dan verliest er altijd een.
  for (const veld of ["titel", "beschrijving"]) {
    const gezien = new Map();
    for (const p of paginas) {
      if (!p[veld]) continue;
      const lijst = gezien.get(p[veld]) ?? [];
      lijst.push(p.url);
      gezien.set(p[veld], lijst);
    }
    for (const [waarde, urls] of gezien) {
      if (urls.length > 1)
        fouten.push(
          `dezelfde ${veld} op ${urls.join(" en ")}: ${waarde.slice(0, 60)}`,
        );
    }
  }

  return { paginas, fouten, letops };
}

/** Zet de uitkomst op het scherm. Geeft terug of er fouten waren. */
export function rapporteer({ paginas, fouten, letops }) {
  const breed = Math.max(...paginas.map((p) => p.url.length), 4);
  for (const p of paginas) {
    const t = p.titel?.length ?? 0;
    const b = p.beschrijving?.length ?? 0;
    const merk = (n, max) => (n > max ? "!" : " ");
    console.log(
      `${p.url.padEnd(breed)}  titel ${String(t).padStart(3)}${merk(t, TITEL_MAX)} ` +
        `beschrijving ${String(b).padStart(3)}${merk(b, BESCHRIJVING_MAX)}`,
    );
  }
  if (letops.length) console.log(`\nLet op:\n  ${letops.join("\n  ")}`);
  if (fouten.length) console.log(`\nFout:\n  ${fouten.join("\n  ")}`);
  console.log(
    `\n${paginas.length} pagina's, ${fouten.length} fout, ${letops.length} keer let op.`,
  );
  return fouten.length > 0;
}

/**
 * De integratie voor astro.config.mjs. Draait na de build, over de map
 * die Astro net heeft geschreven, en laat de build vallen als er iets
 * te lang is. Dat is expres hard: een afgekapte titel repareer je niet
 * meer nadat Google hem heeft opgehaald.
 */
export function metaControle() {
  return {
    name: "meta-controle",
    hooks: {
      "astro:build:done": ({ dir, logger }) => {
        const uitkomst = controleer(fileURLToPath(dir));
        for (const l of uitkomst.letops) logger.warn(l);
        if (uitkomst.fouten.length) {
          for (const f of uitkomst.fouten) logger.error(f);
          throw new Error(
            `${uitkomst.fouten.length} pagina's met een titel of beschrijving die niet door de beugel kan. Draai \`npm run meta\` voor het hele overzicht.`,
          );
        }
        logger.info(`${uitkomst.paginas.length} pagina's: titels en beschrijvingen passen.`);
      },
    },
  };
}

// Rechtstreeks gedraaid: het hele overzicht, ook als alles goed is.
if (
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1])
) {
  const map = fileURLToPath(new URL("dist/client", WORTEL));
  let bestaat = true;
  try {
    statSync(map);
  } catch {
    bestaat = false;
  }
  if (!bestaat) {
    console.log("Geen dist/client. Draai eerst `npm run build`.");
    process.exit(1);
  }
  process.exit(rapporteer(controleer(map)) ? 1 : 0);
}
