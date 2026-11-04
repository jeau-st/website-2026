import type { APIRoute } from "astro";
import { bedrijf, diensten } from "../data/site";

/**
 * llms.txt: een platte inhoudsopgave voor taalmodellen die de site
 * naloopt. De sitemap geeft alleen adressen, dit geeft er een regel bij
 * over waar een pagina over gaat.
 *
 * Gegenereerd en niet in public/, zodat de dienstenlijst niet uit de pas
 * kan lopen met src/data/site.ts.
 */
const paginas = [
  {
    pad: "/",
    titel: "Home",
    regel:
      "Wat Jeau.st doet, voor wie, en de vier soorten werk in het kort.",
  },
  {
    pad: "/diensten",
    titel: "Diensten",
    regel: "Overzicht van de diensten, en waar deze aanpak het beste werkt.",
  },
  {
    pad: "/aanpak",
    titel: "Aanpak",
    regel:
      "De vier stappen van de denkwijze, de zes stappen van een opdracht, het ritme na de oplevering en de veelgestelde vragen.",
  },
  {
    pad: "/werk",
    titel: "Werk",
    regel:
      "Vier geanonimiseerde opdrachten als situatie, aanpak en resultaat.",
  },
  {
    pad: "/over",
    titel: "Over Joost Beers",
    regel: "Achtergrond, werkwijze en waarom hij dit doet.",
  },
  {
    pad: "/contact",
    titel: "Contact",
    regel: "Een belafspraak van 30 minuten plannen, mailen of bellen.",
  },
  {
    pad: "/privacy",
    titel: "Privacy",
    regel: "Welke gegevens de site verwerkt en welke niet.",
  },
  {
    pad: "/st",
    titel: "Waarom .st",
    regel: "Het verhaal achter het domein en achter Sao Tome en Principe.",
  },
];

export const GET: APIRoute = ({ site }) => {
  const url = (pad: string) => new URL(pad, site).toString();

  const regels = [
    `# ${bedrijf.naam}`,
    "",
    `> ${bedrijf.persoon} richt Pipedrive in, koppelt je systemen aan elkaar en automatiseert handwerk. Voor mkb en scale-ups met projecten die lang duren, vanuit ${bedrijf.plaats}.`,
    "",
    "## Pagina's",
    "",
    ...paginas.map((p) => `- [${p.titel}](${url(p.pad)}): ${p.regel}`),
    "",
    "## Diensten",
    "",
    ...diensten.map(
      (d) => `- [${d.titel}](${url(`/diensten/${d.slug}/`)}): ${d.meta}`,
    ),
    "",
    "## Contact",
    "",
    `- E-mail: ${bedrijf.email}`,
    `- Telefoon: ${bedrijf.telefoon}`,
    `- LinkedIn: ${bedrijf.linkedin}`,
    `- KvK: ${bedrijf.kvk}`,
    "",
  ];

  return new Response(regels.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
