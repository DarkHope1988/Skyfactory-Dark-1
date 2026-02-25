// Stage Core Module
// Provides a single manager facade for stage registry, triggers and grants.

(function () {
  if (global.SFDStageManager) return;

  const fallbackStages = Object.freeze({
    STAGE_0_WELCOME: 'sfd_stage_0_welcome',
    STAGE_1_BEGINNING: 'sfd_stage_1_beginning',
    STAGE_2_STONE: 'sfd_stage_2_stone',
    STAGE_3_HEAT: 'sfd_stage_3_heat',
    STAGE_4_MACHINES: 'sfd_stage_4_machines',
    STAGE_5_AUTOMATION: 'sfd_stage_5_automation',
    STAGE_6_ENDGAME: 'sfd_stage_6_endgame'
  });

  function getStages() {
    // SSOT is global.SFD_STAGES (defined in _core stage definitions).
    return global.SFD_STAGES || fallbackStages;
  }

  function getMilestones() {
    return global.SFD_STAGE_CRAFT_MILESTONES || {};
  }

  function unlockForCraft(player, craftedId) {
    if (global.sfdUnlockStagesForCraft) return global.sfdUnlockStagesForCraft(player, craftedId);
    return false;
  }

  function grant(player, stage) {
    if (global.sfdGrantStage) return global.sfdGrantStage(player, stage);
    if (!player || !player.stages || !stage) return false;
    if (player.stages.has(stage)) return false;
    player.stages.add(stage);
    return true;
  }

  function syncDisplays(player) {
    if (global.sfdSyncStageDisplays) global.sfdSyncStageDisplays(player);
  }

  global.SFDStageManager = {
    getStages: getStages,
    getMilestones: getMilestones,
    unlockForCraft: unlockForCraft,
    grant: grant,
    syncDisplays: syncDisplays
  };
})();
