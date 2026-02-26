// Skyfactory Dark - Stage-0 Bio Progression Interactions

const SFD = {
  wormToWormyEarthChance: 0.28,
  wormToWormyBarkChance: 0.34,
  wormBaitToWormChance: 0.60,
  wormyEarthMalletWormChance: 0.60,
  failOutputEnabled: true,
  failOutputChance: 0.35,
  gateEarthWorm: 0,
  gateEarthWormBait: 1,
  gateWormyEarthWood: 0,
  gateWormyEarthMallet: 1,
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

function sfdLoadBioConfig() {
  try {
    const C = Java.loadClass('de.darkhope.sfd.comets.config.SfdConfig');
    SFD.wormToWormyEarthChance = Number(C.BIO_PODEST_EARTH_WORM_CHANCE.get());
    SFD.wormBaitToWormChance = Number(C.BIO_PODEST_EARTH_WORM_BAIT_CHANCE.get());
    SFD.wormyEarthMalletWormChance = Number(C.BIO_PODEST_WORMY_EARTH_MALLET_WORM_CHANCE.get());
    SFD.failOutputEnabled = C.BIO_PODEST_FAIL_OUTPUT_ENABLED.get() === true;
    SFD.failOutputChance = Number(C.BIO_PODEST_FAIL_OUTPUT_CHANCE.get());
    SFD.gateEarthWorm = Number(C.BIO_PODEST_GATE_EARTH_WORM_MIN_TIER.get());
    SFD.gateEarthWormBait = Number(C.BIO_PODEST_GATE_EARTH_WORM_BAIT_MIN_TIER.get());
    SFD.gateWormyEarthWood = Number(C.BIO_PODEST_GATE_WORMY_EARTH_WOOD_MIN_TIER.get());
    SFD.gateWormyEarthMallet = Number(C.BIO_PODEST_GATE_WORMY_EARTH_MALLET_MIN_TIER.get());
  } catch (e) {
    // Fallback to defaults above when Java config class is unavailable.
  }
}

sfdLoadBioConfig();

function sfdGetStageTier(player) {
  if (!player || !player.stages) return 0;
  const STAGES = (global.SFDStageManager && global.SFDStageManager.getStages && global.SFDStageManager.getStages())
    || global.SFD_STAGES
    || {};
  let tier = 0;
  if (STAGES.STAGE_1_BEGINNING && player.stages.has(STAGES.STAGE_1_BEGINNING)) tier = 1;
  if (STAGES.STAGE_2_STONE && player.stages.has(STAGES.STAGE_2_STONE)) tier = 2;
  if (STAGES.STAGE_3_HEAT && player.stages.has(STAGES.STAGE_3_HEAT)) tier = 3;
  if (STAGES.STAGE_4_MACHINES && player.stages.has(STAGES.STAGE_4_MACHINES)) tier = 4;
  if (STAGES.STAGE_5_AUTOMATION && player.stages.has(STAGES.STAGE_5_AUTOMATION)) tier = 5;
  if (STAGES.STAGE_6_ENDGAME && player.stages.has(STAGES.STAGE_6_ENDGAME)) tier = 6;
  return tier;
}

function sfdGateOk(player, requiredTier) {
  return sfdGetStageTier(player) >= Number(requiredTier || 0);
}

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
  return String(blockId || '') === 'sfd_comets:machine_bio_podest';
}
const SFD_USE_LEGACY_PODEST = !Platform.isLoaded('sfd_comets');
// Force script fallback interactions even when mod is present, to keep Stage-0/1 usability stable.
const SFD_USE_SCRIPT_PODEST_FALLBACK = true;

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
  if ((SFD_USE_LEGACY_PODEST || SFD_USE_SCRIPT_PODEST_FALLBACK) && sfdIsBioPodest(blockId)) {
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
      if (itemId === 'sfd_comets:soil_earth_block' || itemId === 'minecraft:dirt') toStore = 'sfd_comets:soil_earth_block';
      else if (itemId === 'sfd_comets:bio_bark_block') toStore = 'sfd_comets:bio_bark_block';
      else if (itemId === 'sfd_comets:bio_wormy_bark_block') toStore = 'sfd_comets:bio_wormy_bark_block';
      else if (itemId === 'sfd_comets:bio_hollow_bark_block') toStore = 'sfd_comets:bio_hollow_bark_block';
      else if (itemId === 'sfd_comets:bio_treated_hollow_bark_block') toStore = 'sfd_comets:bio_treated_hollow_bark_block';
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
    if (itemId === 'sfd_comets:bio_worm') {
      if (!sfdGateOk(player, SFD.gateEarthWorm)) {
        player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateEarthWorm} freigeschaltet.`);
        event.cancel();
        return;
      }
      if (stored === 'sfd_comets:soil_earth_block') {
        if (Math.random() < SFD.wormToWormyEarthChance) {
          slots[key] = 'sfd_comets:soil_wormy_earth_block';
          level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 10, 0.2, 0.05, 0.2, 0.01);
        } else {
          if (SFD.failOutputEnabled && Math.random() < SFD.failOutputChance) {
            sfdPopAbove(level, block, Item.of('sfd_comets:soil_earth_clump', 1));
          }
          level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 6, 0.2, 0.05, 0.2, 0.01);
        }
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
      } else if (stored === 'sfd_comets:bio_bark_block') {
        if (Math.random() < SFD.wormToWormyBarkChance) {
          slots[key] = 'sfd_comets:bio_wormy_bark_block';
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
    if (itemId === 'sfd_comets:bio_wood_shavings') {
      if (!sfdGateOk(player, SFD.gateWormyEarthWood) && stored === 'sfd_comets:soil_wormy_earth_block') {
        player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateWormyEarthWood} freigeschaltet.`);
        event.cancel();
        return;
      }
      // Finalschritt Earth-Loop: verbraucht den Block, gibt aber immer Getrockneten Wurm.
      if (stored === 'sfd_comets:soil_wormy_earth_block') {
        const amount = Math.random() < 0.5 ? 1 : 2;
        sfdPopAbove(level, block, Item.of('sfd_comets:bio_dried_worm', amount));
        level.spawnParticles('minecraft:ash', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 10, 0.2, 0.05, 0.2, 0.01);
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
      } else if (stored === 'sfd_comets:bio_hollow_bark_block') {
        slots[key] = 'sfd_comets:bio_treated_hollow_bark_block';
        global.sfdBioPodestSlots = slots;
        sfdConsumeHandItem(player);
        level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
      } else {
        level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 4, 0.2, 0.05, 0.2, 0.01);
      }
      event.cancel();
      return;
    }

    // 4) Crude Mallet shortcut route on wormy earth.
    if (itemId === 'sfd_comets:tool_crude_mallet' && stored === 'sfd_comets:soil_wormy_earth_block') {
      if (!sfdGateOk(player, SFD.gateWormyEarthMallet)) {
        player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateWormyEarthMallet} freigeschaltet.`);
        event.cancel();
        return;
      }
      if (Math.random() < SFD.wormyEarthMalletWormChance) {
        sfdPopAbove(level, block, Item.of('sfd_comets:bio_worm', 1));
      } else if (SFD.failOutputEnabled && Math.random() < SFD.failOutputChance) {
        sfdPopAbove(level, block, Item.of('sfd_comets:soil_earth_clump', 1));
      }
      slots[key] = 'sfd_comets:soil_earth_block';
      global.sfdBioPodestSlots = slots;
      sfdDamageTool(player, 1);
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 6, 0.2, 0.05, 0.2, 0.01);
      event.cancel();
      return;
    }

    // 5) Organic Rod auf Slot-Ziel.
    if (itemId === 'sfd_comets:tool_organic_rod') {
      if (stored && stored.endsWith('_log') && SFD.strippedLogMap[stored]) {
        const stripped = SFD.strippedLogMap[stored];
        sfdPopAbove(level, block, Item.of(stripped, 1));
        sfdPopAbove(level, block, Item.of('sfd_comets:bio_tree_bark', 1));
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      if (stored === 'sfd_comets:bio_wormy_bark_block') {
        slots[key] = 'sfd_comets:bio_hollow_bark_block';
        if (Math.random() < 0.20) sfdPopAbove(level, block, Item.of('sfd_comets:bio_dried_worm', 1));
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      // Harvest Schritt im Podest fuer Bark-Chain.
      if (stored === 'sfd_comets:bio_hollow_bark_block') {
        if (Math.random() < 0.66) sfdPopAbove(level, block, Item.of('minecraft:oak_planks', 1));
        if (Math.random() < 0.70) sfdPopAbove(level, block, Item.of('sfd_comets:bio_tree_bark', 1));
        delete slots[key];
        global.sfdBioPodestSlots = slots;
        sfdDamageTool(player, 1);
        level.spawnParticles('minecraft:crit', true, block.x + 0.5, block.y + 0.2, block.z + 0.5, 8, 0.2, 0.05, 0.2, 0.01);
        event.cancel();
        return;
      }

      if (stored === 'sfd_comets:bio_treated_hollow_bark_block') {
        sfdPopAbove(level, block, Item.of('minecraft:oak_planks', 1));
        sfdPopAbove(level, block, Item.of('sfd_comets:bio_tree_bark', 1));
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
  if (itemId === 'sfd_comets:bio_worm' && blockId === 'sfd_comets:soil_earth_block') {
    if (!sfdGateOk(player, SFD.gateEarthWorm)) {
      player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateEarthWorm} freigeschaltet.`);
      event.cancel();
      return;
    }
    if (Math.random() < SFD.wormToWormyEarthChance) {
      block.set('sfd_comets:soil_wormy_earth_block');
      level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    } else {
      if (SFD.failOutputEnabled && Math.random() < SFD.failOutputChance) block.popItem('sfd_comets:soil_earth_clump');
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 6, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Worm bait on earth -> accelerated worm generation.
  if (itemId === 'sfd_comets:bio_worm_bait' && blockId === 'sfd_comets:soil_earth_block') {
    if (!sfdGateOk(player, SFD.gateEarthWormBait)) {
      player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateEarthWormBait} freigeschaltet.`);
      event.cancel();
      return;
    }
    if (Math.random() < SFD.wormBaitToWormChance) {
      block.popItem(Item.of('sfd_comets:bio_worm', 1));
      level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 1, block.z + 0.5, 8, 0.2, 0.2, 0.2, 0.01);
    } else {
      if (SFD.failOutputEnabled && Math.random() < SFD.failOutputChance) block.popItem('sfd_comets:soil_earth_clump');
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 6, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Wood shavings on wormy earth -> guaranteed dried worms.
  if (itemId === 'sfd_comets:bio_wood_shavings' && blockId === 'sfd_comets:soil_wormy_earth_block') {
    if (!sfdGateOk(player, SFD.gateWormyEarthWood)) {
      player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateWormyEarthWood} freigeschaltet.`);
      event.cancel();
      return;
    }
    const amount = Math.random() < 0.5 ? 1 : 2;
    block.popItem(Item.of('sfd_comets:bio_dried_worm', amount));
    level.spawnParticles('minecraft:ash', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    block.set('minecraft:air');
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Crude mallet on wormy earth -> chance for worm, keep earth-state loop.
  if (itemId === 'sfd_comets:tool_crude_mallet' && blockId === 'sfd_comets:soil_wormy_earth_block') {
    if (!sfdGateOk(player, SFD.gateWormyEarthMallet)) {
      player.tell(`[SF-DARK] Diese Aktion wird erst ab Stage-Tier ${SFD.gateWormyEarthMallet} freigeschaltet.`);
      event.cancel();
      return;
    }
    if (Math.random() < SFD.wormyEarthMalletWormChance) {
      block.popItem('sfd_comets:bio_worm');
    } else if (SFD.failOutputEnabled && Math.random() < SFD.failOutputChance) {
      block.popItem('sfd_comets:soil_earth_clump');
    }
    block.set('sfd_comets:soil_earth_block');
    sfdDamageTool(player, 1);
    event.cancel();
    return;
  }

  // Worm on bark block -> chance for wormy bark.
  if (itemId === 'sfd_comets:bio_worm' && blockId === 'sfd_comets:bio_bark_block') {
    if (Math.random() < SFD.wormToWormyBarkChance) {
      block.set('sfd_comets:bio_wormy_bark_block');
      level.spawnParticles('minecraft:happy_villager', true, block.x + 0.5, block.y + 1, block.z + 0.5, 10, 0.2, 0.2, 0.2, 0.01);
    } else {
      level.spawnParticles('minecraft:smoke', true, block.x + 0.5, block.y + 1, block.z + 0.5, 6, 0.2, 0.2, 0.2, 0.01);
    }
    sfdConsumeHandItem(player);
    event.cancel();
    return;
  }

  // Organic rod on logs -> strip + bark drop.
  if (itemId === 'sfd_comets:tool_organic_rod' && blockId.endsWith('_log')) {
    const stripped = SFD.strippedLogMap[blockId];
    if (stripped) {
      block.set(stripped);
      block.popItem('sfd_comets:bio_tree_bark');
      sfdDamageTool(player, 1);
      event.cancel();
      return;
    }
  }

  // Organic rod on wormy bark -> remove worm, improved plank chance state.
  if (itemId === 'sfd_comets:tool_organic_rod' && blockId === 'sfd_comets:bio_wormy_bark_block') {
    block.set('sfd_comets:bio_hollow_bark_block');
    if (Math.random() < 0.20) block.popItem('sfd_comets:bio_dried_worm');
    sfdDamageTool(player, 1);
    event.cancel();
    return;
  }

  // Wood shavings on hollow bark -> treated state (guaranteed plank).
  if (itemId === 'sfd_comets:bio_wood_shavings' && blockId === 'sfd_comets:bio_hollow_bark_block') {
    block.set('sfd_comets:bio_treated_hollow_bark_block');
    sfdConsumeHandItem(player);
    event.cancel();
  }
});

