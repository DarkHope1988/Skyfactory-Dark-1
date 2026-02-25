// Nerf/disable selected vanilla recipes

ServerEvents.recipes(event => {
  // Stage-0 design: no early 3x3 crafting progression.
  event.remove({ id: 'minecraft:crafting_table' });

  // Early progression lock: vanilla gear/utility is intentionally blocked.
  // Re-enable step-by-step later via dedicated progression recipes.
  const blockedOutputs = [
    // Tools & weapons
    'minecraft:wooden_sword', 'minecraft:wooden_pickaxe', 'minecraft:wooden_axe', 'minecraft:wooden_shovel', 'minecraft:wooden_hoe',
    'minecraft:stone_sword', 'minecraft:stone_pickaxe', 'minecraft:stone_axe', 'minecraft:stone_shovel', 'minecraft:stone_hoe',
    'minecraft:iron_sword', 'minecraft:iron_pickaxe', 'minecraft:iron_axe', 'minecraft:iron_shovel', 'minecraft:iron_hoe',
    'minecraft:golden_sword', 'minecraft:golden_pickaxe', 'minecraft:golden_axe', 'minecraft:golden_shovel', 'minecraft:golden_hoe',
    'minecraft:diamond_sword', 'minecraft:diamond_pickaxe', 'minecraft:diamond_axe', 'minecraft:diamond_shovel', 'minecraft:diamond_hoe',
    'minecraft:netherite_sword', 'minecraft:netherite_pickaxe', 'minecraft:netherite_axe', 'minecraft:netherite_shovel', 'minecraft:netherite_hoe',

    // Armor
    'minecraft:leather_helmet', 'minecraft:leather_chestplate', 'minecraft:leather_leggings', 'minecraft:leather_boots',
    'minecraft:chainmail_helmet', 'minecraft:chainmail_chestplate', 'minecraft:chainmail_leggings', 'minecraft:chainmail_boots',
    'minecraft:iron_helmet', 'minecraft:iron_chestplate', 'minecraft:iron_leggings', 'minecraft:iron_boots',
    'minecraft:golden_helmet', 'minecraft:golden_chestplate', 'minecraft:golden_leggings', 'minecraft:golden_boots',
    'minecraft:diamond_helmet', 'minecraft:diamond_chestplate', 'minecraft:diamond_leggings', 'minecraft:diamond_boots',
    'minecraft:netherite_helmet', 'minecraft:netherite_chestplate', 'minecraft:netherite_leggings', 'minecraft:netherite_boots',

    // Combat & utility
    'minecraft:bow', 'minecraft:crossbow', 'minecraft:shield',
    'minecraft:fishing_rod', 'minecraft:shears', 'minecraft:flint_and_steel'
  ];

  blockedOutputs.forEach(id => event.remove({ output: id }));
});
