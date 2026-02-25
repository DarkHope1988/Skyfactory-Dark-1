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
        'sfd_comets:microbe_culture',
        'sfd_comets:meteoric_slag',
        'sfd_comets:organic_dust',
        'minecraft:clay_ball',
        'minecraft:bone_meal'
      ]),
      3: Object.freeze([
        'sfd_comets:hydro_seed',
        'sfd_comets:condensed_water_cell',
        'sfd_comets:mineral_catalyst',
        'sfd_comets:raw_metal_lattice',
        'minecraft:redstone',
        'minecraft:quartz'
      ]),
      4: Object.freeze([
        'sfd_comets:atmo_filament',
        'sfd_comets:oxygen_matrix',
        'sfd_comets:proto_iron_cluster',
        'sfd_comets:proto_copper_cluster',
        'minecraft:lapis_lazuli'
      ]),
      5: Object.freeze([
        'sfd_comets:planetary_anchor',
        'sfd_comets:dimensional_gateway_core',
        'minecraft:gold_ingot',
        'minecraft:ender_pearl'
      ]),
      6: Object.freeze([
        'sfd_comets:interdimensional_gateway_core',
        'sfd_comets:gateway_attunement_map',
        'minecraft:nether_star',
        'minecraft:echo_shard'
      ])
    })
  });
})();

