// kubejs/server_scripts/loot/vanilla_overrides/packed_soil_mallet.js
// Skyfactory Dark - Packed Soil Break Logic (baseline)
//
// Idee:
// - Packed Soil ist der Early-Game "Investment Block".
// - Ohne Mallet: Block dropt sich selbst (kein Fortschritt).
// - Mit Mallet (Tag skyfactorydark:mallets): Block zerfÃƒÂ¤llt in "Grit / Pebbles / Fiber".
//
// Balancing (Start):
// - ~1-2 Stone Grit pro Block im Schnitt (nicht garantiert)
// - selten Pebble Cluster als "Bonus"
// - selten Organic Fiber (fÃƒÂ¼r spÃƒÂ¤tere Chains)

LootJS.modifiers(event => {

  // --------------------------------------------
  // 1) Default: Ohne Mallet soll Packed Soil sich selbst droppen
  // (Das macht Vanilla schon. Wir mÃƒÂ¼ssen hier nichts ÃƒÂ¤ndern.)
  // --------------------------------------------

  // --------------------------------------------
  // 2) Mit Mallet: Packed Soil dropt NICHT sich selbst,
  // sondern unsere Progression-Items.
  // --------------------------------------------
  const mallet = '#skyfactorydark:mallets';

  // Entferne Self-Drop nur wenn Mallet in der Hand ist
  event
    .addBlockLootModifier('sfd_comets:soil_packed_block')
    .matchMainHand(mallet)
    .removeLoot('sfd_comets:soil_packed_block');

  // Stone Grit: 65% -> 1
  event
    .addBlockLootModifier('sfd_comets:soil_packed_block')
    .matchMainHand(mallet)
    .randomChance(0.65)
    .addLoot('sfd_comets:stone_grit');

  // Stone Grit Bonus: 15% -> +1 (damit manchmal 2 rauskommen)
  event
    .addBlockLootModifier('sfd_comets:soil_packed_block')
    .matchMainHand(mallet)
    .randomChance(0.15)
    .addLoot('sfd_comets:stone_grit');

  // Pebble Cluster: 10% -> 1 (spÃƒÂ¤ter wichtig, aber kein Muss)
  event
    .addBlockLootModifier('sfd_comets:soil_packed_block')
    .matchMainHand(mallet)
    .randomChance(0.10)
    .addLoot('sfd_comets:stone_pebble_cluster');

  // Organic Fiber: 08% -> 1
  event
    .addBlockLootModifier('sfd_comets:soil_packed_block')
    .matchMainHand(mallet)
    .randomChance(0.08)
    .addLoot('sfd_comets:bio_organic_fiber');
});


