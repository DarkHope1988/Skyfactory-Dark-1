// System: stage gates & unlock flow
// Lightweight progression hooks that keep working even if GameStages is absent.

const STAGES = (global.SFDStageManager && global.SFDStageManager.getStages())
  || global.SFD_STAGES
  || {
  STAGE_0_WELCOME: 'sfd_stage_0_welcome',
  STAGE_1_BEGINNING: 'sfd_stage_1_beginning',
  STAGE_2_STONE: 'sfd_stage_2_stone',
  STAGE_3_HEAT: 'sfd_stage_3_heat',
  STAGE_4_MACHINES: 'sfd_stage_4_machines',
  STAGE_5_AUTOMATION: 'sfd_stage_5_automation',
  STAGE_6_ENDGAME: 'sfd_stage_6_endgame'
};

const grant = (global.SFDStageManager && global.SFDStageManager.grant) || global.sfdGrantStage || ((player, stage) => {
  if (!player || !player.stages || !stage) return false;
  if (player.stages.has(stage)) return false;
  player.stages.add(stage);
  return true;
});

function updateStageLootTier(player) {
  if (!player || !player.server || !player.stages) return;
  let tier = 0;
  if (player.stages.has(STAGES.STAGE_1_BEGINNING)) tier = 1;
  if (player.stages.has(STAGES.STAGE_2_STONE)) tier = 2;
  if (player.stages.has(STAGES.STAGE_3_HEAT)) tier = 3;
  if (player.stages.has(STAGES.STAGE_4_MACHINES)) tier = 4;
  if (player.stages.has(STAGES.STAGE_5_AUTOMATION)) tier = 5;
  if (player.stages.has(STAGES.STAGE_6_ENDGAME)) tier = 6;

  try {
    let Bridge = null;
    try {
      Bridge = Java.loadClass('de.darkhope.sfd.core.api.SfdWorldStateBridge');
    } catch (e1) {
      Bridge = Java.loadClass('de.darkhope.sfd.biobackpack.api.SfdWorldStateBridge');
    }
    Bridge.setStageLootTier(player.server, tier);
  } catch (e) {
    // Keep progression robust even if mod bridge isn't available.
  }
}

function getHighestActiveStage(player) {
  if (!player || !player.stages) return null;
  const ordered = [
    STAGES.STAGE_6_ENDGAME,
    STAGES.STAGE_5_AUTOMATION,
    STAGES.STAGE_4_MACHINES,
    STAGES.STAGE_3_HEAT,
    STAGES.STAGE_2_STONE,
    STAGES.STAGE_1_BEGINNING,
    STAGES.STAGE_0_WELCOME
  ];
  for (const stage of ordered) {
    if (stage && player.stages.has(stage)) return stage;
  }
  return null;
}

function updatePlanetizationState(player) {
  if (!player || !player.server || !player.stages) return;
  if (!global.SFDWorldState || !global.SFDPlanetizationProfile) return;

  const highest = getHighestActiveStage(player);
  const profile = global.SFDPlanetizationProfile.stageUnlocks || {};
  const data = highest ? profile[highest] : null;
  const statusEnum = global.SFD_PLANET_STATUS || {};

  if (!data) {
    if (global.SFDWorldState.setPlanetStatus) {
      global.SFDWorldState.setPlanetStatus(player.server, statusEnum.STERILE || 'sterile');
    }
    return;
  }

  if (global.SFDWorldState.setCometUnlocked && data.cometEnabled !== undefined) {
    global.SFDWorldState.setCometUnlocked(player.server, data.cometEnabled === true);
  }
  if (global.SFDWorldState.setWaterCycleUnlocked && data.waterCycleUnlocked !== undefined) {
    global.SFDWorldState.setWaterCycleUnlocked(player.server, data.waterCycleUnlocked === true);
  }
  if (global.SFDWorldState.setAtmosphereUnlocked && data.atmosphereUnlocked !== undefined) {
    global.SFDWorldState.setAtmosphereUnlocked(player.server, data.atmosphereUnlocked === true);
  }
  if (global.SFDWorldState.setPlanetaryStabilized && data.planetaryStabilized !== undefined) {
    global.SFDWorldState.setPlanetaryStabilized(player.server, data.planetaryStabilized === true);
  }
  if (global.SFDWorldState.setPlanetStatus) {
    global.SFDWorldState.setPlanetStatus(
      player.server,
      data.planetStatus || statusEnum.STERILE || 'sterile'
    );
  }
}

PlayerEvents.loggedIn(event => {
  const player = event.player;
  grant(player, STAGES.STAGE_0_WELCOME);
  if (global.sfdSyncStageDisplays) global.sfdSyncStageDisplays(player);
  if (global.sfdApplyStageMobUnlocks) global.sfdApplyStageMobUnlocks(player);
  if (global.sfdApplyWorldUnlockPolicy) global.sfdApplyWorldUnlockPolicy(player);
  updateStageLootTier(player);
  updatePlanetizationState(player);

  if (!player.stages) return;
  const active = [];
  Object.keys(STAGES).forEach(key => {
    const stage = STAGES[key];
    if (player.stages.has(stage)) active.push(stage);
  });
  player.tell(`[SF-DARK] Active stages: ${active.join(', ')}`);
});

ItemEvents.crafted(event => {
  const player = event.player;
  const craftedId = String(event.item.id);
  let stageChanged = false;

  if (global.SFDStageManager && global.SFDStageManager.unlockForCraft) {
    stageChanged = global.SFDStageManager.unlockForCraft(player, craftedId) || stageChanged;
  } else if (global.sfdUnlockStagesForCraft) {
    stageChanged = global.sfdUnlockStagesForCraft(player, craftedId) || stageChanged;
  } else {
    // Fallback for minimal environments.
    if (craftedId === 'minecraft:crafting_table') {
      stageChanged = grant(player, STAGES.STAGE_1_BEGINNING) || stageChanged;
    }
    if (craftedId === 'minecraft:stone') {
      stageChanged = grant(player, STAGES.STAGE_2_STONE) || stageChanged;
    }
    if (craftedId === 'minecraft:blast_furnace') {
      stageChanged = grant(player, STAGES.STAGE_3_HEAT) || stageChanged;
    }
  }

  if (stageChanged && global.sfdApplyStageMobUnlocks) {
    global.sfdApplyStageMobUnlocks(player);
  }
  if (stageChanged && global.sfdApplyWorldUnlockPolicy) {
    global.sfdApplyWorldUnlockPolicy(player);
  }
  if (stageChanged) {
    updateStageLootTier(player);
    updatePlanetizationState(player);
  }
});

// Smelting output enters inventory, so Stone-stage progression is checked here too.
PlayerEvents.inventoryChanged(event => {
  const player = event.player;
  if (!player || !player.stages) return;

  const changedId = String(event.item.id);
  if (changedId !== 'minecraft:stone') return;

  const stageChanged = grant(player, STAGES.STAGE_2_STONE);
  if (!stageChanged) return;

  if (global.sfdSyncStageDisplays) global.sfdSyncStageDisplays(player);
  if (global.sfdApplyStageMobUnlocks) global.sfdApplyStageMobUnlocks(player);
  if (global.sfdApplyWorldUnlockPolicy) global.sfdApplyWorldUnlockPolicy(player);
  updateStageLootTier(player);
  updatePlanetizationState(player);
});
