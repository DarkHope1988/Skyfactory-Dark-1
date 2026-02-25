# Skyfactory Dark 1 â€“ Technische Repository-Analyse

## 1) Scope & Methode
Diese Analyse basiert ausschlieÃŸlich auf den im Repository vorhandenen Dateien (Mods-Verzeichnis, Konfigurationsdateien, KubeJS-Skripte, Datendateien).

GeprÃ¼fte Hauptquellen:
- `mods/*.jar` (inkl. `META-INF/mods.toml` und Mixin-Konfigurationsdateien)
- `config/*.toml|json` und `defaultconfigs/**`
- `kubejs/**` (startup/server/client scripts, tags, assets)
- Root-Dateien (`README.md`, Cache-/Clientdateien)

---

## 2) Plattform: Minecraft-Version & Modloader

### Minecraft/Forge-Basis
- Alle Mod-JARs sind Forge-Builds fÃ¼r **Minecraft 1.20.1** (Dateinamen + Dependency-Constraints in `mods.toml`).
- Forge-Mindestanforderungen aus den installierten Mods liegen Ã¼berwiegend im Bereich **Forge 47.x** (z. B. `create` `forge [47.1.3,)`, `ftblibrary` `forge [47.3,)`, `appleskin` `forge [47.0.12,)`).

### Nachweisstand
- Das Repository enthÃ¤lt **keine dedizierte Modpack-Manifestdatei** (z. B. CurseForge `manifest.json`/Modrinth `index.json`) und **keine server.properties mit Forge-Version-Pin**.
- Damit ist aus dem Repository nur eine **MindestkompatibilitÃ¤t**, aber kein einzelner exakt gepinnter Forge-Build ableitbar.

---

## 3) Installierte Mods & Versionen (Ist-Zustand)

| Mod | Version (aus Dateiname/Mods-TOML) |
|---|---|
| BetterF3 | 7.0.2 |
| Bookshelf | 20.2.15 |
| GameStages | 15.0.2 |
| Jade | 11.13.2 |
| AppleSkin | 2.5.1 |
| Architectury | 9.2.14 |
| Cloth Config | 11.1.136 |
| Create | 6.0.8 |
| Ex Deorum | 1.49 |
| FTB Library | 2001.2.12 |
| FTB Quests | 2001.4.18 |
| FTB Teams | 2001.3.2 |
| FTB Ultimine | 2001.1.7 |
| JEI | 15.20.0.129 |
| JourneyMap | 5.10.3 |
| KubeJS | 2001.6.5-build.16 |
| LootJS | 1.20.1-2.13.1 |
| Rhino | 2001.2.3-build.10 |
| TwerkCropGrowth | 2.1.0 |
| WallJump | 1.20.1-1.3.5-forge |

---

## 4) Dependency-Analyse (Required/Optional)

### Harte Dependencies (Auszug)
- `gamestages` benÃ¶tigt `bookshelf`.
- `kubejs` benÃ¶tigt `rhino` und `architectury`.
- `lootjs` benÃ¶tigt `kubejs`.
- FTB-Stack: `ftbquests` benÃ¶tigt `ftblibrary` + `ftbteams` + `architectury`.
- `create` benÃ¶tigt `forge`, `minecraft` sowie ModIDs `flywheel` und `ponder` (durch den Create-Build bereitgestellt).

### Optionale Dependencies (Auszug)
- `kubejs`: optional `jei`.
- `create`: optional `jei` (Client).
- `ftbquests`: optional `itemfilters`.

### AufgelÃ¶ste/ungeklÃ¤rte Punkte rein aus Repo
- `itemfilters` ist nicht im `mods/`-Ordner vorhanden (optional, daher kein harter Fehler).
- Die in KubeJS vorbereiteten Integrationsordner fÃ¼r `appliedenergistics2`, `botania`, `tconstruct` enthalten nur Kommentar-Platzhalter; entsprechende Mod-JARs sind aktuell nicht installiert.

---

## 5) KubeJS-/Script-Architektur & Wechselwirkungen

## TatsÃ¤chlich aktive Progressionslogik
- **Startup-Registrierung** eigener Items/Blocks in `startup_scripts/_core/03_items.js` und `04_blocks.js`.
- **Early-Game-Ressourcenloop**:
  1. Leaves + Crook-Tag => `organic_dust` / `resin_fragment` (`leaves_system.js`)
  2. `organic_dust` => `compost_pile`/`compost_pulp` (`organic_processing.js`)
  3. `compost_pile` => Dirt (`organic_processing.js`)
  4. Dirt + `compost_pulp` => `packed_soil` (`organic_processing.js`)
  5. `packed_soil` + Mallet => `stone_grit`/`pebble_cluster`/`organic_fiber` (`packed_soil_mallet.js`)
  6. `stone_grit` => Cobblestone (`stone_processing.js`)
- Starterkit wird einmalig bei Login vergeben (`core/starter_items.js`).

## Tag-Verkabelung
- `#skyfactorydark:harvest_tools` nutzt aktuell nur `#exdeorum:crooks` (`replace=true`).
- `#skyfactorydark:mallets` und `#skyfactorydark:crushing_tools` enthalten `sfd_comets:crude_mallet`.

## Platzhalter ohne Funktionslogik
Mehrere Dateien enthalten nur Kommentare (z. B. `systems/progression/*`, `recipes/compat/*`, `mods/*/{gating,recipes}.js`, `recipes/vanilla/*`).

