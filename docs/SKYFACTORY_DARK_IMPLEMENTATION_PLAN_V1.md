# SKYFACTORY DARK
# IMPLEMENTATION PLAN v1.0

## PHASE 0 - FOUNDATION LOCK (Stabilitaet vor Feature)

Ziel:
Alles, was jetzt existiert, darf spaeter nicht mehr grundlegend geaendert werden.

### Module
#### 0.1 Stage-Core-System
- Stage Registry finalisieren
- Trigger-Logik kapseln
- Stage -> World Flag Mapping
- Persistent World State API

Output:
- `03_stage_manager.js`
- `01_world_state.js`
- `02_unlock_policy.js`

#### 0.2 Resource Core Registry
Alle Custom Items und Blocktypen fixieren:
- Biomass
- Soil Components
- Grit
- Dust
- Resin
- Bacteria Placeholder

Regel:
- Keine neuen Items ohne Matrix-Eintrag.

## PHASE 1 - BIO CORE (Welt ist tot)

Ziel:
Stage 0-1 wird absolut stabil.

### 1.1 Leaf System Finalisieren
- Deterministischer Thread-Drop
- Crook-Modifikator
- Sapling Economy fixieren
- Keine Vanilla-Leaks

### 1.2 Organic Processing Engine
- Earth Loop
- Compost Loop
- Resin Balance
- Fuel Integration

### 1.3 Micro Life Placeholder
Noch keine echten Mobs.
Aber:
- `bacteria_spore` Item
- Soil + Biomass -> Spore Chance
- Noch keine Spawns, nur Systemgrundlage

## PHASE 2 - GEOLOGY ENGINE

Jetzt beginnt echte Systemtiefe.

### 2.1 Pressure System
Neue Logik:
Wenn Block X unter Gewicht Y
-> Transformation

Beispiele:
- Soil unter 4 Blocks -> Hardened Soil
- Hardened Soil + Processing -> Stone

Kein RNG-Mining.

### 2.2 Water Erosion System (deine Gravel-Idee)
Tick-System:
Wenn:
- Block = Gravel
- Flowing Water
- Nicht Source

-> Timer -> Sand
Sand -> Dust

Das ist ein physikalisches Naturgesetz-System.

### 2.3 Heat Engine
Heat wird echte Ressource.

Heat erzeugt durch:
- Bark Fuel
- Primitive Kiln
- spaeter: Blast Furnace

Heat ist kein Rezept.
Heat ist Zustand.

## PHASE 3 - COSMIC EVENT SYSTEM

Jetzt kommt dein Signature-Feature.

### 3.1 Comet Controller
Serverseitiges Event:
State Machine:
- Cooldown
- Warning Phase
- Impact
- Recovery

Persistente Weltflags.

### 3.2 Impact Engine
Beim Einschlag:
- 3x3 Crater
- 1-3 Blocks Tiefe
- Kometengestein platzieren
- Fluessigkeit / Loot Core

Loot basiert auf Stage.

### 3.3 Planet Stability System (Idee A)
Jeder Impact:
- Instability

Instability beeinflusst:
- Spawnrate
- Groesse
- Katastrophenwahrscheinlichkeit

Spieler kann Stabilizer bauen.

## PHASE 4 - ATMOSPHERIC SYSTEM (Idee B)

Jetzt beginnt Terraforming.

### 4.1 Atmosphere Value System
Globaler Wert:
Atmosphere = f(Grass + Water + Life)

Schwellen:
| Level | Effekt |
|---|---|
| 0 | kein Regen |
| 1 | langsames Pflanzenwachstum |
| 2 | normal |
| 3 | Regen aktiviert |
| 4 | Mobspawns erlaubt |

### 4.2 Rain Unlock
Regen wird nicht getriggert durch Stage.
Sondern durch:
- 100 platzierte Grass Bloecke

Das ist Spielerleistung.

## PHASE 5 - EVOLUTION SYSTEM (Idee C)

Jetzt kommt Leben.

### 5.1 Bacteria Simulation
Wenn:
- Soil
- Biomass
- Atmosphere >= 2

-> Bacteria wachsen

Bacteria sind Blockzustand, kein Mob.

### 5.2 Life Emergence
- Bacteria + Time -> Slime-Type Creature
- spaeter: Creature + Structure -> Villager

Du erschaffst Zivilisation.

## PHASE 6 - WORLD SIMULATION (Idee D)

Welt lebt ohne Spieler.

Systeme:
- Grass Spread beschleunigt durch Atmosphaere
- Water Spread Simulation
- Soil Fertility Wert
- Life Reproduction

Spieler ist nicht Zentrum, nur Ausloeser.

## PHASE 7 - INDUSTRIAL LAYER

Erst jetzt:
- Create
- Mekanism
- AE2

Automation verstaerkt bestehende Systeme.

## PHASE 8 - ENDGAME COSMIC CONTROL

Spieler kann:
- Kometen lenken
- Einschlaege verhindern
- Planet stabilisieren
- Ressourcen bewusst erzeugen

## ENTWICKLUNGSREIHENFOLGE (WICHTIG)

Wir bauen NICHT chronologisch.

Wir bauen:
1. Stage Core
2. Resource Core
3. Heat Engine
4. Water Erosion
5. Comet Controller
6. Atmosphere
7. Life
8. Automation

## KRITISCHE REGEL

Kein neues System ohne:
- Matrix-Eintrag
- Stage-Zuordnung
- Engpass-Analyse
- Exploit-Check

Sonst zerfaellt alles.
