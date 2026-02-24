// System: hostile mob unlock mapping
// Default state: no hostile mobs unlocked.
//
// Usage later:
// 1) Set `global.sfdMobUnlocksByStage[stage] = ['minecraft:zombie', ...]`
// 2) Keep stage flow unchanged; unlocks are applied automatically.

const SFD_STAGES = global.SFD_STAGES || {
  STAGE_0_WELCOME: 'sfd_stage_0_welcome',
  STAGE_1_BEGINNING: 'sfd_stage_1_beginning',
  STAGE_2_STONE: 'sfd_stage_2_stone',
  STAGE_3_HEAT: 'sfd_stage_3_heat',
  STAGE_4_MACHINES: 'sfd_stage_4_machines',
  STAGE_5_AUTOMATION: 'sfd_stage_5_automation',
  STAGE_6_ENDGAME: 'sfd_stage_6_endgame'
};

if (!global.sfdMobUnlocksByStage) {
  global.sfdMobUnlocksByStage = {
    [SFD_STAGES.STAGE_0_WELCOME]: [],
    [SFD_STAGES.STAGE_1_BEGINNING]: [],
    [SFD_STAGES.STAGE_2_STONE]: [],
    [SFD_STAGES.STAGE_3_HEAT]: [],
    [SFD_STAGES.STAGE_4_MACHINES]: [],
    [SFD_STAGES.STAGE_5_AUTOMATION]: [],
    [SFD_STAGES.STAGE_6_ENDGAME]: []
  };
}

function sfdEnsureMobControlApi() {
  if (!global.sfdAllowedHostileMobs) global.sfdAllowedHostileMobs = new Set();
  if (global.sfdAllowHostileMobs === undefined) global.sfdAllowHostileMobs = false;
}

global.sfdApplyStageMobUnlocks = player => {
  sfdEnsureMobControlApi();
  global.sfdAllowedHostileMobs.clear();
  global.sfdAllowHostileMobs = false;

  if (!player || !player.stages) return;
  const map = global.sfdMobUnlocksByStage || {};
  let unlockedAny = false;

  Object.keys(map).forEach(stage => {
    if (!player.stages.has(stage)) return;
    const ids = map[stage] || [];
    ids.forEach(id => {
      global.sfdAllowedHostileMobs.add(String(id));
      unlockedAny = true;
    });
  });

  global.sfdAllowHostileMobs = unlockedAny;
};

