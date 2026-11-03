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
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-ibm-plex-mono',
      // Alleen nog voor kleine labels: nummers, de tekeningen, de kantlijn.
      // De koppen staan in Inter, dus 600 is hier niet meer nodig.
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    {
      // Het woordmerk, en verder niets. Zelf gesubset uit LLPIXEL3.ttf in
      // de huisstijlmap: 203 kB ttf werd 13 kB woff2 met de Latijnse basis.
      provider: fontProviders.local(),
      name: 'LLPixel',
      cssVariable: '--font-llpixel',
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/llpixel.woff2'],
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
