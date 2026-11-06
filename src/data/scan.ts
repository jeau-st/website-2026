import { TALEN } from "./taal";
import { teksten } from "./teksten";

/**
 * De rekenregels van de koppelscan. De tekst van de vragen staat in
 * `teksten.ts`, per taal. Hier staat wat een antwoord waard is, want dat
 * is geen tekst en hoort niet twee keer te bestaan.
 *
 * Elke vraag hoort bij een thema of bij geen. Een antwoord krijgt 0, 1 of
 * 2 punten: 0 is werk aan de winkel, 2 is op orde. "Anders" telt als 1,
 * want daar valt niets uit af te leiden. Per thema is het gemiddelde het
 * niveau: onder 0,7 "hier zit werk", onder 1,4 "kan beter", daarboven
 * "op orde".
 *
 * De uren per maand zijn een schatting en dat staat er op de pagina ook
 * bij: het midden van de gekozen urenklasse, maal 4,3 weken, maal een
 * half. Afgerond naar beneden op een veelvoud van vijf, met vijf als
 * ondergrens, zodat er nooit een getal staat dat preciezer oogt dan het
 * is.
 */

export type Thema = "systemen" | "handwerk" | "data" | "beheer" | "ai";

export interface ScanVraag {
  /** Sleutel in de payload naar n8n. Niet hernoemen zonder de workflow mee te nemen. */
  id: string;
  thema?: Thema;
  /** Punten per optie, in dezelfde volgorde als de opties in teksten.ts. */
  punten?: number[];
  /** Of er een blok "Anders" onder staat, met een veld en een verderknop. */
  anders?: boolean;
}

export const scanVragen: ScanVraag[] = [
  { id: "omvang" },
  { id: "systemen", thema: "systemen", punten: [2, 1, 0, 0] },
  { id: "uren", thema: "handwerk", punten: [2, 1, 0, 0] },
  { id: "plek", anders: true },
  { id: "koppeling", thema: "systemen", punten: [2, 1, 0, 0] },
  { id: "bron", thema: "data", punten: [2, 1, 0], anders: true },
  { id: "beheer", thema: "beheer", punten: [2, 1, 1, 0] },
  { id: "ai", thema: "ai", punten: [0, 1, 2], anders: true },
];

/** Het midden van elke urenklasse bij de vraag `uren`, per week. */
export const urenPerWeek = [1, 3.5, 7.5, 12];

/** Welk deel van het overtikwerk de schatting meetelt. */
export const terugTeWinnen = 0.5;

/** De themavolgorde in de uitslag. */
export const themas: Thema[] = ["systemen", "handwerk", "data", "beheer", "ai"];

/** Versie van de toestemmingstekst, gaat mee naar het CRM als bewijs. */
export const akkoordVersie = "2026-11-06";

/*
 * Bij de build: elke vraag heeft in elke taal evenveel opties als punten,
 * en er zijn evenveel vragen als regels. Loopt dat uit de pas, dan rekent
 * de scan met de verkeerde punten, en dat zie je op de pagina niet.
 */
for (const taal of TALEN) {
  const vragen = teksten[taal].scan.vragen;
  if (vragen.length !== scanVragen.length) {
    throw new Error(`Koppelscan: ${vragen.length} vragen in ${taal}, ${scanVragen.length} in scan.ts.`);
  }
  scanVragen.forEach((regel, i) => {
    const opties = vragen[i]!.opties.length;
    if (regel.punten && regel.punten.length !== opties) {
      throw new Error(`Koppelscan: vraag ${regel.id} heeft ${opties} opties in ${taal} en ${regel.punten.length} punten.`);
    }
    if (regel.id === "uren" && urenPerWeek.length !== opties) {
      throw new Error(`Koppelscan: urenPerWeek heeft ${urenPerWeek.length} waarden, de vraag ${opties} opties.`);
    }
    if (regel.id === "plek" && teksten[taal].scan.winstPerPlek.length !== opties) {
      throw new Error(`Koppelscan: winstPerPlek in ${taal} loopt niet gelijk met de opties.`);
    }
  });
}
