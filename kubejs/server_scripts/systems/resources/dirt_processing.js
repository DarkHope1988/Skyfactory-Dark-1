// kubejs/server_scripts/systems/resources/dirt_processing.js
// Skyfactory Dark - Dirt processing (baseline)
//
// Idee:
// - Dirt ist "Rohmaterial" aus Compost.
// - Mit dem CRUDE MALLET (Tag: #skyfactorydark:crushing_tools) wird Dirt "zermahlen"
//   und gibt frühe Progress-Ressourcen:
//   - Organic Fiber (häufig) -> frühe Craft-Komponente
//   - Stone Grit (selten)    -> erster echter Stein (Cobble via Recipe)
//
// Wichtig:
// - Wir entfernen beim Mallet-Abbau den Dirt-Drop (Dirt wird also verbraucht).
// - Vanilla-Abbau (Hand/Schaufel/etc.) bleibt unverändert.

LootJS.modifiers(event => {
  event
    .addBlockLootModifier('minecraft:dirt')
    .matchMainHand('#skyfactorydark:crushing_tools')
    .removeLoot('minecraft:dirt')
    .randomChance(0.45)
    .addLoot('kubejs:raw_soil_chunk');

  event
    .addBlockLootModifier('minecraft:dirt')
    .matchMainHand('#skyfactorydark:crushing_tools')
    .removeLoot('minecraft:dirt')

    // Hauptdrop: Organic Fiber
    // ~70% sorgt dafür, dass man nach ein paar Stacks Leaves/Dirt direkt "etwas" hat,
    // ohne dass es explodiert.
    .randomChance(0.70)
    .addLoot('kubejs:organic_fiber');

  event
    .addBlockLootModifier('minecraft:dirt')
    .matchMainHand('#skyfactorydark:crushing_tools')
    .removeLoot('minecraft:dirt')

    // Seltener Drop: Stone Grit
    // ~12% -> Cobble ist ein echtes "Milestone", aber nicht 60 Minuten Grind.
    .randomChance(0.12)
    .addLoot('kubejs:stone_grit');

  // Winziger Trostdrop: 5% Dirt zurück (fühlt sich weniger "bestrafend" an).
  event
    .addBlockLootModifier('minecraft:dirt')
    .matchMainHand('#skyfactorydark:crushing_tools')
    .removeLoot('minecraft:dirt')
    .randomChance(0.05)
    .addLoot('minecraft:dirt');
});
