# Schritt 3 - Stage-3 Heat-Definition (V1)

## Scope
Review gemaess PROGRESSIONSPLAN_STAGE0-3_V1:
1. Realistischer Weg zur Blast Furnace
2. Was aendert Heat systemisch?
3. Welche Mechaniken werden durch Heat unlocked?

Keine Gameplay-Aenderung in diesem Schritt.

---

## 1) Technischer Ist-Stand

## Stage-Trigger
1. Stage 3 (`sfd_stage_3_heat`) wird aktuell durch Craft von `minecraft:blast_furnace` freigeschaltet.
2. Stage-Mapping ist zentral in `global.SFD_STAGE_CRAFT_MILESTONES` hinterlegt.

Quellen:
- `kubejs/server_scripts/_core/11_stages.js`
- `kubejs/server_scripts/systems/progression/stages_flow.js`

## World-Policy-Kopplung
1. `SFD_WORLD_UNLOCK_POLICY` mappt `WEATHER_STAGE` auf `sfd_stage_3_heat`.
2. Beim Stage-Unlock setzt `sfdApplyWorldUnlockPolicy` das Flag `sfd_weather_unlocked`.
3. Solange Weather nicht unlocked ist, erzwingt `world_rules.js` dauerhaft clear weather.

Quellen:
- `kubejs/server_scripts/_core/00_constants.js`
- `kubejs/server_scripts/systems/progression/world_unlocks.js`
- `kubejs/server_scripts/systems/world/world_rules.js`

## Heat-nahe Inhalte (bereits vorhanden)
1. Fuel-System: `kubejs:bark_briquette` mit Burntime 50.
2. Food-Heat: Smoking/Campfire fuer `raw_forage -> dried_forage`.
3. Advancements nach Stage 3 vorhanden:
- `heat_charcoal`
- `heat_glass`
- `heat_iron`

Quellen:
- `kubejs/server_scripts/core/fuels.js`
- `kubejs/server_scripts/recipes/custom/food_progression.js`
- `kubejs/data/skyfactorydark/advancements/stages/heat_*.json`

---

## 2) Realistischer Weg zur Blast Furnace (Bewertung)

## Positiv
1. Stage 2 endet auf `minecraft:stone`; damit ist Stein als Basis bereits gesichert.
2. Blast Furnace als Stage-3-Gate ist ein klarer, spaeterer Heat-Milestone.
3. Vanilla-Recipe fuer Blast Furnace scheint aktuell nicht entfernt/gebrochen.

## Risiko / Luecke
1. Es gibt noch keinen explizit dokumentierten "Heat-Entry-Pfad" im SSOT, der den Spieler Schritt fuer Schritt zur Blast Furnace fuehrt.
2. Stage-3 Trigger ist hart auf Blast Furnace, waehrend der erste funktionale Heat-Einstieg in Minecraft oft schon ueber normalen Furnace beginnt.
3. Dadurch besteht UX-Risiko: Spieler nutzt Furnace bereits intensiv, aber Stage 3 bleibt formal noch zu.

## Vorlaeufiges Urteil
- Der Weg ist technisch moeglich, aber designseitig noch nicht ausreichend erklaert/inszeniert.
- Fuer "realistisch" braucht es eine definierte Heat-Vorstufe (Furnace-Phase) als sichtbaren Teil von Stage-2-Exit oder Stage-3-Entry.

---

## 3) Was aendert Heat aktuell systemisch?

## Aktueller harter Systemeffekt
1. Wetter-Unlock:
- Vor Stage 3: Wetter dauerhaft clear
- Ab Stage 3: Weather lock wird aufgehoben

## Aktuell fehlende harte Systemeffekte
1. Keine neuen Stage-3-exklusiven Recipe-Gates sichtbar (RecipeStages/harte Sperren).
2. Keine klaren Heat-Maschinen-Funktionen, die erst ab Stage 3 aktiv werden.
3. Mobsystem bleibt fuer Hostiles weiter separat und nicht direkt durch Stage 3 geoeffnet.

## Fazit
- Stage 3 hat derzeit genau einen echten System-Impact: Weather.
- Das ist technisch sauber, aber als "Heat-Stufe" allein noch zu duenn fuer das gewuenschte Progressionsgefuehl.

---

## 4) Welche Mechaniken sollten durch Heat (Stage 3) klar unlocked werden?

## Mindestumfang fuer konsistente Stage 3 (Design-Empfehlung)
1. Heat-Core Unlock
- Definierter Fuel-Loop als Pflicht (Bark-Briquette / Charcoal Balance)
- Erste stabile Smelt-Chain als Pflichtziel

2. Process Unlock
- Mindestens 1-2 Rezepte/Komponenten, die explizit Heat als Abhaengigkeit haben
- Klar vom Stone-Loop getrennt

3. World Unlock
- Wetter-Freigabe bleibt als World-Signal bestehen
- In SSOT explizit als "systemischer Umweltwechsel" markieren

4. UX Unlock
- Advancement-/JEI-Linie: "Du hast Stone geschafft, jetzt beginnt Heat-Logistik"
- Keine Trigger-Verwechslung zwischen Furnace-Nutzung und Stage-3-Freischaltung

---

## 5) Konsistenz-Check gegen Projektziel

1. Trigger ist klar und stabil (Blast Furnace).
2. Weltpolicy ist korrekt gekoppelt (Weather Unlock).
3. Stage-3-Systemtiefe ist noch nicht ausgereift genug fuer Endgueltigkeit.

Reifegrad (vorlaeufig):
- Technisch: gut
- Dokumentations-/UX-Klarheit: mittel
- Systemtiefe: niedrig-mittel

---

## 6) Konkrete To-dos fuer naechste Umsetzungsrunde (ohne Triggerwechsel)

1. SSOT Stage 3 finalisieren
- Trigger fix: Blast Furnace
- Exit-Condition fix: "erste stabile Heat-Logistik" (konkret quantifizieren)

2. Heat-Entry-Kette konkretisieren
- Furnace als Vorstufe klar in Stage-2->3-Text integrieren
- Blast Furnace als Abschluss-/Skalierungsmeilenstein darstellen

3. Stage-3-Mechanikpaket definieren
- 1 Pflicht-Fuelloop
- 1 Pflicht-Smeltingloop
- 1 klarer Nutzen fuer nachfolgende Stage (Machines)

4. UX angleichen
- Advancements, JEI, Tooltips auf identische Heat-Botschaft bringen

---

## 7) Schritt-3 Ergebnis
Schritt 3 ist inhaltlich abgeschlossen:
1. Triggerlage ist klar.
2. World-Unlock-Wirkung ist klar.
3. Hauptluecke ist nicht Technik, sondern fehlende Stage-3-Mechanikdichte und klare Heat-Inszenierung.

