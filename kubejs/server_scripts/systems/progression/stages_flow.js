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

  if (
    craftedId === 'kubejs:crude_mallet' ||
    craftedId === 'exdeorum:crook' ||
    craftedId === 'exdeorum:bone_crook'
  ) {
    grant(player, STAGES.STAGE_1_BEGINNING);
  }

  if (craftedId === 'minecraft:cobblestone' || craftedId === 'minecraft:stone') {
    grant(player, STAGES.STAGE_2_STONE);
  }

  if (craftedId === 'minecraft:furnace' || craftedId === 'minecraft:blast_furnace') {
    grant(player, STAGES.STAGE_3_HEAT);
  }
});
