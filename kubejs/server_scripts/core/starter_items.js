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

  // Minimal start: sapling + growth paste + one builder earth block for safe standing space.
  player.give(Item.of('minecraft:oak_sapling', 1));
  player.give(Item.of('sfd_comets:bio_growth_paste', 1));
  player.give(Item.of('sfd_comets:builder_earth_block', 1));
});
