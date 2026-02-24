// Skyfactory Dark - Early food progression (3 paths, sequential utility)

ServerEvents.recipes(event => {
  // Path A: Emergency food directly from saplings.
  event.shapeless(Item.of('kubejs:sprout_mash', 1), [
    'minecraft:oak_sapling',
    'minecraft:oak_sapling'
  ]);

  event.shapeless(Item.of('kubejs:survival_ration', 1), [
    'kubejs:sprout_mash',
    'kubejs:sprout_mash',
    'kubejs:resin_fragment'
  ]);

  // Path B: Forage cook path.
  event.shapeless(Item.of('kubejs:raw_forage', 1), [
    'kubejs:leaf_bundle',
    'kubejs:wood_shavings',
    'kubejs:sprout_mash'
  ]);

  event.smoking('kubejs:dried_forage', 'kubejs:raw_forage').xp(0.1);
  event.campfireCooking('kubejs:dried_forage', 'kubejs:raw_forage', 0.1, 300);

  // Path C: Worm branch finisher.
  event.shapeless(Item.of('kubejs:worm_bait', 2), [
    'minecraft:oak_sapling',
    'kubejs:resin_fragment'
  ]);

  event.shapeless(Item.of('kubejs:protein_cake', 1), [
    'kubejs:dried_worm',
    'kubejs:dried_worm',
    'kubejs:dried_forage'
  ]);
});
