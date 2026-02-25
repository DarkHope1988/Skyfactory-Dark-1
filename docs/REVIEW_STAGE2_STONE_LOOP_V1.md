# Schritt 2 - Stage-2 Stone-Loop-Check (V1)

## Scope
Review gemaess PROGRESSIONSPLAN_STAGE0-3_V1:
1. Anzahl der Craft-Schritte bis Cobble
2. Nebenprodukte sinnvoll?
3. Fuehlt sich Stone "verdient" an?

Keine Gameplay-Aenderung in diesem Schritt.

---

## 1) Technischer Ist-Stand (Stone-Route)

### Stage-Trigger
1. Stage 2 unlockt auf `minecraft:stone`.
2. Triggerpfad ist doppelt abgesichert:
- Milestone-Mapping in `SFD_STAGE_CRAFT_MILESTONES`
- `PlayerEvents.inventoryChanged` auf `minecraft:stone`

Quellen:
- `kubejs/server_scripts/_core/11_stages.js`
- `kubejs/server_scripts/systems/progression/stages_flow.js`

### Materialkette
1. Dirt/Packed Soil Verarbeitung erzeugt:
- `raw_soil_chunk`
- `stone_grit`
- `organic_fiber`
- (selten) `pebble_cluster`

2. Rezeptrouten nach Cobble:
- Route A: `4x stone_grit -> 1x cobblestone`
- Route B:
  - `raw_soil_chunk -> pebble_cluster`
  - `2x raw_soil_chunk + 1x pebble_cluster -> 1x stone_grit`
  - `2x stone_grit + 1x raw_soil_chunk + 1x compost_pulp -> 2x rough_stone_mix`
  - `4x rough_stone_mix -> 2x cobblestone`

3. Danach Furnace/Smelting -> `minecraft:stone` (Stage-2 Milestone).

Quellen:
- `stone_processing.js`
- `dirt_processing.js`
- `packed_soil_mallet.js`

---

## 2) Schrittanzahl bis Cobble (qualitativ + grobe Zahlen)

## Route A (direkt, grit-basiert)
1. Dirt/Soil erzeugen
2. Mallet-Prozess bis `stone_grit`
3. `4x stone_grit -> 1x cobblestone`

Grobe Erwartung aus Packed Soil Loot:
- `stone_grit` Erwartungswert pro Packed Soil: ~0.80
- Fuer 1 Cobble (4 grit) braucht man statistisch ~5 Packed Soil-Abbauten

Bewertung:
- Direkt, aber grindig/roh.
- Eher "Milestone durch Wiederholung" als durch Prozesskette.

## Route B (prozessiert, rough_stone_mix)
Pro 1 Cobblestone (halbe 2x-Ausgabe umgerechnet) etwa:
- `2x stone_grit`
- `1x raw_soil_chunk`
- `1x compost_pulp`

Bewertung:
- Deutlich mehr Systemtiefe als Route A.
- Fuehlt sich kontrollierter/planbarer an.
- Nutzt mehrere Teilloops (Soil + Compost + Resin).

## Zwischenergebnis
- Der Stone-Einstieg hat bereits zwei sinnvolle Spielstile:
  - Schnell-dirty (Route A)
  - Prozessiert/effizienter (Route B)
- Das ist positiv fuer Player-Agency.

---

## 3) Nebenprodukte - Nutzenanalyse

## Aktuelle Nebenprodukte
1. `organic_fiber` (aus Dirt/Packed Soil)
2. `pebble_cluster` (selten aus Packed Soil, plus deterministic craft)
3. kleiner Dirt-Refund (5%) bei Dirt-Mallet

## Bewertung
1. Nebenprodukte sind vorhanden, aber funktional noch begrenzt.
2. Es gibt noch keine klaren Stage-2-Sideoutputs wie z. B. `slag_dust` / `clay_trace` mit eigener Folgekette.
3. Damit fehlt aktuell ein Teil des gewuenschten Gefuehls "jeder Schritt produziert Wert".

## Fazit Nebenprodukte
- Solide Basis vorhanden.
- Fuer "ausgereifte Stone Age" sind 1-2 dedizierte Sideproduct-Loops noch offen.

---

## 4) Fuehlt sich Stone "verdient" an?

## Positiv
1. Stage-2 Trigger auf `minecraft:stone` statt Cobble bremst den Progress sinnvoll.
2. Fuel-Engpass wirkt (Bark Briquette 50 Ticks, ca. 4 pro Smelt).
3. Zwei Cobble-Routen erlauben Entscheidung statt linearer Zwang.

## Noch nicht ideal
1. Route A kann sich bei Pech nach stumpfem Wiederholen anfuehlen.
2. Nebenprodukte tragen noch nicht stark genug zur Strategie bei.
3. Der Uebergang von erstem Cobble zu erstem Stone ist technisch sauber, aber emotional noch kein "großer Systemmoment".

## Gesamturteil Schritt 2
Stone fuehlt sich aktuell "fair verdient", aber noch nicht voll ausgereift.

Reifegrad (vorlaeufig):
- Technisch: gut
- Balancing: brauchbar
- Systemtiefe/Nebenprodukt-Nutzen: mittel

---

## 5) Konkrete Ansatzpunkte fuer spaeteres Balancing (ohne Triggeraenderung)

1. Route-A Reibung feinjustieren
- Entweder minimal mehr planbarer Grit,
- oder klarere Belohnung fuer Route-B Nutzung.

2. Stage-2 Sideproducts einfuehren
- 1 Sideoutput an `stone_grit` oder `rough_stone_mix`
- 1 verwertbares Folgerezept mit echtem Nutzen

3. Heat-Vorbereitung sichtbarer machen
- Stone-Loop-Ausgang staerker auf Furnace/Blast-Furnace vorbereiten
- z. B. durch "Heat Prep"-Komponente statt direktem Sprung zu Metall

---

## 6) Entscheidung fuer naechsten Schritt
Schritt 3 kann jetzt sauber erfolgen:
- Stage-3 Heat-Definition
- realistischer Weg zur Blast Furnace
- systemischer Effekt von Heat als klarer neuer Spielmodus

