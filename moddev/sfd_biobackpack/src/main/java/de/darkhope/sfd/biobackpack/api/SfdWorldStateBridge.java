package de.darkhope.sfd.biobackpack.api;

import de.darkhope.sfd.biobackpack.config.SfdConfig;
import de.darkhope.sfd.biobackpack.world.SfdWorldStateData;
import net.minecraft.server.MinecraftServer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public final class SfdWorldStateBridge {
  private static final Logger LOGGER = LogManager.getLogger();

  private SfdWorldStateBridge() {
  }

  public static void setWeatherUnlocked(MinecraftServer server, boolean unlocked) {
    if (server == null) return;
    SfdWorldStateData state = SfdWorldStateData.get(server);
    boolean old = state.isWeatherUnlocked();
    state.setWeatherUnlocked(unlocked);
    if (old != unlocked && SfdConfig.LOG_BRIDGE_SYNC.get()) {
      LOGGER.info("[SFD] Bridge sync: weatherUnlocked -> {}", unlocked);
    }
  }

  public static void setCometUnlocked(MinecraftServer server, boolean unlocked) {
    if (server == null) return;
    SfdWorldStateData state = SfdWorldStateData.get(server);
    boolean old = state.isCometUnlocked();
    state.setCometUnlocked(unlocked);
    if (old != unlocked && SfdConfig.LOG_BRIDGE_SYNC.get()) {
      LOGGER.info("[SFD] Bridge sync: cometUnlocked -> {}", unlocked);
    }
  }

  public static boolean isWeatherUnlocked(MinecraftServer server) {
    if (server == null) return false;
    return SfdWorldStateData.get(server).isWeatherUnlocked();
  }

  public static boolean isCometUnlocked(MinecraftServer server) {
    if (server == null) return false;
    return SfdWorldStateData.get(server).isCometUnlocked();
  }

  public static void setStageLootTier(MinecraftServer server, int tier) {
    if (server == null) return;
    SfdWorldStateData state = SfdWorldStateData.get(server);
    int old = state.getStageLootTier();
    state.setStageLootTier(tier);
    int next = state.getStageLootTier();
    if (old != next && SfdConfig.LOG_BRIDGE_SYNC.get()) {
      LOGGER.info("[SFD] Bridge sync: stageLootTier -> {}", next);
    }
  }

  public static int getStageLootTier(MinecraftServer server) {
    if (server == null) return 0;
    return SfdWorldStateData.get(server).getStageLootTier();
  }
}