---

## 6) KonfigurationsÃ¼berschneidungen / Konflikt-Risiken

### Ex Deorum vs. KubeJS-Loot
- Ex Deorum ist aktiv und konfiguriert Void World als Standard.
- KubeJS entfernt bei Leaves + Harvest-Tool explizit `exdeorum:silk_worm` und `minecraft:string` Drops und ersetzt den Early-Loop durch eigene Ressourcen.
- Das ist **kein technischer Fehler**, aber eine bewusste Override-Strategie mit starker Progressionswirkung.

### Weltgenerierung
- `exdeorum-common.toml`: `set_void_world_as_default=true`, `void_nether_generation=true`, `void_end_generation=true`.
- Das beeinflusst Server- und Singleplayer-Welten direkt beim Erstellen/Laden.

### Client-/Server-Trennung
- Eindeutig clientseitig: `*-client.toml`, `journeymap/**`, `kubejs/client_scripts/**`.
- Eindeutig server/common: `kubejs/server_scripts/**`, `exdeorum-common.toml`, Loot/Recipe-Ã„nderungen.

---

## 7) Mixin-Analyse

### Im Repository nachweisbare Mixin-Nutzung
Mixin-Konfigurationen sind u. a. vorhanden in:
- BetterF3, Bookshelf, Jade, Architectury, Create, FTB Library, FTB Ultimine, JourneyMap, KubeJS, LootJS, Rhino, WallJump.

### Nachweisbare Konflikte?
- Aus statischer Repository-Sicht sind **keine direkten Konflikte eindeutig beweisbar**, da konkrete Target-Class-Kollisionen typischerweise Ã¼ber Laufzeit-Logs/Crashreports (`latest.log`, Mixin apply errors) sichtbar werden.
- Im Repository liegen aktuell keine solchen Crashreports/Logs mit Mixin-Fehlern vor.

---

## 8) Datapacks, Resourcepacks, weitere Inhalte

- Datapack-Ã¤hnliche Inhalte via `kubejs/data/skyfactorydark/tags/items/*.json` (Custom Item-Tags).
- KubeJS-Assets (`kubejs/assets/kubejs/**`) fÃ¼r Modelle, Blockstates, Sprache.
- JourneyMap-Konfigurations- und Theme-Dateien vorhanden; zusÃ¤tzlich lokale Kartendaten (`journeymap/data/sp/...`) im Repo.

Hinweis: `local/**`, `journeymap/data/sp/**`, `usercache.json`, `usernamecache.json` sind laufzeit-/nutzerspezifische Artefakte und in Modpack-Repos Ã¼blicherweise optional bzw. oft auszuschlieÃŸen.

---

## 9) Load-Order (nachweisbar)

- KubeJS `startup_scripts/_core` ist numerisch strukturiert (`00_...` bis `04_...`) fÃ¼r deterministische Reihenfolge.
- `server_scripts` folgen ebenfalls einer klaren Ordnerstruktur (`_core`, `systems`, `recipes`, `loot`, `mods`, `debug`).
- Konkrete modÃ¼bergreifende Forge-Loadorder ist im Repository nicht explizit gepinnt; die AuflÃ¶sung erfolgt Ã¼ber Forge + Dependency-Graph.

---

## 10) Performance-relevante Punkte

Nachweisbar im aktuellen Stand:
- Ex Deorum fast-infested-leaves **deaktiviert** (`use_fast_infested_leaves=false`) â€“ potenziell hÃ¶here Renderlast bei vielen infizierten BlÃ¤ttern.
- Flywheel Backend auf `DEFAULT`, `limitUpdates=true`, WorkerThreads `-1` (auto).
- Forge `alwaysSetupTerrainOffThread=false` (keine erzwungene Offthread-Chunk-Setup-Optimierung).

---

## 11) Identifizierte Risiken / Probleme (Repository-basiert)

1. **Integrations-Placeholders ohne installierte Zielmods**
   - AE2/Botania/TConstruct/Create-Compat-Dateien existieren teils nur als Kommentare; aktuell keine aktive Integrationslogik.
2. **Starker Early-Game-Eingriff in Ex Deorum Leaves-Drops**
   - Gewollt, aber balancekritisch.
3. **Repo enthÃ¤lt Laufzeitartefakte**
   - Lokale JourneyMap-Kacheln, Cache-Dateien, `local/`-Config kÃ¶nnen Versionshistorie verrauschen.
4. **Fehlende zentrale Manifestdatei**
   - Erschwert reproduzierbares Pinning eines exakten Forge-Builds auÃŸerhalb der Mindest-Constraints.

---

## 12) Empfohlene nÃ¤chste technische PrÃ¼fschritte (ohne unbelegte Annahmen)

1. Laufzeitvalidierung nach KubeJS-Ã„nderungen:
   - `logs/latest.log` auf KubeJS/LootJS/Mixin-Errors prÃ¼fen.
2. Server-Client-A/B-Test:
   - Neuer Weltstart (Void), Early Loop (Leaves->Dust->Packed Soil->Stone Grit) komplett durchspielen.
3. JEI-Validierung:
   - Sichtbarkeit aller custom Rezepte (`organic_processing`, `stone_processing`) prÃ¼fen.
4. Falls spÃ¤ter echte Mod-Integrationen aktiviert werden:
   - Placeholder-Dateien in `kubejs/server_scripts/mods/*` nur zusammen mit real installierten Zielmods befÃ¼llen.


