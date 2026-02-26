// Client: JEI information for Stage-0/1 Bio Loop

function sfdCfg() {
  const fallback = {
    earthWormChance: 0.28,
    earthWormBaitChance: 0.60,
    wormyEarthMalletChance: 0.60,
    failOutputEnabled: true,
    failOutputChance: 0.35,
    gateEarthWorm: 0,
    gateEarthWormBait: 1,
    gateWormyEarthWood: 0,
    gateWormyEarthMallet: 1
  };
  try {
    const C = Java.loadClass('de.darkhope.sfd.comets.config.SfdConfig');
    return {
      earthWormChance: Number(C.BIO_PODEST_EARTH_WORM_CHANCE.get()),
      earthWormBaitChance: Number(C.BIO_PODEST_EARTH_WORM_BAIT_CHANCE.get()),
      wormyEarthMalletChance: Number(C.BIO_PODEST_WORMY_EARTH_MALLET_WORM_CHANCE.get()),
      failOutputEnabled: C.BIO_PODEST_FAIL_OUTPUT_ENABLED.get() === true,
      failOutputChance: Number(C.BIO_PODEST_FAIL_OUTPUT_CHANCE.get()),
      gateEarthWorm: Number(C.BIO_PODEST_GATE_EARTH_WORM_MIN_TIER.get()),
      gateEarthWormBait: Number(C.BIO_PODEST_GATE_EARTH_WORM_BAIT_MIN_TIER.get()),
      gateWormyEarthWood: Number(C.BIO_PODEST_GATE_WORMY_EARTH_WOOD_MIN_TIER.get()),
      gateWormyEarthMallet: Number(C.BIO_PODEST_GATE_WORMY_EARTH_MALLET_MIN_TIER.get())
    };
  } catch (e) {
    return fallback;
  }
}

function sfdPct(v) {
  return `${Math.round((Number(v) || 0) * 100)}%`;
}

JEIEvents.hideItems(event => {
  event.hide('sfd_comets:comet_cache');
  event.hide('sfd_comets:bio_growth_paste_admin');
  event.hide('sfd_comets:bio_growth_paste_t3');
});

JEIEvents.information(event => {
  const cfg = sfdCfg();
  const failLine = cfg.failOutputEnabled
    ? `Fehlschlag-Trost: ${sfdPct(cfg.failOutputChance)} -> Earth Clump`
    : 'Fehlschlag-Trost: deaktiviert';

  event.addItem('sfd_comets:machine_bio_podest', [
    'BIO-PODEST (MOD-BLOCK):',
    '2 Eingänge + 3x3 Ausgabefeld.',
    'Verarbeitung stoppt nicht mehr durch vollen Einzel-Slot.',
    'Stage-Gates laufen über StageLootTier (Config).'
  ]);

  event.addItem('sfd_comets:soil_earth_block', [
    'Earth + Worm -> Wormy Earth',
    `Chance: ${sfdPct(cfg.earthWormChance)} | Min-Tier: ${cfg.gateEarthWorm}`,
    failLine
  ]);

  event.addItem('sfd_comets:bio_worm_bait', [
    'Podest-Route:',
    'Earth + Wurmköder -> Worm',
    `Chance: ${sfdPct(cfg.earthWormBaitChance)} | Min-Tier: ${cfg.gateEarthWormBait}`
  ]);

  event.addItem('sfd_comets:soil_wormy_earth_block', [
    'Podest-Routen:',
    `1) + Wood Shavings -> 1-2 Dried Worm | Min-Tier: ${cfg.gateWormyEarthWood}`,
    `2) + Crude Mallet -> Worm (${sfdPct(cfg.wormyEarthMalletChance)}) | Min-Tier: ${cfg.gateWormyEarthMallet}`,
    'Crude Mallet verliert Haltbarkeit statt Verbrauch.'
  ]);

  event.addItem('sfd_comets:tool_crude_mallet', [
    'Werkzeug für Stage-1 Boden/Wurm-Verarbeitung.',
    'Abbau von Wormy Earth: 60% Worm-Drop (Mallet erforderlich).',
    'Podest: Wormy Earth + Crude Mallet -> Worm (Config-Chance).'
  ]);

  event.addItem('sfd_comets:soil_raw_chunk', [
    'Drop-Quelle:',
    'Dirt mit Crude Mallet abbauen (Crushing-Tool-Tag).',
    'Nutzung: Stone-Kette (Pebble Cluster, Stone Grit, Rough Stone Mix).'
  ]);

  event.addItem('sfd_comets:bio_growth_paste_t1', [
    'Bio-Wachstumspaste:',
    'Verhält sich wie Knochenmehl.',
    'Normale Version verbraucht sich pro Nutzung.'
  ]);

  event.addItem('sfd_comets:bio_growth_paste_t2', [
    'Bio-Wachstumspaste T2:',
    'Upgrade aus 2x2 normaler Bio-Paste.',
    '8 Nutzungen (haltbar).'
  ]);
});
