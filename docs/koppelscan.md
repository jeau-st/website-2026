# Koppelscan en contactformulier

Twee ingangen voor wie niet meteen wil bellen. Allebei posten ze vanuit de
browser JSON naar een n8n-webhook op de Jeau.st-instance. De site heeft
geen eigen server nodig.

## De scan, /scan en /en/scan

1. Startscherm
2. Acht klikvragen. Een blok aanklikken is antwoorden: na 180 ms staat de
   volgende vraag er. Drie vragen hebben een blok "Anders", dat een veld
   met een verderknop opent. Elke vraag heeft een knop terug.
3. Organisatie (verplicht) en website (mag leeg)
4. Uitslag: niveau per thema, een urenschatting en drie plekken om te
   beginnen. Daaronder het contactblok
5. Bedankt, met de knop naar de afspraakplanner

De uitslag staat er voordat iemand contactgegevens geeft. Hangt de
uitslag af van een mailadres, dan is het akkoord onder de knop
afgedwongen, en dan telt het niet.

## Toestemming

Geen vinkjes. Bij elk veld staat wat het betekent ("dan mag ik je
mailen", "dan mag ik je bellen") en onder de knop staat de akkoordtekst.
Een ingevuld veld plus de klik is het akkoord voor dat kanaal, en alleen
voor dat kanaal. In de payload staat per kanaal `true` of `false`, met de
tekst, de versie (`akkoordVersie` in `src/data/scan.ts`) en het moment.
Leg die vier vast in Pipedrive. Verander je de akkoordtekst, verhoog dan
de versie.

## Payload

Eén webhook mag alles ontvangen; routeer in n8n op `bron` en `stap`.

### Koppelscan, stap `uitslag`

Gaat af zodra iemand de organisatie invult. Gebruik hem om alvast te
verrijken.

```json
{
  "bron": "koppelscan",
  "stap": "uitslag",
  "id": "3f6c...",
  "taal": "nl",
  "pagina": "https://jeau.st/scan",
  "verstuurd": "2026-11-06T14:02:11.000Z",
  "organisatie": "Bakkerij De Korenaar",
  "website": "dekorenaar.nl",
  "antwoorden": [
    { "id": "omvang", "vraag": "Hoeveel mensen werken er bij jullie?", "antwoord": "2 tot 10", "optie": 1 },
    { "id": "plek", "vraag": "Waar zit het meeste handwerk?", "antwoord": "intake via mail", "optie": null }
  ],
  "uitslag": {
    "scores": { "systemen": { "gemiddelde": 0.5, "niveau": 0 } },
    "urenPerMaand": 15,
    "winsten": ["...", "...", "..."]
  }
}
```

`optie: null` betekent dat er "Anders" is gekozen en `antwoord` de eigen
tekst is. De `id`'s van de vragen staan in `src/data/scan.ts` en zijn het
contract met de workflow: niet hernoemen zonder de workflow mee te nemen.

### Koppelscan, stap `contact`

Hetzelfde bericht, met hetzelfde `id`, plus:

```json
{
  "stap": "contact",
  "contact": { "naam": "Petra", "email": "petra@dekorenaar.nl", "telefoon": "" },
  "toestemming": {
    "email": true,
    "telefoon": false,
    "tekst": "Door op de knop te klikken mag Jeau.st je benaderen ...",
    "versie": "2026-11-06",
    "moment": "2026-11-06T14:04:40.000Z"
  }
}
```

### Contactformulier

```json
{
  "bron": "contactformulier",
  "id": "9a1b...",
  "taal": "nl",
  "pagina": "https://jeau.st/contact",
  "verstuurd": "...",
  "naam": "", "organisatie": "", "email": "", "telefoon": "", "bericht": "",
  "toestemming": { "email": true, "telefoon": true, "tekst": "...", "versie": "2026-11-06", "moment": "..." }
}
```

## Instellen

- `PUBLIC_SCAN_WEBHOOK` en eventueel `PUBLIC_CONTACT_WEBHOOK` in
  `.env.local` en in de build (GitHub Actions en Cloudflare). Zonder
  waarde staat er een TODO op de pagina en gaat het bericht naar de
  console. Het formulier valt terug op de scanwebhook
- De webhook-node in n8n: methode POST, en onder Options "Allowed
  Origins (CORS)" `https://jeau.st` (plus `http://localhost:4321` om
  lokaal te testen). De browser stuurt `Content-Type: application/json`,
  dus er komt eerst een OPTIONS-verzoek
- Antwoord met 200 zodra het bericht binnen is, en doe de verrijking
  daarna. De bezoeker wacht anders op de AI

## De workflow (nog te bouwen)

1. Webhook, valideren, ontdubbelen op `id`
2. Bij `uitslag`: website ophalen, KvK-gegevens, web search op nieuws en
   vacatures
3. Anthropic-node: analyse als vaste JSON. Bedrijfsprofiel, vermoedelijke
   tools, drie kansen, een procesvoorbeeld (nu tegenover geautomatiseerd,
   vier of vijf stappen), passend vervolg (losse automatisering,
   koppeltraject, beheer, of FortCRM als CRM de kern is), leadscore 1 tot
   5 met reden, een belopener, en per bewering of hij gevonden of
   aangenomen is
4. Pipedrive: lead op de organisatie, met de antwoorden en de analyse als
   notitie
5. Bij `contact` met `toestemming.email`: mail met advies en
   procesvoorbeeld. De eerste weken als concept in Outlook, om na te
   lezen. Dat staat ook zo in de privacytekst
6. Melding aan Joost met score en belopener
