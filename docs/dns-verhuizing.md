# jeau.st van Cloud86 naar Cloudflare

Opgesteld op 4 november 2026, voor het koppelen van `jeau.st` aan de
Worker `website-2026`.

## Waarom dit nodig is

De site draait als Cloudflare Worker. Een custom domain op een Worker kan
alleen als de zone in hetzelfde Cloudflare-account staat. Anders dan bij
Pages is er geen variant waarbij je het domein bij je huidige provider
laat staan en er een CNAME naartoe zet: Workers Routes en Custom Domains
werken allebei alleen binnen een zone die Cloudflare beheert.

Dus om `jeau.st` op de nieuwe site te laten uitkomen, moet de hele zone
mee. Daarmee verhuist ook je mail-DNS, en dat is het stuk waar het
misgaat als er een record wegvalt.

Tot dat moment draait de site op
`https://website-2026.joostbeers.workers.dev`.

## Waar het nu staat

Bijgewerkt op 5 november 2026.

Stap 1 tot en met 3 zijn gedaan. De zone staat compleet in Cloudflare,
gecontroleerd tegen de export, en alles staat op DNS only. Stap 4 is
geprobeerd en geweigerd door de registry: zie daar.

De delegatie staat dus nog bij Cloud86 en er is voor bezoekers en mail
niets veranderd.

## Wat er nu staat

Opgevraagd bij `ns1.cloud86.nl`, de autoritatieve nameserver, op
4 november 2026.

| Naam | Type | TTL | Waarde |
| --- | --- | --- | --- |
| `jeau.st` | NS | 14400 | `ns1.cloud86.nl`, `ns2.cloud86.nl`, `ns3.cloud86.eu` |
| `jeau.st` | A | 14400 | `185.199.108.153`, `.109.153`, `.110.153`, `.111.153` |
| `jeau.st` | MX | 3600 | `0 jeau-st.mail.protection.outlook.com` |
| `jeau.st` | TXT | 86400 | `v=spf1 include:spf.protection.outlook.com -all` |
| `jeau.st` | TXT | 86400 | `atlassian-domain-verification=M1V8m8KJ...` |
| `jeau.st` | TXT | 86400 | `atlassian-sending-domain-verification=01bd5152-...` |
| `www` | CNAME | 14400 | `jooozt.github.io` |
| `autodiscover` | CNAME | 3600 | `autodiscover.outlook.com` |
| `selector1._domainkey` | CNAME | 14400 | `selector1-jeau-st._domainkey.jeaust.onmicrosoft.com` |
| `selector2._domainkey` | CNAME | 14400 | `selector2-jeau-st._domainkey.jeaust.onmicrosoft.com` |
| `_dmarc` | TXT | 14400 | `v=DMARC1; p=none; sp=none;` |
| `mail` | CNAME | 14400 | `jeau.st` |
| `ftp` | CNAME | 14400 | `jeau.st` |
| `smtp` | CNAME | 14400 | `jeau.st` |

Er staat geen CAA-record en geen MTA-STS.

**Deze lijst was niet de waarheid.** De export uit stap 1 bracht zes
records aan het licht die hier niet in stonden, en die ook de scan van
Cloudflare niet vond:

| Naam | Type | TTL | Waarde |
| --- | --- | --- | --- |
| `bbc` | A | 14400 | `45.82.191.53` |
| `citadel` | A | 14400 | `45.82.191.53` |
| `atlassian-c75f7b._domainkey` | CNAME | 14400 | `atlassian-c75f7b.dkim.atlassian.net` |
| `atlassian-877420._domainkey` | CNAME | 14400 | `atlassian-877420.dkim.atlassian.net` |
| `atlassian-bounces` | CNAME | 14400 | `bounces.mail-us.atlassian.net` |
| `service` | CNAME | 14400 | `edge.redirect.pizza` |

Drie daarvan hangen aan mail. Was de verhuizing op de scan van Cloudflare
gebaseerd, dan was de DKIM-ondertekening van alles wat Jira en Confluence
versturen stilletjes omgevallen. Dit is de reden dat stap 1 stap 1 is.

