/**
 * De taal van een pagina, en de adressen die erbij horen.
 *
 * Nederlands staat op de wortel en Engels onder `/en/`. Dat is een
 * keuze over bestaande adressen: de Nederlandse pagina's staan in de
 * sitemap, in llms.txt en in de index van Google, en een verhuizing naar
 * `/nl/` levert niets op en kost elke bestaande link. Daarom staat in
 * astro.config.mjs `prefixDefaultLocale: false`.
 *
 * Hier staat geen inhoud. De tekst per taal staat in `teksten.ts`, de
 * inhoud uit Keystatic in `inhoud.ts`, en het uitrekenen van de
 * tegenhanger van een pagina in `paden.ts`, want daar is de dienstenlijst
 * voor nodig.
 */

export const TALEN = ["nl", "en"] as const;

export type Taal = (typeof TALEN)[number];

/** Nederlands. Die staat op de wortel en krijgt geen voorvoegsel. */
export const STANDAARD: Taal = "nl";

/** Iets dat in elke taal moet bestaan. TypeScript valt als er een mist. */
export type PerTaal<T> = Record<Taal, T>;

/**
 * Het voorvoegsel in de URL. Leeg voor Nederlands, want dat staat op de
 * wortel.
 */
export const voorvoegsel: PerTaal<string> = {
  nl: "",
  en: "/en",
};

/** Voor `<html lang>`, `og:locale` en `inLanguage`. */
export const taalcode: PerTaal<string> = {
  nl: "nl-NL",
  en: "en-GB",
};

export const ogTaal: PerTaal<string> = {
  nl: "nl_NL",
  en: "en_GB",
};

/** Voor `Intl.NumberFormat`, zodat 1.234 niet als 1,234 verschijnt. */
export const cijfercode: PerTaal<string> = {
  nl: "nl-NL",
  en: "en-GB",
};

/**
 * De taal uit een pad. Alles onder `/en` is Engels, de rest Nederlands.
 * Componenten die zelf inhoud ophalen, zoals de kop en de voet, lezen de
 * taal hieruit in plaats van hem als prop door te geven: elke pagina
 * staat op een adres dat de taal al zegt, dus een tweede bron zou er
 * alleen van kunnen afwijken.
 */
export function taalUitPad(pad: string): Taal {
  return pad === "/en" || pad.startsWith("/en/") ? "en" : "nl";
}

/**
 * De vaste pagina's, met hun pad per taal. De sleutel is wat de pagina
 * is, niet hoe hij heet: zo kan een link in een component naar `aanpak`
 * wijzen zonder te weten in welke taal hij staat.
 *
 * De Engelse paden zijn Engels en niet Nederlands met een voorvoegsel.
 * Een slug is tekst die een bezoeker leest en waar een zoekmachine op
 * zoekt, dus `/en/services/crm-setup` en niet
 * `/en/diensten/crm-inrichting`.
 */
export const routes = {
  home: { nl: "/", en: "/en/" },
  diensten: { nl: "/diensten", en: "/en/services" },
  aanpak: { nl: "/aanpak", en: "/en/approach" },
  werk: { nl: "/werk", en: "/en/work" },
  over: { nl: "/over", en: "/en/about" },
  contact: { nl: "/contact", en: "/en/contact" },
  privacy: { nl: "/privacy", en: "/en/privacy" },
  st: { nl: "/st", en: "/en/st" },
  scan: { nl: "/scan", en: "/en/scan" },
} as const satisfies Record<string, PerTaal<string>>;

export type Route = keyof typeof routes;

/** Het pad van een vaste pagina in deze taal. */
export function route(naam: Route, taal: Taal): string {
  return routes[naam][taal];
}

/** Het pad van een dienstpagina. De slug verschilt per taal. */
export function dienstPad(slug: string, taal: Taal): string {
  return `${routes.diensten[taal]}/${slug}/`;
}

/**
 * Een pad zonder slot-slash, zodat `/en/approach/` en `/en/approach`
 * hetzelfde zijn. De wortel houdt zijn slash, want anders blijft er
 * niets over.
 */
export function zonderSlash(pad: string): string {
  if (pad === "/" || pad === "/en/") return pad;
  return pad.endsWith("/") ? pad.slice(0, -1) : pad;
}

/** De andere taal. Met twee talen is dat er precies een. */
export function andereTaal(taal: Taal): Taal {
  return taal === "nl" ? "en" : "nl";
}
