// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

/**
 * `npm run cms` zet dit aan. Dan draait de dev server op Node in plaats
 * van op de Cloudflare-runtime, want Keystatic schrijft lokaal met het
 * bestandssysteem en dat heeft workerd niet. Zonder deze vlag zegt
 * /api/keystatic letterlijk dat local storage hier niet kan.
 *
 * Het raakt alleen de dev server. `astro build` draait altijd met de
 * adapter, dus wat je uitrolt is in beide gevallen hetzelfde.
 */
const cms = process.env.CMS === '1';

// https://astro.build/config
export default defineConfig({
  site: 'https://jeau.st',
  adapter: cms ? undefined : cloudflare(),
  // React staat er alleen voor de beheerschermen van Keystatic. De
  // publieke pagina's zijn statisch en sturen geen React mee: alleen
  // /keystatic en /api/keystatic draaien op de server.
  integrations: [sitemap(), react(), keystatic()],
  // /pipedrive is opgegaan in de dienstpagina. De oude URL blijft werken,
  // want hij stond in de voet, in llms.txt en in de sitemap, en een
  // verdwenen pagina is een 404 voor wie hem had opgeslagen.
  redirects: {
    '/pipedrive': '/diensten/crm-inrichting/',
  },
  // Fonts worden bij de build opgehaald en vanaf ons eigen domein geserveerd,
  // dus geen verzoek naar Google vanuit de browser van de bezoeker.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      // Alleen de koppen. Manrope heeft platte, licht vierkante rondingen
      // die aansluiten op het pixelwoordmerk, dus het font doet mee waar
      // het opvalt. Over een lange alinea is Inter rustiger, en die staat
      // hieronder. Alleen 600: de koppen hebben geen ander gewicht.
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.fontsource(),
      // De lopende tekst, de knoppen en alles wat geen kop is.
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-ibm-plex-mono',
      // Alleen nog voor kleine labels: nummers, de tekeningen, de kantlijn.
      // De koppen staan in Manrope, dus 600 is hier niet nodig.
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    // Alles wat op de server draait, draait bij `npm run dev` in workerd,
    // en workerd kent geen CommonJS. Een deel van wat Keystatic
    // meebrengt is dat nog wel, dus zonder dit vallen /keystatic en
    // /api/keystatic om met "exports is not defined". Mee laten bundelen
    // door Vite lost het op: dan pakt hij de ESM-build die ernaast staat.
    //
    // Bij `astro build` zet de Cloudflare-adapter dit zelf al, en bij
    // `npm run cms` draait de server op Node, waar CommonJS gewoon werkt
    // en bundelen juist stukgaat op "module is not defined".
    ...(cms
      ? {}
      : {
          environments: {
            astro: { resolve: { noExternal: true } },
            ssr: { resolve: { noExternal: true } },
            prerender: { resolve: { noExternal: true } },
          },
        }),
  },
});
