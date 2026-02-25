# Schritt 1 - Stage 0/1 Loop-Check (V1)

## Scope
Review gemaess PROGRESSIONSPLAN_STAGE0-3_V1:
1. Leaf-Drops (Crook)
2. Organic -> Earth -> Soil -> Tempo
3. Engpass-Definition (Fuel / Podest / Resin)

Keine Gameplay-Aenderung in diesem Schritt.

---

## 1) Leaf-Drops / Crook-Check

## Technischer Ist-Stand
Quelle: `kubejs/server_scripts/systems/resources/leaves_system.js`

1. Vanilla-Leaves-Drops werden entfernt:
- Stick, Apple, Saplings (Vanilla table)

2. Hauptdrop:
- Jede Leaf gibt `kubejs:leaf_threads` (deterministisch)

3. Sapling Sustain:
- Basischance: `0.14` (14%) auf `minecraft:oak_sapling`

4. Crook-Bonus:
- Bei Mainhand-Tag `#skyfactorydark:harvest_tools` zusaetzlich `0.20` (20%) auf Oak Sapling
- `harvest_tools` mappt auf `#exdeorum:crooks`

## Bewertung
1. Der Crook-Flow ist technisch korrekt angebunden.
2. Sapling-Economy wirkt fuer Early stabil und nicht zu knapp.
3. Inferenz zur Gesamtrate mit Crook: zwei unabh. Chancen (14% + 20%) ergeben effektiv ca. 31.2% pro Leaf.

## Ergebnis
- Leaf/Crook-Teil ist als Basis belastbar.
- Kein Blocking-Problem im Einstieg sichtbar.

---

## 2) Organic -> Earth -> Soil -> Tempo-Check

## Technischer Ist-Stand
Kernquellen:
- `organic_processing.js`
- `bio_progression.js`
- `dirt_processing.js`

## Kernkette (vereinfacht)
1. Leaves -> `leaf_threads`
2. Logs -> `wood_shavings`
3. `4x leaf_threads` -> `leaf_bundle`
4. `leaf_bundle + wood_shavings` -> `earth_block`
5. Earth abbauen -> `earth_clump` + Wurmchance
6. `earth_clump` -> Earth-Loop-Stabilisierung
7. Wurm + Earth -> `wormy_earth_block` (Chance 0.28)
8. Wood Shavings auf wormy Earth -> `dried_worm` (1-2, garantiert), Block wird verbraucht
9. `dried_worm + wood_shavings` -> `organic_rod`
10. `organic_dust`, `compost_pile`, `compost_pulp` -> `minecraft:dirt`
11. Dirt + Compost Pulp -> `packed_soil`
12. Mallet auf Dirt/Packed Soil -> `raw_soil_chunk`, `stone_grit`, `organic_fiber`

## Tempo-Eindruck (qualitativ)
1. Stage 0 fuehlt sich handwerklich und prozessual an (gut).
2. Nach Workbench wechselt Tempo stark auf Ressourcenverdichtung (Compost + Dirt + Packed Soil).
3. Der Weg zu ersten Stone-Komponenten ist nicht instant, aber spuerbar schneller als die Bio-Loop davor.

## Ergebnis
- Loop ist spielbar und reproduzierbar.
- Der Uebergang Stage 0 -> Stage 1 hat aktuell einen gefuehlten Tempo-Sprung.

---

## 3) Engpass-Definition (Fuel / Podest / Resin)

## Beobachtung je Kandidat

1. Fuel
- `bark_briquette` existiert und ist bewusst knapp (50 Ticks Burntime, ca. 4 pro Smelt).
- Heat-Prozesse werden dadurch langfristig limitierend.
- Fuel ist klar als Stage-1/2-Engpass geeignet.

2. Podest
- Podest ist fruehe Mini-Maschine mit Prozessregeln und Chancen.
- Untergrund-Skalierung existiert (Base langsam, Stone/Furnace schneller).
- Aktuell eher Effizienzwerkzeug als harter Gate-Engpass.

3. Resin
- Resin ist in vielen Kernrezepten (Mallet, Compost-Pulp, Bark-Briquette, Podest-Rezept).
- Damit ist Resin frueh ein "Mikro-Engpass" fuer Handlungsfreiheit.
- Bei falscher Menge fuehlt sich Stage 1 schnell "resin-locked" an.

## Vorlaeufige Engpass-Hierarchie (Schritt 1)
1. Primar: Fuel/Heat
2. Sekundar: Resin
3. Tertiaer: Podest-Throughput

---

## Konsistenz-Check gegen Projektziel

1. Stage-0/1 Grundlogik ist vorhanden und technisch sauber.
2. Kein akuter Bug-Blocker im Crook/Leaf-Einstieg gefunden.
3. Hauptproblem ist kein Defekt, sondern Pacing-Konsistenz:
- Stage 0 ist detailreich,
- Stage 1 springt relativ schnell in Verdichtungsprozesse.

---

## Entscheidungen fuer den naechsten Schritt (Schritt 2 Vorbereitung)

1. Stone-Loop wird als "verdient" ueber Prozessdichte und Nebenprodukte bewertet.
2. Fuel bleibt geplanter Hauptengpass fuer Heat.
3. Resin wird als Balancing-Hebel separat beobachtet.
4. Podest bleibt fruehe schwache Mini-Automation (nicht Hauptgate).

---

## Offene Punkte aus Schritt 1

1. Sollen wir die Resin-Verbrauchsdichte in Stage 1 gezielt reduzieren oder bewusst als fruehen Entscheidungsdruck behalten?
2. Sollen Side-Byproducts bereits in Stage 1 eingefuehrt werden oder erst mit Stage-2-Review?
3. Soll die Stage-1 Exit-Condition in der SSOT bereits jetzt als harte Checkliste fixiert werden?

