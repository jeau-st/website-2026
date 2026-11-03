# Prompt: de inhoud van jeau.st

Gebruik deze prompt om de tekst en de opbouw van de site te maken of te herzien.
Voor de toon geldt `SCHRIJFWIJZER.md`, die herhaal ik hier niet.

---

Je schrijft de inhoud voor jeau.st, de site van Joost Beers. Hij richt CRM in,
koppelt systemen en automatiseert handwerk voor kleine bedrijven.

## Wat er nu mis is

De site vertelt wat Joost doet: CRM-inrichting, koppelingen, AI, support. Dat
klopt, maar het is inwisselbaar. Elke automatiseerder zet dat rijtje op zijn
site. Wat ontbreekt is de volgorde waarin Joost werkt en waarom die volgorde
zo is. Dat is het eigenlijke verhaal en dat moet de site dragen.

## Voor wie

Bedrijven van 1 tot 20 man. Niet-technische ondernemers. De lezer is iemand
die het werk zelf nog doet of vlak boven de uitvoering zit.

## De kern: de volgorde

Dit is de ruggengraat van de site. Niet als lijstje diensten, maar als
redenering waarin elke stap de volgende mogelijk maakt.

1. **Eerst het proces.** Vastleggen hoe het nu echt gaat, dan standaardiseren.
   Eén manier van werken in plaats van drie. Zonder die stap automatiseer je
   de rommel alleen maar sneller.
2. **Dan pas automatiseren.** En niet alles. We kijken waar de grootste
   tijdwinst zit en beginnen daar.
3. **Dan meetbaar maken.** Niet meten om het meten, maar de juiste dingen
   meten. Je verbetert immers waar je zicht op hebt.
4. **Dan opnieuw.** Die drie stappen samen zijn geen project met een einddatum
   maar een werkwijze die je blijft herhalen.

Let op: dit is een cyclus, geen rechte lijn. De site toont nu zes stappen van
kennismaking tot support achter elkaar. Dat is de projectvolgorde, niet de
denkwijze. Beide mogen op de site staan, maar de denkwijze gaat voor.

## Twee ingangen

- **De quickscan op de site.** De bezoeker beantwoordt een paar vragen en ziet
  waar zijn organisatie staat. Hij weet daarna waar hij moet beginnen, Joost
  weet vooraf wat voor vlees hij in de kuip heeft.
- **Het kennismakingsgesprek.** 30 minuten, via Teams. Blijft de primaire actie.

Daarna volgt een plan dat bij die uitkomst past.

## Na de bouw

Joost blijft betrokken als vraagbaak of met vaste support. Dat heet op de site
een **onderhoudsabonnement**. Nooit SLA, nooit service level agreement.

Binnen de klant zijn één of twee mensen superuser. Zij zijn intern het eerste
aanspreekpunt. Elke twee weken is er overleg met hen: lopende werkzaamheden
evalueren, nieuwe wensen ophalen, scherp krijgen en op volgorde zetten.

Dat ritme is zelf een verkoopargument, want het laat zien dat het na de
oplevering niet stopt. Zet het niet weg als een voetnoot.

## De Petra-toets

Petra is de administratief medewerker bij de klant. Zij weet niet wat een SLA
is, wat refinement is of wat een API doet. Elk woord op de site moet de
Petra-toets doorstaan: zou zij het begrijpen zonder uitleg? Zo niet, ander
woord. Dit geldt ook voor woorden die in het vak doodnormaal zijn.

## Niet verzinnen

Geen klanten, cijfers, resultaten of testimonials. Ontbreekt iets, dan komt er
een zichtbare TODO op de pagina. Geen prijzen.

## Wat er inmiddels staat

De denkwijze staat in `src/data/site.ts` als `denkwijze` en op de homepage en
de aanpakpagina als eigen sectie, boven de projectvolgorde. Het ritme na de
oplevering staat als `nabouw` en als sectie "En dan gaat het pas werken".
De symmetrie is uit de diensten, de processtappen en de principes op de
aanpakpagina gehaald.

Nog niet geschreven, omdat de keuzes hieronder nog openstaan: de quickscan,
de calculator en alles over prijzen en doelgroepgrootte.

## Openstaande keuzes

Deze moet Joost beslissen voordat de inhoud af kan.

1. Is de quickscan een besluit of nog een idee? Het is een flinke bouw.
2. Wat levert de quickscan op: een niveau, een score, een advies, of alle drie?
   Voorstel: vier niveaus die samenvallen met de vier stappen hierboven, zodat
   de uitslag meteen zegt waar je begint.
3. Vraagt de quickscan om een mailadres? Dat botst met de regel dat er geen
   contactformulier als hoofdroute op de site staat.
4. Krijgt het onderhoudsabonnement een prijs of een vorm? Nu geldt: geen
   prijzen op de site.
5. Loopt het onderhoudsabonnement via FortCRM of onder eigen vlag?
6. 1 tot 20 man is smaller dan wat er nu staat. De teksten noemen MKB en
   scale-ups. Aanscherpen naar 1 tot 20, of allebei bedienen?

## Waar de losse ideeën staan

De twee interactieve onderdelen zijn uitgewerkt in Jira, inclusief hun open
punten. Haal ze daar op voordat je er inhoud voor schrijft.

- Quickscan: [ST-50](https://jeaust.atlassian.net/browse/ST-50)
- Prijscalculator: [ST-49](https://jeaust.atlassian.net/browse/ST-49)

Allebei zijn het ingangen bovenaan de trechter. Ze kunnen elkaar in de weg
zitten, dus er moet er een de hoofdingang worden. Zolang dat niet gekozen is,
blijft het kennismakingsgesprek de primaire actie op elke pagina.

De calculator raakt bovendien de regel dat er geen prijzen op de site staan.
Zolang die regel geldt, schrijf je de inhoud zonder bedragen.
