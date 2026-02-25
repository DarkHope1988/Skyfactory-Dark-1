// Central gameplay config (SSOT runtime knobs for KubeJS layer)
// Keep this file data-only so balancing can be done without touching logic scripts.

(function () {
  if (global.SFDSystemConfig) return;

  global.SFDSystemConfig = Object.freeze({
    comet: Object.freeze({
      // Hard design rule: comet progression starts at Stage 2.
      startStage: 'sfd_stage_2_stone',
      startTier: 2,
      directVanillaOreLoot: false
    }),

    planetization: Object.freeze({
      waterBucketCellCost: 3,
      allowDirectWaterBeforeUnlock: false
    }),

    oreChain: Object.freeze({
      // Keep ore output conservative in early tiers.
      protoToNuggetYield: 3,
      nuggetsToIngot: 9
    }),

    gateway: Object.freeze({
      enabled: true,
      allowInNonSkyPacks: true
    }),

    ui: Object.freeze({
      showPlanetStatusInHud: true,
      showStageEtaInHud: true
    })
  });
})();
