// kubejs/server_scripts/loot/vanilla_overrides/dirt_processing.js
// Skyfactory Dark - Dirt processing (baseline)
//
// When dirt is broken with a "hammer" (tagged), it becomes a processing step:
// - Dirt block does NOT drop itself
// - Always drops Soil Remains
// - Rarely drops Plant Fiber and Stone Clumps

LootJS.modifiers(event => {
  const dirt = event
    .addBlockLootModifier('minecraft:dirt')
    .matchMainHand('#skyfactorydark:hammers')

  // Turn the block into loot instead of returning the block.
  dirt.removeLoot('minecraft:dirt')

  // Guaranteed baseline output.
  dirt.addLoot('kubejs:soil_remains')

  // Rare extras.
  dirt.randomChance(0.12).addLoot('kubejs:fiber')
  dirt.randomChance(0.05).addLoot('kubejs:stone_clump')
})
