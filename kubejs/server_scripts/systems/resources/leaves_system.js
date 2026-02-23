// kubejs/server_scripts/systems/resources/leaves_system.js
// Skyfactory Dark - Leaves System (baseline)
//
// Ziel:
// - Ohne Crook: Vanilla bleibt (Saplings/Sticks/Äpfel etc.)
// - Mit Crook: Ex Deorum "silk_worm" & optional String von Leaves wird entfernt
//              + unsere Pack-Ressourcen droppen.
//
// Wichtig:
// - Wir entfernen NUR die ExDeorum-Drops (wenn Crook genutzt wird), nicht Vanilla.

LootJS.modifiers(event => {
  // Crook -> kein ExDeorum Silk Worm / String von Leaves
  // + Organic Dust + Resin Fragment
  event
    .addBlockLootModifier('#minecraft:leaves')
    .matchMainHand('#skyfactorydark:harvest_tools')
    .removeLoot('exdeorum:silk_worm')
    .removeLoot('minecraft:string')
    .randomChance(0.10)
    .addLoot('kubejs:organic_dust');

  event
    .addBlockLootModifier('#minecraft:leaves')
    .matchMainHand('#skyfactorydark:harvest_tools')
    .randomChance(0.01)
    .addLoot('kubejs:resin_fragment');
});
