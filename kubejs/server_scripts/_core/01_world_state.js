// World State Module
// Unified access to persistent server world flags.

(function () {
  if (global.SFDWorldState) return;

  const rootKey = global.SFD_STATE_ROOT_KEY || 'sfd';
  const keys = global.SFD_WORLD_STATE_KEYS || Object.freeze({
    WEATHER_UNLOCKED: 'sfd_weather_unlocked',
    COMET_UNLOCKED: 'sfd_comet_unlocked'
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
    return server.persistentData[key] === true;
  }

  function setLegacyFlat(server, key, value) {
    if (!server || !server.persistentData || !key) return;
    server.persistentData[key] = value === true;
  }

  function getValue(server, key) {
    if (!key) return false;
    const pd = getPersistentData(server);
    if (!pd) return false;
    const namespaced = getNamespacedKey(key);
    if (pd[namespaced] === true) return true;

    // Backward compatibility with old flat keys.
    const legacy = getLegacyFlat(server, key);
    if (legacy) {
      // One-way migration write to namespaced key.
      pd[namespaced] = true;
    }
    return legacy;
  }

  function setValue(server, key, value) {
    if (!key) return;
    const normalized = value === true;
    const pd = getPersistentData(server);
    if (pd) {
      pd[getNamespacedKey(key)] = normalized;
    }

    // Keep flat mirror for compatibility with legacy scripts/tools.
    setLegacyFlat(server, key, normalized);

    // Explicit bridge into mod-side world state (Phase-4 port).
    syncModBridge(server, key, normalized);
  }

  function resolveModBridge() {
    if (modBridgeClass) return modBridgeClass;
    try {
      modBridgeClass = Java.loadClass('de.darkhope.sfd.biobackpack.api.SfdWorldStateBridge');
    } catch (e) {
      modBridgeClass = null;
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
})();
