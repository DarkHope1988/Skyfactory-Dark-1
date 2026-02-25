// System: stage gates & unlock flow
// Lightweight progression hooks that keep working even if GameStages is absent.

const STAGES = global.SFD_STAGES || {
  STAGE_0_WELCOME: 'sfd_stage_0_welcome',
  STAGE_1_BEGINNING: 'sfd_stage_1_beginning',
  STAGE_2_STONE: 'sfd_stage_2_stone',
  STAGE_3_HEAT: 'sfd_stage_3_heat',
  STAGE_4_MACHINES: 'sfd_stage_4_machines',
  STAGE_5_AUTOMATION: 'sfd_stage_5_automation',
  STAGE_6_ENDGAME: 'sfd_stage_6_endgame'
};

const grant = global.sfdGrantStage || ((player, stage) => {
  if (!player || !player.stages || !stage) return false;
  if (player.stages.has(stage)) return false;
  player.stages.add(stage);
  return true;
});

PlayerEvents.loggedIn(event => {
  const player = event.player;
  grant(player, STAGES.STAGE_0_WELCOME);
  if (global.sfdSyncStageDisplays) global.sfdSyncStageDisplays(player);
  if (global.sfdApplyStageMobUnlocks) global.sfdApplyStageMobUnlocks(player);
  if (global.sfdApplyWorldUnlockPolicy) global.sfdApplyWorldUnlockPolicy(player);

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

  if (global.sfdUnlockStagesForCraft) {
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
});
