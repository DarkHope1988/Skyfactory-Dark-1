// Skyfactory Dark - Logs System (Stage-0 Bio Loop)

LootJS.modifiers(event => {
  event
    .addBlockLootModifier('#minecraft:logs')
    .removeLoot('#minecraft:logs')
    .removeLoot('#minecraft:planks')
    .removeLoot('minecraft:stick');

  // Core opener: logs become wood shavings instead of wood progression.
  event
    .addBlockLootModifier('#minecraft:logs')
    .addLoot('sfd_comets:bio_wood_shavings');
});

