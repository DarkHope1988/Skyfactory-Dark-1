// System: starting island spawn anchor
// Goal:
// - Keep first spawn deterministic at X/Z 0 when a safe block exists there.
// - If no safe spawn is found at 0, do nothing (no risky forced teleport).

const SFD_SPAWN_X = 0;
const SFD_SPAWN_Z = 0;
const SFD_SPAWN_Y_SCAN = [72, 71, 70, 69, 68, 67, 66, 65, 64];

function sfdFindSafeSpawnY(level) {
  for (const y of SFD_SPAWN_Y_SCAN) {
    const below = level.getBlock(SFD_SPAWN_X, y - 1, SFD_SPAWN_Z);
    const feet = level.getBlock(SFD_SPAWN_X, y, SFD_SPAWN_Z);
    const head = level.getBlock(SFD_SPAWN_X, y + 1, SFD_SPAWN_Z);

    if (!below.isAir() && feet.isAir() && head.isAir()) {
      return y;
    }
  }

  return null;
}

ServerEvents.loaded(event => {
  const server = event.server;
  const level = server.overworld();
  if (!level) return;

  const safeY = sfdFindSafeSpawnY(level);
  if (safeY === null) {
    global.sfdSpawnY = null;
    console.info('[SF-DARK] Safe spawn at (0,*,0) not found. Keeping current world spawn.');
    return;
  }

  global.sfdSpawnY = safeY;
  server.runCommandSilent(`setworldspawn ${SFD_SPAWN_X} ${safeY} ${SFD_SPAWN_Z}`);
  server.runCommandSilent('gamerule spawnRadius 0');
  console.info(`[SF-DARK] World spawn pinned to (${SFD_SPAWN_X}, ${safeY}, ${SFD_SPAWN_Z}).`);
});

PlayerEvents.loggedIn(event => {
  const player = event.player;
  const data = player.persistentData;
  const safeY = global.sfdSpawnY;

  if (safeY === null || safeY === undefined) return;
  if (data.getBoolean('sfdSpawnPinned')) return;
  data.putBoolean('sfdSpawnPinned', true);

  player.runCommandSilent(`spawnpoint @s ${SFD_SPAWN_X} ${safeY} ${SFD_SPAWN_Z}`);

  const dx = player.x - (SFD_SPAWN_X + 0.5);
  const dz = player.z - (SFD_SPAWN_Z + 0.5);
  const distSq = dx * dx + dz * dz;

  // Only correct large offsets from spawn search/randomization.
  if (distSq > 256) {
    player.runCommandSilent(`tp @s ${SFD_SPAWN_X + 0.5} ${safeY} ${SFD_SPAWN_Z + 0.5}`);
  }
});
