// constants shared across server scripts

global.SFD_WORLD_STATE_KEYS = Object.freeze({
  WEATHER_UNLOCKED: 'sfd_weather_unlocked',
  COMET_UNLOCKED: 'sfd_comet_unlocked'
});

// Server-wide unlock milestones.
global.SFD_WORLD_UNLOCK_POLICY = Object.freeze({
  WEATHER_STAGE: 'sfd_stage_3_heat',
  COMET_STAGE: 'sfd_stage_5_automation'
});
