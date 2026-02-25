// Client: JEI information for Stage-0 Bio Loop

JEIEvents.information(event => {
  event.addItem('kubejs:leaf_threads', [
    'SCHRITT 1: Aus Blaettern sammeln.',
    '4x -> 1x Leaf Bundle.'
  ]);

  event.addItem('kubejs:leaf_bundle', [
    'SCHRITT 2: Aus Leaf Threads craften.',
    'Leaf Bundle + Wood Shavings -> Earth Block.'
  ]);

  event.addItem('kubejs:wood_shavings', [
    'SCHRITT 1: Aus Staemmen sammeln.',
    'Wird fuer Earth/Wurm/Baumstamm-Behandlung genutzt.'
  ]);

  event.addItem('kubejs:earth_block', [
    'SCHRITT 3: Craft aus Leaf Bundle + Wood Shavings.',
    'Abbauen -> Earth Clumps + Wurm-Chance.'
  ]);

  event.addItem('kubejs:earth_clump', [
    'Drop aus Earth / Wormy Earth.',
    '4x -> 1x Earth Block (Loop-Stabilisierung).'
  ]);

  event.addItem('kubejs:worm', [
    'DROP: Earth / Wormy Earth.',
    'NUTZUNG 1: Rechtsklick auf Earth Block -> Chance auf Wormy Earth.',
    'NUTZUNG 2: Rechtsklick auf Bark Block -> Chance auf Wormy Bark.'
  ]);

  event.addItem('kubejs:wormy_earth_block', [
    'ENTSTEHT: Wurm auf Earth Block.',
    'Rechtsklick mit Wood Shavings:',
    'Ca. 20% auf 1-2 Dried Worm, sonst Fehlschlag.'
  ]);

  event.addItem('kubejs:dried_worm', [
    'DROP: Wormy Earth + Wood Shavings.',
    'CRAFT: Dried Worm + Wood Shavings (OX/XO) -> Organic Rod.'
  ]);

  event.addItem('kubejs:tree_bark', [
    'DROP: Organic Rod auf Stamm (Entrinden).',
    '4x -> Bark Block.'
  ]);

  event.addItem('kubejs:bark_block', [
    'CRAFT: 4x Tree Bark.',
    'Wurm-Rechtsklick -> Wormy Bark Block.'
  ]);

  event.addItem('kubejs:wormy_bark_block', [
    'ENTSTEHT: Wurm auf Bark Block.',
    'Abbauen: ca. 33% Plank-Chance.',
    'Organic Rod-Rechtsklick -> Hollow Bark Block (besser).'
  ]);

  event.addItem('kubejs:hollow_bark_block', [
    'ENTSTEHT: Organic Rod auf Wormy Bark.',
    'Abbauen: ca. 66% Plank-Chance.',
    'Mit Resin ODER Wood Shavings behandeln -> 100% Variante.'
  ]);

  event.addItem('kubejs:treated_hollow_bark_block', [
    'ENTSTEHT: Hollow Bark + Resin ODER Wood Shavings.',
    'Abbauen: 100% Oak Plank.'
  ]);

  event.addItem('kubejs:resin_fragment', [
    'CRAFT: Wood Shavings + Leaf Threads.',
    'NUTZUNG: 2x Stick.',
    'NUTZUNG: Hollow Bark -> Treated Hollow Bark.'
  ]);

  event.addItem('kubejs:organic_rod', [
    'HAUPTTOOL STAGE 0:',
    '- Stamm rechtsklicken -> Tree Bark',
    '- Wormy Bark rechtsklicken -> Hollow Bark'
  ]);

  event.addItem('minecraft:oak_planks', [
    'FIRST PLANK PATH:',
    'Wormy Bark (33%) -> Hollow Bark (66%) -> Treated (100%).'
  ]);

  event.addItem('minecraft:crafting_table', [
    'STAGE-0 ZIEL:',
    '3x Oak Planks + 1x Organic Rod.'
  ]);

  event.addItem('kubejs:organic_dust', [
    'STAGE 1 START:',
    '4x Leaf Threads -> Organic Dust.',
    'Nutzen: Compost Pile / Compost Pulp.'
  ]);

  event.addItem('kubejs:compost_pile', [
    'WORKBENCH REZEPT:',
    '8x Organic Dust (Ring) -> Compost Pile.',
    '4x Compost Pile -> 1x Dirt.'
  ]);

  event.addItem('kubejs:compost_pulp', [
    'WORKBENCH REZEPT:',
    'Organic Dust + Resin (Kreuz) -> Compost Pulp.',
    'Mit Dirt zusammen fuer Packed Soil.'
  ]);

  event.addItem('kubejs:packed_soil', [
    'WORKBENCH REZEPT:',
    'Dirt + Compost Pulp -> Packed Soil.',
    'Mit Crude Mallet abbauen fuer Stone Grit.'
  ]);

  event.addItem('kubejs:builder_earth_block', [
    'PLATTFORM-PFAD:',
    '1x Earth Block -> 4x Bau-Erdblock.',
    'Nutze diesen Block zum Bauen,',
    'damit normale Earth Bloecke fuer Progress bleiben.'
  ]);

  event.addItem('kubejs:crude_mallet', [
    'WORKBENCH REZEPT:',
    'Stick + Resin.',
    'Werkzeug fuer Dirt/Packed Soil Verarbeitung.'
  ]);

  event.addItem('kubejs:stone_grit', [
    'DROP: Mallet auf Packed Soil.',
    '4x -> Cobblestone.'
  ]);

  event.addItem('minecraft:cobblestone', [
    'STAGE-1 KERN:',
    '4x Stone Grit -> Cobblestone.',
    'Danach Furnace + Stone Tools.'
  ]);

  // Food progression, sequential by complexity.
  event.addItem('kubejs:sprout_mash', [
    'FOOD A (Notfall):',
    '2x Oak Sapling -> Sprout Mash.'
  ]);

  event.addItem('kubejs:survival_ration', [
    'FOOD A+ (Upgrade):',
    '2x Sprout Mash + Resin -> Survival Ration.'
  ]);

  event.addItem('kubejs:raw_forage', [
    'FOOD B (Kochpfad):',
    'Leaf Bundle + Wood Shavings + Sprout Mash.'
  ]);

  event.addItem('kubejs:dried_forage', [
    'FOOD B+:',
    'Campfire/Smoker: Raw Forage -> Dried Forage.'
  ]);

  event.addItem('kubejs:worm_bait', [
    'FOOD C Vorbereitung:',
    'Sapling + Resin -> Worm Bait.',
    'Rechtsklick auf Earth Block fuer extra Wurmchance.'
  ]);

  event.addItem('kubejs:protein_cake', [
    'FOOD C (stark):',
    '2x Dried Worm + Dried Forage -> Protein Cake.'
  ]);
});
