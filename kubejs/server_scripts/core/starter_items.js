// kubejs/server_scripts/core/starter_items.js
// Skyfactory Dark - starter kit
//
// Keep this conservative. The goal is to start the loop, not to skip it.

PlayerEvents.loggedIn(event => {
  const player = event.player;
  const data = player.persistentData;

  // Only run once per player.
  if (data.skyfactoryDarkStarter === true) return;
  data.skyfactoryDarkStarter = true;
  data.skyfactoryDarkInfiniteBoneMeal = true;

  // Minimal start: sapling + one emergency slab + temporary infinite bone meal.
  player.give(Item.of('minecraft:oak_sapling', 1));
  player.give(Item.of('minecraft:oak_slab', 1));
  player.give(Item.of('minecraft:bone_meal', 64));
});
