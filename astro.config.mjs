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
      // Manrope in plaats van Inter. Inter leest neutraal langs het merk
      // heen; Manrope heeft platte, licht vierkante rondingen die
      // aansluiten op het pixelwoordmerk. Geen cursief in dit font, en
      // dat geeft niet: de site gebruikt nergens cursief.
      name: 'Manrope',
      cssVariable: '--font-manrope',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-ibm-plex-mono',
      // Alleen nog voor kleine labels: nummers, de tekeningen, de kantlijn.
      // De koppen staan in Manrope, dus 600 is hier niet meer nodig.
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
