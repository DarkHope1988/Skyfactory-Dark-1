// Unlock Policy Module
// Applies stage-based world unlock policy in one place.

(function () {
  if (global.SFDUnlockPolicy) return;

  const defaultPolicy = Object.freeze({
    WEATHER_STAGE: 'sfd_stage_3_heat',
    COMET_STAGE: 'sfd_stage_2_stone'
  });

  function getPolicy() {
    return global.SFD_WORLD_UNLOCK_POLICY || defaultPolicy;
  }

  function applyForPlayer(player) {
    if (!player || !player.server || !player.stages) return;

    const policy = getPolicy();
    const worldState = global.SFDWorldState;
    if (!worldState) return;

    if (policy.WEATHER_STAGE && player.stages.has(policy.WEATHER_STAGE)) {
      worldState.setWeatherUnlocked(player.server, true);
    }

    if (policy.COMET_STAGE && player.stages.has(policy.COMET_STAGE)) {
      worldState.setCometUnlocked(player.server, true);
    }
  }

  global.SFDUnlockPolicy = {
    getPolicy: getPolicy,
    applyForPlayer: applyForPlayer
  };

  // Bridge to existing call sites.
  if (!global.sfdApplyWorldUnlockPolicy) {
    global.sfdApplyWorldUnlockPolicy = applyForPlayer;
  }
})();
