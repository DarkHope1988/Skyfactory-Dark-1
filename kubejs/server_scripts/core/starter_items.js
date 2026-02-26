// kubejs/server_scripts/core/starter_items.js
// Skyfactory Dark - starter kit
//
// Keep this conservative. The goal is to start the loop, not to skip it.

PlayerEvents.loggedIn(event => {
  const player = event.player;
  const data = player.persistentData;

  // Force-remove Ex Deorum watering cans every login.
  [
    'exdeorum:wooden_watering_can',
    'exdeorum:stone_watering_can',
    'exdeorum:iron_watering_can',
    'exdeorum:golden_watering_can',
    'exdeorum:diamond_watering_can',
    'exdeorum:netherite_watering_can',
    'exdeorum:watering_can'
  ].forEach(id => player.runCommandSilent(`clear @s ${id}`));

  // Only run once per player.
  if (data.getBoolean('skyfactoryDarkStarter')) return;
  data.putBoolean('skyfactoryDarkStarter', true);

  // Minimal start: sapling + growth paste + a few builder earth blocks for safe standing space.
  player.give(Item.of('minecraft:oak_sapling', 1));
  player.give(Item.of('sfd_comets:bio_growth_paste_t1', 1));
  player.give(Item.of('sfd_comets:soil_builder_block', 3));

  // Quick-start guide for blind playtests (robust SNBT to avoid invalid-book tags).
  const guideNbt = '{title:"SFD Playtest Guide",author:"SFD Team",pages:['
    + '\'{\"text\":\"Stage 0\\\\nSammle Laubfaeden + Baumspaene.\\\\nBaue Earth Blocks, farme Erdklumpen/Wuermer und crafte den Organischen Stab.\"}\','
    + '\'{\"text\":\"Stage 0 Ziel\\\\nWerkbank freischalten.\\\\nTipp: Hover ueber Quest-Items und druecke R (Rezept) oder U (Verwendung) fuer JEI.\"}\','
    + '\'{\"text\":\"Stage 1\\\\nCompost -> Dirt -> Packed Soil.\\\\nMit Crude Mallet Dirt verarbeiten, Stone Grit/Cobble aufbauen, dann Stein brennen.\"}\','
    + '\'{\"text\":\"Stage 2 Start\\\\nAb Stein beginnt Comet-Progression.\\\\nNutze Questbook als Checkliste; Kernschritte haken automatisch ab.\"}\''
    + ']}';
  player.give(Item.of('minecraft:written_book', guideNbt));
});
