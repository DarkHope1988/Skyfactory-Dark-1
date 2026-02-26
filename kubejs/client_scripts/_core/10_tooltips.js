// Skyfactory Dark - Stage-0 Bio Loop tooltips

ItemEvents.tooltip(event => {
  event.add('sfd_comets:bio_leaf_threads', [
    Text.gold('Quelle:'),
    Text.gray('Droppt aus Blättern'),
    Text.aqua('Nutzen:'),
    Text.darkGray('4x -> Laubbündel')
  ]);

  event.add('sfd_comets:bio_wood_shavings', [
    Text.gold('Quelle:'),
    Text.gray('Droppt aus Stämmen'),
    Text.aqua('Nutzen:'),
    Text.darkGray('Erde/Wurm-Loop und Organischer Stab')
  ]);

  event.add('sfd_comets:soil_earth_block', [
    Text.gold('Wichtig:'),
    Text.gray('Abbauen für Erdklumpen + Wurm-Chance'),
    Text.darkGray('Kategorie: Soil Chain')
  ]);

  event.add('sfd_comets:soil_builder_block', [
    Text.gold('Baupfad:'),
    Text.gray('Plattform-Block (4 Earth -> 4 Bau-Erdblock)'),
    Text.darkGray('Earth-Progress bleibt dadurch verfügbar')
  ]);

  event.add('sfd_comets:bio_worm', [
    Text.gold('Nutzen:'),
    Text.gray('Auf Erdblock oder Baumrindenblock verwenden')
  ]);

  event.add('sfd_comets:bio_dried_worm', [
    Text.gold('Nutzen:'),
    Text.gray('Mit Baumspaenen zum Organischen Stab craften')
  ]);

  event.add('sfd_comets:bio_resin_fragment', [
    Text.gold('Nutzen:'),
    Text.gray('2x Stick oder Behandlung von Hohlstamm')
  ]);

  event.add('sfd_comets:tool_organic_rod', [
    Text.gold('Nutzen:'),
    Text.gray('Stamm entrinden, Wurmholz bearbeiten'),
    Text.darkGray('Schlüssel für ersten Planken-Progress')
  ]);

  event.add('sfd_comets:bio_growth_paste_t1', [
    Text.gold('Nutzen:'),
    Text.gray('Rechtsklick auf einen Block wie Knochenmehl'),
    Text.darkGray('Verbraucht sich bei jeder Nutzung')
  ]);

  event.add('sfd_comets:bio_growth_paste_t2', [
    Text.gold('Nutzen:'),
    Text.gray('Wie Knochenmehl, aber als Haltbarkeits-Tool'),
    Text.darkGray('8 Nutzungen pro Item')
  ]);

  event.add('sfd_comets:bio_bark_briquette', [
    Text.gold('Stage-1 Brennstoff:'),
    Text.gray('Burntime 50 Ticks pro Stück'),
    Text.darkGray('Ca. 4 Stück pro geschmolzenem Item')
  ]);

  event.add('minecraft:crafting_table', [
    Text.gold('Stage-1 Trigger:'),
    Text.gray('Crafting Table craften'),
    Text.darkGray('Baupfad: 3x Eichenstufen + 1x Organischer Stab')
  ]);

  event.add('sfd_comets:stone_podest_base', [
    Text.gold('Stone-Upgrade:'),
    Text.gray('Als Unterbau für das Bio-Podest verwenden'),
    Text.darkGray('Beschleunigt die Podest-Verarbeitung')
  ]);

  event.add('sfd_comets:machine_bio_podest', [
    Text.gold('Bio-Podest (Mod):'),
    Text.gray('2 Eingänge + 3x3 Ausgabefeld, per Rechtsklick öffnen'),
    Text.darkGray('Stage-Gates + Chancen kommen aus der Mod-Config'),
    Text.darkGray('Kategorie: Podest Core')
  ]);

  event.add('sfd_comets:comet_field_pack', [
    Text.gold('Bio-Beutel (Custom):'),
    Text.gray('Exakt 9 Slots, Rechtsklick in die Luft zum Öffnen')
  ]);

  event.add('sophisticatedbackpacks:backpack', [
    Text.gold('Rucksack:'),
    Text.gray('Aktuell gesperrt, spätere Stage-Freischaltung')
  ]);

  event.add('sfd_comets:stone_rough_mix', [
    Text.gold('Stone-Prozess:'),
    Text.gray('Zwischenprodukt für den stabilen Cobblestone-Loop'),
    Text.darkGray('Kategorie: Stone Chain')
  ]);

  event.add('minecraft:blast_furnace', [
    Text.gold('Stage-3 Trigger:'),
    Text.gray('Blast Furnace craften'),
    Text.darkGray('Exit: stabile Heat-Logistik (Fuel + Smelt-Core-Loop)')
  ]);
});

