// Skyfactory Dark - Stage-0 Bio Progression Interactions

const SFD = {
  wormToWormyEarthChance: 0.28,
  shavingsDryWormChance: 0.20,
  wormToWormyBarkChance: 0.34,
  strippedLogMap: {
    'minecraft:oak_log': 'minecraft:stripped_oak_log',
    'minecraft:spruce_log': 'minecraft:stripped_spruce_log',
    'minecraft:birch_log': 'minecraft:stripped_birch_log',
    'minecraft:jungle_log': 'minecraft:stripped_jungle_log',
    'minecraft:acacia_log': 'minecraft:stripped_acacia_log',
    'minecraft:dark_oak_log': 'minecraft:stripped_dark_oak_log',
    'minecraft:mangrove_log': 'minecraft:stripped_mangrove_log',
    'minecraft:cherry_log': 'minecraft:stripped_cherry_log'
  }
};

function sfdConsumeHandItem(player) {
  if (player.creativeMode) return;
  const held = player.mainHandItem;
  if (!held || held.empty) return;
  held.count--;
}

function sfdDamageTool(player, damage) {
  if (!player || player.creativeMode) return;
  const held = player.mainHandItem;
  if (!held || held.empty) return;

  const max = Number(held.maxDamage || 0);
  const current = Number(held.damageValue || 0);
  const next = current + damage;

  if (max > 0 && next >= max) {
    // Prevent negative/overflow durability behavior: consume the broken tool.
    held.count = held.count - 1;
    return;
  }

  held.damageValue = next;
}

BlockEvents.rightClicked(event => {
  const { player, item, block, level, hand } = event;
  if (hand !== 'MAIN_HAND' || !player || !item || item.empty) return;

  const itemId = String(item.id);
  const blockId = String(block.id);

  // Worm on dirt -> chance for wormy earth.
  if (itemId === 'kubejs:worm' && blockId === 'kubejs:earth_block') {
    if (Math.random() < SFD.wormToWormyEarthChance) {
      block.set('kubejs:wormy_earth_block');
      level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    } else {
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 6, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Worm bait on earth -> accelerated worm generation.
  if (itemId === 'kubejs:worm_bait' && blockId === 'kubejs:earth_block') {
    if (Math.random() < 0.60) {
      block.popItem(Item.of('kubejs:worm', 1));
      level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 1, block.z + 0.5, 8, 0.2, 0.2, 0.2, 0.01);
    } else {
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 6, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Wood shavings on wormy earth -> rare dried worms.
  if (itemId === 'kubejs:wood_shavings' && blockId === 'kubejs:wormy_earth_block') {
    const drySuccess = Math.random() < SFD.shavingsDryWormChance;
    if (drySuccess) {
      const amount = Math.random() < 0.5 ? 1 : 2;
      block.popItem(Item.of('kubejs:dried_worm', amount));
      block.set('kubejs:earth_block');
      level.spawnParticles('minecraft:ash', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    } else {
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 4, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Worm on bark block -> chance for wormy bark.
  if (itemId === 'kubejs:worm' && blockId === 'kubejs:bark_block') {
    if (Math.random() < SFD.wormToWormyBarkChance) {
      block.set('kubejs:wormy_bark_block');
      level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    } else {
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 6, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Organic rod on logs -> strip + bark drop.
  if (itemId === 'kubejs:organic_rod' && blockId.endsWith('_log')) {
    const stripped = SFD.strippedLogMap[blockId];
    if (stripped) {
      block.set(stripped);
      block.popItem('kubejs:tree_bark');
      sfdDamageTool(player, 1);
      event.cancel();
      return;
    }
  }

  // Organic rod on wormy bark -> remove worm, improved plank chance state.
  if (itemId === 'kubejs:organic_rod' && blockId === 'kubejs:wormy_bark_block') {
    block.set('kubejs:hollow_bark_block');
    if (Math.random() < 0.20) block.popItem('kubejs:dried_worm');
    sfdDamageTool(player, 1);
    event.cancel();
    return;
  }

  // Wood shavings on hollow bark -> treated state (guaranteed plank).
  if (itemId === 'kubejs:wood_shavings' && blockId === 'kubejs:hollow_bark_block') {
    block.set('kubejs:treated_hollow_bark_block');
    sfdConsumeHandItem(player);
    event.cancel();
  }
});

LootJS.modifiers(event => {
  // Earth block -> clumps + stable worm chance (independent of hand state).
  event
    .addBlockLootModifier('kubejs:earth_block')
    .removeLoot('kubejs:earth_block')
    .addLoot(Item.of('kubejs:earth_clump', 2));

  event
    .addBlockLootModifier('kubejs:earth_block')
    .removeLoot('kubejs:earth_block')
    .randomChance(0.35)
    .addLoot('kubejs:worm');

  // Wormy earth gives slightly better worm economy.
  event
    .addBlockLootModifier('kubejs:wormy_earth_block')
    .removeLoot('kubejs:wormy_earth_block')
    .addLoot(Item.of('kubejs:earth_clump', 2));

  event
    .addBlockLootModifier('kubejs:wormy_earth_block')
    .randomChance(0.30)
    .addLoot('kubejs:worm');

  // Bark progression blocks into first planks.
  event
    .addBlockLootModifier('kubejs:bark_block')
    .removeLoot('kubejs:bark_block')
    .addLoot('kubejs:tree_bark');

  event
    .addBlockLootModifier('kubejs:wormy_bark_block')
    .removeLoot('kubejs:wormy_bark_block')
    .randomChance(0.33)
    .addLoot('minecraft:oak_planks');

  event
    .addBlockLootModifier('kubejs:wormy_bark_block')
    .randomChance(0.60)
    .addLoot('kubejs:tree_bark');

  event
    .addBlockLootModifier('kubejs:hollow_bark_block')
    .removeLoot('kubejs:hollow_bark_block')
    .randomChance(0.66)
    .addLoot('minecraft:oak_planks');

  event
    .addBlockLootModifier('kubejs:hollow_bark_block')
    .randomChance(0.70)
    .addLoot('kubejs:tree_bark');

  event
    .addBlockLootModifier('kubejs:treated_hollow_bark_block')
    .removeLoot('kubejs:treated_hollow_bark_block')
    .addLoot('minecraft:oak_planks')
    .addLoot('kubejs:tree_bark');
});
