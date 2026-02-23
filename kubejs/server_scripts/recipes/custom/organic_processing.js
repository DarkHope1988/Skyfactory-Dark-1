// kubejs/server_scripts/recipes/custom/organic_processing.js
// Skyfactory Dark - Organic → Soil → Stone (baseline)
//
// Ziel:
// 1) Leaves (Crook) → Organic Dust / Resin Fragment (kommt aus LootJS)
// 2) Organic Dust → Compost Pulp (Cross-Rezept, verlangsamt Early Game)
// 3) Compost Pulp + Dirt → Packed Soil (Block)
// 4) Packed Soil wird mit Mallet zerlegt (LootJS) → Stone Grit / Pebbles / Fiber
//
// Wichtig:
// - Wir halten die IDs stabil (kubejs:organic_dust etc.)
// - Das Rezept für Compost Pulp ist absichtlich NICHT das klassische 2x2,
//   damit Dirt→Stone nicht zu schnell wird.

ServerEvents.recipes(event => {

  // ------------------------------------------------
  // 1) Organic Dust -> Compost Pulp (Cross / 5 Dust)
  // Pattern:
  //  _ D _
  //  D D D
  //  _ D _
  // -> 1 Compost Pulp
  // ------------------------------------------------
  event.shaped('kubejs:compost_pulp', [
    ' D ',
    'DDD',
    ' D '
  ], {
    D: 'kubejs:organic_dust'
  });

  // ------------------------------------------------
  // 2) Compost Pulp + Dirt -> Packed Soil (4 Blocks)
  // 4x Dirt + 4x Compost Pulp -> 4x Packed Soil
  // ------------------------------------------------
  event.shaped('4x kubejs:packed_soil', [
    'DCD',
    'CDC',
    'DCD'
  ], {
    D: 'minecraft:dirt',
    C: 'kubejs:compost_pulp'
  });

  // ------------------------------------------------
  // 3) Mini-Utility: Resin Fragment -> Sticks
  // ------------------------------------------------
  event.shapeless(Item.of('minecraft:stick', 2), [
    'kubejs:resin_fragment'
  ]);

  // ------------------------------------------------
  // 4) Stone Grit -> Cobblestone (langsamer Step)
  // 3x3 Grit -> 1 Cobblestone
  // ------------------------------------------------
  event.shaped('minecraft:cobblestone', [
    'GGG',
    'GGG',
    'GGG'
  ], {
    G: 'kubejs:stone_grit'
  });
});
