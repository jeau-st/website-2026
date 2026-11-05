import { config, collection, singleton, fields } from "@keystatic/core";

/**
 * Keystatic: de inhoud die verandert, in formulieren in plaats van in
 * TypeScript. Wat hier staat is wat Joost zelf bijwerkt. De rest van de
 * inhoud blijft in `src/data/site.ts`, want die hangt aan tekeningen,
 * iconen en geometrie, en een CMS dat dat mag aanpassen is een CMS dat
 * een tekening stil kan breken.
 *
 * De bestanden komen in `src/inhoud` als yaml. `src/data/site.ts` leest
 * ze bij de build en exporteert ze zoals voorheen, dus de pagina's en de
 * componenten merken er niets van.
 *
 * Lokaal schrijft Keystatic gewoon op schijf. Op de live site slaat hij
 * op als commit in GitHub, en daarvoor zijn de drie omgevingsvariabelen
 * uit `.env.example` nodig. Zie `docs/keystatic.md`.
 *
 * Bij de velden staat de huisregel als helptekst. Niet voor de sier: wie
 * een korte regel van vijf woorden moet schrijven, wil dat lezen terwijl
 * hij typt en niet achteraf in SCHRIJFWIJZER.md.
 */

/** De iconen die in `src/icons` staan. Een andere naam laat Icoon.astro vallen. */
const ICONEN = [
  "arrow-right",
  "calculator",
  "calendar",
  "calendar-check",
  "chart-column",
  "check",
  "database",
  "file-text",
  "folder-kanban",
  "globe",
  "graduation-cap",
  "layout-dashboard",
  "mail",
  "megaphone",
  "message-square",
  "phone",
  "refresh-cw",
  "settings-2",
  "smartphone",
  "sparkles",
  "target",
  "workflow",
  "zap",
] as const;

const icoonVeld = (beschrijving: string) =>
  fields.select({
    label: "Icoon",
    description: beschrijving,
    options: ICONEN.map((naam) => ({ label: naam, value: naam })),
    defaultValue: "settings-2",
  });

/**
 * De volgorde op de pagina. Een collectie staat op alfabet van de map,
 * en dat is niet de volgorde waarin je deze dingen wilt lezen. Laag
 * nummer staat bovenaan. Laat ruimte tussen de nummers, dan kun je er
 * later een tussen schuiven zonder alles te hernummeren.
 */
const volgordeVeld = fields.integer({
  label: "Volgorde",
  description:
    "Laag staat bovenaan. Laat ruimte tussen de nummers, dan past er later iets tussen.",
  validation: { isRequired: true },
});

const alineas = (label: string, beschrijving: string) =>
  fields.array(
    fields.text({
      label: "Alinea",
      multiline: true,
      validation: { isRequired: true },
    }),
    {
      label,
      description: beschrijving,
      itemLabel: (props) => props.value.slice(0, 60),
    },
  );

