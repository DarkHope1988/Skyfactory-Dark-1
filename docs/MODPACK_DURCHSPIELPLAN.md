# Skyfactory Dark - Durchspielplan (Testfokus)

Dieses Dokument beschreibt den geplanten Spielfluss fuer den aktuellen Teststand.

## Stage 0 - Willkommen
1. Starterkit annehmen: Sapling, Dirt, Crook, Sticks.
2. Holz sichern und Leaves mit Crook farmen.
3. `organic_dust` sammeln.
4. `compost_pile` und `compost_pulp` craften.
5. Dirt erzeugen und in `packed_soil` investieren.

## Stage 1 - The Beginning
1. `crude_mallet` craften.
2. Dirt oder Packed Soil mit Mallet verarbeiten.
3. `organic_fiber` erzeugen.
4. `organic_fiber -> string` als stabile Utility-Kette nutzen.

## Stage 2 - Stone
1. `stone_grit` farmen.
2. `stone_grit -> cobblestone` aufbauen.
3. Cobblestone fuer Werkzeuge/Ofen sichern.
4. Ersten `furnace` craften.

## Stage 3 - Heat
1. Brennstoffkette aufbauen (z. B. Charcoal).
2. Erste Schmelzprozesse (z. B. Glass) stabilisieren.
3. Erste Metallstufe erreichen (mindestens Iron Ingot).

## Stage 4 - Machines
1. Andesite Alloy und erste Create-Bauteile erzeugen.
2. Erste mechanische Bearbeitung stabil aufbauen.

## Stage 5 - Automation
1. Kernprozesse teilautomatisieren (Pressen, Weiterverarbeitung).
2. Materialfluss ohne Dauer-Handarbeit sicherstellen.

## Stage 6 - Endgame
1. Endgame-Ressourcen erreichen (u. a. Nether Star als Marker).
2. Ausbau auf Langzeitziele und Optimierung.

## Was in diesem Stand als "testbar" gilt
1. Stage-Toasts erscheinen bei Unlock.
2. Advancement-Reiter zeigt pro Stage einen eigenen Tab.
3. Unterfortschritte im jeweiligen Tab werden beim Erreichen automatisch abgehakt.
4. Der komplette Early-Loop ist ohne Creative erreichbar:
   Leaves -> Dust -> Compost -> Dirt -> Packed Soil -> Grit -> Cobble -> Furnace.

## Geplante naechste Schritte
1. Stage-Gates auf konkrete Rezepte anwenden (echte Sperren/Freischaltungen).
2. FTB-Queststruktur im Pack anlegen (`defaultconfigs/ftbquests/quests.snbt`), damit der Plan auch im Questbuch sichtbar wird.
3. Rewards und Checkpoints pro Stage definieren (Items, Claims, Team-Fortschritt).
