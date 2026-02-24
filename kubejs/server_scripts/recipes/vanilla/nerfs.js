// Nerf/disable selected vanilla recipes

ServerEvents.recipes(event => {
  // Stage-0 design: no early 3x3 crafting progression.
  event.remove({ id: 'minecraft:crafting_table' });
});
