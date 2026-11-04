# Schrijfwijzer Jeau.st

Elke tekst op deze site klinkt alsof Joost hem zelf zegt tegen een ondernemer aan tafel.

Wie er spreekt, voor wie en met welk karakter staat in [`docs/brand-persona.md`](docs/brand-persona.md). Lees die eerst. Deze wijzer gaat over hoe je schrijft en wint bij twijfel.

## Stem

- Nederlands, je-vorm, spreektaal maar verzorgd.
- Kort. Zinnen gemiddeld onder de twaalf woorden. Een zin van drie woorden mag.
- Concreet. Noem tools, handelingen, situaties. Dus "je offerte staat in Pipedrive, de factuur in Moneybird, zonder overtikken" en niet "naadloze integratie van je systemen".
- Nuchter en zelfverzekerd. Geen beloftes die niet waar te maken zijn.
- Droog of eigenwijs mag. Grappig om grappig te zijn niet.

## Niet gebruiken

Dit zijn de patronen waaraan je ziet dat een tekst door een taalmodel is geschreven.

- Em dash en gedachtestreepjes als stijlmiddel.
- De woorden: naadloos, moeiteloos, ontgrendel, tilt naar een hoger niveau, in het huidige digitale landschap, cruciaal, essentieel, robuust, holistisch, synergie, game changer, toekomstbestendig, empoweren, optimaliseren zonder te zeggen wat, en oplossingen als vaag woord.
- Drietallen als ritme ("snel, slim en simpel"), tenzij het echt drie dingen zijn.
- Tegenstellingen als stijlmiddel. Zie de sectie hieronder, want dat is de vorm die het vaakst terugkomt.
- Een retorische vraag als opening.
- Uitroeptekens, emoji's, Engelse woorden waar een Nederlands woord bestaat.
- Elke alinea afsluiten met een samenvattende oneliner.
- Een opsomming waar een zin volstaat.
- Blokken die allemaal even lang zijn en koppen die allemaal dezelfde vorm hebben.

## Tegenstellingen

Veel zinnen zeggen eerst wat iets niet is. Eén zo'n zin is een stijlmiddel,
vijf achter elkaar zijn een tic. De vormen om op te letten:

- "X, niet Y" ("ingericht op hoe jij verkoopt, niet op de standaardinstelling")
- "Niet X, maar Y" en "niet alleen X, maar ook Y"
- "Het is geen X, het is Y"
- "Geen X, geen Y" als opsomming
- "X in plaats van Y"
- "X is zelden het probleem. Y wel." verdeeld over twee zinnen
- "Liever X dan Y"

**De toets:** streep de helft met de ontkenning weg. Blijft er dan informatie
staan die je kwijt was? Dan mag de tegenstelling blijven. "Eén manier van
werken in plaats van drie" houdt het aantal vast, dus die blijft. "Geen
accountmanager ertussen" zegt alleen wat er niet is, dus die gaat eruit.

**De dichtheid:** hooguit één per sectie, en nooit twee achter elkaar.

Uitzondering: op de privacypagina is wat er níét gebeurt juist de inhoud.
Daar mogen ze op een rij staan.

## Wel doen

- Begin bij de situatie van de klant, niet bij Joost.
- Gebruik de woorden die klanten zelf gebruiken. "Het staat overal en nergens." "Dat doet Petra altijd."
- Wissel zinslengte af.
- Eén idee per alinea.
- Liever een voorbeeld dan een bijvoeglijk naamwoord.
- Laat weg wat niets toevoegt.

## Feiten

- Verzin geen klanten, cijfers, resultaten of testimonials. Ontbreekt iets, dan komt er een zichtbare TODO.
- Geen prijzen op de site.
- Achtergrond: tien jaar ervaring, met salesteams, data-analyse, systeemimplementaties en koppelingen. Niet uitsplitsen in jaren per werkgever. Koppelkoning, procesnerd. Werkt met Pipedrive, n8n, Airtable en AI via MCP.

## Werkwijze bij een nieuwe tekst

1. Vraag eerst voor welke plek de tekst is, wat hij moet doen en hoe lang hij mag zijn.
2. Lever twee varianten met een echt andere invalshoek, geen herformulering van dezelfde zin.
3. Draai `npm run schrijfwijzer`. Die controleert de zichtbare tekst op de
   lijsten hierboven. Wat hij "fout" noemt moet weg; wat hij "let op" noemt
   beoordeel je zelf met de wegstreeptoets. Het script zoekt op zinsbouw en
   niet alleen op woorden, want zoeken op "naadloos" vindt niets in "ik bouw
   het niet alleen, ik weet ook", terwijl dat precies de verboden vorm is.
4. Lees hardop. Zou Joost dit zo zeggen tegen een klant? Zo niet, opnieuw.
