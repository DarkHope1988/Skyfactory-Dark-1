# SKYFACTORY DARK
# SSOT STAGE 0-3 + MATRIX V1

Status: verbindliche Referenz fuer Stage 0-3.
Zweck: Trigger, Exit Conditions, Unlocks, System-Matrix und UX-Regeln an einer Stelle halten.

---

## 1) Stage SSOT (0-3)

### Stage 0 - Welcome
- Stage ID: `sfd_stage_0_welcome`
- Trigger:
  - Bei Login wird Stage 0 automatisch vergeben.
- Exit Condition:
  - Spieler hat grundlegende Orientierung (erste Kernaufgaben sichtbar) und kann Stage-1-Trigger craften.
- Unlocks:
  - Basis-UI/Guide aktiv.
  - Keine Hostile-Mob-Unlocks.
  - Wetter weiterhin gesperrt.
- Source:
  - `kubejs/server_scripts/systems/progression/stages_flow.js`
  - `kubejs/server_scripts/_core/11_stages.js`

### Stage 1 - Beginning
- Stage ID: `sfd_stage_1_beginning`
- Trigger:
  - Craft: `minecraft:crafting_table`
- Exit Condition:
  - Stabiler Bio/Earth/Soil-Loop (Dirt reproduzierbar, nicht nur einmalig).
- Unlocks:
  - Early Bio-Progress aktiv.
  - Keine Hostile-Mob-Unlocks.
  - Wetter weiterhin gesperrt.
- Source:
  - `kubejs/server_scripts/_core/11_stages.js` (`SFD_STAGE_CRAFT_MILESTONES`)

### Stage 2 - Stone
- Stage ID: `sfd_stage_2_stone`
- Trigger:
  - Milestone auf `minecraft:stone` (Craft/InventoryChanged-Pfad).
- Exit Condition:
  - Reproduzierbarer Cobble/Stone-Loop plus belastbarer Fuel-Vorlauf.
- Unlocks:
  - Stone-Prozesskette freigeschaltet.
  - Vorbereitung auf Heat.
  - Wetter weiterhin gesperrt.
- Source:
  - `kubejs/server_scripts/_core/11_stages.js`
  - `kubejs/server_scripts/systems/progression/stages_flow.js`

### Stage 3 - Heat
- Stage ID: `sfd_stage_3_heat`
- Trigger:
  - Craft: `minecraft:blast_furnace`
- Exit Condition:
  - Erste stabile Heat-Logistik (Fuel + Smelt-Kernloop reproduzierbar).
- Unlocks:
  - Wetter-Policy wird freigeschaltet (`sfd_weather_unlocked = true`).
  - Heat-Progress als eigener Systemlayer aktiv.
- Source:
  - `kubejs/server_scripts/_core/11_stages.js`
  - `kubejs/server_scripts/_core/00_constants.js`
  - `kubejs/server_scripts/_core/02_unlock_policy.js`
  - `kubejs/server_scripts/systems/progression/world_unlocks.js`
  - `kubejs/server_scripts/systems/world/world_rules.js`

---

## 2) Progress-Matrix A-D

Hinweis:
- A-D beschreibt Kernsysteme und ihre Stage-Anbindung.
- Stage 0-3 ist "active scope".
- Comet ist "future scope", aber bereits in Policy vorbereitet.

| Bereich | Mechanik | Stage-Start | Stage-Ziel in Scope 0-3 | Ownership |
|---|---|---:|---|---|
| A | Leaves / Tree Inputs | 0 | Stabiler Rohstoff-Einstieg fuer Bio-Loop | KubeJS |
| A | Bio / Organic Processing | 1 | Reproduzierbarer Soil/Dirt-Fortschritt | KubeJS |
| B | Stone Loop (grit -> mix -> cobble) | 2 | Verlaesslicher Stone-Core ohne Drift | KubeJS |
| C | Heat Core (fuel + smelt) | 3 | Belastbare Heat-Logistik als neues Bottleneck | KubeJS |
| D | Comet Policy (nur vorbereitet) | 5 (future) | In 0-3 nur Policy-Reservierung, kein Gameplay | UnlockPolicy + spaeter Mod |

---

## 3) JEI/UX-Regeln (verbindlich)

### 3.1 Darstellung
- Pro Stage genau eine klare Hauptaufgabe: "Mach X -> dann bekommst du Y".
- Prozessketten zuerst visuell, danach Kurztext.
- Keine reinen Textwaende in JEI-Hinweisen.

### 3.2 Konsistenz
- Stage-Begriffe muessen in JEI, Tooltips, Advancements gleich benannt sein.
- Trigger-Begriff und Exit-Begriff duerfen nicht vermischt werden.
  - Beispiel Stage 3:
    - Trigger = Blast Furnace craft
    - Exit = stabile Heat-Logistik

### 3.3 Reihenfolge in der UI
- Stage 0 -> 1 -> 2 -> 3 strikt aufeinander aufbauen.
- Kein Hint fuer Stage N+1 bevor Stage N aktiv ist.

### 3.4 Error/Noise-Policy
- Warnings duerfen UI-Verstaendnis nicht ueberlagern.
- Kosmetische Warnungen sind zu dokumentieren, aber nicht als Progress-Blocker zu behandeln.

---

## 4) Policy-Grenzen (Phase-2 kompatibel)

- Stage/World-Policies bleiben in `UnlockPolicy`.
- Aktuell verbindlich:
  - Weather unlock ab Stage 3
  - Comet unlock ab Stage 5 (future, vorbereitet)
- Keine Verlagerung dieser Policy in verstreute Skripte.

---

## 5) Phase-3 Vorbereitung (nur Fundament, kein Gameplay-Switch)

Wenn Phase 2 stabil ist, Mod-Skelett minimal starten mit:
1. WorldState-Key-Struktur als technische Heimat.
2. Dummy Comet Tick Log (nur Heartbeat/Telemetry).
3. Keine Recipe-/Balance-Portierung in dieser Phase.

---

## 6) Change-Regel

Ohne SSOT-Update keine Aenderung an:
- Stage Triggern
- Exit Conditions
- Unlock Policies
- JEI/UX Kernregeln
