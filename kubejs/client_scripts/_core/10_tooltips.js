// Skyfactory Dark - Stage-0 Bio Loop tooltips

ItemEvents.tooltip(event => {
  event.add('sfd_comets:leaf_threads', [
    Text.gold('Quelle:'),
    Text.gray('Droppt aus Blaettern'),
    Text.aqua('Nutzen:'),
    Text.darkGray('4x -> Blaetterbuendel')
  ]);

  event.add('sfd_comets:wood_shavings', [
    Text.gold('Quelle:'),
    Text.gray('Droppt aus Staemmen'),
    Text.aqua('Nutzen:'),
    Text.darkGray('Erde/Wurm-Loop und Organischer Stab')
  ]);

  event.add('kubejs:earth_block', [
    Text.gold('Wichtig:'),
    Text.gray('Abbauen fuer Erdklumpen + Wurm-Chance')
  ]);

  event.add('kubejs:builder_earth_block', [
    Text.gold('Baupfad:'),
    Text.gray('Plattform-Block (4 Earth -> 4 Bau-Erdblock)'),
    Text.darkGray('Earth-Progress bleibt dadurch verfuegbar')
  ]);

  event.add('sfd_comets:worm', [
    Text.gold('Nutzen:'),
    Text.gray('Auf Erdblock oder Baumrindenblock verwenden')
  ]);

  event.add('sfd_comets:dried_worm', [
    Text.gold('Nutzen:'),
    Text.gray('Mit Baumspaenen zum Organischen Stab craften')
  ]);

  event.add('sfd_comets:resin_fragment', [
    Text.gold('Nutzen:'),
    Text.gray('2x Stick oder Behandlung von Hohlstamm')
  ]);

  event.add('sfd_comets:organic_rod', [
    Text.gold('Nutzen:'),
    Text.gray('Stamm entrinden, Wurmholz bearbeiten'),
    Text.darkGray('Schluessel fuer ersten Planken-Progress')
  ]);

  event.add('sfd_comets:bio_growth_paste', [
    Text.gold('Nutzen:'),
    Text.gray('Rechtsklick auf einen Block wie Knochenmehl'),
    Text.darkGray('Verbraucht sich nicht beim Benutzen')
  ]);

  event.add('sfd_comets:bark_briquette', [
    Text.gold('Stage-1 Brennstoff:'),
    Text.gray('Burntime 50 Ticks pro Stueck'),
    Text.darkGray('Ca. 4 Stueck pro geschmolzenem Item')
  ]);

  event.add('minecraft:crafting_table', [
    Text.gold('Stage-1 Trigger:'),
    Text.gray('Crafting Table craften'),
    Text.darkGray('Baupfad: 3x Eichenbretter + 1x Organischer Stab')
  ]);

  event.add('kubejs:bio_podest', [
    Text.gold('Bio-Podest:'),
    Text.gray('Earth/Dirt einlegen, dann Wurm/Baumspaene direkt darauf nutzen'),
    Text.darkGray('Leerhand = Slot anzeigen, Shift+Leerhand = Entnehmen')
  ]);

  event.add('kubejs:podest_stone_base', [
    Text.gold('Stone-Upgrade:'),
    Text.gray('Als Unterbau fuer das Bio-Podest verwenden'),
    Text.darkGray('Beschleunigt die Podest-Verarbeitung')
  ]);

  event.add('sfd_comets:bio_podest', [
    Text.gold('Bio-Podest (Mod):'),
    Text.gray('Echter 1-Slot Container, per Rechtsklick oeffnen')
  ]);

  event.add('sfd_comets:bio_backpack', [
    Text.gold('Bio-Beutel (Custom):'),
    Text.gray('Exakt 9 Slots, Rechtsklick in die Luft zum Oeffnen')
  ]);

  event.add('sophisticatedbackpacks:backpack', [
    Text.gold('Rucksack:'),
    Text.gray('Aktuell gesperrt, spaetere Stage-Freischaltung')
  ]);

  event.add('sfd_comets:rough_stone_mix', [
    Text.gold('Stone-Prozess:'),
    Text.gray('Zwischenprodukt fuer den stabilen Cobblestone-Loop')
  ]);

  event.add('minecraft:blast_furnace', [
    Text.gold('Stage-3 Trigger:'),
    Text.gray('Blast Furnace craften'),
    Text.darkGray('Exit: stabile Heat-Logistik (Fuel + Smelt-Core-Loop)')
  ]);
});

