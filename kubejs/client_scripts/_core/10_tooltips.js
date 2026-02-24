// kubejs/client_scripts/_core/10_tooltips.js
// Skyfactory Dark - Tooltips (early guide)
//
// Kleine Ingame-Hilfe, damit der Progress klar bleibt,
// ohne dass wir schon ein komplettes Quest-Book bauen müssen.

ItemEvents.tooltip(event => {

  event.add('kubejs:organic_dust', [
    Text.gray('Drops from leaves when using a Crook.'),
    Text.darkGray('2x2 -> Compost Pile'),
    Text.darkGray('Cross -> Compost Pulp')
  ]);

  event.add('kubejs:compost_pile', [
    Text.gray('Basic compost.'),
    Text.darkGray('2x2 -> Dirt')
  ]);

  event.add('kubejs:compost_pulp', [
    Text.gray('Refined compost for investment blocks.'),
    Text.darkGray('Use with Dirt to craft Packed Soil')
  ]);

  event.add('kubejs:packed_soil', [
    Text.gray('Investment Block (early progression).'),
    Text.darkGray('Break with a Mallet to extract stone materials')
  ]);

  event.add('kubejs:stone_grit', [
    Text.gray('Stone substitute.'),
    Text.darkGray('2x2 -> Cobblestone')
  ]);

  event.add('kubejs:crude_mallet', [
    Text.gray('Used to break Packed Soil.'),
    Text.darkGray('Tag: skyfactorydark:mallets')
  ]);

});
