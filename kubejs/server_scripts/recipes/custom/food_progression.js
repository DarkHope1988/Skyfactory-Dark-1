// Skyfactory Dark - Early food progression (3 paths, sequential utility)

ServerEvents.recipes(event => {
  // Path A: Emergency food directly from saplings.
  event.shapeless(Item.of('sfd_comets:sprout_mash', 1), [
    'minecraft:oak_sapling',
    'minecraft:oak_sapling'
  ]);

  event.shapeless(Item.of('sfd_comets:survival_ration', 1), [
    'sfd_comets:sprout_mash',
    'sfd_comets:sprout_mash',
    'sfd_comets:resin_fragment'
  ]);

  // Path B: Forage cook path.
  event.shapeless(Item.of('sfd_comets:raw_forage', 1), [
    'sfd_comets:leaf_bundle',
    'sfd_comets:wood_shavings',
    'sfd_comets:sprout_mash'
  ]);

  event.smoking('sfd_comets:dried_forage', 'sfd_comets:raw_forage').xp(0.1);
  event.campfireCooking('sfd_comets:dried_forage', 'sfd_comets:raw_forage', 0.1, 300);

  // Path C: Worm branch finisher.
  event.shapeless(Item.of('sfd_comets:worm_bait', 2), [
    'minecraft:oak_sapling',
    'sfd_comets:resin_fragment'
  ]);

  event.shapeless(Item.of('sfd_comets:protein_cake', 1), [
    'sfd_comets:dried_worm',
    'sfd_comets:dried_worm',
    'sfd_comets:dried_forage'
  ]);
});

