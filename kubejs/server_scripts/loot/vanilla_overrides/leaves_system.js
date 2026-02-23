// kubejs/server_scripts/loot/vanilla_overrides/leaves_system.js
// Skyfactory Dark - Leaves System (baseline)
//
// Ziel:
// - Ohne Crook: Vanilla bleibt (Saplings/Sticks/Äpfel etc.)
// - Mit Crook: Ex Deorum "silk_worm" wird entfernt + unsere Pack-Ressourcen droppen

LootJS.modifiers(event => {

  // Nur wenn Crook (unser Tag) in der Hand ist
  event
    .addBlockLootModifier('#minecraft:leaves')
    .matchMainHand('#skyfactorydark:harvest_tools')

    // Ex Deorum Drops rausnehmen, die dein Konzept kaputt machen
    .removeLoot('exdeorum:silk_worm')      // <- ID ist exdeorum:silk_worm (dein Screenshot!)
    .removeLoot('minecraft:string')        // falls bei dir String von Leaves kommt (je nach Setup)

    // Unser Konzept: Organic Dust als Basisdrop
    .randomChance(0.1)
    .addLoot('kubejs:organic_dust');

  // Zweiter seltener Drop: Resin Fragment
  event
    .addBlockLootModifier('#minecraft:leaves')
    .matchMainHand('#skyfactorydark:harvest_tools')
    .randomChance(0.01)
    .addLoot('kubejs:resin_fragment');
});