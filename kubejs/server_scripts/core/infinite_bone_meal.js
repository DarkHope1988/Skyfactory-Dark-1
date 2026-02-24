// Temporary system: keep at least 1 bone meal for players flagged as infinite-bone-meal users.
// Replace this file later when the final growth mechanic is implemented.

ServerEvents.tick(event => {
  const server = event.server;
  if (!server) return;

  server.players.forEach(player => {
    const data = player.persistentData;
    if (!data || data.skyfactoryDarkInfiniteBoneMeal !== true) return;

    // Keep a stable "not consumed" feel during active use.
    const current = player.inventory.count('minecraft:bone_meal');
    if (current < 64) {
      player.give(Item.of('minecraft:bone_meal', 64 - current));
    }
  });
});
