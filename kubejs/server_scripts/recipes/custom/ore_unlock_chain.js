// Skyfactory Dark - Ore unlock bridge chain
// Comet tiers provide custom proto resources; this chain unlocks vanilla metals gradually.

ServerEvents.recipes(event => {
  const cfg = global.SFDSystemConfig || {};
  const oreCfg = cfg.oreChain || {};
  const nuggetYield = Math.max(1, Number(oreCfg.protoToNuggetYield || 3));

  event.shaped('sfd_comets:comet_mineral_catalyst', [
    'SMS',
    'MRM',
    'SMS'
  ], {
    S: 'sfd_comets:comet_meteoric_slag',
    M: 'sfd_comets:planet_microbe_culture',
    R: 'minecraft:redstone'
  }).id('sfd_comets:ore_chain/mineral_catalyst');

  event.shaped('sfd_comets:comet_raw_metal_lattice', [
    'SCS',
    'CMC',
    'SCS'
  ], {
    S: 'sfd_comets:comet_meteoric_slag',
    C: 'sfd_comets:comet_mineral_catalyst',
    M: 'minecraft:quartz'
  }).id('sfd_comets:ore_chain/raw_metal_lattice');

  event.shaped('sfd_comets:comet_proto_iron_cluster', [
    'LSL',
    'SMS',
    'LSL'
  ], {
    L: 'sfd_comets:comet_raw_metal_lattice',
    S: 'sfd_comets:comet_meteoric_slag',
    M: 'sfd_comets:comet_mineral_catalyst'
  }).id('sfd_comets:ore_chain/proto_iron_cluster');

  event.shaped('sfd_comets:comet_proto_copper_cluster', [
    'LML',
    'SCS',
    'LML'
  ], {
    L: 'sfd_comets:comet_raw_metal_lattice',
    M: 'sfd_comets:comet_mineral_catalyst',
    S: 'sfd_comets:comet_meteoric_slag',
    C: 'minecraft:clay_ball'
  }).id('sfd_comets:ore_chain/proto_copper_cluster');

  event.shapeless(`${nuggetYield}x minecraft:iron_nugget`, [
    'sfd_comets:comet_proto_iron_cluster',
    'sfd_comets:comet_mineral_catalyst'
  ]).id('sfd_comets:ore_chain/iron_nuggets_from_proto');

  event.shapeless('3x minecraft:copper_ingot', [
    'sfd_comets:comet_proto_copper_cluster',
    'sfd_comets:comet_mineral_catalyst'
  ]).id('sfd_comets:ore_chain/copper_from_proto');
});


