// kubejs/startup_scripts/_core/03_items.js
// Skyfactory Dark - Item Registry (baseline)
//
// Regel: Alles was als kubejs:<id> in Loot/Recipes auftaucht, MUSS hier registriert sein.

StartupEvents.registry('item', event => {
  // ---------------------------
  // Stage-0 Bio Loop (new core)
  // ---------------------------
  event.create('wood_shavings').displayName('Baumspaene').maxStackSize(64);
  event.create('leaf_threads').displayName('Laubfaeden').maxStackSize(64);
  event.create('leaf_bundle').displayName('Blaetterbuendel').maxStackSize(64);
  event.create('earth_clump').displayName('Erdklumpen').maxStackSize(64);
  event.create('worm').displayName('Wurm').maxStackSize(64);
  event.create('dried_worm').displayName('Getrockneter Wurm').maxStackSize(64);
  event.create('tree_bark').displayName('Baumrinde').maxStackSize(64);
  event.create('organic_rod').displayName('Organischer Stab').maxDamage(96);
  event.create('sprout_mash').displayName('Keim-Brei').maxStackSize(64).food(food => {
    food.hunger(2);
    food.saturation(0.2);
  });
  event.create('survival_ration').displayName('Ueberlebensration').maxStackSize(64).food(food => {
    food.hunger(4);
    food.saturation(0.5);
  });
  event.create('raw_forage').displayName('Rohes Forage').maxStackSize(64);
  event.create('dried_forage').displayName('Getrocknetes Forage').maxStackSize(64).food(food => {
    food.hunger(5);
    food.saturation(0.7);
  });
  event.create('worm_bait').displayName('Wurmkoeder').maxStackSize(64);
  event.create('protein_cake').displayName('Protein-Kuchen').maxStackSize(64).food(food => {
    food.hunger(7);
    food.saturation(0.9);
  });

  // ---------------------------
  // Organic / Soil / Stone Chain (Early Game)
  // ---------------------------
  event.create('organic_dust').displayName('Organic Dust').maxStackSize(64);
  event.create('resin_fragment').displayName('Resin Fragment').maxStackSize(64);
  event.create('leaf_shreds').displayName('Leaf Shreds').maxStackSize(64);

  event.create('compost_pile').displayName('Compost Pile').maxStackSize(64);
  event.create('compost_pulp').displayName('Compost Pulp').maxStackSize(64);

  event.create('raw_soil_chunk').displayName('Raw Soil Chunk').maxStackSize(64);

  event.create('pebble_cluster').displayName('Pebble Cluster').maxStackSize(64);
  event.create('stone_grit').displayName('Stone Grit').maxStackSize(64);
  event.create('rough_stone_mix').displayName('Rough Stone Mix').maxStackSize(64);
  event.create('bark_briquette').displayName('Bark Briquette').maxStackSize(64);
  event.create('organic_fiber').displayName('Organic Fiber').maxStackSize(64);

  // ---------------------------
  // Planetization chain (comet -> microbes -> water -> atmosphere)
  // ---------------------------
  event.create('microbe_culture').displayName('Microbe Culture').maxStackSize(64);
  event.create('hydro_seed').displayName('Hydro Seed').maxStackSize(64);
  event.create('condensed_water_cell').displayName('Condensed Water Cell').maxStackSize(64);
  event.create('atmo_filament').displayName('Atmospheric Filament').maxStackSize(64);
  event.create('oxygen_matrix').displayName('Oxygen Matrix').maxStackSize(64);
  event.create('meteoric_slag').displayName('Meteoric Slag').maxStackSize(64);
  event.create('mineral_catalyst').displayName('Mineral Catalyst').maxStackSize(64);
  event.create('raw_metal_lattice').displayName('Raw Metal Lattice').maxStackSize(64);
  event.create('proto_iron_cluster').displayName('Proto Iron Cluster').maxStackSize(64);
  event.create('proto_copper_cluster').displayName('Proto Copper Cluster').maxStackSize(64);
  event.create('planetary_anchor').displayName('Planetary Anchor').maxStackSize(64);
  event.create('dimensional_gateway_core').displayName('Dimensional Gateway Core').maxStackSize(64);
  event.create('interdimensional_gateway_core').displayName('Interdimensional Gateway Core').maxStackSize(64);
  event.create('gateway_attunement_map').displayName('Gateway Attunement Map').maxStackSize(1);

  // ---------------------------
  // Tools (pack-defined)
  // ---------------------------
  // Wichtig: Das ist ein "Custom Tool" (kein echtes Tool-Material wie Pickaxe),
  // wir erkennen es später über Tags + LootJS matchMainHand().
  event.create('crude_mallet').displayName('Crude Mallet').maxDamage(128);
});
