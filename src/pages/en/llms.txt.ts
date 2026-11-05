import type { APIRoute } from "astro";
import { llmsTekst } from "../../data/llms";

/**
 * De Engelse llms.txt, op /en/llms.txt. De tekst wordt gemaakt in
 * `src/data/llms.ts`, zodat beide talen dezelfde opbouw houden.
 */
export const GET: APIRoute = ({ site }) =>
  new Response(llmsTekst("en", site), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
