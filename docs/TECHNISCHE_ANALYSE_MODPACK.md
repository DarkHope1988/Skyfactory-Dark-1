# Skyfactory Dark 1 – Technische Ist-Analyse (Repository-basiert)

## 1) Analyseumfang und Methode
Diese Analyse basiert ausschließlich auf den im Repository vorhandenen Dateien (`mods/`, `kubejs/`, `config/`, `defaultconfigs/`, `journeymap/`).

Verwendete Prüfungen:
- Modliste und Versionen aus `mods/*.jar`.
- Forge-Metadaten (`META-INF/mods.toml`) für Pflicht-/Optional-Dependencies.
- KubeJS-Struktur (`startup_scripts`, `server_scripts`, `client_scripts`) für Load-Order und Interaktionen.
- Konfigurationsdateien für Mod-Überschneidungen und potentielle Konfliktindikatoren.

---

## 2) Minecraft-Version & Modloader
- Modloader: **Forge** (alle Mod-Dateien sind Forge-Artefakte, z. B. `...-forge...jar`).
- Ziel-Minecraft-Version: **1.20.1** (durchgängig in Jar-Namen und Dependency-Ranges).
- Forge-Hauptlinie: **47.x** (mehrere Mods verlangen mindestens Forge 47.x).

Quellbelege:
- Mod-Dateien in `mods/` (Namen mit `forge` / `1.20.1`).
- Forge-abhängige VersionRanges in `mods.toml` der JARs (extern geprüft).

---

## 3) Vollständige Modliste (Ist-Zustand)
Installierte Mods laut `mods/`:

1. AppleSkin `2.5.1`
2. Architectury `9.2.14`
3. BetterF3 `7.0.2`
4. Bookshelf `20.2.15`
5. Cloth Config `11.1.136`
6. Create `6.0.8`
7. Ex Deorum `1.49`
8. FTB Library `2001.2.12`
9. FTB Quests `2001.4.18`
10. FTB Teams `2001.3.2`
11. FTB Ultimine `2001.1.7`
12. GameStages `15.0.2`
13. Jade `11.13.2`
14. JEI `15.20.0.129`
15. JourneyMap `5.10.3`
16. KubeJS `2001.6.5-build.16`
17. LootJS `2.13.1`
18. Rhino `2001.2.3-build.10`
19. TwerkCropGrowth `2.1.0`
20. WallJump `1.3.5`

---

## 4) Dependency-Resolution (Pflicht/Optional)

### 4.1 Kritische Ketten (Pflicht)
- `KubeJS` benötigt `Rhino` + `Architectury` + Forge 47.1.0+.
- `LootJS` benötigt `KubeJS`.
- `GameStages` benötigt `Bookshelf`.
- `FTB Quests` benötigt `FTB Library` + `FTB Teams` + `Architectury`.
- `FTB Ultimine` benötigt `FTB Library` + `Architectury`.
- `Create` benötigt `Flywheel` + `Ponder` (als ModIDs in derselben JAR enthalten).

### 4.2 Optionale Dependencies (vorhanden / fehlend)
- `Create` → optional `JEI` (vorhanden).
- `KubeJS` → optional `JEI` (vorhanden), optional `REI` (`roughlyenoughitems`) **nicht vorhanden**.
- `FTB Quests` → optional `Item Filters` **nicht vorhanden**.
- `FTB Library` → optional `FTB Quests` (vorhanden).

Bewertung:
- Es gibt **keinen** nachweisbaren harten Dependency-Bruch im aktuellen `mods/`-Stand.
- Fehlende optionale Mods sind unkritisch, können aber Funktionsumfang einschränken.

---

## 5) KubeJS-/LootJS-Architektur und Load-Order

### 5.1 Registrierungsphase (Startup)
- `kubejs/startup_scripts/_core/03_items.js` registriert alle pack-eigenen Items.
- `kubejs/startup_scripts/_core/04_blocks.js` registriert den Block `kubejs:packed_soil`.

### 5.2 Serverphase
- Crafting-Flow: `recipes/custom/organic_processing.js` + `recipes/custom/stone_processing.js`.
- Loot-Flow:
  - `systems/resources/leaves_system.js` (Crook-basierte Leaf-Drops).
  - `loot/vanilla_overrides/packed_soil_mallet.js` (Packed Soil mit Mallet).
  - `systems/resources/dirt_processing.js` (Dirt-Mallet-Mechanik).
- Player-Init: `core/starter_items.js`.

### 5.3 Clientphase
- `client_scripts/_core/10_tooltips.js` liefert Ingame-Hinweise für eigene Progress-Items.

### 5.4 Deterministische Ordnung
- Nummerierung in `_core` (`00_`, `01_`, `02_`, ...).
- Aktuell enthalten einige `_core`-Dateien nur Kommentar-Stubs (keine Logik), die Reihenfolge bleibt dennoch reproduzierbar.

---

## 6) Script-Interaktionen (KubeJS, LootJS, Tags)

### 6.1 Konsistenz der Item-/Block-IDs
- Alle in Recipes/Loot genutzten `kubejs:*` IDs sind in Startup registriert (`organic_dust`, `resin_fragment`, `compost_*`, `stone_grit`, `pebble_cluster`, `organic_fiber`, `crude_mallet`, `packed_soil`).

### 6.2 Tag-gestützte Tool-Gates
- `#skyfactorydark:harvest_tools` für Leaves-Modifier.
- `#skyfactorydark:mallets` für Packed-Soil-Aufbruch.
- `#skyfactorydark:crushing_tools` für Dirt-Verarbeitung.

Die zugehörigen JSON-Tags existieren unter `kubejs/data/skyfactorydark/tags/items/`.

