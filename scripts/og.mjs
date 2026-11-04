/**
 * Maakt public/og.png, de afbeelding die onder een gedeelde link verschijnt.
 * Draait met `npm run og`, en alleen als er iets aan verandert: de uitvoer
 * staat in de repo zodat een build hem niet nodig heeft.
 *
 * Het woordmerk komt uit hetzelfde pad als op de site, en de teksten staan
 * in Inter en IBM Plex Mono uit de fontcache van Astro. Draai `npm run build`
 * als die cache leeg is, anders staan de woff2-bestanden er nog niet.
 *
 * Die cache bevat woff2, en de tekenaar in sharp wil een ttf. Daarom zet
 * fontTools ze eerst om, buiten de repo. Dat vraagt Python met fontTools,
 * hetzelfde gereedschap waarmee het woordmerk ooit een pad werd.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const BREEDTE = 1200;
const HOOGTE = 630;
const KANTLIJN = 80;

/* Dezelfde waarden als in src/styles/global.css, lichte thema. */
const kleur = {
  bg: "#f1f4f7",
  rand: "#becad2",
  tekst: "#222b32",
  kop: "#34434c",
  zacht: "#516573",
};

const fontmap = "./.astro/fonts";
const werkmap = "./node_modules/.cache/og-fonts";

/** Het nieuwste bestand dat bij deze naam hoort; de hash wisselt per ophaal. */
function fontpad(voorvoegsel) {
  const treffer = readdirSync(fontmap)
    .filter((naam) => naam.startsWith(voorvoegsel) && naam.endsWith(".woff2"))
    .sort();
  if (treffer.length === 0) {
    throw new Error(`Geen font gevonden voor ${voorvoegsel}. Draai eerst npm run build.`);
  }
  return join(fontmap, treffer[0]);
}

/** woff2 uit de cache naar een ttf die sharp kan lezen. */
function naarTtf(voorvoegsel, naam) {
  mkdirSync(werkmap, { recursive: true });
  const ttf = join(werkmap, `${naam}.ttf`);
  if (existsSync(ttf)) return ttf;
  const woff2 = join(werkmap, `${naam}.woff2`);
  copyFileSync(fontpad(voorvoegsel), woff2);
  execFileSync("python", ["-m", "fontTools.ttLib.woff2", "decompress", woff2], {
    stdio: "ignore",
  });
  return ttf;
}

const inter = naarTtf("font-inter-600-normal-latin-c", "inter");
const mono = naarTtf("font-ibm-plex-mono-400-normal-latin-", "mono");

/** Het woordmerkpad uit de component, zodat er één bron van waarheid is. */
const woordmerk = readFileSync("src/components/Woordmerk.astro", "utf8");
const pad = woordmerk.match(/<path d="([^"]+)"/)?.[1];
if (!pad) throw new Error("Geen pad gevonden in Woordmerk.astro.");

const merkBreedte = 440;
const merkHoogte = Math.round((merkBreedte * 903) / 3485);

const merk = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${merkBreedte}" height="${merkHoogte}" viewBox="-39 -705 3485 903"><path fill="${kleur.tekst}" d="${pad}"/></svg>`,
  ),
)
  .png()
  .toBuffer();

async function tekst(inhoud, { font, fontfile, breedte }) {
  return sharp({
    text: {
      text: `<span foreground="${inhoud.kleur}">${inhoud.tekst}</span>`,
      font,
      fontfile,
      width: breedte,
      wrap: "word",
      rgba: true,
      dpi: 150,
    },
  })
    .png()
    .toBuffer();
}

const belofte = await tekst(
  {
    tekst: "CRM, koppelingen en\nprocesautomatisering",
    kleur: kleur.kop,
  },
  { font: "Inter SemiBold 34", fontfile: inter, breedte: BREEDTE - KANTLIJN * 2 },
);

const onder = await tekst(
  {
    tekst: "Joost Beers, 's-Hertogenbosch",
    kleur: kleur.zacht,
  },
  { font: "IBM Plex Mono 15", fontfile: mono, breedte: BREEDTE - KANTLIJN * 2 },
);

const beloftemeta = await sharp(belofte).metadata();
const ondermeta = await sharp(onder).metadata();

/* De streep boven de onderste regel, net als de randen op de site. */
const streepY = HOOGTE - KANTLIJN - ondermeta.height - 32;
const streep = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${BREEDTE - KANTLIJN * 2}" height="1"><rect width="100%" height="1" fill="${kleur.rand}"/></svg>`,
  ),
)
  .png()
  .toBuffer();

const plaat = await sharp({
  create: {
    width: BREEDTE,
    height: HOOGTE,
    channels: 4,
    background: kleur.bg,
  },
})
  .composite([
    { input: merk, left: KANTLIJN, top: KANTLIJN + 10 },
    {
      input: belofte,
      left: KANTLIJN,
      top: Math.round((HOOGTE - beloftemeta.height) / 2) + 20,
    },
    { input: streep, left: KANTLIJN, top: streepY },
    { input: onder, left: KANTLIJN, top: HOOGTE - KANTLIJN - ondermeta.height },
  ])
  .png()
  .toBuffer();

writeFileSync("public/og.png", plaat);
const klaar = await sharp(plaat).metadata();
console.log(`public/og.png geschreven: ${klaar.width} bij ${klaar.height}, ${Math.round(plaat.length / 1024)} kB`);