Waarom je ze van buitenaf niet ziet: Hij is van buitenaf opgebouwd door
namen af te lopen die vaak voorkomen. Een record met een naam die niet in
die lijst stond, zie je hier niet: DNS laat je niet vragen wat er allemaal
in een zone zit, alleen of een bepaalde naam bestaat. De echte bron is de
zone-export bij Cloud86, en die is stap 1.

## Volgorde

### 1. Exporteer de zone bij Cloud86

In het Cloud86-paneel de zone van `jeau.st` exporteren, het liefst als
bestand. Bewaar hem buiten de repo. Leg hem naast de tabel hierboven en
noteer wat er extra in staat: dat is precies wat je anders kwijtraakt.

### 2. Zet de TTL's omlaag

**Overgeslagen op 5 november 2026.** Niet omdat het niet hoefde, maar
omdat er een goedkopere zekerheid bleek te zijn: beide nameserversets
serveren nu exact dezelfde data, gecontroleerd op alle 17 naam- en
typeparen. Tijdens de overlap kan er dus niets kapot, want welke van de
twee een resolver ook te pakken krijgt, hij krijgt hetzelfde antwoord.

Blijft staan dat een terugval hierdoor tot 3 uur kan duren, de TTL van de
delegatie bij de .ST-registry. Ga je alsnog iets wijzigen aan de records
voordat de delegatie om is, doe deze stap dan eerst.

Zet de TTL van alles op 300 seconden, minstens een etmaal voordat je de
nameservers omzet. De TTL's staan nu op 4 tot 24 uur, en zonder deze stap
duurt een eventuele terugval net zo lang.

Wacht daarna de oude TTL uit. De SPF- en verificatierecords staan op
86400, dus reken op een volle dag.

### 3. Voeg de zone toe in Cloudflare

Account `joostbeers@gmail.com`, account-id
`c6d329e07545e7e06bc3b9474e16a1b5`. Cloudflare scant de zone en neemt
over wat hij kan vinden. Dat is dezelfde beperkte scan als hierboven, dus
**vergelijk record voor record met de export uit stap 1** en vul handmatig
aan. Zet de nameservers nog niet om.

Let op de proxystatus. Alles wat met mail of verificatie te maken heeft
moet op **DNS only** staan, de grijze wolk:

| Record | Proxy |
| --- | --- |
| `jeau.st` A of de Worker | Proxied, oranje |
| `www` | Proxied, oranje |
| MX en alles waar MX naar wijst | DNS only |
| `autodiscover` | DNS only |
| `selector1._domainkey`, `selector2._domainkey` | DNS only |
| alle TXT | niet van toepassing |

Een geproxied record geeft het IP-adres van Cloudflare terug. Zet je DKIM
op oranje, dan komt de ontvanger bij Cloudflare uit in plaats van bij de
sleutel, en valt je ondertekening om.

### 4. Zet de nameservers om bij de registrar

Bij de partij waar `jeau.st` geregistreerd staat, niet per se Cloud86. De
twee nameservers die Cloudflare je geeft, in plaats van de drie van
Cloud86.

Vanaf hier serveert Cloudflare de zone. De site staat op dat moment nog
op GitHub Pages, want de A-records van `jeau.st` wijzen daar nog heen. Dat
is expres: je verhuist eerst DNS, en pas daarna de site.

**Hier liep het vast.** `jeau.st` staat bij nic.st, de registry van .ST
zelf. Cloudflare wees `candy.ns.cloudflare.com` en
`kenneth.ns.cloudflare.com` toe. Het formulier antwoordde:

```
Unable to process host kenneth.ns.cloudflare.com. Operation not permitted
```

De wijziging is niet doorgevoerd; de velden sprongen terug naar Cloud86.

De .ST-registry werkt met host objects: een nameserver is daar een apart
geregistreerd object en niet zomaar een stuk tekst bij je domein. De
foutmelding noemt alleen `kenneth`, terwijl die als tweede werd
ingediend, dus `candy` kwam er wel doorheen. Allebei resolven ze normaal
van buitenaf. Dat wijst op een host object dat bij de registry nog niet
bestaat en dat het klantpaneel niet zelf mag aanmaken.

