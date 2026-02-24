// Skyfactory Dark - Stage-0 Bio Loop tooltips

ItemEvents.tooltip(event => {
  event.add('kubejs:leaf_threads', [
    Text.gold('Quelle:'),
    Text.gray('Droppt aus Blaettern'),
    Text.aqua('Nutzen:'),
    Text.darkGray('4x -> Blaetterbuendel')
  ]);

  event.add('kubejs:wood_shavings', [
    Text.gold('Quelle:'),
    Text.gray('Droppt aus Staemmen'),
    Text.aqua('Nutzen:'),
    Text.darkGray('Erde/Wurm-Loop und Organischer Stab')
  ]);

  event.add('kubejs:earth_block', [
    Text.gold('Wichtig:'),
    Text.gray('Abbauen fuer Erdklumpen + Wurm-Chance')
  ]);

  event.add('kubejs:worm', [
    Text.gold('Nutzen:'),
    Text.gray('Auf Erdblock oder Baumrindenblock verwenden')
  ]);

  event.add('kubejs:dried_worm', [
    Text.gold('Nutzen:'),
    Text.gray('Mit Baumspaenen zum Organischen Stab craften')
  ]);

  event.add('kubejs:resin_fragment', [
    Text.gold('Nutzen:'),
    Text.gray('2x Stick oder Behandlung von Hohlstamm')
  ]);

  event.add('kubejs:organic_rod', [
    Text.gold('Nutzen:'),
    Text.gray('Stamm entrinden, Wurmholz bearbeiten'),
    Text.darkGray('Schluessel fuer ersten Planken-Progress')
  ]);

  event.add('minecraft:crafting_table', [
    Text.gold('Freischaltung:'),
    Text.gray('3x Eichenbretter + 1x Organischer Stab')
  ]);
});
