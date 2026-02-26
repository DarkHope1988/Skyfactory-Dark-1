// Skyfactory Dark - Planetization bootstrap chain
// First playable step: comet-biotic materials lead into controlled water unlock items.

ServerEvents.recipes(event => {
  const cfg = global.SFDSystemConfig || {};
  const planetCfg = cfg.planetization || {};
  const waterCellCost = Math.max(1, Number(planetCfg.waterBucketCellCost || 3));
  const waterRecipe = ['minecraft:bucket'];
  for (let i = 0; i < waterCellCost; i++) {
    waterRecipe.push('sfd_comets:condensed_water_cell');
  }

  event.shaped('sfd_comets:microbe_culture', [
    'ODO',
    'DCD',
    'ODO'
  ], {
    O: 'sfd_comets:organic_dust',
    D: 'minecraft:bone_meal',
    C: 'sfd_comets:compost_pulp'
  }).id('kubejs:planetization/microbe_culture');

  event.shaped('sfd_comets:hydro_seed', [
    ' M ',
    'CDC',
    ' C '
  ], {
    M: 'sfd_comets:microbe_culture',
    C: 'minecraft:clay_ball',
    D: 'minecraft:copper_ingot'
  }).id('kubejs:planetization/hydro_seed');

  event.shaped('sfd_comets:condensed_water_cell', [
    ' G ',
    'HMH',
    ' G '
  ], {
    G: 'minecraft:glass_bottle',
    H: 'sfd_comets:hydro_seed',
    M: 'sfd_comets:microbe_culture'
  }).id('kubejs:planetization/condensed_water_cell');

  // Controlled water conversion. Keep expensive to preserve progression pacing.
  event.shapeless('minecraft:water_bucket', waterRecipe)
    .id('kubejs:planetization/water_bucket_from_cells');

  event.shaped('sfd_comets:atmo_filament', [
    'OMO',
    'MRM',
    'OMO'
  ], {
    O: 'sfd_comets:organic_fiber',
    M: 'sfd_comets:microbe_culture',
    R: 'minecraft:redstone'
  }).id('kubejs:planetization/atmo_filament');

  event.shaped('sfd_comets:oxygen_matrix', [
    ' A ',
    'LCL',
    ' A '
  ], {
    A: 'sfd_comets:atmo_filament',
    L: 'minecraft:lapis_lazuli',
    C: 'sfd_comets:condensed_water_cell'
  }).id('kubejs:planetization/oxygen_matrix');

  event.shaped('sfd_comets:planetary_anchor', [
    'OEO',
    'ENE',
    'OEO'
  ], {
    O: 'sfd_comets:oxygen_matrix',
    E: 'minecraft:ender_pearl',
    N: 'minecraft:netherite_scrap'
  }).id('kubejs:planetization/planetary_anchor');

  event.shaped('sfd_comets:dimensional_gateway_core', [
    'POP',
    'OEO',
    'POP'
  ], {
    P: 'sfd_comets:planetary_anchor',
    O: 'sfd_comets:oxygen_matrix',
    E: 'minecraft:ender_eye'
  }).id('kubejs:planetization/dimensional_gateway_core');

  event.shaped('sfd_comets:interdimensional_gateway_core', [
    'GDG',
    'DND',
    'GDG'
  ], {
    G: 'sfd_comets:dimensional_gateway_core',
    D: 'minecraft:echo_shard',
    N: 'minecraft:nether_star'
  }).id('kubejs:planetization/interdimensional_gateway_core');

  event.shapeless('sfd_comets:gateway_attunement_map', [
    'sfd_comets:interdimensional_gateway_core',
    'minecraft:map'
  ]).id('kubejs:planetization/gateway_attunement_map');
});

