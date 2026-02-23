// kubejs/server_scripts/loot/vanilla_overrides/packed_soil_mallet.js
// Skyfactory Dark - Packed Soil Break Logic (baseline)
//
// Idee:
// - Packed Soil ist der Early-Game "Investment Block".
// - Ohne Mallet: Block dropt sich selbst (kein Fortschritt).
// - Mit Mallet (Tag skyfactorydark:mallets): Block zerfällt in "Grit / Pebbles / Fiber".
//
// Balancing (Start):
// - ~1-2 Stone Grit pro Block im Schnitt (nicht garantiert)
// - selten Pebble Cluster als "Bonus"
// - selten Organic Fiber (für spätere Chains)

LootJS.modifiers(event => {

  // --------------------------------------------
  // 1) Default: Ohne Mallet soll Packed Soil sich selbst droppen
  // (Das macht Vanilla schon. Wir müssen hier nichts ändern.)
  // --------------------------------------------

  // --------------------------------------------
  // 2) Mit Mallet: Packed Soil dropt NICHT sich selbst,
  // sondern unsere Progression-Items.
  // --------------------------------------------
  const mallet = '#skyfactorydark:mallets';

  // Entferne Self-Drop nur wenn Mallet in der Hand ist
  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand(mallet)
    .removeLoot('kubejs:packed_soil');

  // Stone Grit: 65% -> 1
  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand(mallet)
    .randomChance(0.65)
    .addLoot('kubejs:stone_grit');

  // Stone Grit Bonus: 15% -> +1 (damit manchmal 2 rauskommen)
  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand(mallet)
    .randomChance(0.15)
    .addLoot('kubejs:stone_grit');

  // Pebble Cluster: 10% -> 1 (später wichtig, aber kein Muss)
  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand(mallet)
    .randomChance(0.10)
    .addLoot('kubejs:pebble_cluster');

  // Organic Fiber: 08% -> 1
  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand(mallet)
    .randomChance(0.08)
    .addLoot('kubejs:organic_fiber');
});
