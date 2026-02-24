// kubejs/client_scripts/_core/10_tooltips.js
// Skyfactory Dark - Tooltips (early guide)
//
// Kleine Ingame-Hilfe, damit der Progress klar bleibt,
// ohne dass wir schon ein komplettes Quest-Book bauen müssen.

ItemEvents.tooltip(event => {

  event.add('kubejs:organic_dust', [
    Text.gold('Source:'),
    Text.gray('Leaves + Crook'),
    Text.aqua('Use:'),
    Text.darkGray('2x2 -> Compost Pile'),
    Text.darkGray('Cross -> Compost Pulp')
  ]);

  event.add('kubejs:compost_pile', [
    Text.gold('Source:'),
    Text.gray('4x Organic Dust (2x2)'),
    Text.aqua('Use:'),
    Text.darkGray('2x2 -> Dirt')
  ]);

  event.add('kubejs:compost_pulp', [
    Text.gold('Source:'),
    Text.gray('4x Organic Dust (cross pattern)'),
    Text.aqua('Use:'),
    Text.darkGray('With Dirt -> Packed Soil')
  ]);

  event.add('kubejs:packed_soil', [
    Text.gold('Source:'),
    Text.gray('Dirt + Compost Pulp'),
    Text.aqua('Use:'),
    Text.darkGray('Break with Mallet -> Stone Grit / Fiber / Pebbles')
  ]);

  event.add('kubejs:stone_grit', [
    Text.gold('Source:'),
    Text.gray('Packed Soil with Mallet'),
    Text.aqua('Use:'),
    Text.darkGray('2x2 -> Cobblestone')
  ]);

  event.add('kubejs:pebble_cluster', [
    Text.gold('Source:'),
    Text.gray('Packed Soil with Mallet (bonus drop)'),
    Text.aqua('Use:'),
    Text.darkGray('4x -> Gravel')
  ]);

  event.add('kubejs:organic_fiber', [
    Text.gold('Source:'),
    Text.gray('Dirt/Packed Soil processing with Mallet'),
    Text.aqua('Use:'),
    Text.darkGray('Craft into String')
  ]);

  event.add('kubejs:raw_soil_chunk', [
    Text.gold('Source:'),
    Text.gray('Dirt processing with Mallet'),
    Text.aqua('Use:'),
    Text.darkGray('4x -> Dirt')
  ]);

  event.add('kubejs:crude_mallet', [
    Text.gold('Use:'),
    Text.gray('Main tool for Dirt/Packed Soil progression'),
    Text.darkGray('Tag: skyfactorydark:mallets / crushing_tools')
  ]);

  event.add('exdeorum:crook', [
    Text.gold('Use:'),
    Text.gray('Harvest leaves for Organic Dust loop')
  ]);

  event.add('minecraft:dirt', [
    Text.gold('Skyfactory Dark:'),
    Text.gray('Process with Mallet for early resources')
  ]);

  event.add('minecraft:cobblestone', [
    Text.gold('Source:'),
    Text.gray('4x Stone Grit (2x2)')
  ]);

  event.add('minecraft:string', [
    Text.gold('Source:'),
    Text.gray('3x Organic Fiber -> String')
  ]);

});
