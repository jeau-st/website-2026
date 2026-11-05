import { inhoud } from "./inhoud";
import {
  andereTaal,
  dienstPad,
  routes,
  taalUitPad,
  type Route,
  type Taal,
} from "./taal";

/**
 * Welke pagina in de andere taal bij deze pagina hoort.
 *
 * Dit staat niet in `taal.ts`, want voor een dienstpagina is de
 * dienstenlijst nodig: de slug verschilt per taal, dus `/diensten/
 * crm-inrichting` hoort bij `/en/services/crm-setup` en dat valt niet uit
 * het pad af te leiden. De koppeling komt uit het veld `paar` in het
 * Engelse yaml-bestand.
 *
 * Twee plekken gebruiken dit: de taalknop in de kop, en de
 * hreflang-verwijzingen in `Basis.astro`. Allebei moeten ze hetzelfde
 * antwoord geven, anders stuurt de knop je ergens anders heen dan waar
 * de zoekmachine de tegenhanger verwacht.
 */

/** Hetzelfde pad altijd dezelfde vorm, met of zonder slot-slash. */
function sleutel(pad: string): string {
  if (pad === "/") return "/";
  if (pad === "/en" || pad === "/en/") return "/en/";
  return pad.endsWith("/") ? pad.slice(0, -1) : pad;
}

/**
 * De dienstparen, als `nl-slug` naar `en-slug` en omgekeerd. Een Engels
 * bestand dat naar een Nederlandse dienst wijst die niet bestaat, is een
 * typefout in de yaml, en die valt hier om bij de build in plaats van een
 * taalknop te geven die niets doet.
 */
const paren = (() => {
  const nlNaarEn = new Map<string, string>();
  const enNaarNl = new Map<string, string>();
  for (const dienst of inhoud.en.diensten) {
    if (!dienst.paar) continue;
    const bestaat = inhoud.nl.diensten.some((d) => d.slug === dienst.paar);
    if (!bestaat) {
      throw new Error(
        `De Engelse dienst "${dienst.slug}" wijst met het veld paar naar "${dienst.paar}", en die Nederlandse dienst bestaat niet.`,
      );
    }
    nlNaarEn.set(dienst.paar, dienst.slug);
    enNaarNl.set(dienst.slug, dienst.paar);
  }
  return { nl: nlNaarEn, en: enNaarNl };
})();

/**
 * Het pad van dezelfde pagina in de taal `naar`, of niets als die pagina
 * niet bestaat. De taalknop valt dan terug op de homepage van die taal:
 * nooit stilletjes ergens anders uitkomen, maar wel zeggen waar je heen
 * gaat.
 */
export function tegenhanger(pad: string, naar: Taal): string | undefined {
  const van = taalUitPad(pad);
  if (van === naar) return pad;
  const hier = sleutel(pad);

  for (const naam of Object.keys(routes) as Route[]) {
    if (sleutel(routes[naam][van]) === hier) return routes[naam][naar];
  }

  const hub = sleutel(routes.diensten[van]);
  if (hier.startsWith(`${hub}/`)) {
    const slug = hier.slice(hub.length + 1);
    const ander = paren[van].get(slug);
    if (ander) return dienstPad(ander, naar);
  }

  return undefined;
}

/**
 * Waar de taalknop naartoe wijst, en of dat de tegenhanger van deze
 * pagina is of de homepage. De knop zegt dat laatste erbij, zodat je niet
 * verrast op de voorpagina staat.
 */
export function taalwissel(pad: string) {
  const naar = andereTaal(taalUitPad(pad));
  const eigen = tegenhanger(pad, naar);
  return { naar, href: eigen ?? routes.home[naar], zelfdePagina: Boolean(eigen) };
}
