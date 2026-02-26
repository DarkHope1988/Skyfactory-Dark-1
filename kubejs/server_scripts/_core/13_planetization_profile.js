// Planetization profile (SSOT bridge)
// Data-only profile for staged world transformation from sterile sky world
// to water/air/stable planet conditions.

(function () {
  if (global.SFDPlanetizationProfile) return;

  const stages = global.SFD_STAGES || {};
  const stage2 = stages.STAGE_2_STONE || 'sfd_stage_2_stone';
  const stage3 = stages.STAGE_3_HEAT || 'sfd_stage_3_heat';
  const stage4 = stages.STAGE_4_MACHINES || 'sfd_stage_4_machines';
  const stage5 = stages.STAGE_5_AUTOMATION || 'sfd_stage_5_automation';
  const stage6 = stages.STAGE_6_ENDGAME || 'sfd_stage_6_endgame';
  const stageUnlocks = {};

  stageUnlocks[stage2] = Object.freeze({
    cometEnabled: true,
    waterCycleUnlocked: false,
    atmosphereUnlocked: false,
    planetaryStabilized: false,
    planetStatus: (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.SEEDED) || 'seeded'
  });
  stageUnlocks[stage3] = Object.freeze({
    cometEnabled: true,
    weatherEligible: true,
    waterCycleUnlocked: false,
    atmosphereUnlocked: false,
    planetaryStabilized: false,
    planetStatus: (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.SEEDED) || 'seeded'
  });
  stageUnlocks[stage4] = Object.freeze({
    cometEnabled: true,
    waterCycleUnlocked: true,
    atmosphereUnlocked: false,
    planetaryStabilized: false,
    planetStatus: (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.HYDRATED) || 'hydrated'
  });
  stageUnlocks[stage5] = Object.freeze({
    cometEnabled: true,
    waterCycleUnlocked: true,
    atmosphereUnlocked: true,
    planetaryStabilized: false,
    planetStatus: (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.BREATHABLE) || 'breathable'
  });
  stageUnlocks[stage6] = Object.freeze({
    cometEnabled: true,
    waterCycleUnlocked: true,
    atmosphereUnlocked: true,
    planetaryStabilized: true,
    planetStatus: (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.STABLE) || 'stable'
  });

  global.SFDPlanetizationProfile = Object.freeze({
    // Stage gates -> world unlock targets.
    stageUnlocks: Object.freeze(stageUnlocks),

    // Future design IDs for custom resource loops.
    customResources: Object.freeze({
      microbeCulture: 'sfd_comets:microbe_culture',
      hydroSeed: 'sfd_comets:hydro_seed',
      condensedWaterCell: 'sfd_comets:condensed_water_cell',
      atmoFilament: 'sfd_comets:atmo_filament',
      oxygenMatrix: 'sfd_comets:oxygen_matrix',
      planetaryAnchor: 'sfd_comets:planetary_anchor'
    }),

    // Optional integration mode for non-sky packs.
    gatewayMode: Object.freeze({
      enabledByDefault: false,
      requiredEntryItem: 'sfd_comets:dimensional_gateway_core',
      interdimensionalEntryItem: 'sfd_comets:interdimensional_gateway_core',
      attunementItem: 'sfd_comets:gateway_attunement_map'
    })
  });
})();

