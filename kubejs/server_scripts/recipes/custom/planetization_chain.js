// Skyfactory Dark - Planetization bootstrap chain
// First playable step: comet-biotic materials lead into controlled water unlock items.

ServerEvents.recipes(event => {
  const cfg = global.SFDSystemConfig || {};
  const planetCfg = cfg.planetization || {};
  const waterCellCost = Math.max(1, Number(planetCfg.waterBucketCellCost || 3));
  const waterRecipe = ['minecraft:bucket'];
  for (let i = 0; i < waterCellCost; i++) {
    waterRecipe.push('sfd_comets:planet_condensed_water_cell');
  }

  event.shaped('sfd_comets:planet_microbe_culture', [
    'ODO',
    'DCD',
    'ODO'
  ], {
    O: 'sfd_comets:bio_organic_dust',
    D: 'minecraft:bone_meal',
    C: 'sfd_comets:bio_compost_pulp'
  }).id('sfd_comets:planetization/microbe_culture');

  event.shaped('sfd_comets:planet_hydro_seed', [
    ' M ',
    'CDC',
    ' C '
  ], {
    M: 'sfd_comets:planet_microbe_culture',
    C: 'minecraft:clay_ball',
    D: 'minecraft:copper_ingot'
  }).id('sfd_comets:planetization/hydro_seed');

  event.shaped('sfd_comets:planet_condensed_water_cell', [
    ' G ',
    'HMH',
    ' G '
  ], {
    G: 'minecraft:glass_bottle',
    H: 'sfd_comets:planet_hydro_seed',
    M: 'sfd_comets:planet_microbe_culture'
  }).id('sfd_comets:planetization/condensed_water_cell');

  // Stage-2 accessible glass bottle path (before vanilla sand/glass loops are stable).
  event.shaped('2x minecraft:glass_bottle', [
    ' M ',
    'M M'
  ], {
    M: 'sfd_comets:comet_meteoric_slag'
  }).id('sfd_comets:planetization/glass_bottle_from_meteoric_slag');

  // Controlled water conversion. Keep expensive to preserve progression pacing.
  event.shapeless('minecraft:water_bucket', waterRecipe)
    .id('sfd_comets:planetization/water_bucket_from_cells');

  event.shaped('sfd_comets:planet_atmo_filament', [
    'OMO',
    'MRM',
    'OMO'
  ], {
    O: 'sfd_comets:bio_organic_fiber',
    M: 'sfd_comets:planet_microbe_culture',
    R: 'minecraft:redstone'
  }).id('sfd_comets:planetization/atmo_filament');

  event.shaped('sfd_comets:planet_oxygen_matrix', [
    ' A ',
    'LCL',
    ' A '
  ], {
    A: 'sfd_comets:planet_atmo_filament',
    L: 'minecraft:lapis_lazuli',
    C: 'sfd_comets:planet_condensed_water_cell'
  }).id('sfd_comets:planetization/oxygen_matrix');

  event.shaped('sfd_comets:planet_anchor', [
    'OEO',
    'ENE',
    'OEO'
  ], {
    O: 'sfd_comets:planet_oxygen_matrix',
    E: 'minecraft:ender_pearl',
    N: 'minecraft:netherite_scrap'
  }).id('sfd_comets:planetization/planetary_anchor');

  event.shaped('sfd_comets:planet_gateway_core', [
    'POP',
    'OEO',
    'POP'
  ], {
    P: 'sfd_comets:planet_anchor',
    O: 'sfd_comets:planet_oxygen_matrix',
    E: 'minecraft:ender_eye'
  }).id('sfd_comets:planetization/dimensional_gateway_core');

  event.shaped('sfd_comets:planet_gateway_core_interdimensional', [
    'GDG',
    'DND',
    'GDG'
  ], {
    G: 'sfd_comets:planet_gateway_core',
    D: 'minecraft:echo_shard',
    N: 'minecraft:nether_star'
  }).id('sfd_comets:planetization/interdimensional_gateway_core');

  event.shapeless('sfd_comets:planet_gateway_attunement_map', [
    'sfd_comets:planet_gateway_core_interdimensional',
    'minecraft:map'
  ]).id('sfd_comets:planetization/gateway_attunement_map');
});