export default config({
  /**
   * `npm run cms` schrijft rechtstreeks in `src/inhoud` op deze computer.
   * Overal anders, dus ook op de live site, slaat Keystatic op als commit
   * in GitHub. Daar is de vlag voor nodig: `npm run dev` draait op de
   * Cloudflare-runtime, en die heeft geen bestandssysteem om in te
   * schrijven.
   *
   * De vlag moet met PUBLIC_ beginnen, want dit bestand draait ook in de
   * browser, en alleen die variabelen komen daar terecht.
   */
  storage:
    import.meta.env.PUBLIC_KEYSTATIC_LOKAAL === "1"
      ? { kind: "local" }
      : {
          kind: "github",
          repo: { owner: "jeau-st", name: "website-2026" },
        },

  ui: {
    brand: { name: "Jeau.st" },
    navigation: {
      Inhoud: ["diensten", "opdrachten", "vragen"],
      Site: ["homepage", "bedrijf"],
    },
  },

  collections: {
    diensten: collection({
      label: "Diensten",
      path: "src/inhoud/diensten/*",
      slugField: "titel",
      format: { data: "yaml" },
      entryLayout: "form",
      columns: ["titel", "volgorde"],
      schema: {
        titel: fields.slug({
          name: {
            label: "Titel",
            description: "Zoals de dienst in het menu en in de lijst heet.",
            validation: { isRequired: true },
          },
          slug: {
            label: "Slug",
            description:
              "Dit wordt de URL: /diensten/<slug>. Wijzig hem niet zonder een redirect in astro.config.mjs, anders geef je iedereen met een bladwijzer een 404.",
          },
        }),
        volgorde: volgordeVeld,
        icoon: icoonVeld("Staat in het menu, op het blok op de homepage en bij de dienst."),
        kort: fields.text({
          label: "Korte regel",
          description:
            "Een woord of vijf, voor het menu en het blok op de homepage. Geen punt aan het eind.",
          validation: { isRequired: true },
        }),
        kop: fields.text({
          label: "Kop op de eigen pagina",
          description: "De h1. Mag langer zijn dan de titel in de lijst.",
          validation: { isRequired: true },
        }),
        meta: fields.text({
          label: "Meta description",
          multiline: true,
          description:
            "Eén zin, met het zoekwoord erin. Dit is wat Google onder de titel zet.",
          validation: { isRequired: true },
        }),
        tekst: fields.text({
          label: "Alinea in de lijst",
          multiline: true,
          description: "De volle zin op /diensten, onder de titel.",
          validation: { isRequired: true },
        }),
        punten: fields.array(
          fields.text({ label: "Punt", validation: { isRequired: true } }),
          {
            label: "Wat het is",
            description:
              "Korte regels: waar de dienst uit bestaat. Staan op /diensten en op de eigen pagina. Expres ongelijk van lengte: drie punten met hetzelfde ritme lezen als een gegenereerd lijstje.",
            itemLabel: (props) => props.value,
          },
        ),
        oplevert: fields.array(
          fields.text({ label: "Punt", validation: { isRequired: true } }),
          {
            label: "Wat het oplevert",
            description:
              "Korte regels: wat de klant eraan heeft als het klaar is. Staan op de eigen pagina naast 'Wat het is'. Geen cijfers die je niet kunt onderbouwen.",
            itemLabel: (props) => props.value,
          },
        ),
        voorWie: fields.text({
          label: "Voor wie",
          multiline: true,
          description:
            "Staat onder de kop op de eigen pagina. Laat leeg als het niet nodig is.",
        }),
        verhaal: fields.array(
          fields.object({
            kop: fields.text({
              label: "Kop",
              validation: { isRequired: true },
            }),
            alineas: alineas("Alinea's", "Elke alinea wordt een eigen <p>."),
          }),
          {
            label: "Het verhaal",
            description:
              "Het inhoudelijke stuk van de pagina. Zonder deze blokken is de pagina te dun.",
            itemLabel: (props) => props.fields.kop.value,
          },
        ),
        extra: fields.multiselect({
          label: "Extra blokken",
          description:
            "Blokken die niet uit het verhaal komen maar uit een lijst in site.ts.",
          options: [
            { label: "Wat er in Pipedrive zit", value: "functies" },
            { label: "AI op je eigen gegevens", value: "ai" },
          ],
          defaultValue: [],
        }),
      },
    }),

    opdrachten: collection({
      label: "Opdrachten",
      path: "src/inhoud/opdrachten/*",
      slugField: "titel",
      format: { data: "yaml" },
      entryLayout: "form",
      columns: ["titel", "volgorde"],
      schema: {
        titel: fields.slug({
          name: {
            label: "Titel",
            description:
              "Het type organisatie, niet de naam van de klant. Die zijn niet vrijgegeven.",
            validation: { isRequired: true },
          },
        }),
        volgorde: volgordeVeld,
        kort: fields.text({
          label: "Korte naam",
          description: "Een paar woorden, voor het labeltje op de homepage.",
          validation: { isRequired: true },
        }),
        opbrengst: fields.text({
          label: "Opbrengst",
          multiline: true,
          description:
            "Wat deze opdracht opleverde, in een of twee korte zinnen. Dit is wat op de homepage staat, dus beloof niets wat hieronder niet uitgewerkt staat.",
          validation: { isRequired: true },
        }),
        bouwstenen: fields.multiselect({
          label: "Bouwstenen",
          description:
            "De onderdelen van de ring in de hero die in deze opdracht zijn aangepakt. Alleen wat hieronder ook echt genoemd wordt: het is een samenvatting en geen etalage.",
          options: [
            { label: "mailbox", value: "mail" },
            { label: "projecten", value: "folder-kanban" },
            { label: "rapportages", value: "chart-column" },
            { label: "slimme workflows", value: "workflow" },
            { label: "AI", value: "sparkles" },
            { label: "databases", value: "database" },
            { label: "boekhouding", value: "calculator" },
            { label: "offertes", value: "file-text" },
            { label: "WhatsApp", value: "message-square" },
            { label: "telefoon", value: "phone" },
            { label: "website", value: "globe" },
            { label: "agenda", value: "calendar" },
          ],
          defaultValue: [],
        }),
        situatie: alineas("Situatie", "Wat er stond toen je begon. Puntsgewijs."),
        aanpak: alineas("Aanpak", "Wat je hebt gedaan. Puntsgewijs."),
        resultaat: alineas(
          "Resultaat",
          "Wat er nu anders is. Puntsgewijs, met het sterkste bovenaan. Geen cijfers die je niet kunt onderbouwen.",
        ),
        todo: fields.checkbox({
          label: "Nog niet af",
          description:
            "Aangevinkt verschijnt er een zichtbare TODO in plaats van de tekst, en valt de opdracht uit de inhoudsopgave.",
          defaultValue: false,
        }),
      },
    }),

    vragen: collection({
      label: "Veelgestelde vragen",
      path: "src/inhoud/vragen/*",
      slugField: "vraag",
      format: { data: "yaml" },
      entryLayout: "form",
      columns: ["vraag", "volgorde"],
      schema: {
        vraag: fields.slug({
          name: {
            label: "Vraag",
            description: "Zoals iemand hem zou stellen, met vraagteken.",
            validation: { isRequired: true },
          },
        }),
        volgorde: volgordeVeld,
        antwoord: fields.text({
          label: "Antwoord",
          multiline: true,
          description:
            "Dit komt ook in het FAQPage-schema voor Google, dus geef echt antwoord en verwijs niet door.",
          validation: { isRequired: true },
        }),
        todo: fields.checkbox({
          label: "Nog niet af",
          description:
            "Aangevinkt blijft de vraag uit het schema voor Google. Een TODO als antwoord aanbieden is erger dan de vraag weglaten.",
          defaultValue: false,
        }),
      },
    }),
  },

  singletons: {
    homepage: singleton({
      label: "Homepage",
      path: "src/inhoud/homepage",
      format: { data: "yaml" },
      schema: {
        kernpunten: fields.array(
          fields.text({ label: "Punt", validation: { isRequired: true } }),
          {
            label: "Kernpunten in de hero",
            description:
              "De vinkjes naast de knop. Expres ongelijk van lengte en vorm: vijf punten met hetzelfde ritme lezen als een gegenereerd lijstje.",
            itemLabel: (props) => props.value,
          },
        ),
        inHetKort: fields.array(
          fields.object({
            vraag: fields.text({
              label: "Vraag",
              description: "Wie, Wat, Waar, Wanneer, Waarom of Hoe.",
              validation: { isRequired: true },
            }),
            antwoord: fields.text({
              label: "Antwoord",
              multiline: true,
              description:
                "Eén regel. Wordt het een alinea, dan is het geen samenvatting meer.",
              validation: { isRequired: true },
            }),
          }),
          {
            label: "In het kort",
            description:
              "De vijf W's en de H, direct onder de hero. Voor wie niet verder leest.",
            itemLabel: (props) => props.fields.vraag.value,
          },
        ),
      },
    }),

    bedrijf: singleton({
      label: "Bedrijfsgegevens",
      path: "src/inhoud/bedrijf",
      format: { data: "yaml" },
      schema: {
        naam: fields.text({ label: "Naam", validation: { isRequired: true } }),
        persoon: fields.text({
          label: "Persoon",
          validation: { isRequired: true },
        }),
        straat: fields.text({
          label: "Straat en huisnummer",
          description:
            "Staat op /contact en in de gestructureerde data, dus in de kaart die Google van het bedrijf maakt.",
          validation: { isRequired: true },
        }),
        postcode: fields.text({
          label: "Postcode",
          validation: { isRequired: true },
        }),
        plaats: fields.text({
          label: "Plaats",
          validation: { isRequired: true },
        }),
        onderdeelVan: fields.text({
          label: "Onderdeel van",
          description:
            "De studio of het verzamelpand waar Jeau.st onder valt. Leeg laten als dat niet zo is.",
        }),
        kvk: fields.text({ label: "KvK", validation: { isRequired: true } }),
        email: fields.text({
          label: "E-mailadres",
          description:
            "Staat in de voet, op /contact, in llms.txt en in de gestructureerde data.",
          validation: { isRequired: true },
        }),
        linkedin: fields.url({
          label: "LinkedIn",
          validation: { isRequired: true },
        }),
        afspraakLabel: fields.text({
          label: "Tekst op de knop",
          description: "De enige primaire actie op de site.",
          validation: { isRequired: true },
        }),
        afspraakUrl: fields.url({
          label: "Link naar de planner",
          description: "De Pipedrive- of Bookings-link achter de knop.",
          validation: { isRequired: true },
        }),
        afspraakToelichting: fields.text({
          label: "Regeltje onder de knop",
          validation: { isRequired: true },
        }),
        analyticsToken: fields.text({
          label: "Cloudflare Web Analytics-token",
          description:
            "Leeg laten tot je het hebt. Cookieloos, dus geen cookiemelding nodig.",
        }),
      },
    }),
  },
});
