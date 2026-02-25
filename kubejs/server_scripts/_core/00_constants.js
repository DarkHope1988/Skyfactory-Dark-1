// constants shared across server scripts

global.SFD_STATE_ROOT_KEY = 'sfd';
global.SFD_STATE_SCHEMA_VERSION = 1;

global.SFD_WORLD_STATE_KEYS = Object.freeze({
  WEATHER_UNLOCKED: 'sfd_weather_unlocked',
  COMET_UNLOCKED: 'sfd_comet_unlocked',
  STAGE_LOOT_TIER: 'sfd_stage_loot_tier',
  WORLD_STABILITY: 'sfd_world_stability',
  WATER_CYCLE_UNLOCKED: 'sfd_water_cycle_unlocked',
  ATMOSPHERE_UNLOCKED: 'sfd_atmosphere_unlocked',
  PLANETARY_STABILIZED: 'sfd_planetary_stabilized',
  PLANET_STATUS: 'sfd_planet_status'
});

// Server-wide unlock milestones.
global.SFD_WORLD_UNLOCK_POLICY = Object.freeze({
  WEATHER_STAGE: 'sfd_stage_3_heat',
  COMET_STAGE: 'sfd_stage_2_stone'
});

global.SFD_STAGE_TARGET_MINUTES = Object.freeze({
  sfd_stage_0_welcome: 20,
  sfd_stage_1_beginning: 30,
  sfd_stage_2_stone: 45,
  sfd_stage_3_heat: 60,
  sfd_stage_4_machines: 90,
  sfd_stage_5_automation: 120,
  sfd_stage_6_endgame: 180
});

// High-level planet transformation states for HUD/quests.
global.SFD_PLANET_STATUS = Object.freeze({
  STERILE: 'sterile',
  SEEDED: 'seeded',
  HYDRATED: 'hydrated',
  BREATHABLE: 'breathable',
  STABLE: 'stable'
});
