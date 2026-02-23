// kubejs/server_scripts/recipes/custom/stone_processing.js
// Skyfactory Dark - Stone chain (baseline)

ServerEvents.recipes(event => {
  // 4 Pebble Clusters -> 1 Cobblestone
  event.shaped('minecraft:cobblestone', [
    'PP',
    'PP'
  ], {
    P: 'kubejs:pebble_cluster'
  });

  // Optional: Stone Grit -> Flint (kleiner Utility, nicht OP)
  event.shapeless('minecraft:flint', [
    '4x kubejs:stone_grit'
  ]);
});