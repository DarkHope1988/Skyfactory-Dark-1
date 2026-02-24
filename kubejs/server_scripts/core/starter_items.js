// kubejs/server_scripts/core/starter_items.js
// Skyfactory Dark - starter kit
//
// Keep this conservative. The goal is to start the loop, not to skip it.

PlayerEvents.loggedIn(event => {
  const player = event.player
  const data = player.persistentData

  // Only run once per player.
  if (data.skyfactoryDarkStarter === true) return
  data.skyfactoryDarkStarter = true

  // Basic survival + a single tree to begin with.
  player.give(Item.of('minecraft:oak_sapling', 1))
  player.give(Item.of('minecraft:dirt', 1))
  player.give(Item.of('minecraft:apple', 2))
  player.give(Item.of('exdeorum:crook', 1))

  // A small quality-of-life: a few sticks to craft first tools.
  player.give(Item.of('minecraft:stick', 4))
})
