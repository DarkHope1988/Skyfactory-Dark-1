// System: world unlock bridge
// Phase-2 rule: world state stays in _core/01_world_state.js and policy stays in _core/02_unlock_policy.js.

ServerEvents.loaded(event => {
  const server = event.server;
  if (!server) return;

  if (global.SFDWorldState && global.SFDWorldState.isWeatherUnlocked) {
    global.sfdWeatherUnlocked = global.SFDWorldState.isWeatherUnlocked(server);
    return;
  }

  // Fallback for minimal environments without module load.
  const keyMap = global.SFD_WORLD_STATE_KEYS || {};
  const weatherKey = keyMap.WEATHER_UNLOCKED || 'sfd_weather_unlocked';
  const rootKey = global.SFD_STATE_ROOT_KEY || 'sfd';
  const pd = server.persistentData;
  const namespacedKey = `${rootKey}__${weatherKey}`;
  const rootValue = pd ? pd[namespacedKey] === true : false;
  const legacyValue = pd ? pd[weatherKey] === true : false;
  global.sfdWeatherUnlocked = rootValue || legacyValue;
});
