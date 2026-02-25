// Skyfactory Dark - Organic Processing (Stage-0 Bio Loop)

ServerEvents.recipes(event => {
  // Leaf threads -> leaf bundles.
  event.shaped('kubejs:leaf_bundle', [
    'LL',
    'LL'
  ], {
    L: 'kubejs:leaf_threads'
  });

  // Leaf bundle + wood shavings -> first earth block.
  event.shapeless('kubejs:earth_block', [
    'kubejs:leaf_bundle',
    'kubejs:wood_shavings'
  ]);

  // Earth clumps can be compressed back into earth blocks.
  event.shaped('kubejs:earth_block', [
    'CC',
    'CC'
  ], {
    C: 'kubejs:earth_clump'
  });

  // Tree bark -> placeable bark block.
  event.shaped('kubejs:bark_block', [
    'BB',
    'BB'
  ], {
    B: 'kubejs:tree_bark'
  });

  // Dried worm + wood shavings => organic rod (OX / XO).
  event.shaped('kubejs:organic_rod', [
    'DW',
    'WD'
  ], {
    D: 'kubejs:dried_worm',
    W: 'kubejs:wood_shavings'
  });

  // Old items remain craftable for compatibility with existing content,
  // and become the Stage-1 bridge into stone progression.
  event.shapeless('kubejs:organic_dust', [
    'kubejs:leaf_threads',
    'kubejs:leaf_threads',
    'kubejs:leaf_threads',
    'kubejs:leaf_threads'
  ]);

  event.shapeless('kubejs:resin_fragment', [
    'kubejs:wood_shavings',
    'kubejs:leaf_threads'
  ]);

  // Stage 1 unlock chain (after first workbench).
  event.shaped('kubejs:compost_pile', [
    'DDD',
    'D D',
    'DDD'
  ], {
    D: 'kubejs:organic_dust'
  });

  event.shaped('kubejs:compost_pulp', [
    ' D ',
    'DRD',
    ' D '
  ], {
    D: 'kubejs:organic_dust',
    R: 'kubejs:resin_fragment'
  });

  event.shaped('minecraft:dirt', [
    'CC',
    'CC'
  ], {
    C: 'kubejs:compost_pile'
  });

  event.shaped('4x kubejs:packed_soil', [
    'DCD',
    'CDC',
    'DCD'
  ], {
    D: 'minecraft:dirt',
    C: 'kubejs:compost_pulp'
  });

  // Alternative fuer Plattformbau:
  // 4x Earth -> 4x Bau-Erdblock (kein Materialgewinn, aber klare Trennung).
  event.shaped('4x kubejs:builder_earth_block', [
    'EE',
    'EE'
  ], {
    E: 'kubejs:earth_block'
  });

  // Stage-0 Arbeitspodest (eigener Block), 2x2 craftbar.
  event.shaped('kubejs:bio_podest', [
    'BB',
    'BB'
  ], {
    B: 'kubejs:builder_earth_block'
  }).id('kubejs:stage0/bio_podest_trapdoor');

  // Stage-0 "Beutel" als tragbares Item.
  event.shaped(
    Item.of(
      'minecraft:bundle',
      '{display:{Name:\'{"text":"Bio-Beutel","italic":false,"color":"gold"}\'}}'
    ),
    [
      'RR',
      'WP'
    ],
    {
      R: 'kubejs:organic_rod',
      W: 'kubejs:dried_worm',
      P: 'kubejs:packed_soil'
    }
  ).id('kubejs:stage0/bio_beutel_9slot');

  event.shaped('kubejs:crude_mallet', [
    ' RR',
    ' SR',
    'S  '
  ], {
    S: 'minecraft:stick',
    R: 'kubejs:resin_fragment'
  });

  event.shaped('minecraft:string', [
    'FF',
    'FF'
  ], {
    F: 'kubejs:organic_fiber'
  });

  event.shaped('minecraft:dirt', [
    'RR',
    'RR'
  ], {
    R: 'kubejs:raw_soil_chunk'
  });

  // Resin has direct early utility.
  event.shapeless(Item.of('minecraft:stick', 2), [
    'kubejs:resin_fragment'
  ]);

  // Optional resin path for treated wood conversion.
  event.shapeless('kubejs:treated_hollow_bark_block', [
    'kubejs:hollow_bark_block',
    'kubejs:resin_fragment'
  ]);

  // Workbench unlock: still 2x2 craftable, but gated behind first plank loop.
  event.shaped('minecraft:crafting_table', [
    'PO',
    'PP'
  ], {
    P: 'minecraft:oak_planks',
    O: 'kubejs:organic_rod'
  }).id('kubejs:stage0/workbench_unlock');
});
