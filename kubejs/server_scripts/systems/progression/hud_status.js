// HUD status line: world stability + stage timer ETA.

(function () {
  const STAGES = (global.SFDStageManager && global.SFDStageManager.getStages && global.SFDStageManager.getStages())
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

  const ORDERED_STAGE_IDS = [
    STAGES.STAGE_0_WELCOME,
    STAGES.STAGE_1_BEGINNING,
    STAGES.STAGE_2_STONE,
    STAGES.STAGE_3_HEAT,
    STAGES.STAGE_4_MACHINES,
    STAGES.STAGE_5_AUTOMATION,
    STAGES.STAGE_6_ENDGAME
  ];

  const TARGET_MINUTES = global.SFD_STAGE_TARGET_MINUTES || {};
  const HUD_STAGE_KEY = 'sfd_hud_stage_id';
  const HUD_STAGE_START_MS = 'sfd_hud_stage_start_ms';

  function getCurrentStageId(player) {
    if (!player || !player.stages) return ORDERED_STAGE_IDS[0];
    let current = ORDERED_STAGE_IDS[0];
    ORDERED_STAGE_IDS.forEach(id => {
      if (id && player.stages.has(id)) current = id;
    });
    return current;
  }

  function syncStageTimerAnchor(player) {
    if (!player || !player.persistentData) return;
    const current = getCurrentStageId(player);
    if (player.persistentData[HUD_STAGE_KEY] !== current) {
      player.persistentData[HUD_STAGE_KEY] = current;
      player.persistentData[HUD_STAGE_START_MS] = Date.now();
    }
  }

  function getWorldStability(server) {
    try {
      let Bridge = null;
      try {
        Bridge = Java.loadClass('de.darkhope.sfd.core.api.SfdWorldStateBridge');
      } catch (e1) {
        Bridge = Java.loadClass('de.darkhope.sfd.biobackpack.api.SfdWorldStateBridge');
      }
      return Math.max(0, Math.min(100, Number(Bridge.getWorldStability(server)) || 100));
    } catch (e) {
      if (!server || !server.persistentData) return 100;
      const value = Number(server.persistentData.sfd_world_stability);
      return Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 100;
    }
  }

  function formatHudText(player) {
    const stageId = player.persistentData[HUD_STAGE_KEY] || getCurrentStageId(player);
    const startedAt = Number(player.persistentData[HUD_STAGE_START_MS]) || Date.now();
    const now = Date.now();
    const elapsedMinutes = Math.floor((now - startedAt) / 60000);
    const targetMinutes = Number(TARGET_MINUTES[stageId] || 0);
    const remainingMinutes = Math.max(0, targetMinutes - elapsedMinutes);
    const stability = getWorldStability(player.server);
    let planetStatus = 'sterile';
    if (global.SFDWorldState && global.SFDWorldState.getPlanetStatus) {
      planetStatus = String(global.SFDWorldState.getPlanetStatus(player.server) || 'sterile');
    }
    const statusLabel = planetStatus.charAt(0).toUpperCase() + planetStatus.slice(1);

    if (targetMinutes > 0) {
      return `[SF-DARK] Stabilitaet ${stability}% | Planet ${statusLabel} | ETA ~${remainingMinutes}m`;
    }
    return `[SF-DARK] Stabilitaet ${stability}% | Planet ${statusLabel}`;
  }

  PlayerEvents.loggedIn(event => {
    syncStageTimerAnchor(event.player);
  });

  ServerEvents.tick(event => {
    if (event.server.tickCount % 20 !== 0) return;
    event.server.players.forEach(player => {
      syncStageTimerAnchor(player);
      const text = formatHudText(player).replace(/"/g, '\\"');
      player.runCommandSilent(`title @s actionbar {"text":"${text}","color":"aqua"}`);
    });
  });
})();
