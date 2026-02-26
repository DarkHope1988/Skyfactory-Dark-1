// Skyfactory Dark - Early food progression (3 paths, sequential utility)

ServerEvents.recipes(event => {
  // Path A: Emergency food directly from saplings.
  event.shapeless(Item.of('sfd_comets:food_sprout_mash', 1), [
    'minecraft:oak_sapling',
    'minecraft:oak_sapling'
  ]).id('sfd_comets:food/sprout_mash');

  event.shapeless(Item.of('sfd_comets:food_survival_ration', 1), [
    'sfd_comets:food_sprout_mash',
    'sfd_comets:food_sprout_mash',
    'sfd_comets:bio_resin_fragment'
  ]).id('sfd_comets:food/survival_ration');

  // Path B: Forage cook path.
  event.shapeless(Item.of('sfd_comets:food_raw_forage', 1), [
    'sfd_comets:bio_leaf_bundle',
    'sfd_comets:bio_wood_shavings',
    'sfd_comets:food_sprout_mash'
  ]).id('sfd_comets:food/raw_forage');

  event.smoking('sfd_comets:food_dried_forage', 'sfd_comets:food_raw_forage').xp(0.1).id('sfd_comets:food/dried_forage_smoking');
  event.campfireCooking('sfd_comets:food_dried_forage', 'sfd_comets:food_raw_forage', 0.1, 300).id('sfd_comets:food/dried_forage_campfire');

  // Path C: Worm branch finisher.
  event.shapeless(Item.of('sfd_comets:bio_worm_bait', 2), [
    'minecraft:oak_sapling',
    'sfd_comets:bio_resin_fragment'
  ]).id('sfd_comets:food/worm_bait');

  event.shapeless(Item.of('sfd_comets:food_protein_cake', 1), [
    'sfd_comets:bio_dried_worm',
    'sfd_comets:bio_dried_worm',
    'sfd_comets:food_dried_forage'
  ]).id('sfd_comets:food/protein_cake');
});


