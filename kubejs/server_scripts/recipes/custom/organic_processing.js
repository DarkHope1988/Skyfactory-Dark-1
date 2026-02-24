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
  // but no longer part of the core opening loop.
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
