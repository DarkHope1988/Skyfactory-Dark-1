// Comet loot profile (SSOT bridge)
// Tier 0-1 intentionally empty. Comet progression starts at tier 2.

(function () {
  if (global.SFDCometLootProfile) return;

  global.SFDCometLootProfile = Object.freeze({
    startTier: 2,
    tiers: Object.freeze({
      0: Object.freeze([]),
      1: Object.freeze([]),
      2: Object.freeze([
        'sfd_comets:planet_microbe_culture',
        'sfd_comets:comet_meteoric_slag',
        'sfd_comets:bio_organic_dust',
        'minecraft:clay_ball',
        'minecraft:bone_meal'
      ]),
      3: Object.freeze([
        'sfd_comets:planet_hydro_seed',
        'sfd_comets:planet_condensed_water_cell',
        'sfd_comets:comet_mineral_catalyst',
        'sfd_comets:comet_raw_metal_lattice',
        'minecraft:redstone',
        'minecraft:quartz'
      ]),
      4: Object.freeze([
        'sfd_comets:planet_atmo_filament',
        'sfd_comets:planet_oxygen_matrix',
        'sfd_comets:comet_proto_iron_cluster',
        'sfd_comets:comet_proto_copper_cluster',
        'minecraft:lapis_lazuli'
      ]),
      5: Object.freeze([
        'sfd_comets:planet_anchor',
        'sfd_comets:planet_gateway_core',
        'minecraft:gold_ingot',
        'minecraft:ender_pearl'
      ]),
      6: Object.freeze([
        'sfd_comets:planet_gateway_core_interdimensional',
        'sfd_comets:planet_gateway_attunement_map',
        'minecraft:nether_star',
        'minecraft:echo_shard'
      ])
    })
  });
})();

