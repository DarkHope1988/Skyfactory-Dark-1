// kubejs/server_scripts/recipes/custom/stone_processing.js
// Skyfactory Dark - Stone Chain (v1)
//
// Ziel:
// - Stone Grit ist dein erster "Stein-Ersatz" aus Packed Soil.
// - Cobblestone soll NICHT in 2 Minuten verfÃ¼gbar sein,
//   aber auch nicht ewig dauern.
//
// Balancing (Start):
// - 4 Stone Grit -> 1 Cobblestone
// - 4 Cobblestone -> 1 Stone (optional, via Smelting bleibt Vanilla)

ServerEvents.recipes(event => {
  // Stabilizer route: early deterministic conversion, but still resource-expensive.
  event.shaped('sfd_comets:pebble_cluster', [
    'RRR',
    'R R',
    'RRR'
  ], {
    R: 'sfd_comets:raw_soil_chunk'
  });

  // Mid Stage-1 route toward Stone: chunk + pebble -> grit.
  event.shapeless('sfd_comets:stone_grit', [
    'sfd_comets:raw_soil_chunk',
    'sfd_comets:raw_soil_chunk',
    'sfd_comets:pebble_cluster'
  ]);

  // Structured Stone process:
  // grit + previous-stage biomass creates a stone-ready blend.
  event.shapeless('2x sfd_comets:rough_stone_mix', [
    'sfd_comets:stone_grit',
    'sfd_comets:stone_grit',
    'sfd_comets:raw_soil_chunk',
    'sfd_comets:compost_pulp'
  ]);

  // Processed blend route (more planned than pure grit compression).
  event.shaped('2x minecraft:cobblestone', [
    'MM',
    'MM'
  ], {
    M: 'sfd_comets:rough_stone_mix'
  }).id('kubejs:stone/rough_mix_to_cobble');

  // 4x Stone Grit -> 1 Cobblestone (2x2)
  event.shaped('minecraft:cobblestone', [
    'GG',
    'GG'
  ], {
    G: 'sfd_comets:stone_grit'
  }).id('kubejs:stone/grit_to_cobble');

  // First Stone-age podest upgrade component.
  event.shaped('kubejs:podest_stone_base', [
    'CCC',
    'CRC',
    'CCC'
  ], {
    C: 'minecraft:cobblestone',
    R: 'sfd_comets:resin_fragment'
  }).id('kubejs:stone/podest_stone_base');

  // Optional: Pebble Cluster -> Gravel (spÃ¤ter nÃ¼tzlich)
  event.shaped('minecraft:gravel', [
    'PP',
    'PP'
  ], {
    P: 'sfd_comets:pebble_cluster'
  });

});

