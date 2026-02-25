// kubejs/server_scripts/recipes/custom/stone_processing.js
// Skyfactory Dark - Stone Chain (v1)
//
// Ziel:
// - Stone Grit ist dein erster "Stein-Ersatz" aus Packed Soil.
// - Cobblestone soll NICHT in 2 Minuten verfügbar sein,
//   aber auch nicht ewig dauern.
//
// Balancing (Start):
// - 4 Stone Grit -> 1 Cobblestone
// - 4 Cobblestone -> 1 Stone (optional, via Smelting bleibt Vanilla)

ServerEvents.recipes(event => {
  // Stabilizer route: early deterministic conversion, but still resource-expensive.
  event.shaped('kubejs:pebble_cluster', [
    'RRR',
    'R R',
    'RRR'
  ], {
    R: 'kubejs:raw_soil_chunk'
  });

  // Mid Stage-1 route toward Stone: chunk + pebble -> grit.
  event.shapeless('kubejs:stone_grit', [
    'kubejs:raw_soil_chunk',
    'kubejs:raw_soil_chunk',
    'kubejs:pebble_cluster'
  ]);

  // Structured Stone process:
  // grit + previous-stage biomass creates a stone-ready blend.
  event.shapeless('2x kubejs:rough_stone_mix', [
    'kubejs:stone_grit',
    'kubejs:stone_grit',
    'kubejs:raw_soil_chunk',
    'kubejs:compost_pulp'
  ]);

  // Processed blend route (more planned than pure grit compression).
  event.shaped('2x minecraft:cobblestone', [
    'MM',
    'MM'
  ], {
    M: 'kubejs:rough_stone_mix'
  }).id('kubejs:stone/rough_mix_to_cobble');

  // 4x Stone Grit -> 1 Cobblestone (2x2)
  event.shaped('minecraft:cobblestone', [
    'GG',
    'GG'
  ], {
    G: 'kubejs:stone_grit'
  }).id('kubejs:stone/grit_to_cobble');

  // First Stone-age podest upgrade component.
  event.shaped('kubejs:podest_stone_base', [
    'CCC',
    'CRC',
    'CCC'
  ], {
    C: 'minecraft:cobblestone',
    R: 'kubejs:resin_fragment'
  }).id('kubejs:stone/podest_stone_base');

  // Optional: Pebble Cluster -> Gravel (später nützlich)
  event.shaped('minecraft:gravel', [
    'PP',
    'PP'
  ], {
    P: 'kubejs:pebble_cluster'
  });

});
