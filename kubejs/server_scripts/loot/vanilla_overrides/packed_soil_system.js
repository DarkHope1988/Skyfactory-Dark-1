// kubejs/server_scripts/systems/resources/packed_soil_system.js
// Packed Soil -> Pebble Cluster + selten Fiber/Grit
//
// Ziel:
// - Ohne Mallet: Packed Soil droppt sich selbst (Vanilla-like).
// - Mit Mallet (crushing_tools): Packed Soil wird "zerlegt" in Fortschrittsdrops.

LootJS.modifiers(event => {
  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand('#skyfactorydark:crushing_tools')
    .removeLoot('kubejs:packed_soil')

    // Basisdrop: Pebble Cluster (immer 1)
    .addLoot('kubejs:pebble_cluster')

    // seltene Nebenprodukte
    .randomChance(0.10)
    .addLoot('kubejs:stone_grit');

  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand('#skyfactorydark:crushing_tools')
    .randomChance(0.05)
    .addLoot('kubejs:organic_fiber');
});