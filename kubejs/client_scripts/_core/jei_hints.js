// Client: JEI information for Stage-0 Bio Loop

JEIEvents.hideItems(event => {
  // Technical world/impact container, intentionally not player-facing in JEI.
  event.hide('sfd_comets:comet_cache');
});

JEIEvents.information(event => {
  event.addItem('sfd_comets:leaf_threads', [
    'SCHRITT 1: Aus Blaettern sammeln.',
    '4x -> 1x Leaf Bundle.'
  ]);

  event.addItem('sfd_comets:leaf_bundle', [
    'SCHRITT 2: Aus Leaf Threads craften.',
    'Leaf Bundle + Wood Shavings -> Earth Block.'
  ]);

  event.addItem('sfd_comets:wood_shavings', [
    'SCHRITT 1: Aus Staemmen sammeln.',
    'Wird fuer Earth/Wurm/Baumstamm-Behandlung genutzt.'
  ]);

  event.addItem('sfd_comets:earth_block', [
    'SCHRITT 3: Craft aus Leaf Bundle + Wood Shavings.',
    'Abbauen -> Earth Clumps + Wurm-Chance.'
  ]);

  event.addItem('sfd_comets:earth_clump', [
    'Drop aus Earth / Wormy Earth.',
    '4x -> 1x Earth Block (Loop-Stabilisierung).'
  ]);

  event.addItem('sfd_comets:worm', [
    'DROP: Earth / Wormy Earth.',
    'NUTZUNG 1: Rechtsklick auf Earth Block -> Chance auf Wormy Earth.',
    'NUTZUNG 2: Rechtsklick auf Bark Block -> Chance auf Wormy Bark.'
  ]);

  event.addItem('sfd_comets:wormy_earth_block', [
    'ENTSTEHT: Wurm auf Earth Block.',
    'Rechtsklick mit Wood Shavings:',
    'Garantiert 1-2 Dried Worm.',
    'Finalschritt: Block wird dabei verbraucht.'
  ]);

  event.addItem('sfd_comets:dried_worm', [
    'DROP: Wormy Earth + Wood Shavings.',
    'CRAFT: Dried Worm + Wood Shavings (OX/XO) -> Organic Rod.'
  ]);

  event.addItem('sfd_comets:tree_bark', [
    'DROP: Organic Rod auf Stamm (Entrinden).',
    '4x -> Bark Block.'
  ]);

  event.addItem('sfd_comets:bark_block', [
    'CRAFT: 4x Tree Bark.',
    'Wurm-Rechtsklick -> Wormy Bark Block.'
  ]);

  event.addItem('sfd_comets:wormy_bark_block', [
    'ENTSTEHT: Wurm auf Bark Block.',
    'Abbauen: ca. 33% Plank-Chance.',
    'Organic Rod-Rechtsklick -> Hollow Bark Block (besser).'
  ]);

  event.addItem('sfd_comets:hollow_bark_block', [
    'ENTSTEHT: Organic Rod auf Wormy Bark.',
    'Abbauen: ca. 66% Plank-Chance.',
    'Mit Resin ODER Wood Shavings behandeln -> 100% Variante.'
  ]);

  event.addItem('sfd_comets:treated_hollow_bark_block', [
    'ENTSTEHT: Hollow Bark + Resin ODER Wood Shavings.',
    'Abbauen: 100% Oak Plank.'
  ]);

  event.addItem('sfd_comets:resin_fragment', [
    'CRAFT: Wood Shavings + Leaf Threads.',
    'NUTZUNG: 2x Stick.',
    'NUTZUNG: Hollow Bark -> Treated Hollow Bark.'
  ]);

  event.addItem('sfd_comets:organic_rod', [
    'HAUPTTOOL STAGE 0:',
    '- Stamm rechtsklicken -> Tree Bark',
    '- Wormy Bark rechtsklicken -> Hollow Bark',
    '- Auf Bio-Podest: Slot-Inhalt entnehmen'
  ]);

  event.addItem('sfd_comets:bio_podest', [
    'BIO-PODEST (MOD-BLOCK):',
    'Hat einen echten 1-Slot Container.',
    'Rechtsklick zum Oeffnen, Item direkt einlegen/entnehmen.',
    'Podest-Logik ersetzt die alte KubeJS-Variante.'
  ]);

  event.addItem('minecraft:oak_planks', [
    'FIRST PLANK PATH:',
    'Wormy Bark (33%) -> Hollow Bark (66%) -> Treated (100%).'
  ]);

  event.addItem('minecraft:crafting_table', [
    'STAGE-1 TRIGGER:',
    'Crafting Table craften.',
    'Baupfad: 3x Oak Planks + 1x Organic Rod.'
  ]);

  event.addItem('sfd_comets:organic_dust', [
    'STAGE 1 START:',
    '4x Leaf Threads -> Organic Dust.',
    'Nutzen: Compost Pile / Compost Pulp.'
  ]);

  event.addItem('sfd_comets:compost_pile', [
    'WORKBENCH REZEPT:',
    '8x Organic Dust (Ring) -> Compost Pile.',
    '4x Compost Pile -> 1x Dirt.'
  ]);

  event.addItem('sfd_comets:compost_pulp', [
    'WORKBENCH REZEPT:',
    'Organic Dust + Resin (Kreuz) -> Compost Pulp.',
    'Mit Dirt zusammen fuer Packed Soil.'
  ]);

  event.addItem('sfd_comets:packed_soil', [
    'WORKBENCH REZEPT:',
    'Dirt + Compost Pulp -> Packed Soil.',
    'Mit Crude Mallet abbauen fuer Stone Grit.'
  ]);

  event.addItem('sfd_comets:bio_backpack', [
    'BIO-BEUTEL (EIGENE ID):',
    'Rezept: 2x Organic Rod + 1x Packed Soil + 1x Dried Worm.',
    'Exakt 9 Slots, Rechtsklick in der Luft zum Oeffnen.'
  ]);

  event.addItem('sfd_comets:bio_growth_paste', [
    'BIO-WACHSTUMSPASTE:',
    'Verhaelt sich wie Knochenmehl auf den angeklickten Block.',
    'Verbraucht sich nicht.'
  ]);

  event.addItem('sophisticatedbackpacks:backpack', [
    'Sophisticated Backpacks bleiben aktuell gesperrt.',
    'Freischaltung folgt spaeter ueber Stage-Progression.'
  ]);

  event.addItem('sfd_comets:builder_earth_block', [
    'PLATTFORM-PFAD:',
    '4x Earth Block -> 4x Bau-Erdblock.',
    'Nutze diesen Block zum Bauen,',
    'damit normale Earth Bloecke fuer Progress bleiben.'
  ]);

  event.addItem('sfd_comets:crude_mallet', [
    'WORKBENCH REZEPT:',
    'Stick + Resin.',
    'Werkzeug fuer Dirt/Packed Soil Verarbeitung.'
  ]);

  event.addItem('sfd_comets:stone_grit', [
    'STONE START:',
    'DROP: Mallet auf Packed Soil.',
    'ODER: Raw Soil Chunk + Pebble Cluster Pfad.',
    'Weiter mit Rough Stone Mix fuer den stabilen Cobble-Loop.'
  ]);

  event.addItem('sfd_comets:rough_stone_mix', [
    'STONE PROCESS (MID):',
    '2x Stone Grit + Raw Soil Chunk + Compost Pulp -> 2x Rough Stone Mix.',
    '4x Rough Stone Mix -> 2x Cobblestone.'
  ]);

  event.addItem('minecraft:cobblestone', [
    'STONE MILESTONE:',
    'Route A: 4x Stone Grit -> 1x Cobblestone.',
    'Route B: Rough Stone Mix (prozessorientiert, effizienter).',
    'Cobble ist nur Zwischenziel: Stage 2 gibt es erst mit gebranntem Stein.'
  ]);

  event.addItem('minecraft:stone', [
    'STAGE-2 TRIGGER:',
    'Milestone auf Stone (Inventory/Craft-Pfad).',
    'EXIT-ZIEL: Stabiler Cobble/Stone-Loop plus Fuel-Vorlauf.'
  ]);

  event.addItem('sfd_comets:bark_briquette', [
    'STAGE-1 FUEL:',
    'Rezept aus Baumrinde + Resin.',
    'Burntime: 50 Ticks pro Stueck.',
    'Richtwert: ca. 4 Briquettes fuer 1 Smelt im Ofen.'
  ]);

  event.addItem('minecraft:blast_furnace', [
    'STAGE-3 TRIGGER:',
    'Blast Furnace craften.',
    'EXIT-ZIEL: Erste stabile Heat-Logistik (Fuel + Smelt-Core-Loop).',
    'WORLD UNLOCK: Wetter-Policy wird freigeschaltet.'
  ]);

  event.addItem('sfd_comets:podest_stone_base', [
    'PODEST UPGRADE (STONE):',
    'Craft mit Cobblestone + Resin.',
    'Stelle das Bio-Podest darauf:',
    'Verarbeitung wird schneller als auf normalem Untergrund.'
  ]);

  // Food progression, sequential by complexity.
  event.addItem('sfd_comets:sprout_mash', [
    'FOOD A (Notfall):',
    '2x Oak Sapling -> Sprout Mash.'
  ]);

  event.addItem('sfd_comets:survival_ration', [
    'FOOD A+ (Upgrade):',
    '2x Sprout Mash + Resin -> Survival Ration.'
  ]);

  event.addItem('sfd_comets:raw_forage', [
    'FOOD B (Kochpfad):',
    'Leaf Bundle + Wood Shavings + Sprout Mash.'
  ]);

  event.addItem('sfd_comets:dried_forage', [
    'FOOD B+:',
    'Campfire/Smoker: Raw Forage -> Dried Forage.'
  ]);

  event.addItem('sfd_comets:worm_bait', [
    'FOOD C Vorbereitung:',
    'Sapling + Resin -> Worm Bait.',
    'Rechtsklick auf Earth Block fuer extra Wurmchance.'
  ]);

  event.addItem('sfd_comets:protein_cake', [
    'FOOD C (stark):',
    '2x Dried Worm + Dried Forage -> Protein Cake.'
  ]);
});

