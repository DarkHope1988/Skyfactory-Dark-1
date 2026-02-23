// kubejs/server_scripts/loot/vanilla_overrides/packed_soil_loot.js
// Skyfactory Dark - Packed Soil crushing drops
//
// Idee:
// - Normal abgebaut: droppt sich selbst (Vanilla / KubeJS default)
// - Mit Crude Mallet in der Hand: Block droppt NICHT sich selbst,
//   sondern rollt unsere "crushing" drops.
// => Das macht den Progress langsamer und "arbeitiger".

LootJS.modifiers(event => {

  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand('#skyfactorydark:soil_hammers')

    // Block soll beim "crushen" nicht wieder als Block zurück kommen
    .removeLoot('kubejs:packed_soil')

    // Häufig: Fiber (buildet spätere Ketten)
    .randomChance(0.45)
    .addLoot('kubejs:organic_fiber');

  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand('#skyfactorydark:soil_hammers')
    .removeLoot('kubejs:packed_soil')

    // Seltener: Stone Grit (Stone-Gate)
    .randomChance(0.10)
    .addLoot('kubejs:stone_grit');

  event
    .addBlockLootModifier('kubejs:packed_soil')
    .matchMainHand('#skyfactorydark:soil_hammers')
    .removeLoot('kubejs:packed_soil')

    // Sehr selten: Pebble Cluster (später für Flint/Anderes nutzbar)
    .randomChance(0.03)
    .addLoot('kubejs:pebble_cluster');
});