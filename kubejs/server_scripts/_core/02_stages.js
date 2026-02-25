// gamestage & progression hooks
// Central stage names + helper used by progression scripts.

global.SFD_STAGES = Object.freeze({
  STAGE_0_WELCOME: 'sfd_stage_0_welcome',
  STAGE_1_BEGINNING: 'sfd_stage_1_beginning',
  STAGE_2_STONE: 'sfd_stage_2_stone',
  STAGE_3_HEAT: 'sfd_stage_3_heat',
  STAGE_4_MACHINES: 'sfd_stage_4_machines',
  STAGE_5_AUTOMATION: 'sfd_stage_5_automation',
  STAGE_6_ENDGAME: 'sfd_stage_6_endgame'
});

global.SFD_STAGE_LABELS = Object.freeze({
  sfd_stage_0_welcome: 'Stage 0 - Willkommen',
  sfd_stage_1_beginning: 'Stage 1 - The Beginning',
  sfd_stage_2_stone: 'Stage 2 - Stone',
  sfd_stage_3_heat: 'Stage 3 - Heat',
  sfd_stage_4_machines: 'Stage 4 - Machines',
  sfd_stage_5_automation: 'Stage 5 - Automation',
  sfd_stage_6_endgame: 'Stage 6 - Endgame'
});

global.SFD_STAGE_PARENT = Object.freeze({
  sfd_stage_1_beginning: 'sfd_stage_0_welcome',
  sfd_stage_2_stone: 'sfd_stage_1_beginning',
  sfd_stage_3_heat: 'sfd_stage_2_stone',
  sfd_stage_4_machines: 'sfd_stage_3_heat',
  sfd_stage_5_automation: 'sfd_stage_4_machines',
  sfd_stage_6_endgame: 'sfd_stage_5_automation'
});

global.SFD_STAGE_ADVANCEMENTS = Object.freeze({
  sfd_stage_0_welcome: 'skyfactorydark:stages/stage_00_willkommen',
  sfd_stage_1_beginning: 'skyfactorydark:stages/stage_01_the_beginning',
  sfd_stage_2_stone: 'skyfactorydark:stages/stage_02_stone',
  sfd_stage_3_heat: 'skyfactorydark:stages/stage_03_heat',
  sfd_stage_4_machines: 'skyfactorydark:stages/stage_04_machines',
  sfd_stage_5_automation: 'skyfactorydark:stages/stage_05_automation',
  sfd_stage_6_endgame: 'skyfactorydark:stages/stage_06_endgame'
});

// Single source of truth for milestone-based stage unlocks.
// Later stages are intentionally left empty until their systems are finalized.
global.SFD_STAGE_CRAFT_MILESTONES = Object.freeze({
  sfd_stage_1_beginning: ['minecraft:crafting_table'],
  sfd_stage_2_stone: ['minecraft:stone'],
  sfd_stage_3_heat: ['minecraft:blast_furnace'],
  sfd_stage_4_machines: [],
  sfd_stage_5_automation: [],
  sfd_stage_6_endgame: []
});

global.sfdSyncStageDisplays = player => {
  if (!player || !player.stages) return;
  const map = global.SFD_STAGE_ADVANCEMENTS || {};

  Object.keys(map).forEach(stage => {
    const advancement = map[stage];
    if (!advancement) return;

    if (player.stages.has(stage)) {
      player.runCommandSilent(`advancement grant @s only ${advancement}`);
    } else {
      player.runCommandSilent(`advancement revoke @s only ${advancement}`);
    }
  });
};

global.sfdGrantStage = (player, stage) => {
  if (!player || !player.stages || !stage) return false;
  const parentMap = global.SFD_STAGE_PARENT || {};
  const parent = parentMap[stage];
  if (parent && !player.stages.has(parent)) {
    global.sfdGrantStage(player, parent);
  }
  if (player.stages.has(stage)) return false;
  player.stages.add(stage);
  global.sfdSyncStageDisplays(player);
  const labelMap = global.SFD_STAGE_LABELS || {};
  const label = labelMap[stage] || stage;
  player.tell(`[SF-DARK] Stage unlocked: ${label}`);
  return true;
};

global.sfdUnlockStagesForCraft = (player, craftedId) => {
  if (!player || !craftedId) return false;
  const milestones = global.SFD_STAGE_CRAFT_MILESTONES || {};
  let changed = false;

  Object.keys(milestones).forEach(stage => {
    const ids = milestones[stage] || [];
    if (ids.includes(craftedId)) {
      changed = global.sfdGrantStage(player, stage) || changed;
    }
  });

  return changed;
};

