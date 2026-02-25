# SKYFACTORY DARK
# SSOT PLANETIZATION V1

Status: design-verbindlich, implementation-ready.
Zweck: Die Welt wird durch Kometenmaterial und eigene SFD-Items schrittweise von "karg" zu "lebendig" aufgebaut.

---

## 1) Zielbild

Die Progression erzeugt den Planeten aktiv:
- Wasser entsteht nicht von Anfang an, sondern durch Mikroben-/Katalyse-Loops.
- Atmosphaere wird aufgebaut (Luftqualitaet/Oxygen als Systemwert).
- Visuelle Weltwirkung (blaueres Wasser/Himmel) folgt dem Fortschritt.
- Kometen liefern Materialstufen statt sofortiger Vanilla-Vollfreigabe.

Vanilla-Ressourcen werden ueber SFD-Systeme freigeschaltet, nicht direkt geschenkt.

---

## 2) Kernprinzipien

1. SSOT-first: Stage-, Loot- und Unlock-Logik nur an zentralen Stellen pflegen.
2. Data-driven: Tabellen/Profiles statt harter Werte im Event-Code.
3. Hybrid: KubeJS fuer Balancing/Rezepte, Mod fuer harte Weltlogik (Impact, Crater, Controller).
4. Modpack-portabel: Ein optionaler "Gateway"-Pfad erlaubt Integration ohne Sky-World-Zwang.

---

## 3) Planetization-Layer

### Layer A: Biologische Initialisierung
- Primär-Ressource: `sfd:microbe_culture` (Design-ID, kann KubeJS-Item sein)
- Prozess: Kometenmaterial + Bio-Träger -> aktive Kultur
- Effekt:
  - aktiviert "Water Synthesis" Rezepte
  - hebt erste sterile Limits auf

### Layer B: Wasserkreislauf
- Primär-Ressource: `sfd:hydro_seed` / `sfd:condensed_water_cell`
- Prozess: Mikrobenreaktor + Kometenstaub + Energie/Heat
- Effekt:
  - kontrollierter Wasserzugang
  - spätere Auto-Wasserpfade

### Layer C: Atmosphaerenaufbau
- Primär-Ressource: `sfd:atmo_filament` / `sfd:oxygen_matrix`
- Prozess: Bio + Heat + Metallpfad
- Effekt:
  - "atmosphereUnlocked"
  - Weltstabilitaet regeneriert besser
  - weitere Biomechaniken werden freigeschaltet

### Layer D: Planetare Stabilisierung
- Primär-Ressource: `sfd:planetary_anchor` (Design-ID)
- Prozess: Mid-/Late-Loop mit Comet-Tiers
- Effekt:
  - Impact-Schadensminderung global
  - Grundlage fuer "friedliche" Ausbauphase

---

## 4) Stage-Mapping (ab Stage 2)

| Stage | Planet-Ziel | Neues Unlock |
|---|---|---|
| `sfd_stage_2_stone` | Kometenstart + erste Katalyse | comet + tier-2 loot |
| `sfd_stage_3_heat` | kontrollierte Reaktionsketten | weather + heat-katalyse |
| `sfd_stage_4_machines` | Wasserproduktion stabil | water_cycle_unlocked |
| `sfd_stage_5_automation` | Atmosphaere stabilisierbar | atmosphere_unlocked |
| `sfd_stage_6_endgame` | planetare Stabilisierung | planetary_stabilized |

---

## 5) Loot-Philosophie (Kometen)

- Tier 0-1: deaktiviert.
- Start: Tier 2.
- Stage-Gate: Kometen erst ab `sfd_stage_2_stone`.
- Kein direkter Vanilla-Erzsprung in Tier 2-4 (stattdessen Proto-/Katalysator-Kette).
- Jeder Tier-Sprung bringt nur das naechste Systemmaterial, nicht alles auf einmal.
- Loot bleibt datengetrieben ueber zentrale Tabellen.

---

## 6) UI/UX Regeln

1. HUD zeigt:
- Weltstabilitaet
- Planet-Status (Steril -> Hydrated -> Breathable -> Stable)
- Stage-ETA

2. JEI/Quest-Texte:
- "Mache X, damit Y im Planetenstatus steigt."
- Keine entkoppelten Flavor-Texte ohne Systembezug.

3. Debug/Tests:
- manuelle Impact-Commands bleiben verfuegbar
- tier-forced tests erlaubt

---

## 7) Gateway fuer fremde Modpacks

Ziel: Content nutzbar ohne Skyfactory-Zwang.

### Modus A: Native Sky Mode
- Aktueller Standardfluss.

### Modus B: Gateway Mode
- Spieler erhaelt Zugriff ueber Portal-/Gateway-Item.
- Eintritt in SFD-Systemwelt oder Aktivierung der SFD-Progression im bestehenden Pack.
- Keine harte Abhaengigkeit auf vorhandene Sky-Startlogik.

### Vorgesehene Gateway-Artefakte (Design-Namen)
- `sfd:dimensional_gateway_core`
- `sfd:interdimensional_gateway_core`
- `sfd:gateway_attunement_map`

---

## 8) Technische Trennung

KubeJS:
- Stage-Mapping
- Rezepte und Balancing
- Loot-Tabellenprofile
- Quest-/JEI-Texte

Mod (sfd_biobackpack):
- Kometen-Controller + Impact-Hardlogic
- Crater/Schadensregeln + Schutzsysteme
- WorldState-Backbone
- Gateway-Hooks (dimensionale Teleport-/Entry-Logik)

---

## 9) Definition of Done fuer V1

1. Stage 2-6 besitzen planetare Unlock-Ziele (nicht nur Itemziele).
2. Wasser ist systemisch gated und reproduzierbar.
3. Atmosphaere ist als eigener Statuswert vorhanden.
4. Gateway-Mode ist konzeptionell und technisch vorverdrahtet.
5. Alle Parameter sind zentral konfigurierbar und dokumentiert.
