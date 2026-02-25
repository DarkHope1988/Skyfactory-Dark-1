// Skyfactory Dark - Stage-0 Bio Progression Interactions

const SFD = {
  wormToWormyEarthChance: 0.28,
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

function sfdIsBioPodest(blockId) {
  return String(blockId || '') === 'kubejs:bio_podest';
}

function sfdPodestKey(level, block) {
  return `${String(level.dimension)}:${block.x},${block.y},${block.z}`;
}

function sfdPopAbove(level, block, item) {
  const above = level.getBlock(block.x, block.y + 1, block.z);
  if (above && above.id) {
    above.popItem(item);
    return;
  }
  block.popItem(item);
}

if (!global.sfdBioPodestSlots) global.sfdBioPodestSlots = {};

BlockEvents.rightClicked(event => {
  const { player, item, block, level, hand } = event;
  if (hand !== 'MAIN_HAND' || !player || !block || !level) return;

  const hasItem = !!(item && !item.empty);
  const itemId = hasItem ? String(item.id) : '';
  const blockId = String(block.id);

  // Stage-0 Podest (Trapdoor): item "einlegen" wie Slot und direkt dort verarbeiten.
  if (sfdIsBioPodest(blockId)) {
    const key = sfdPodestKey(level, block);
    const slots = global.sfdBioPodestSlots || {};
    const stored = slots[key];

    // Empty-hand click = Slot status, Shift+Click = direct extraction.
    if (!hasItem) {
      if (player.crouching && stored) {
        sfdPopAbove(level, block, Item.of(stored, 1));
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 6, 0.2, 0.05, 0.2, 0.01);
      } else {
        const text = stored ? stored.replace('minecraft:', '').replace('kubejs:', '') : 'leer';
        player.tell(`[SF-DARK] Podest-Slot: ${text}`);
      }
      event.cancel();
      return;
    }

    // 1) Slot befuellen (wie Item-Frame), wenn leer.
    if (!stored) {
      let toStore = null;
      if (itemId === 'kubejs:earth_block' || itemId === 'minecraft:dirt') toStore = 'kubejs:earth_block';
      else if (itemId === 'kubejs:bark_block') toStore = 'kubejs:bark_block';
      else if (itemId === 'kubejs:wormy_bark_block') toStore = 'kubejs:wormy_bark_block';
      else if (itemId === 'kubejs:hollow_bark_block') toStore = 'kubejs:hollow_bark_block';
      else if (itemId === 'kubejs:treated_hollow_bark_block') toStore = 'kubejs:treated_hollow_bark_block';
      else if (itemId.endsWith('_log')) toStore = itemId;

      if (toStore) {
        slots[key] = toStore;
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
        level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 6, 0.2, 0.05, 0.2, 0.01);
        player.tell(`[SF-DARK] Podest geladen: ${toStore.replace('minecraft:', '').replace('kubejs:', '')}`);
        event.cancel();
        return;
      }
    }

    // 2) Wurm auf Slot-Ziel.
    if (itemId === 'kubejs:worm') {
      if (stored === 'kubejs:earth_block') {
        if (Math.random() < SFD.wormToWormyEarthChance) {
          slots[key] = 'kubejs:wormy_earth_block';
          level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 10, 0.2, 0.05, 0.2, 0.01);
        } else {
          level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 6, 0.2, 0.05, 0.2, 0.01);
        }
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
      } else if (stored === 'kubejs:bark_block') {
        if (Math.random() < SFD.wormToWormyBarkChance) {
          slots[key] = 'kubejs:wormy_bark_block';
          level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 10, 0.2, 0.05, 0.2, 0.01);
        } else {
          level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 6, 0.2, 0.05, 0.2, 0.01);
        }
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
      } else {
        level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 4, 0.2, 0.05, 0.2, 0.01);
      }
      event.cancel();
      return;
    }

    // 3) Baumspaene auf Slot-Ziel.
    if (itemId === 'kubejs:wood_shavings') {
      // Finalschritt Earth-Loop: verbraucht den Block, gibt aber immer Getrockneten Wurm.
      if (stored === 'kubejs:wormy_earth_block') {
        const amount = Math.random() < 0.5 ? 1 : 2;
        sfdPopAbove(level, block, Item.of('kubejs:dried_worm', amount));
        level.spawnParticles('minecraft:ash', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 10, 0.2, 0.05, 0.2, 0.01);
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
      } else if (stored === 'kubejs:hollow_bark_block') {
        slots[key] = 'kubejs:treated_hollow_bark_block';
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
        level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
      } else {
        level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 4, 0.2, 0.05, 0.2, 0.01);
      }
      event.cancel();
      return;
    }

    // 4) Organic Rod auf Slot-Ziel.
    if (itemId === 'kubejs:organic_rod') {
      if (stored && stored.endsWith('_log') && SFD.strippedLogMap[stored]) {
        const stripped = SFD.strippedLogMap[stored];
        sfdPopAbove(level, block, Item.of(stripped, 1));
        sfdPopAbove(level, block, Item.of('kubejs:tree_bark', 1));
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      if (stored === 'kubejs:wormy_bark_block') {
        slots[key] = 'kubejs:hollow_bark_block';
        if (Math.random() < 0.20) sfdPopAbove(level, block, Item.of('kubejs:dried_worm', 1));
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      // Harvest Schritt im Podest fuer Bark-Chain.
      if (stored === 'kubejs:hollow_bark_block') {
        if (Math.random() < 0.66) sfdPopAbove(level, block, Item.of('minecraft:oak_planks', 1));
        if (Math.random() < 0.70) sfdPopAbove(level, block, Item.of('kubejs:tree_bark', 1));
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      if (stored === 'kubejs:treated_hollow_bark_block') {
        sfdPopAbove(level, block, Item.of('minecraft:oak_planks', 1));
        sfdPopAbove(level, block, Item.of('kubejs:tree_bark', 1));
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      // Fallback: Slot-Inhalt entnehmen.
      if (!stored) {
        level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 4, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }
      sfdPopAbove(level, block, Item.of(stored, 1));
      delete slots[key];
      global.sfdBioPodestSlots = slots;
      level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
      event.cancel();
      return;
    }

    // Kein Auf-/Zuklappen im Stage-0 Podestmodus.
    event.cancel();
    return;
  }

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

  // Wood shavings on wormy earth -> guaranteed dried worms.
  if (itemId === 'kubejs:wood_shavings' && blockId === 'kubejs:wormy_earth_block') {
    const amount = Math.random() < 0.5 ? 1 : 2;
    block.popItem(Item.of('kubejs:dried_worm', amount));
    level.spawnParticles('minecraft:ash', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    block.set('minecraft:air');
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

BlockEvents.broken(event => {
  const { block, level } = event;
  const blockId = String(block.id);
  if (!sfdIsBioPodest(blockId)) return;

  const key = sfdPodestKey(level, block);
  const slots = global.sfdBioPodestSlots || {};
  const stored = slots[key];
  if (!stored) return;

  sfdPopAbove(level, block, Item.of(stored, 1));
  delete slots[key];
  global.sfdBioPodestSlots = slots;
});

// Progressions-Bloecke sollen nicht als freie Bau-Bloecke genutzt werden.
// Erlaubt nur auf Bau-Erdblock oder Bio-Podest.
BlockEvents.placed(event => {
  const { block, level, player } = event;
  if (!block || !level || !player) return;

  const placedId = String(block.id);
  const restricted = {
    'kubejs:earth_block': true,
    'kubejs:wormy_earth_block': true,
    'kubejs:bark_block': true,
    'kubejs:wormy_bark_block': true,
    'kubejs:hollow_bark_block': true,
    'kubejs:treated_hollow_bark_block': true
  };
  if (!restricted[placedId]) return;

  const below = level.getBlock(block.x, block.y - 1, block.z);
  const belowId = String(below.id || '');
  const allowedBase = belowId === 'kubejs:builder_earth_block' || belowId === 'kubejs:bio_podest';
  if (allowedBase) return;

  block.set('minecraft:air');
  block.popItem(Item.of(placedId, 1));
  player.tell('[SF-DARK] Dieser Block darf nur auf Bau-Erdblock oder Bio-Podest platziert werden.');
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
