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
  event.create('organic_fiber').displayName('Organic Fiber').maxStackSize(64);

  // ---------------------------
  // Tools (pack-defined)
  // ---------------------------
  // Wichtig: Das ist ein "Custom Tool" (kein echtes Tool-Material wie Pickaxe),
  // wir erkennen es später über Tags + LootJS matchMainHand().
  event.create('crude_mallet').displayName('Crude Mallet').maxDamage(128);
});
