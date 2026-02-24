// kubejs/startup_scripts/_core/04_blocks.js
// Skyfactory Dark - Block Registry (baseline)
//
// Hinweis:
// - Wir registrieren eigene "Progression-Blocks" hier, damit wir sie in Loot & Recipes nutzen können.
// - Block-IDs sind stabil: kubejs:<id>

StartupEvents.registry('block', event => {
  event
    .create('earth_block')
    .displayName('Erdblock')
    .material('dirt')
    .hardness(0.6)
    .resistance(0.6)
    .soundType('gravel')
    .requiresTool(false);

  event
    .create('wormy_earth_block')
    .displayName('Wurmdurchzogener Erdblock')
    .material('dirt')
    .hardness(0.6)
    .resistance(0.6)
    .soundType('gravel')
    .requiresTool(false);

  event
    .create('bark_block')
    .displayName('Baumrindenblock')
    .material('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  event
    .create('wormy_bark_block')
    .displayName('Wurmdurchfressener Baumstamm')
    .material('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  event
    .create('hollow_bark_block')
    .displayName('Durchloecherter Baumstamm')
    .material('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  event
    .create('treated_hollow_bark_block')
    .displayName('Behandelter Baumstamm')
    .material('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  // "Investierbarer" Early-Game Block:
  // Wird mit dem Crude Mallet zerlegt (statt sofort Cobble zu bekommen).
  event
    .create('packed_soil')
    .displayName('Packed Soil')
    .material('dirt')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('gravel')
    .requiresTool(false);
});
