# Stage Matrix V1 (Safe Baseline)

Ziel: stabile, fehlerarme Basis bis zur Kometen-Stage.

## Stage Unlocks (aktuell technisch aktiv)
1. `sfd_stage_0_welcome`
- Trigger: Login
- Outcome: sterile Startregeln aktiv

2. `sfd_stage_1_beginning`
- Trigger: Craft `minecraft:crafting_table`
- Outcome: frueher Progressionspfad ist offiziell abgeschlossen

3. `sfd_stage_2_stone`
- Trigger: Craft `minecraft:cobblestone` oder `minecraft:stone_pickaxe`
- Outcome: Stone-Tier erreicht

4. `sfd_stage_3_heat`
- Trigger: Craft `minecraft:furnace` oder `minecraft:blast_furnace`
- Outcome: Weather-Unlock Policy greift (`sfd_weather_unlocked = true`)

5. `sfd_stage_4_machines`
- Trigger: noch offen (wird nach Maschinen-Baseline festgezogen)
- Outcome: noch offen

6. `sfd_stage_5_automation`
- Trigger: noch offen (wird nach Automations-Baseline festgezogen)
- Outcome: Kometen-Unlock Policy greift (`sfd_comet_unlocked = true`)

7. `sfd_stage_6_endgame`
- Trigger: noch offen
- Outcome: noch offen

## World/Progression Policy
1. Wetter bleibt gelockt, bis Stage 3 erreicht ist.
2. Phantoms/Kometen-Umfeld bleiben gelockt, bis Stage 5 erreicht ist.
3. Regeln sind serverweit persistent ueber `server.persistentData`.

## Design-Regeln fuer die naechsten Schritte
1. Pro Stage nur **einen** primaeren technischen Unlock zuerst finalisieren.
2. Neue Stage-Trigger immer in `global.SFD_STAGE_CRAFT_MILESTONES` eintragen.
3. Erst dann Quests/Tooltips/JEI auf den finalen Trigger angleichen.
4. Kein Kometen-Event live, bevor Stage 4 + 5 Trigger verbindlich sind.

## Stage-1 -> Stone Stabilizer (aktiv)
1. `raw_soil_chunk` kann jetzt deterministisch zu `pebble_cluster` gebuendelt werden.
2. `raw_soil_chunk + pebble_cluster` ergibt `stone_grit` als planbarer Zwischenschritt.
3. Neuer Stone-Prozess:
- `stone_grit + raw_soil_chunk + compost_pulp` -> `rough_stone_mix`
- `rough_stone_mix` -> effizienterer Cobblestone-Output
4. Podest-Basis bekommt erste kleine Mid/End-Verbesserung:
- auf `cobblestone/stone/stone_bricks` schneller
- auf `furnace/blast_furnace/smoker` nochmals schneller
- auf `podest_stone_base` am schnellsten im fruehen Spiel

## Nächste konkrete Aufgaben
1. Stage 4 Trigger finalisieren (1 Maschinen-Meilenstein).
2. Stage 5 Trigger finalisieren (1 Automations-Meilenstein).
3. Danach `comet_event_controller` mit Warnphase + Spawnfenster anbinden.
