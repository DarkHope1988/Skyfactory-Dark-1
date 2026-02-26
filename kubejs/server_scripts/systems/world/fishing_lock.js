// Lock fishing progression until Stage 3 to avoid early loot skips.

(function () {
  const STAGES = (global.SFDStageManager && global.SFDStageManager.getStages && global.SFDStageManager.getStages())
    || global.SFD_STAGES
    || { STAGE_3_HEAT: 'sfd_stage_3_heat' };

  function canUseFishing(player) {
    return !!(player && player.stages && player.stages.has(STAGES.STAGE_3_HEAT));
  }

  function enforceFishingRodLock(player) {
    if (!player || canUseFishing(player)) return;
    const removed = player.runCommandSilent('clear @s minecraft:fishing_rod');
    if (removed > 0) {
      player.tell('[SF-DARK] Angeln wird erst ab Stage 3 freigeschaltet.');
    }
  }

  PlayerEvents.loggedIn(event => {
    enforceFishingRodLock(event.player);
  });

  PlayerEvents.inventoryChanged(event => {
    if (String(event.item.id) !== 'minecraft:fishing_rod') return;
    enforceFishingRodLock(event.player);
  });
})();

