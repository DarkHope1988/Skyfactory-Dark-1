# Skyfactory Dark - Master Roadmap (SF5 + ATM10 Scale)

## Vision
Skyfactory Dark wird als langfristiges Progressionsspiel aufgebaut:
1. Void-Start mit klaren fruehen Loops.
2. Viele Mods wie in grossen Packs, aber mit harter Struktur statt Mod-Chaos.
3. Ein kompletter Spielpfad mit klaren Midgame-, Lategame- und Endgame-Zielen.

## Design-Prinzipien
1. Jede Mod braucht eine Rolle (`Core`, `Progression`, `Side`, `Endgame`).
2. Jede Stage hat konkrete Unlocks, Gates, Quests, Rewards.
3. Keine Mod ohne Integration in Quests und RecipeStages.
4. Keine Stage ohne Testkriterien.
5. Mehrere Wege ja, aber kein Progress-Skip.

## Zielumfang (grosses Pack)
1. Stage 0 bis Stage 14 als Hauptkampagne.
2. 3 Endgame-Pfade parallel:
   - Tech-Path
   - Magic-Path
   - Automation/Factory-Path
3. Gemeinsame Prestige-Ziele am Ende (Mega-Crafting, Boss- und Infrastruktur-Meilensteine).

## Stage-Blueprint
1. Stage 0 - Willkommen
2. Stage 1 - The Beginning
3. Stage 2 - Stone
4. Stage 3 - Heat
5. Stage 4 - Machines
6. Stage 5 - Automation I
7. Stage 6 - Automation II
8. Stage 7 - Power Infrastructure
9. Stage 8 - Digital Storage
10. Stage 9 - Advanced Processing
11. Stage 10 - Mob/Resource Systems
12. Stage 11 - Magic Integration
13. Stage 12 - Mega Industry
14. Stage 13 - Cross-Path Mastery
15. Stage 14 - Endgame

## Content-Wellen (Umsetzung)
1. Wave A (jetzt): Stage 0-3 stabilisieren.
2. Wave B: Stage 4-6 mit Create + erster Teilautomation.
3. Wave C: Stage 7-10 mit Power, Digitalisierung, Processing-Ketten.
4. Wave D: Stage 11-14 mit grossen Multimod-Rezepten und finalen Zielen.

## ATM10-Uebernahme-Strategie
1. Nicht "alles auf einmal", sondern Intake in Paketen:
   - Paket `Core Tech`
   - Paket `Magic`
   - Paket `Storage`
   - Paket `Logistics/Automation`
   - Paket `QoL + World`
2. Pro Paket:
   - Konfliktcheck
   - Rezept-/Tag-Mapping
   - Stage-Einordnung
   - Quest-Integration
   - Balancing-Test

## Integrationsregeln pro Mod
1. Entry Stage:
   - Ab wann darf die Mod sichtbar werden?
2. Hard Gate:
   - Welche Schluesselrezepte werden per Stage blockiert?
3. Soft Gate:
   - Welche Vorbedingungen helfen beim Flow (Questhinweise, Tooltips)?
4. Reward/Use Case:
   - Warum ist die Mod jetzt relevant?
5. Exit Criteria:
   - Woran messen wir "Mod erfolgreich integriert"?

## Quest-System (FTB Quests)
1. Hauptkapitel: Stage 0-14.
2. Unterkapitel je Stage:
   - Core Tasks
   - Optional Tasks
   - Challenge Tasks
3. Rewards:
   - Klein und progressionstreu im Earlygame
   - Utility und Build-Booster im Midgame
   - Prestige-Komponenten im Endgame

## Balance-System (KubeJS + RecipeStages)
1. Stage-Gates auf Schluesselrezepte.
2. Loot-/Drop-Loop je Stage feinjustieren.
3. Skip-Prevention fuer fruehe Abkuerzungen.
4. Wiederholbare, nicht frustige Material-Loops.

## Testprotokoll
1. Fresh Run Test je Stage:
   - Time-to-Stage
   - Friction-Punkte
   - Ressourcenengpaesse
2. Regression Test:
   - Nach jeder neuen Mod-Welle.
3. Multiplayer Test:
   - Team-Fortschritt
   - Stage-Sync
   - Reward-Claiming

## Naechste konkrete Umsetzungsschritte
1. `defaultconfigs/ftbquests/quests.snbt` initialisieren (Stage 0-3).
2. RecipeStages fuer Stage 0-3 hart setzen.
3. ATM10-Intake-Backlog fuellen und priorisieren.
4. Wave-B Kandidaten festlegen (Stage 4-6 Kernmods).

## Sprint 1 (ab jetzt)
1. Ziel: Stage 0-3 produktionsreif machen.
2. Deliverable A: FTB-Questkapitel fuer Stage 0-3 mit Rewards.
3. Deliverable B: harte RecipeStages-Gates fuer fruehe Skip-Prevention.
4. Deliverable C: JEI-Hints und Tooltips pro Stage.
5. Deliverable D: Fresh-Run Testprotokoll mit 3 Durchlaeufen.

## Sprint 2
1. Ziel: Stage 4-6 mit erster echter Midgame-Automation.
2. Deliverable A: Create-Midgame-Questline inkl. Maschinen-Meilensteine.
3. Deliverable B: SophisticatedStorage als Bridge-Lagerintegration.
4. Deliverable C: Mob-Loop Stage 6 kontrolliert freischalten.

## Sprint 3
1. Ziel: Stage 7-10 Core-Tech-Layer.
2. Deliverable A: Power-Backbone final entscheiden (`powah` vs `thermal` first).
3. Deliverable B: AE2-Entry und Digital-Storage-Questline.
4. Deliverable C: Advanced Processing in mehreren Teilstufen.
