# Skyfactory Dark - Master Concept V2

## Core Identity
Skyfactory Dark soll sich nicht wie "normales Minecraft im Himmel" anfuehlen, sondern wie ein eigenes Skywelt-Spiel:
1. Alles beginnt mit knappen Inselressourcen.
2. Fortschritt entsteht durch bewusst designte Materialkreislaufe.
3. Jede neue Tier-Stufe veraendert den Spielstil spuerbar.

## Progression Framework
Es gibt einen Hauptpfad und mehrere Parallelzweige.

### Hauptpfad (Pflicht)
1. `Early`
2. `Stone`
3. `Mid`
4. `Late`
5. `End`

### Parallelzweige (Pfadsystem)
1. `Power` mit:
   - Power Early
   - Power Mid
   - Power Late
   - Power End
2. `Magic` mit:
   - Magic Early
   - Magic Mid
   - Magic Late
   - Magic End
3. `Automation` mit:
   - Automation Early
   - Automation Mid
   - Automation Late
   - Automation End
4. `Exploration/Challenge` mit:
   - Challenge Early
   - Challenge Mid
   - Challenge Late
   - Challenge End

## Design Pillars fuer "Unique Skywelt Feeling"
1. Insel als Maschine:
   - Die Basis ist kein Haus, sondern ein wachsender Produktionsorganismus.
2. Vertikale Expansion:
   - Unten: Rohstoff/Drop-Ebenen
   - Mitte: Verarbeitung
   - Oben: Power/Control/Magic
3. Sichtbarer Fortschritt:
   - Jede Tier-Stufe fuegt neue Layer zur Insel hinzu.
4. Engpass-Design:
   - Jede Stufe hat 1-2 harte Bottlenecks, die ueberlegt geloest werden muessen.
5. Mehrpfad-Endgame:
   - Kein einzelner "richtiger" Weg, aber klare Mastery-Ziele.

## Tier-Gates (V2)
### Early -> Stone
1. Organic/Compost/Soil-Kette stabil.
2. Erste Steinproduktion verlässlich.

### Stone -> Mid
1. Erste thermische Verarbeitung.
2. Werkzeug- und Infrastrukturgrundlagen.

### Mid -> Late
1. Kontinuierliche Automation fuer Kernmaterialien.
2. Erste Power-Backbone-Entscheidung.

### Late -> End
1. Digitalisierung + High-Tier-Processing.
2. Multimod-Rezepte mit langen Ketten.

## Branch-Gating-Regeln
1. Hauptpfad bestimmt das maximale Branch-Tier.
2. Power/Magic duerfen Hauptpfad nicht skippen.
3. Wichtige Endgame-Rezepte brauchen Mischung aus:
   - Hauptpfad + Power + Magic + Automation.

## Content-Scope (SF5 + ATM10 Scale)
1. Grosses Modset ja, aber nur mit klarer Tier-/Branch-Zuordnung.
2. Jede Mod bekommt:
   - Entry Tier
   - Branch-Rolle
   - Hard-Gates
   - Questline
   - Testkriterien

## Quest-UX
1. Hauptkapitel:
   - Early, Stone, Mid, Late, End
2. Branchkapitel:
   - Power E/M/L/End
   - Magic E/M/L/End
   - Automation E/M/L/End
3. Jedes Kapitel:
   - Core Quests (Pflicht)
   - Side Quests (optional)
   - Challenge Quests (Prestige)

## Reward Philosophy
1. Early: kleine Utility-Rewards, kein Skip.
2. Stone/Mid: QoL + begrenzte Beschleunigung.
3. Late/End: starke Module nur nach echter Leistung.

## Technical Backbone
1. KubeJS/LootJS: Kernlogik und Materialkreislaufe.
2. GameStages + RecipeStages: harte Freischaltungen.
3. FTB Quests: Hauptnavigation fuer den Spieler.
4. Better Advancements: sekundarer visueller Fortschritt.

## Umsetzung in Wellen
1. Wave A:
   - Hauptpfad Early/Stone voll ausarbeiten.
   - Power Early und Magic Early eroeffnen.
2. Wave B:
   - Hauptpfad Mid.
   - Power Mid + Automation Early/Mid.
3. Wave C:
   - Hauptpfad Late.
   - Magic Mid/Late, Power Late.
4. Wave D:
   - Hauptpfad End.
   - Alle End-Branches + Prestige.

## Naechster konkreter Build-Schritt
1. Queststruktur auf Tier+Branch umstellen:
   - Hauptpfad: Early/Stone/Mid/Late/End.
   - Branchpfade initial mit je 1 Einstiegskapitel.
2. Stage-Namensschema im Code angleichen:
   - von numerischen Stage-Namen zu Tier+Branch-Key-System.
3. Erste Hard-Gates fuer:
   - Main Early/Stone
   - Power Early
   - Magic Early.
