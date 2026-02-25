// World State Module
// Unified access to persistent server world flags.

(function () {
  if (global.SFDWorldState) return;

  const rootKey = global.SFD_STATE_ROOT_KEY || 'sfd';
  const keys = global.SFD_WORLD_STATE_KEYS || Object.freeze({
    WEATHER_UNLOCKED: 'sfd_weather_unlocked',
    COMET_UNLOCKED: 'sfd_comet_unlocked',
    STAGE_LOOT_TIER: 'sfd_stage_loot_tier',
    WORLD_STABILITY: 'sfd_world_stability',
    WATER_CYCLE_UNLOCKED: 'sfd_water_cycle_unlocked',
    ATMOSPHERE_UNLOCKED: 'sfd_atmosphere_unlocked',
    PLANETARY_STABILIZED: 'sfd_planetary_stabilized',
    PLANET_STATUS: 'sfd_planet_status'
  });
  let modBridgeClass = null;

  function getPersistentData(server) {
    if (!server || !server.persistentData) return null;
    return server.persistentData;
  }

  function getNamespacedKey(key) {
    return `${rootKey}__${key}`;
  }

  function getLegacyFlat(server, key) {
    if (!server || !server.persistentData || !key) return false;
    return server.persistentData[key];
  }

  function setLegacyFlat(server, key, value) {
    if (!server || !server.persistentData || !key) return;
    server.persistentData[key] = value;
  }

  function getValue(server, key) {
    if (!key) return false;
    const pd = getPersistentData(server);
    if (!pd) return false;
    const namespaced = getNamespacedKey(key);
    if (pd[namespaced] !== undefined) return pd[namespaced];

    // Backward compatibility with old flat keys.
    const legacy = getLegacyFlat(server, key);
    if (legacy !== undefined) {
      // One-way migration write to namespaced key.
      pd[namespaced] = legacy;
    }
    return legacy;
  }

  function setValue(server, key, value) {
    if (!key) return;
    const pd = getPersistentData(server);
    if (pd) {
      pd[getNamespacedKey(key)] = value;
    }

    // Keep flat mirror for compatibility with legacy scripts/tools.
    setLegacyFlat(server, key, value);

    // Explicit bridge into mod-side world state (Phase-4 port).
    syncModBridge(server, key, value);
  }

  function resolveModBridge() {
    if (modBridgeClass) return modBridgeClass;
    try {
      modBridgeClass = Java.loadClass('de.darkhope.sfd.core.api.SfdWorldStateBridge');
    } catch (e) {
      try {
        modBridgeClass = Java.loadClass('de.darkhope.sfd.biobackpack.api.SfdWorldStateBridge');
      } catch (ignored) {
        modBridgeClass = null;
      }
    }
    return modBridgeClass;
  }

  function syncModBridge(server, key, value) {
    if (!server || !key) return;
    const bridge = resolveModBridge();
    if (!bridge) return;

    try {
      if (key === keys.WEATHER_UNLOCKED) {
        bridge.setWeatherUnlocked(server, value === true);
      } else if (key === keys.COMET_UNLOCKED) {
        bridge.setCometUnlocked(server, value === true);
      } else if (key === keys.STAGE_LOOT_TIER) {
        bridge.setStageLootTier(server, Number(value) || 0);
      } else if (key === keys.WORLD_STABILITY) {
        bridge.setWorldStability(server, Number(value) || 0);
      }
    } catch (e) {
      // Ignore bridge errors to keep KubeJS logic robust.
    }
  }

  global.SFDWorldState = {
    rootKey: rootKey,
    keys: keys,

    get(server, key) {
      return getValue(server, key);
    },

    set(server, key, value) {
      setValue(server, key, value);
    },

    isWeatherUnlocked(server) {
      return this.get(server, keys.WEATHER_UNLOCKED);
    },

    isCometUnlocked(server) {
      return this.get(server, keys.COMET_UNLOCKED);
    },

    setWeatherUnlocked(server, unlocked) {
      this.set(server, keys.WEATHER_UNLOCKED, unlocked === true);
      global.sfdWeatherUnlocked = unlocked === true;
    },

    setCometUnlocked(server, unlocked) {
      this.set(server, keys.COMET_UNLOCKED, unlocked === true);
    },

    getStageLootTier(server) {
      return Number(this.get(server, keys.STAGE_LOOT_TIER) || 0);
    },

    setStageLootTier(server, tier) {
      const value = Math.max(0, Number(tier) || 0);
      const pd = getPersistentData(server);
      if (pd) pd[getNamespacedKey(keys.STAGE_LOOT_TIER)] = value;
      setLegacyFlat(server, keys.STAGE_LOOT_TIER, value);
      syncModBridge(server, keys.STAGE_LOOT_TIER, value);
    },

    getWorldStability(server) {
      const value = Number(this.get(server, keys.WORLD_STABILITY));
      return Number.isFinite(value) ? value : 100;
    },

    setWorldStability(server, stability) {
      const value = Math.max(0, Math.min(100, Number(stability) || 0));
      const pd = getPersistentData(server);
      if (pd) pd[getNamespacedKey(keys.WORLD_STABILITY)] = value;
      setLegacyFlat(server, keys.WORLD_STABILITY, value);
      syncModBridge(server, keys.WORLD_STABILITY, value);
    },

    isWaterCycleUnlocked(server) {
      return this.get(server, keys.WATER_CYCLE_UNLOCKED) === true;
    },

    setWaterCycleUnlocked(server, unlocked) {
      this.set(server, keys.WATER_CYCLE_UNLOCKED, unlocked === true);
    },

    isAtmosphereUnlocked(server) {
      return this.get(server, keys.ATMOSPHERE_UNLOCKED) === true;
    },

    setAtmosphereUnlocked(server, unlocked) {
      this.set(server, keys.ATMOSPHERE_UNLOCKED, unlocked === true);
    },

    isPlanetaryStabilized(server) {
      return this.get(server, keys.PLANETARY_STABILIZED) === true;
    },

    setPlanetaryStabilized(server, stabilized) {
      this.set(server, keys.PLANETARY_STABILIZED, stabilized === true);
    },

    getPlanetStatus(server) {
      const fallback = (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.STERILE) || 'sterile';
      const value = this.get(server, keys.PLANET_STATUS);
      return typeof value === 'string' && value.length > 0 ? value : fallback;
    },

    setPlanetStatus(server, status) {
      const fallback = (global.SFD_PLANET_STATUS && global.SFD_PLANET_STATUS.STERILE) || 'sterile';
      const value = typeof status === 'string' && status.length > 0 ? status : fallback;
      this.set(server, keys.PLANET_STATUS, value);
    }
  };

  // Legacy bridge functions for existing call sites.
  if (!global.sfdGetWorldFlag) {
    global.sfdGetWorldFlag = function (server, key) {
      return global.SFDWorldState.get(server, key);
    };
  }
  if (!global.sfdSetWorldFlag) {
    global.sfdSetWorldFlag = function (server, key, value) {
      global.SFDWorldState.set(server, key, value === true);
    };
  }
  if (!global.sfdIsWeatherUnlocked) {
    global.sfdIsWeatherUnlocked = function (server) {
      return global.SFDWorldState.isWeatherUnlocked(server);
    };
  }
  if (!global.sfdIsCometUnlocked) {
    global.sfdIsCometUnlocked = function (server) {
      return global.SFDWorldState.isCometUnlocked(server);
    };
  }
  if (!global.sfdSetWeatherUnlocked) {
    global.sfdSetWeatherUnlocked = function (server, unlocked) {
      global.SFDWorldState.setWeatherUnlocked(server, unlocked === true);
    };
  }
  if (!global.sfdSetCometUnlocked) {
    global.sfdSetCometUnlocked = function (server, unlocked) {
      global.SFDWorldState.setCometUnlocked(server, unlocked === true);
    };
  }
  if (!global.sfdSetWaterCycleUnlocked) {
    global.sfdSetWaterCycleUnlocked = function (server, unlocked) {
      global.SFDWorldState.setWaterCycleUnlocked(server, unlocked === true);
    };
  }
  if (!global.sfdSetAtmosphereUnlocked) {
    global.sfdSetAtmosphereUnlocked = function (server, unlocked) {
      global.SFDWorldState.setAtmosphereUnlocked(server, unlocked === true);
    };
  }
  if (!global.sfdSetPlanetaryStabilized) {
    global.sfdSetPlanetaryStabilized = function (server, stabilized) {
      global.SFDWorldState.setPlanetaryStabilized(server, stabilized === true);
    };
  }
  if (!global.sfdSetPlanetStatus) {
    global.sfdSetPlanetStatus = function (server, status) {
      global.SFDWorldState.setPlanetStatus(server, status);
    };
  }
})();
