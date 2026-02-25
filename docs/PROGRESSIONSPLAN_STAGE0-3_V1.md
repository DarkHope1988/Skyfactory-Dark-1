# Progressionssystem Konsolidierung - Arbeitsplan (Vorlaufig)

## Projektziel
Das bestehende modulares Progressionssystem (Stage 0-3) strukturell konsolidieren, ausreifen und gegen Drift absichern.

### Gesamtziel
1. Den gesamten Progress Stage 0-3 vollstandig durchgehen.
2. Rezepte, Stages, Unlocks, World-Regeln und Guides auf eine einheitliche Linie bringen.
3. Eine zentrale Referenz (Single Source of Truth) schaffen.
4. Danach keine Trigger oder Stage-Definitionen mehr andern, nur Balancing.
5. Ein stabiles Fundament fur Mid- und Endgame erzeugen.

## Arbeitsstruktur

### Block A - Single Source of Truth (SSOT) fur Stage 0-3
Es wird eine zentrale, verbindliche Referenzdatei gepflegt.

#### Inhalt der SSOT
1. Stage-Definition Stage 0-3
- Name
- Technischer Trigger (Craft / Smelt / InventoryChanged)
- Freigeschaltete Systeme (World Unlocks, Rezepte, Wetter, Mobs etc.)
- Klare Exit-Condition (was muss der Spieler geschafft haben)

2. Beispielstruktur (bindend als Format)
- Stage 1 - Beginning
  - Trigger: Crafting Table
  - Exit: Stabiler Loop fur Bio -> Earth -> Soil Chunk + reproduzierbarer Dirt
- Stage 2 - Stone
  - Trigger: minecraft:stone (InventoryChanged + optional Smelt-Output)
  - Exit: Reproduzierbarer Cobble-Loop + Fuel-Loop + Vorbereitung auf Heat
- Stage 3 - Heat
  - Trigger: Blast Furnace
  - Unlock: Wetter aktiv + erste Heat-Rezepte / Heat-Mechaniken

#### Ziel von Block A
Code und Dokumentation durfen nicht mehr auseinanderlaufen.

### Block B - Early Game spielerisch vertiefen (ohne kunstliche Timer)
Progressionsgefuhl uber Engpasse, Nebenprodukte und Entscheidungspunkte statt uber Wartezeit.

#### Designprinzipien
1. Dirt ist nicht der Bottleneck, Heat und Fuel sind es
- bark_briquette existiert bereits (50 Ticks Burntime)
- Dirt: moderate Hurde (Baumaterial)
- Stone: prozessorientiert, aber fair
- Heat/Smelting: echter Engpass
- Konsequenz: Metalle/Upgrades mussen Heat/Fuel/Podest-Prozesse brauchen

2. Mehr Schritte mit funktionalem Sinn
- Bestehende Kette:
  - raw_soil_chunk -> pebble_cluster -> stone_grit -> rough_stone_mix -> cobblestone
- Erweiterung:
  - raw_soil_chunk kann Nebenprodukte liefern (z. B. organic_fiber, clay_trace)
  - stone_grit kann Nebenprodukt liefern (z. B. slag_dust)
- Ziel: Prozessschritte sollen wertvoll wirken, nicht nach Fleißarbeit

3. Fruhe Mini-Automation bewusst schwach auslegen
- Zielgefuhl: ca. 4 Stunden bis echte Mini-Automation
- Mittel:
  - Podest-Upgrades (Speed uber Untergrund)
  - Output-Caps (max Durchsatz pro Minute)
  - Interner Cooldown
  - Verbrauchbare Katalysatoren
- Ergebnis: Fortschritt ohne OP-Sprung

### Block C - Guide- und UX-Konsistenz
System muss ohne externe Erklarung verstandlich sein.

#### Zu standardisieren
1. JEI-Hints
2. Tooltips
3. Advancement-Texte
4. (spater) FTB Quests

#### Regel
Pro Stage genau eine klare Aufgabe:
- "Mach X -> dann kannst du Y"
- Sichtbare Prozesskette zur Aufgabe

#### JEI-UX Zusatzanforderung
1. Bessere visuelle Darstellung von Prozessketten
2. Konsistente Darstellung von Custom-Rezepten
3. Klar erkennbare Systemlogik
4. Keine Textwand-Erklarungen

## Konkreter nachster Schritt (Review-Folge)

### Schritt 1 - Stage 0/1 Loop-Check
1. Leaf-Drops (Crook) prufen
2. Organic -> Earth -> Soil -> Tempo bewerten
3. Engpass definieren (Fuel / Podest / Resin)

### Schritt 2 - Stage 2 Stone-Loop-Check
1. Anzahl Craft-Schritte bis Cobble
2. Nebenprodukte auf Sinnhaftigkeit prufen
3. Bewerten, ob Stone sich verdient anfuhlt

### Schritt 3 - Stage 3 Heat-Definition
1. Realistischen Weg zur Blast Furnace prufen
2. Systemische Anderungen durch Heat definieren
3. Neue Heat-Unlocks festziehen

## Abschlussziel
Ein vollstandig konsistentes, balanciertes und dokumentiertes Stage-0-3-System, das:
1. technisch sauber ist,
2. spielerisch stimmig ist,
3. keine widerspruchlichen Trigger enthalt,
4. als stabiles Fundament fur Mid- und Endgame dient.
