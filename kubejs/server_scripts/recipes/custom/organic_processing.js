// kubejs/server_scripts/recipes/custom/organic_processing.js
// Skyfactory Dark - Organic Chain (v1)
//
// Progress-Idee (Early Game):
// Leaves + Crook -> Organic Dust / Resin Fragment
//   -> (2x2) Compost Pile
//   -> (Cross) Compost Pulp  (separates from Compost Pile recipe; no conflict)
//   -> Dirt + Compost Pulp -> Packed Soil (Investment Block)
// Packed Soil + Mallet -> Stone Grit / Pebble Cluster / Organic Fiber
//
// Hinweis:
// - IDs bewusst stabil halten, damit wir später "Maschinen" hinzufügen können,
//   ohne alles neu zu benennen.

ServerEvents.recipes(event => {

  // -------------------------------------------------
  // 1) 2x2 Organic Dust -> Compost Pile
  // -------------------------------------------------
  event.shaped('kubejs:compost_pile', [
    'DD',
    'DD'
  ], {
    D: 'kubejs:organic_dust'
  });

  // -------------------------------------------------
  // 2) Cross-Pattern Organic Dust -> Compost Pulp
  // Pattern:
  //  0 D 0
  //  D 0 D
  //  0 D 0
  // (genau 4 Dust, aber anderes Layout als 2x2)
  // -------------------------------------------------
  event.shaped('kubejs:compost_pulp', [
    ' D ',
    'D D',
    ' D '
  ], {
    D: 'kubejs:organic_dust'
  });

  // -------------------------------------------------
  // 3) Compost Pile -> Dirt (langsamer als vorher, aber nicht quälend)
  // 2x2 Compost Pile = 1 Dirt
  // -------------------------------------------------
  event.shaped('minecraft:dirt', [
    'CC',
    'CC'
  ], {
    C: 'kubejs:compost_pile'
  });

  // -------------------------------------------------
  // 4) Resin Fragment -> Sticks (Utility)
  // -------------------------------------------------
  event.shapeless(Item.of('minecraft:stick', 2), [
    'kubejs:resin_fragment'
  ]);

  // -------------------------------------------------
  // 4b) Organic Fiber -> String
  // Damit Fiber direkt einen klaren Zweck in der Early-Phase hat.
  // -------------------------------------------------
  event.shaped('minecraft:string', [
    'FF ',
    ' F ',
    '   '
  ], {
    F: 'kubejs:organic_fiber'
  });

  // -------------------------------------------------
  // 4c) Rohboden-Recycling
  // 4 Raw Soil Chunks -> 1 Dirt (langsamer "Rettungsanker").
  // -------------------------------------------------
  event.shaped('minecraft:dirt', [
    'RR',
    'RR'
  ], {
    R: 'kubejs:raw_soil_chunk'
  });

  // -------------------------------------------------
  // 5) Packed Soil (Investment Block)
  // 4 Dirt + 4 Compost Pulp -> 4 Packed Soil
  // (Das zwingt dich, erstmal "richtige" Dirt zu investieren.)
  // -------------------------------------------------
  event.shaped('4x kubejs:packed_soil', [
    'DCD',
    'CDC',
    'DCD'
  ], {
    D: 'minecraft:dirt',
    C: 'kubejs:compost_pulp'
  });

  // -------------------------------------------------
  // 6) Crude Mallet
  // Sehr früh craftbar, aber nicht kostenlos:
  // - Sticks sind okay (Resin->Sticks gibt dir früh welche)
  // - Resin als "Bindemittel"
  // - Organic Fiber kommt aus Packed Soil (also: erst investieren!)
  //
  // Ergebnis: Du musst mindestens 1-2 Packed Soil farmen,
  // bevor du "richtig" Stone Grit farmen kannst.
  // -------------------------------------------------
  event.shaped('kubejs:crude_mallet', [
    ' RR',
    ' SR',
    'S  '
  ], {
    S: 'minecraft:stick',
    R: 'kubejs:resin_fragment'
  });

});
