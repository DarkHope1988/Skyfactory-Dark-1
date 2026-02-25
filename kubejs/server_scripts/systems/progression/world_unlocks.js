// System: world unlock state for weather/comet progression
// Centralized API to keep progression state consistent across scripts.

function sfdEnsureWorldStateApi() {
  if (global.sfdGetWorldFlag && global.sfdSetWorldFlag) return;

  const keys = global.SFD_WORLD_STATE_KEYS || {
    WEATHER_UNLOCKED: 'sfd_weather_unlocked',
    COMET_UNLOCKED: 'sfd_comet_unlocked'
  };

  global.sfdGetWorldFlag = (server, key) => {
    if (!server || !server.persistentData || !key) return false;
    return server.persistentData[key] === true;
  };

  global.sfdSetWorldFlag = (server, key, value) => {
    if (!server || !server.persistentData || !key) return;
    server.persistentData[key] = value === true;
  };

  global.sfdIsWeatherUnlocked = server => global.sfdGetWorldFlag(server, keys.WEATHER_UNLOCKED);
  global.sfdIsCometUnlocked = server => global.sfdGetWorldFlag(server, keys.COMET_UNLOCKED);

  global.sfdSetWeatherUnlocked = (server, unlocked) => {
    global.sfdSetWorldFlag(server, keys.WEATHER_UNLOCKED, unlocked === true);
    // Backward compatibility for older scripts.
    global.sfdWeatherUnlocked = unlocked === true;
  };

  global.sfdSetCometUnlocked = (server, unlocked) => {
    global.sfdSetWorldFlag(server, keys.COMET_UNLOCKED, unlocked === true);
  };

  global.sfdApplyWorldUnlockPolicy = player => {
    if (!player || !player.server || !player.stages) return;
    const policy = global.SFD_WORLD_UNLOCK_POLICY || {};
    const weatherStage = policy.WEATHER_STAGE;
    const cometStage = policy.COMET_STAGE;

    if (weatherStage && player.stages.has(weatherStage)) {
      global.sfdSetWeatherUnlocked(player.server, true);
    }
    if (cometStage && player.stages.has(cometStage)) {
      global.sfdSetCometUnlocked(player.server, true);
    }
  };
}

ServerEvents.loaded(event => {
  sfdEnsureWorldStateApi();
  // Sync legacy global for old checks.
  global.sfdWeatherUnlocked = global.sfdIsWeatherUnlocked(event.server);
});

