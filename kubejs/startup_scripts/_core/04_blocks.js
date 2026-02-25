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
    .mapColor('dirt')
    .hardness(0.6)
    .resistance(0.6)
    .soundType('gravel')
    .requiresTool(false);

  event
    .create('wormy_earth_block')
    .displayName('Wurmdurchzogener Erdblock')
    .mapColor('dirt')
    .hardness(0.6)
    .resistance(0.6)
    .soundType('gravel')
    .requiresTool(false);

  event
    .create('bark_block')
    .displayName('Baumrindenblock')
    .mapColor('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  event
    .create('wormy_bark_block')
    .displayName('Wurmdurchfressener Baumstamm')
    .mapColor('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  event
    .create('hollow_bark_block')
    .displayName('Durchloecherter Baumstamm')
    .mapColor('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  event
    .create('treated_hollow_bark_block')
    .displayName('Behandelter Baumstamm')
    .mapColor('wood')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('wood')
    .requiresTool(false);

  // "Investierbarer" Early-Game Block:
  // Wird mit dem Crude Mallet zerlegt (statt sofort Cobble zu bekommen).
  event
    .create('packed_soil')
    .displayName('Packed Soil')
    .mapColor('dirt')
    .hardness(0.8)
    .resistance(0.8)
    .soundType('gravel')
    .requiresTool(false);

  // Teurer Baumaterial-Block:
  // fuer Plattformbau, ohne den normalen Earth-Progress zu verbrauchen.
  event
    .create('builder_earth_block')
    .displayName('Bau-Erdblock')
    .mapColor('dirt')
    .hardness(0.8)
    .resistance(1.0)
    .soundType('gravel')
    .requiresTool(false);

  // Stage-0 Arbeits-Podest (eigener Block, kein Trapdoor-Mechanik-Block).
  event
    .create('bio_podest')
    .displayName('Bio-Podest')
    .mapColor('wood')
    .hardness(0.8)
    .resistance(1.2)
    .soundType('wood')
    .requiresTool(false);

  // Stone-age podest base upgrade:
  // same functionality, but used as foundation for faster processing.
  event
    .create('podest_stone_base')
    .displayName('Podest-Steinbasis')
    .mapColor('stone')
    .hardness(1.4)
    .resistance(2.0)
    .soundType('stone')
    .requiresTool(false);
});
