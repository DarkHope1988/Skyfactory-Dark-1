// kubejs/startup_scripts/_core/04_blocks.js
// Skyfactory Dark - Block Registry (baseline)
//
// Hinweis:
// - Wir registrieren eigene "Progression-Blocks" hier, damit wir sie in Loot & Recipes nutzen können.
// - Block-IDs sind stabil: kubejs:<id>

StartupEvents.registry('block', event => {
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
