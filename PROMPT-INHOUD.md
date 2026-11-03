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

De vier niveaus staan als `niveaus` en als sectie "Waar sta jij?" op de
aanpakpagina. Over de calculator staat nog niets op de site, want die botst
met de regel geen prijzen.

## Gemaakte keuzes

Joost heeft deze op 3 november 2026 beslist.

1. **Quickscan: nog niet bouwen, wel tonen.** De vier niveaus staan als
   leesbare sectie op de aanpakpagina, zodat iemand zichzelf herkent zonder
   vragenlijst. De interactieve bouw blijft in ST-50 staan.
2. **Wat de scan oplevert: vier niveaus die samenvallen met de vier stappen.**
   Waar je staat bepaalt waar je begint.
3. **Geen mailadres.** Vervalt met keuze 1: zonder vragenlijst is er niets om
   een adres voor te vragen. De regel geen contactformulier als hoofdroute
   blijft heel.
4. **Onderhoudsabonnement: wel een vorm, geen prijs.** De site noemt wat
   erin zit en geen bedragen.
5. **FortCRM wordt niet genoemd.** De vermelding is van de pagina Over mij
   af. Let op: daarmee staat de Pipedrive-partnerstatus nergens meer als
   argument.
6. **Doelgroep blijft MKB en scale-ups.** Niet aangescherpt naar 1 tot 20 man.
   De teksten in deze prompt noemen die bandbreedte nog wel als beeld van de
   lezer; dat is de typische klant, niet de afbakening.

## Waar de losse ideeën staan

De twee interactieve onderdelen zijn uitgewerkt in Jira, inclusief hun open
punten. Haal ze daar op voordat je er inhoud voor schrijft.

- Quickscan: [ST-50](https://jeaust.atlassian.net/browse/ST-50)
- Prijscalculator: [ST-49](https://jeaust.atlassian.net/browse/ST-49)

Allebei zijn het ingangen bovenaan de trechter. Ze kunnen elkaar in de weg
zitten, dus er moet er een de hoofdingang worden. Zolang geen van beide
gebouwd is, blijft het kennismakingsgesprek de primaire actie op elke pagina.

De calculator raakt bovendien de regel dat er geen prijzen op de site staan.
Zolang die regel geldt, schrijf je de inhoud zonder bedragen.
