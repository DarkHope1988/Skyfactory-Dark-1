// Skyfactory Dark - Leaves System (Stage-0 Bio Loop)

LootJS.modifiers(event => {
  event
    .addBlockLootModifier('#minecraft:leaves')
    .removeLoot('minecraft:stick')
    .removeLoot('minecraft:apple')
    .removeLoot('#minecraft:saplings');

  // Main early drop.
  event
    .addBlockLootModifier('#minecraft:leaves')
    .addLoot('sfd_comets:leaf_threads');

  // Sapling sustain.
  event
    .addBlockLootModifier('#minecraft:leaves')
    .randomChance(0.14)
    .addLoot('minecraft:oak_sapling');

  // Slight crook bonus for saplings.
  event
    .addBlockLootModifier('#minecraft:leaves')
    .matchMainHand('#skyfactorydark:harvest_tools')
    .removeLoot('minecraft:string')
    .removeLoot('minecraft:stick')
    .randomChance(0.20)
    .addLoot('minecraft:oak_sapling');
});

