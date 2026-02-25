# SKYFACTORY DARK - MASTER SYSTEM MATRIX v1.0

## 0. DESIGN-GESETZ (GLOBAL RULES)
Diese Regeln gelten IMMER. Jede Mechanik muss ihnen folgen.

1. Ressourcen entstehen durch Systeme - nicht durch Mining
2. Spieler erschafft Weltzustaende - Welt ist nicht statisch
3. Progression ist oekologisch, nicht technologisch
4. Automation verstaerkt Systeme, ersetzt sie nicht
5. Jede Stage fuegt ein Naturgesetz hinzu

## 1. PROGRESSION MATRIX (CORE GAME FLOW)
| Phase | Name | Weltzustand | Spielerziel | Unlock |
|---|---|---|---|---|
| 0 | Void | Tot | Ueberleben | Bio Ressourcen |
| 1 | ProtoLife | steril | Biomasse erzeugen | Primitive Materialien |
| 2 | Geology | instabil | Stein erzeugen | Kometen |
| 3 | Atmosphere | trocken | Wasser erhalten | Wetter |
| 4 | Industry | roh | Maschinen bauen | Energie |
| 5 | Terraform | lebendig | Biosphaere bauen | Leben |
| 6 | Civilization | stabil | NPCs | Villager |
| 7 | Cosmic | aktiv | Planet stabilisieren | Endgame |

## 2. RESSOURCEN-ENTSTEHUNGSMATRIX
### Kategorie: Biologisch
| Quelle | Methode | Ergebnis |
|---|---|---|
| Leaves | Prozess | Threads |
| Biomasse | Kompost | Erde |
| Erde | Verarbeitung | Soil |
| Soil | Reaktion | Mikroben |

### Kategorie: Geologisch
| Quelle | Methode | Ergebnis |
|---|---|---|
| Soil | Druck | Pebbles |
| Pebbles | Verarbeitung | Grit |
| Grit | Mischung | Stone |

### Kategorie: Kosmisch
| Quelle | Methode | Ergebnis |
|---|---|---|
| Komet | Impact | Erze |
| Komet | Impact | Fluessigkeiten |
| Komet | Impact | Rare Material |

### Kategorie: Evolution
| Quelle | Methode | Ergebnis |
|---|---|---|
| Biomasse + Mikroben | Reaktion | Kreaturen |
| Kreaturen + Struktur | Entwicklung | Villager |

## 3. WELTREGEL-MATRIX
| System | Start | Unlock |
|---|---|---|
| Mob Spawn | OFF | Phase 5 |
| Regen | OFF | 100 Grass |
| Phantoms | OFF | Cosmic Phase |
| Fluids | OFF | Komet |
| Naturwachstum | Minimal | Atmosphere Phase |

## 4. KOMETEN-SYSTEM MATRIX
### Spawn Logik
Spawn nur wenn:
1. Spieler Stage >= 2
2. Welt stabil genug
3. Cooldown erfuellt

### Kometentypen
| Typ | Effekt |
|---|---|
| Fluid | Fluessigkeit Spawn |
| Ore | Rohstoffe |
| Cataclysm | Explosion + Rare |

### Impact Regeln
Beim Einschlag:
1. 3x3 Radius Schaden
2. Tiefe 1-3
3. Material spawn

### Planet Stability System (Idee A)
Jeder Einschlag:
1. Instability

Zu viel Instability:
1. staerkere Kometen
2. groessere Schaeden

Spieler muss Stabilizer bauen.

## 5. ATMOSPHAEREN-SYSTEM (Idee B)
Atmosphaere Wert = Summe:
1. Pflanzen
2. Wasser
3. Leben

| Level | Effekt |
|---|---|
| 0 | kein Regen |
| 1 | langsames Wachstum |
| 2 | normales Wachstum |
| 3 | schnelle Natur |
| 4 | Mob Spawn |

## 6. EVOLUTION TREE (Idee C)
Spieler entscheidet Lebensentwicklung.

| Input | Result |
|---|---|
| Biomasse + Soil | Mikroben |
| Mikroben + Energie | Slime |
| Slime + Struktur | Kreatur |
| Kreatur + Dorfstruktur | Villager |

## 7. WELT-SIMULATION (Idee D)
Welt entwickelt sich selbst.

Systeme:
1. Pflanzen verbreiten sich
2. Wasser erodiert Bloecke
3. Boden veraendert sich
4. Mikroben wachsen

Spieler ist Katalysator - nicht Mittelpunkt.

## 8. NATURPHYSIK SYSTEM
### Wassererosion Mechanik
Wenn:
1. Block = Gravel
2. fliessendes Wasser darueber
3. Quelle nicht direkt darueber

Dann:
1. Chance -> Sand
2. Chance -> Dust

### Druckmechanik
Bloecke unter Druck:
1. verwandeln sich

Beispiel:
1. Soil + Gewicht -> Stone

## 9. ENGPASS-DESIGN MATRIX
| Ressource | Rolle |
|---|---|
| Fuel | Hauptlimit |
| Resin | Entscheidungsressource |
| Heat | Fortschrittsblock |
| Atmosphere | Weltprogress |

## 10. SPIELER-ERFAHRUNGSKURVE
| Phase | Gefuehl |
|---|---|
| Start | Einsam |
| Frueh | Experimentieren |
| Mid | Kontrolle |
| Late | Macht |
| End | Gottgleich |

## 11. DESIGN-PRINZIP (WICHTIGSTER SATZ)
Spieler baut keine Fabrik.
Spieler baut einen Planeten.

## 12. SYSTEM-PRIORITAETEN (Entwicklungsreihenfolge)
Wir bauen Systeme NICHT in Spielreihenfolge, sondern in Engine-Reihenfolge:
1. Ressourcen-Loops stabilisieren
2. Weltregeln implementieren
3. Events (Kometen)
4. Simulation
5. Leben
6. Automation
7. Endgame

## 13. KRITISCHER ENTWICKLER-HINWEIS
Ab jetzt gilt:
1. Keine neue Mechanik ohne Matrix-Eintrag
2. Keine Rezeptaenderung ohne Progression-Check
3. Keine Stage ohne Systemfunktion

Sonst zerfaellt das Design.

## ABSCHLUSS - ECHTES FEEDBACK
Das ist kein Modpack mehr.

Das ist:
ein Oekosystem-Simulator mit Progression.

Wenn du das sauber umsetzt
-> wird das eines der kreativsten Packs der Szene.

Nicht wegen Mods.
Sondern wegen Design.
