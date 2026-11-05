/**
 * Start de dev server voor de beheerschermen: `npm run cms`, daarna
 * http://localhost:4321/keystatic.
 *
 * Twee dingen anders dan `npm run dev`:
 *
 * - CMS=1 laat astro.config.mjs de Cloudflare-adapter weglaten, zodat de
 *   server op Node draait. Keystatic schrijft lokaal met het
 *   bestandssysteem, en dat heeft de Cloudflare-runtime niet.
 * - PUBLIC_KEYSTATIC_LOKAAL=1 zet Keystatic op opslaan in `src/inhoud`
 *   op deze computer, in plaats van op een commit in GitHub.
 *
 * Wat je hier wijzigt staat dus als gewone wijziging in je werkmap, en
 * jij bepaalt wanneer je het commit. Op de live site gaat het andersom:
 * daar maakt Keystatic de commit en rolt Cloudflare daarna uit.
 *
 * Met `npm run cms -- --github` blijft die tweede vlag uit. Dan praat
 * Keystatic lokaal met GitHub in plaats van met de schijf. Dat heb je
 * precies één keer nodig: om via /keystatic/setup de GitHub App te laten
 * aanmaken. Die wizard schrijft de sleutels in .env, en dat kan alleen
 * op een dev server op Node. Op de Worker weigert hij, met "App setup
 * only allowed in development".
 *
 * Het staat in een script en niet in package.json omdat Windows en macOS
 * omgevingsvariabelen anders voor een commando zetten.
 */
import { spawn } from "node:child_process";

const viaGithub = process.argv.includes("--github");

const kind = spawn("npx", ["astro", "dev"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    CMS: "1",
    ...(viaGithub ? {} : { PUBLIC_KEYSTATIC_LOKAAL: "1" }),
  },
});

kind.on("exit", (code) => process.exit(code ?? 0));
