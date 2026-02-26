// Skyfactory Dark - Organic Processing (Stage-0 Bio Loop)

ServerEvents.recipes(event => {
  const hasItem = id => {
    try {
      return !Item.of(id).isEmpty();
    } catch (e) {
      return false;
    }
  };
  // Leaf threads -> leaf bundles.
  event.shaped('sfd_comets:bio_leaf_bundle', [
    'LL',
    'LL'
  ], {
    L: 'sfd_comets:bio_leaf_threads'
  }).id('sfd_comets:stage0/leaf_bundle');

  // Leaf bundle + wood shavings -> first earth block.
  event.shapeless('sfd_comets:soil_earth_block', [
    'sfd_comets:bio_leaf_bundle',
    'sfd_comets:bio_wood_shavings'
  ]).id('sfd_comets:stage0/earth_block_from_bundle');

  // Earth clumps can be compressed back into earth blocks.
  event.shaped('sfd_comets:soil_earth_block', [
    'CC',
    'CC'
  ], {
    C: 'sfd_comets:soil_earth_clump'
  }).id('sfd_comets:stage0/earth_block_from_clump');

  // Tree bark -> placeable bark block.
  event.shaped('sfd_comets:bio_bark_block', [
    'BB',
    'BB'
  ], {
    B: 'sfd_comets:bio_tree_bark'
  }).id('sfd_comets:stage0/bark_block');

  // Dried worm + wood shavings => organic rod (OX / XO).
  event.shaped('sfd_comets:tool_organic_rod', [
    'DW',
    'WD'
  ], {
    D: 'sfd_comets:bio_dried_worm',
    W: 'sfd_comets:bio_wood_shavings'
  }).id('sfd_comets:stage0/organic_rod');

  // Old items remain craftable for compatibility with existing content,
  // and become the Stage-1 bridge into stone progression.
  event.shapeless('sfd_comets:bio_organic_dust', [
    'sfd_comets:bio_leaf_threads',
    'sfd_comets:bio_leaf_threads',
    'sfd_comets:bio_leaf_threads',
    'sfd_comets:bio_leaf_threads'
  ]).id('sfd_comets:stage1/organic_dust');

  event.shapeless('sfd_comets:bio_resin_fragment', [
    'sfd_comets:bio_wood_shavings',
    'sfd_comets:bio_leaf_threads'
  ]).id('sfd_comets:stage1/resin_fragment');

  // Stage 1 unlock chain (after first workbench).
  event.shaped('sfd_comets:bio_compost_pile', [
    'DDD',
    'D D',
    'DDD'
  ], {
    D: 'sfd_comets:bio_organic_dust'
  }).id('sfd_comets:stage1/compost_pile');

  event.shaped('sfd_comets:bio_compost_pulp', [
    ' D ',
    'DRD',
    ' D '
  ], {
    D: 'sfd_comets:bio_organic_dust',
    R: 'sfd_comets:bio_resin_fragment'
  }).id('sfd_comets:stage1/compost_pulp');

  event.shaped('minecraft:dirt', [
    'CC',
    'CC'
  ], {
    C: 'sfd_comets:bio_compost_pile'
  }).id('sfd_comets:stage1/dirt_from_compost_pile');

  event.shaped('4x sfd_comets:soil_packed_block', [
    'DCD',
    'CDC',
    'DCD'
  ], {
    D: 'minecraft:dirt',
    C: 'sfd_comets:bio_compost_pulp'
  }).id('sfd_comets:stage1/packed_soil');

  // Stage-1 fuel path: bark processed into compact furnace fuel.
  event.shaped('4x sfd_comets:bio_bark_briquette', [
    ' B ',
    'BRB',
    ' B '
  ], {
    B: 'sfd_comets:bio_tree_bark',
    R: 'sfd_comets:bio_resin_fragment'
  }).id('sfd_comets:stage1/bark_briquette');

  // Alternative fuer Plattformbau:
  // 4x Earth -> 4x Bau-Erdblock (kein Materialgewinn, aber klare Trennung).
  event.shaped('4x sfd_comets:soil_builder_block', [
    'EE',
    'EE'
  ], {
    E: 'sfd_comets:soil_earth_block'
  }).id('sfd_comets:stage0/builder_earth_block');

  // Stage-0 Arbeitspodest (eigener Block), bewusst als 3x3-Rezept gebalanced.
  const podestId = Platform.isLoaded('sfd_comets') ? 'sfd_comets:machine_bio_podest' : 'sfd_comets:machine_bio_podest';
  event.shaped(podestId, [
    'BRB',
    'EOE',
    'BBB'
  ], {
    B: 'sfd_comets:soil_builder_block',
    R: 'sfd_comets:bio_resin_fragment',
    E: 'sfd_comets:soil_earth_block',
    O: 'sfd_comets:tool_organic_rod'
  }).id('sfd_comets:stage0/bio_podest_trapdoor');

  // Stage-0 Bio Backpack (custom addon mod item, exactly 9 slots).
  if (Platform.isLoaded('sfd_comets')) {
    event.shaped('sfd_comets:comet_field_pack', [
      'RR',
      'WP'
    ], {
      R: 'sfd_comets:tool_organic_rod',
      W: 'sfd_comets:bio_dried_worm',
      P: 'sfd_comets:soil_packed_block'
    }).id('sfd_comets:stage0/bio_beutel_9slot');
  }

  // Stage-0 Growth Paste: custom right-click growth item (bonemeal behavior).
  event.shaped('2x sfd_comets:bio_growth_paste_t1', [
    'LR',
    'DW'
  ], {
    L: 'sfd_comets:bio_leaf_threads',
    R: 'sfd_comets:bio_resin_fragment',
    D: 'sfd_comets:bio_organic_dust',
    W: 'sfd_comets:bio_dried_worm'
  }).id('sfd_comets:stage0/bio_growth_paste');

  // Tier-2 growth paste: 8 uses (durability-based).
  // Guarded so recipe load does not hard-fail if the target item isn't present yet.
  if (hasItem('sfd_comets:bio_growth_paste_t2')) {
    event.shaped('sfd_comets:bio_growth_paste_t2', [
      'PP',
      'PP'
    ], {
      P: 'sfd_comets:bio_growth_paste_t1'
    }).id('sfd_comets:stage1/bio_growth_paste_t2');
  }

  event.shaped('sfd_comets:tool_crude_mallet', [
    ' RR',
    ' SR',
    'S  '
  ], {
    S: 'minecraft:stick',
    R: 'sfd_comets:bio_resin_fragment'
  }).id('sfd_comets:stage1/crude_mallet');

  event.shaped('minecraft:string', [
    'FF',
    'FF'
  ], {
    F: 'sfd_comets:bio_organic_fiber'
  }).id('sfd_comets:stage1/string_from_fiber');

  event.shaped('minecraft:dirt', [
    'RR',
    'RR'
  ], {
    R: 'sfd_comets:soil_raw_chunk'
  }).id('sfd_comets:stage1/dirt_from_raw_soil_chunk');

  // Resin has direct early utility.
  event.shapeless(Item.of('minecraft:stick', 2), [
    'sfd_comets:bio_resin_fragment'
  ]).id('sfd_comets:stage0/sticks_from_resin');

  // Optional resin path for treated wood conversion.
  event.shapeless('sfd_comets:bio_treated_hollow_bark_block', [
    'sfd_comets:bio_hollow_bark_block',
    'sfd_comets:bio_resin_fragment'
  ]).id('sfd_comets:stage1/treated_hollow_bark_block');

  // Workbench unlock: still 2x2 craftable, but gated behind first plank loop.
  event.shaped('minecraft:crafting_table', [
    'PO',
    'PP'
  ], {
    P: 'minecraft:oak_planks',
    O: 'sfd_comets:tool_organic_rod'
  }).id('sfd_comets:stage0/workbench_unlock');
});



