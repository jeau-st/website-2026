import { bedrijf, site } from "./site";
import {
  andereTaal,
  dienstPad,
  routes,
  type Route,
  type Taal,
} from "./taal";
import { teksten, vul } from "./teksten";

/**
 * llms.txt: een platte inhoudsopgave voor taalmodellen die de site
 * naloopt. De sitemap geeft alleen adressen, dit geeft er een regel bij
 * over waar een pagina over gaat.
 *
 * Gegenereerd en niet in public/, zodat de dienstenlijst niet uit de pas
 * kan lopen met de yaml. Er is er een per taal, en elke versie wijst naar
 * de andere: /llms.txt en /en/llms.txt. Twee talen in één bestand zou
 * betekenen dat een model de halve lijst in de verkeerde taal krijgt.
 */

/** De volgorde waarin de pagina's in het bestand staan. */
const volgorde: Route[] = [
  "home",
  "diensten",
  "aanpak",
  "werk",
  "over",
  "contact",
  "privacy",
  "st",
];

export function llmsTekst(taal: Taal, basis: URL | undefined): string {
  const t = teksten[taal];
  const { diensten } = site(taal);
  const url = (pad: string) => new URL(pad, basis).toString();
  const ander = andereTaal(taal);

  return [
    `# ${bedrijf.naam}`,
    "",
    `> ${vul(t.llms.belofte, {
      naam: bedrijf.persoon,
      plaats: bedrijf.plaats,
    })}`,
    "",
    `## ${t.llms.paginas}`,
    "",
    ...volgorde.map(
      (naam) =>
        `- [${t.llms.titels[naam]}](${url(routes[naam][taal])}): ${t.llms.regels[naam]}`,
    ),
    "",
    `## ${t.llms.diensten}`,
    "",
    ...diensten.map(
      (dienst) =>
        `- [${dienst.titel}](${url(dienstPad(dienst.slug, taal))}): ${dienst.meta}`,
    ),
    "",
    `## ${t.llms.contact}`,
    "",
    `- E-mail: ${bedrijf.email}`,
    `- LinkedIn: ${bedrijf.linkedin}`,
    `- ${t.algemeen.kvk}: ${bedrijf.kvk}`,
    "",
    /* routes.home is "/" of "/en/", dus hier komt /llms.txt of
       /en/llms.txt uit. */
    `${t.llms.andereTaal}: ${url(`${routes.home[ander]}llms.txt`)}`,
    "",
  ].join("\n");
}
