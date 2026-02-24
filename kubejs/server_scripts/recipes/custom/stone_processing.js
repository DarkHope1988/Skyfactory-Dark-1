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

  // 4x Stone Grit -> 1 Cobblestone (2x2)
  event.shaped('minecraft:cobblestone', [
    'GG',
    'GG'
  ], {
    G: 'kubejs:stone_grit'
  });

  // Optional: Pebble Cluster -> Gravel (später nützlich)
  event.shaped('minecraft:gravel', [
    'PP',
    'PP'
  ], {
    P: 'kubejs:pebble_cluster'
  });

});
