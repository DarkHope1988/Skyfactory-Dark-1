// System: world rules (dimensions, gamerules)
// Sterile start:
// - no natural hostile/NPC spawns
// - weather locked to clear
// NOTE: Weather/comet progression is handled by systems/progression/world_unlocks.js.

function sfdApplyBaseWorldRules(server) {
  server.runCommandSilent('gamerule doMobSpawning false');
  server.runCommandSilent('gamerule doTraderSpawning false');
  server.runCommandSilent('gamerule doPatrolSpawning false');
  server.runCommandSilent('gamerule doInsomnia false');
  server.runCommandSilent('gamerule doWeatherCycle false');
}

function sfdEnsureMobControl() {
  if (global.sfdMobControlInitialized === true) return;
  global.sfdMobControlInitialized = true;

  // Default: hostile mobs remain fully disabled.
  global.sfdAllowHostileMobs = false;
  global.sfdAllowedHostileMobs = new Set();

  // Helper API for later progression hooks.
  global.sfdUnlockMob = id => {
    if (!id) return;
    global.sfdAllowedHostileMobs.add(String(id));
  };

  global.sfdLockMob = id => {
    if (!id) return;
    global.sfdAllowedHostileMobs.delete(String(id));
  };

  global.sfdResetMobUnlocks = () => {
    global.sfdAllowedHostileMobs.clear();
    global.sfdAllowHostileMobs = false;
  };
}

function sfdIsWeatherUnlocked(server) {
  if (global.sfdIsWeatherUnlocked) return global.sfdIsWeatherUnlocked(server);
  return global.sfdWeatherUnlocked === true;
}

function sfdIsCometUnlocked(server) {
  if (global.sfdIsCometUnlocked) return global.sfdIsCometUnlocked(server);
  return false;
}

ServerEvents.loaded(event => {
  const server = event.server;
  sfdEnsureMobControl();

  sfdApplyBaseWorldRules(server);
  if (!sfdIsWeatherUnlocked(server)) {
    server.runCommandSilent('weather clear 1000000');
  }

  // Remove phantoms until comet progression is unlocked.
  if (!sfdIsCometUnlocked(server)) {
    server.runCommandSilent('kill @e[type=minecraft:phantom]');
  }
});

ServerEvents.tick(event => {
  const server = event.server;
  if (!server || server.tickCount % 200 !== 0) return;
  sfdEnsureMobControl();

  sfdApplyBaseWorldRules(server);

  if (!sfdIsWeatherUnlocked(server)) {
    server.runCommandSilent('weather clear 1000000');
  }

  // Keep phantom cleanup active until comet progression is unlocked.
  if (!sfdIsCometUnlocked(server)) {
    server.runCommandSilent('kill @e[type=minecraft:phantom]');
  }
});

EntityEvents.spawned(event => {
  sfdEnsureMobControl();

  const entity = event.entity;
  if (!entity) return;

  const typeId = String(entity.type);
  const category = String(entity.type.category || '');

  const server = entity.level && entity.level.server ? entity.level.server : null;

  // Allow phantoms only after comet progression unlock.
  if (typeId === 'minecraft:phantom') {
    if (!sfdIsCometUnlocked(server)) {
      event.cancel();
      return;
    }
  }

  // Block hostile spawns in sterile early game.
  if (category.toLowerCase() === 'monster') {
    const allowHostiles = global.sfdAllowHostileMobs === true;
    const allowList = global.sfdAllowedHostileMobs;
    if (allowHostiles && allowList && allowList.has(typeId)) return;
    event.cancel();
    return;
  }

  // Keep NPC vendors disabled for now.
  if (typeId === 'minecraft:wandering_trader' || typeId === 'minecraft:trader_llama') {
    event.cancel();
  }
});
