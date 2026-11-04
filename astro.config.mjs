// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://jeau.st',
  adapter: cloudflare(),
  integrations: [sitemap()],
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
  },
});