BlockEvents.broken(event => {
  const { block, level } = event;
  const blockId = String(block.id);
  if (!(SFD_USE_LEGACY_PODEST || SFD_USE_SCRIPT_PODEST_FALLBACK)) return;
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
    'sfd_comets:soil_earth_block': true,
    'sfd_comets:soil_wormy_earth_block': true,
    'sfd_comets:bio_bark_block': true,
    'sfd_comets:bio_wormy_bark_block': true,
    'sfd_comets:bio_hollow_bark_block': true,
    'sfd_comets:bio_treated_hollow_bark_block': true
  };
  if (!restricted[placedId]) return;

  const below = level.getBlock(block.x, block.y - 1, block.z);
  const belowId = String(below.id || '');
  const allowedBase = belowId === 'sfd_comets:soil_builder_block' || belowId === 'sfd_comets:machine_bio_podest';
  if (allowedBase) return;

  block.set('minecraft:air');
  block.popItem(Item.of(placedId, 1));
  player.tell('[SF-DARK] Dieser Block darf nur auf Bau-Erdblock oder Bio-Podest platziert werden.');
});

LootJS.modifiers(event => {
  // Earth block -> clumps + stable worm chance (independent of hand state).
  event
    .addBlockLootModifier('sfd_comets:soil_earth_block')
    .removeLoot('sfd_comets:soil_earth_block')
    .addLoot(Item.of('sfd_comets:soil_earth_clump', 2));

  event
    .addBlockLootModifier('sfd_comets:soil_earth_block')
    .removeLoot('sfd_comets:soil_earth_block')
    .randomChance(0.35)
    .addLoot('sfd_comets:bio_worm');

  // Wormy earth gives slightly better worm economy.
  event
    .addBlockLootModifier('sfd_comets:soil_wormy_earth_block')
    .removeLoot('sfd_comets:soil_wormy_earth_block')
    .addLoot(Item.of('sfd_comets:soil_earth_clump', 2));

  event
    .addBlockLootModifier('sfd_comets:soil_wormy_earth_block')
    .matchMainHand('#skyfactorydark:mallets')
    .randomChance(0.60)
    .addLoot('sfd_comets:bio_worm');

  // Bark progression blocks into first planks.
  event
    .addBlockLootModifier('sfd_comets:bio_bark_block')
    .removeLoot('sfd_comets:bio_bark_block')
    .addLoot('sfd_comets:bio_tree_bark');

  event
    .addBlockLootModifier('sfd_comets:bio_wormy_bark_block')
    .removeLoot('sfd_comets:bio_wormy_bark_block')
    .randomChance(0.33)
    .addLoot('minecraft:oak_planks');

  event
    .addBlockLootModifier('sfd_comets:bio_wormy_bark_block')
    .randomChance(0.60)
    .addLoot('sfd_comets:bio_tree_bark');

  event
    .addBlockLootModifier('sfd_comets:bio_hollow_bark_block')
    .removeLoot('sfd_comets:bio_hollow_bark_block')
    .randomChance(0.66)
    .addLoot('minecraft:oak_planks');

  event
    .addBlockLootModifier('sfd_comets:bio_hollow_bark_block')
    .randomChance(0.70)
    .addLoot('sfd_comets:bio_tree_bark');

  event
    .addBlockLootModifier('sfd_comets:bio_treated_hollow_bark_block')
    .removeLoot('sfd_comets:bio_treated_hollow_bark_block')
    .addLoot('minecraft:oak_planks')
    .addLoot('sfd_comets:bio_tree_bark');
});