### 6.3 Progressionslogik (früh)
- Leaves + Crook → `organic_dust` / `resin_fragment`.
- Dust → Compost (zwei Rezeptpfade).
- Compost → Dirt.
- Dirt + Pulp → Packed Soil.
- Packed Soil + Mallet → Stone-/Fiber-Pfad.
- `stone_grit` 2x2 → Cobblestone.

---

## 7) Datapacks, Resourcepacks, Client/Server-Trennung
- Datapack-Inhalte liegen in `kubejs/data/...` (Tags).
- Resource-Inhalte liegen in `kubejs/assets/...` (Models, Texturen, Lang).
- JourneyMap enthält umfangreiche Client-/Server-Konfigurationsdaten (`journeymap/config`, `journeymap/server`) sowie lokal erzeugte Kartenkacheln (`journeymap/data/sp/...`).
- Client-spezifische Konfigurationen: z. B. `config/*-client.toml`, `config/jei/*`, `config/jade/*`, `journeymap/config/*`.
- Server-relevante Defaults: `defaultconfigs/` und `journeymap/server/*`.

---

## 8) Identifizierte Risiken / Inkonsistenzen

### R1 – ExDeorum-Config referenziert nicht vorhandenes Mod-Item
- Datei: `config/exdeorum-common.toml`
- Befund: `preferred_cobalt_ore = "tconstruct:cobalt_ore"`, aber **Tinkers Construct ist nicht im `mods/`-Ordner vorhanden**.
- Risiko: Ungültige Präferenz-ID kann zu inkonsistentem Fallback-Verhalten in Auto-Rezepten führen.

### R2 – Vorbereitete Integrationspfade für nicht installierte Mods
- Verzeichnisse vorhanden: `kubejs/server_scripts/mods/botania`, `.../tconstruct`, `.../appliedenergistics2` (jeweils nur Kommentar-Stubs).
- Risiko: kein unmittelbarer Crash (weil keine aktive Logik), aber erhöhte Wartungskomplexität / unklare Roadmap.

### R3 – Inaktiv genutzte Basiskern-Dateien
- `_core/00_constants.js`, `_core/01_helpers.js`, `_core/02_stages.js`, `_core/03_balance_rules.js` enthalten nur Kommentare.
- Risiko: geringe technische Gefahr, aber potentielle Verwirrung bei Team-Onboarding.

### R4 – Repositorium enthält lokale Laufzeitdaten
- `journeymap/data/sp/...` und `config/jei/world/local/...` sind typischerweise Test-/Nutzerdaten.
- Risiko: unnötige Repo-Größe, potenziell ungewollte stateful Artefakte.

---

## 9) Mixin-Konfliktanalyse (repository-basiert)
- Im Repository liegen **keine Crashreports oder latest.log-Dateien** mit Mixin-Fehlermeldungen.
- Aus statischer Dateiansicht lässt sich daher **kein realer Mixin-Konflikt nachweisen**.
- Ergebnis: Status **"nicht nachweisbar aus vorliegenden Repo-Dateien"**.

---

## 10) Konfigurationsüberschneidungen / mögliche Konfliktfelder
- JEI/Jade/Create/ExDeorum sind parallel konfiguriert; offensichtliche harte Konflikte sind statisch nicht ersichtlich.
- Deutlichster statischer Konflikthinweis bleibt R1 (fremde Item-ID in ExDeorum-Präferenz).

---

## 11) Konkrete Änderungsanweisungen (auf Basis geprüfter Dateien)

### Änderung A (empfohlen): ExDeorum Cobalt-Präferenz neutralisieren
- **Dateipfad:** `config/exdeorum-common.toml`
- **Aktion:** **Ersetzen**

**Vorher**
```toml
preferred_cobalt_ore = "tconstruct:cobalt_ore"
```

**Nachher**
```toml
preferred_cobalt_ore = "minecraft:air"
```

**Technische Begründung:**
- Entfernt eine harte Referenz auf ein nicht installiertes Mod-Item.
- Lässt ExDeorum wieder auf den dokumentierten Default-Fallback wechseln.

**Betroffene Systeme:**
- ExDeorum Auto-Rezept-Generierung für Cobalt-Ore.

**Mögliche Nebenwirkungen:**
- Konkrete Zielauswahl für Cobalt-Ergebnisse wird vom Fallback bestimmt (alphabetisch/mod-priority intern).

**Pflichttests:**
1. Spielstart ohne Config-Parsing-Fehler.
2. JEI-Ansicht auf ExDeorum-bezogene Cobalt-Rezepte prüfen.
3. Server+Client Join-Test (kein Sync-Error).

---

### Änderung B (empfohlen): Nicht aktive Integrations-Stubs dokumentieren oder entfernen
- **Dateipfade:**
  - `kubejs/server_scripts/mods/botania/*`
  - `kubejs/server_scripts/mods/tconstruct/*`
  - `kubejs/server_scripts/mods/appliedenergistics2/*`
- **Aktion:** **Entfernen** *oder* zentral in einer Roadmap-Datei als "geplant, derzeit inaktiv" markieren.

**Technische Begründung:**
- Reduziert Wartungsrauschen; verhindert Fehlinterpretation als aktive Integration.

**Betroffene Systeme:**
- Nur Projektstruktur/Entwickler-Workflow (keine Runtime-Änderung, solange Dateien Kommentare bleiben).

**Pflichttests:**
1. KubeJS Reload (`/kubejs reload`) ohne Warnungen zu fehlenden Includes.
2. Vollstart Client+Server.

---

## 12) Bereits umgesetzte Änderung in diesem Commit
- Diese Analyse wurde als technische Dokumentation neu angelegt.
- Laufzeitverhalten des Modpacks wurde dabei **nicht** verändert.