Niet doen: ze een voor een proberen om te zien welke wel wordt
geaccepteerd. Zodra zo'n poging slaagt staat het domein op één
nameserver en is de verhuizing half gebeurd, met de zakelijke mail eraan.

Opgelost via ticket **#104477** bij nic.st, afdeling Support, 5 november
2026: of zij registreren het host object, of ze zetten de nameservers aan
hun kant om. Lukt dat niet, dan is de omweg Cloudflare om een ander
nameserverpaar vragen, in de hoop dat die namen bij de registry wel
bekend zijn.

### 5. Controleer de mail voordat je verdergaat

Niet doorgaan tot dit klopt:

- Stuur een mail van buitenaf naar `joost@jeau.st` en kijk of hij aankomt.
- Stuur er een vanaf `joost@jeau.st` naar een Gmail-adres en bekijk de
  headers. `spf=pass`, `dkim=pass` en `dmarc=pass` moeten er alle drie
  staan.
- Controleer in Outlook of een nieuw profiel zichzelf nog kan instellen,
  dat test `autodiscover`.
- Controleer of de twee Atlassian-verificaties er nog staan, anders
  verliest je Jira-omgeving het domein.

Gaat hier iets mis, dan zet je de nameservers terug naar Cloud86. Door
stap 2 is dat binnen vijf minuten overal doorgedrongen.

### 6. Koppel de Worker

Pas als stap 5 goed is. In `wrangler.jsonc`:

```jsonc
"routes": [
  { "pattern": "jeau.st", "custom_domain": true },
  { "pattern": "www.jeau.st", "custom_domain": true }
]
```

Dan `npm run deploy`. Cloudflare haalt de A-records van `jeau.st` en de
CNAME van `www` weg en zet er de Worker voor in de plaats, en regelt het
certificaat.

Wil je `www` liever laten doorverwijzen naar het kale domein in plaats van
allebei te serveren, doe dat dan met een Redirect Rule in Cloudflare en
laat `www` uit de routes.

### 7. Ruim op

- Haal het custom domain weg bij de oude GitHub Pages-repo, en het
  `CNAME`-bestand erin. Zolang GitHub het domein geclaimd houdt, kan
  niemand anders het claimen, maar het staat ook in de weg.
- Haal `ftp`, `smtp` en `mail` weg. Die wijzen alle drie naar `jeau.st` en
  komen dus op de website uit. Dat zijn standaardrecords van Cloud86 die
  hier niets doen.
- Zeg de hosting bij Cloud86 pas op als alles een week goed draait.

## Wat ik hierna zou aanzetten

Dit hoeft niet voor de verhuizing, maar het is het natuurlijke moment.

**DMARC aanscherpen.** Er staat nu `v=DMARC1; p=none; sp=none;`. Dat
vraagt niets en rapporteert niets, dus je weet niet wie er namens jou
mailt. Zet er eerst een rapportageadres bij:

```
v=DMARC1; p=none; rua=mailto:dmarc@jeau.st; fo=1;
```

Kijk een paar weken naar de rapporten, en ga dan naar `p=quarantine` en
later `p=reject`. SPF staat al op `-all` en DKIM is actief op twee
selectors, dus de basis is er.

**CAA toevoegen.** Nu mag elke certificaatautoriteit een certificaat voor
`jeau.st` uitgeven. Na de verhuizing geeft Cloudflare je certificaten uit:

```
jeau.st CAA 0 issue "letsencrypt.org"
jeau.st CAA 0 issue "pki.goog"
jeau.st CAA 0 issue "ssl.com"
```

Dat zijn de autoriteiten die Cloudflare gebruikt. Zet ze er alle drie in,
anders kan een vernieuwing stuklopen.

**Cloudflare Web Analytics.** Zie `analyticsToken` in `src/data/site.ts`.
Cookieloos, dus geen cookiemelding nodig.

## Wat nog openstaat voor livegang

Uit `OPLEVERING.md`: de privacytekst is nog niet juridisch nagelezen. Dat
is het enige blokkerende punt, en het is logischer om dat te regelen
voordat `jeau.st` naar de nieuwe site wijst dan erna.
