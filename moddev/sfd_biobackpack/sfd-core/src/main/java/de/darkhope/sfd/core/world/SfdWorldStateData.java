package de.darkhope.sfd.core.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.Tag;
import net.minecraft.core.BlockPos;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.util.Mth;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.saveddata.SavedData;
import net.minecraft.world.level.storage.DimensionDataStorage;

import java.util.HashSet;
import java.util.Set;

public class SfdWorldStateData extends SavedData {
  public static final String DATA_NAME = "sfd_world_state";
  public static final String ROOT_KEY = "sfd";
  public static final String DATA_VERSION_KEY = "data_version";
  public static final int CURRENT_DATA_VERSION = 2;
  public static final String WEATHER_UNLOCKED_KEY = "sfd_weather_unlocked";
  public static final String COMET_UNLOCKED_KEY = "sfd_comet_unlocked";
  public static final String COMET_PHASE_KEY = "sfd_comet_phase";
  public static final String COMET_PHASE_TICKS_KEY = "sfd_comet_phase_ticks";
  public static final String COMET_IMPACT_X_KEY = "sfd_comet_impact_x";
  public static final String COMET_IMPACT_Y_KEY = "sfd_comet_impact_y";
  public static final String COMET_IMPACT_Z_KEY = "sfd_comet_impact_z";
  public static final String COMET_CHEST_POSITIONS_KEY = "sfd_comet_chest_positions";
  public static final String STAGE_LOOT_TIER_KEY = "sfd_stage_loot_tier";
  public static final String WORLD_STABILITY_KEY = "sfd_world_stability";

  private boolean weatherUnlocked;
  private boolean cometUnlocked;
  private String cometPhase = "cooldown";
  private int cometPhaseTicks = 24000;
  private int cometImpactX;
  private int cometImpactY = Integer.MIN_VALUE;
  private int cometImpactZ;
  private final Set<Long> cometChestPositions = new HashSet<>();
  private int stageLootTier;
  private int worldStability = 100;
  private int dataVersion = CURRENT_DATA_VERSION;

  public static SfdWorldStateData get(MinecraftServer server) {
    ServerLevel overworld = server.getLevel(Level.OVERWORLD);
    if (overworld == null) {
      throw new IllegalStateException("Overworld is not available");
    }
    DimensionDataStorage storage = overworld.getDataStorage();
    return storage.computeIfAbsent(SfdWorldStateData::load, SfdWorldStateData::new, DATA_NAME);
  }

  public static SfdWorldStateData load(CompoundTag tag) {
    SfdWorldStateData data = new SfdWorldStateData();

    // Primary format: nested root object.
    if (tag.contains(ROOT_KEY, Tag.TAG_COMPOUND)) {
      CompoundTag root = tag.getCompound(ROOT_KEY);
      data.dataVersion = root.contains(DATA_VERSION_KEY, Tag.TAG_INT)
          ? root.getInt(DATA_VERSION_KEY)
          : 1;
      data.weatherUnlocked = root.getBoolean(WEATHER_UNLOCKED_KEY);
      data.cometUnlocked = root.getBoolean(COMET_UNLOCKED_KEY);
      if (root.contains(COMET_PHASE_KEY, Tag.TAG_STRING)) {
        data.cometPhase = root.getString(COMET_PHASE_KEY);
      }
      if (root.contains(COMET_PHASE_TICKS_KEY, Tag.TAG_INT)) {
        data.cometPhaseTicks = root.getInt(COMET_PHASE_TICKS_KEY);
      }
      if (root.contains(COMET_IMPACT_X_KEY, Tag.TAG_INT)
          && root.contains(COMET_IMPACT_Y_KEY, Tag.TAG_INT)
          && root.contains(COMET_IMPACT_Z_KEY, Tag.TAG_INT)) {
        data.cometImpactX = root.getInt(COMET_IMPACT_X_KEY);
        data.cometImpactY = root.getInt(COMET_IMPACT_Y_KEY);
        data.cometImpactZ = root.getInt(COMET_IMPACT_Z_KEY);
      }
      for (long packed : root.getLongArray(COMET_CHEST_POSITIONS_KEY)) {
        data.cometChestPositions.add(packed);
      }
      if (root.contains(STAGE_LOOT_TIER_KEY, Tag.TAG_INT)) {
        data.stageLootTier = root.getInt(STAGE_LOOT_TIER_KEY);
      }
      if (root.contains(WORLD_STABILITY_KEY, Tag.TAG_INT)) {
        data.worldStability = root.getInt(WORLD_STABILITY_KEY);
      }
      data.runDataMigrations();
      return data;
    }

    // Legacy fallback: flat keys.
    data.dataVersion = 1;
    data.weatherUnlocked = tag.getBoolean(WEATHER_UNLOCKED_KEY);
    data.cometUnlocked = tag.getBoolean(COMET_UNLOCKED_KEY);
    if (tag.contains(COMET_PHASE_KEY, Tag.TAG_STRING)) {
      data.cometPhase = tag.getString(COMET_PHASE_KEY);
    }
    if (tag.contains(COMET_PHASE_TICKS_KEY, Tag.TAG_INT)) {
      data.cometPhaseTicks = tag.getInt(COMET_PHASE_TICKS_KEY);
    }
    if (tag.contains(COMET_IMPACT_X_KEY, Tag.TAG_INT)
        && tag.contains(COMET_IMPACT_Y_KEY, Tag.TAG_INT)
        && tag.contains(COMET_IMPACT_Z_KEY, Tag.TAG_INT)) {
      data.cometImpactX = tag.getInt(COMET_IMPACT_X_KEY);
      data.cometImpactY = tag.getInt(COMET_IMPACT_Y_KEY);
      data.cometImpactZ = tag.getInt(COMET_IMPACT_Z_KEY);
    }
    for (long packed : tag.getLongArray(COMET_CHEST_POSITIONS_KEY)) {
      data.cometChestPositions.add(packed);
    }
    if (tag.contains(STAGE_LOOT_TIER_KEY, Tag.TAG_INT)) {
      data.stageLootTier = tag.getInt(STAGE_LOOT_TIER_KEY);
    }
    if (tag.contains(WORLD_STABILITY_KEY, Tag.TAG_INT)) {
      data.worldStability = tag.getInt(WORLD_STABILITY_KEY);
    }
    data.runDataMigrations();
    return data;
  }

  @Override
  public CompoundTag save(CompoundTag tag) {
    CompoundTag root = new CompoundTag();
    root.putInt(DATA_VERSION_KEY, dataVersion);
    root.putBoolean(WEATHER_UNLOCKED_KEY, weatherUnlocked);
    root.putBoolean(COMET_UNLOCKED_KEY, cometUnlocked);
    root.putString(COMET_PHASE_KEY, cometPhase);
    root.putInt(COMET_PHASE_TICKS_KEY, cometPhaseTicks);
    if (hasCometImpactTarget()) {
      root.putInt(COMET_IMPACT_X_KEY, cometImpactX);
      root.putInt(COMET_IMPACT_Y_KEY, cometImpactY);
      root.putInt(COMET_IMPACT_Z_KEY, cometImpactZ);
    }
    if (!cometChestPositions.isEmpty()) {
      long[] chestArray = new long[cometChestPositions.size()];
      int idx = 0;
      for (long packed : cometChestPositions) {
        chestArray[idx++] = packed;
      }
      root.putLongArray(COMET_CHEST_POSITIONS_KEY, chestArray);
    }
    root.putInt(STAGE_LOOT_TIER_KEY, stageLootTier);
    root.putInt(WORLD_STABILITY_KEY, worldStability);
    tag.put(ROOT_KEY, root);

    // Keep legacy mirrors while KubeJS side still reads/writes flat keys.
    tag.putBoolean(WEATHER_UNLOCKED_KEY, weatherUnlocked);
    tag.putBoolean(COMET_UNLOCKED_KEY, cometUnlocked);
    tag.putString(COMET_PHASE_KEY, cometPhase);
    tag.putInt(COMET_PHASE_TICKS_KEY, cometPhaseTicks);
    if (hasCometImpactTarget()) {
      tag.putInt(COMET_IMPACT_X_KEY, cometImpactX);
      tag.putInt(COMET_IMPACT_Y_KEY, cometImpactY);
      tag.putInt(COMET_IMPACT_Z_KEY, cometImpactZ);
    }
    if (!cometChestPositions.isEmpty()) {
      long[] chestArray = new long[cometChestPositions.size()];
      int idx = 0;
      for (long packed : cometChestPositions) {
        chestArray[idx++] = packed;
      }
      tag.putLongArray(COMET_CHEST_POSITIONS_KEY, chestArray);
    }
    tag.putInt(STAGE_LOOT_TIER_KEY, stageLootTier);
    tag.putInt(WORLD_STABILITY_KEY, worldStability);
    return tag;
  }

  private void runDataMigrations() {
    if (dataVersion < 2) {
      // v2: clamp invalid values from legacy scripts and normalize defaults.
      stageLootTier = Math.max(0, stageLootTier);
      worldStability = Mth.clamp(worldStability, 0, 100);
      if (cometPhase == null || cometPhase.isEmpty()) {
        cometPhase = "cooldown";
      }
      cometPhaseTicks = Math.max(1, cometPhaseTicks);
      dataVersion = 2;
    }
    if (dataVersion > CURRENT_DATA_VERSION) {
      // Future save opened by older code: keep values, just avoid downgrade writes.
      dataVersion = CURRENT_DATA_VERSION;
    }
  }

  public boolean isWeatherUnlocked() {
    return weatherUnlocked;
  }

  public void setWeatherUnlocked(boolean weatherUnlocked) {
    if (this.weatherUnlocked == weatherUnlocked) return;
    this.weatherUnlocked = weatherUnlocked;
    setDirty();
  }

  public boolean isCometUnlocked() {
    return cometUnlocked;
  }

  public void setCometUnlocked(boolean cometUnlocked) {
    if (this.cometUnlocked == cometUnlocked) return;
    this.cometUnlocked = cometUnlocked;
    setDirty();
  }

  public String getCometPhase() {
    return cometPhase;
  }

  public int getCometPhaseTicks() {
    return cometPhaseTicks;
  }

  public void setCometPhase(String cometPhase) {
    if (cometPhase == null || cometPhase.isEmpty()) return;
    if (this.cometPhase.equals(cometPhase)) return;
    this.cometPhase = cometPhase;
    setDirty();
  }

  public void setCometPhaseTicks(int cometPhaseTicks) {
    int safe = Math.max(1, cometPhaseTicks);
    if (this.cometPhaseTicks == safe) return;
    this.cometPhaseTicks = safe;
    setDirty();
  }

  public boolean hasCometImpactTarget() {
    return cometImpactY != Integer.MIN_VALUE;
  }

  public int getCometImpactX() {
    return cometImpactX;
  }

  public int getCometImpactY() {
    return cometImpactY;
  }

  public int getCometImpactZ() {
    return cometImpactZ;
  }

  public void setCometImpactTarget(int x, int y, int z) {
    int safeY = Math.max(-2048, y);
    if (hasCometImpactTarget()
        && cometImpactX == x
        && cometImpactY == safeY
        && cometImpactZ == z) {
      return;
    }
    cometImpactX = x;
    cometImpactY = safeY;
    cometImpactZ = z;
    setDirty();
  }

  public void clearCometImpactTarget() {
    if (!hasCometImpactTarget()) return;
    cometImpactY = Integer.MIN_VALUE;
    setDirty();
  }

  public void addCometChestPos(BlockPos pos) {
    if (pos == null) return;
    if (cometChestPositions.add(pos.asLong())) {
      setDirty();
    }
  }

  public boolean isCometChestPos(BlockPos pos) {
    if (pos == null) return false;
    return cometChestPositions.contains(pos.asLong());
  }

  public boolean removeCometChestPos(BlockPos pos) {
    if (pos == null) return false;
    boolean removed = cometChestPositions.remove(pos.asLong());
    if (removed) {
      setDirty();
    }
    return removed;
  }

  public int getStageLootTier() {
    return Math.max(0, stageLootTier);
  }

  public void setStageLootTier(int stageLootTier) {
    int safe = Math.max(0, stageLootTier);
    if (this.stageLootTier == safe) return;
    this.stageLootTier = safe;
    setDirty();
  }

  public int getWorldStability() {
    return Mth.clamp(worldStability, 0, 100);
  }

  public void setWorldStability(int worldStability) {
    int safe = Mth.clamp(worldStability, 0, 100);
    if (this.worldStability == safe) return;
    this.worldStability = safe;
    setDirty();
  }

  public void addWorldStability(int delta) {
    if (delta == 0) return;
    setWorldStability(getWorldStability() + delta);
  }

  public static final class CometTransition {
    private final String from;
    private final String to;
    private final int ticks;

    public CometTransition(String from, String to, int ticks) {
      this.from = from;
      this.to = to;
      this.ticks = ticks;
    }

    public String from() {
      return from;
    }

    public String to() {
      return to;
    }

    public int ticks() {
      return ticks;
    }

    @Override
    public String toString() {
      return from + " -> " + to + " (ticks=" + ticks + ")";
    }
  }

  // Skeleton state machine: cooldown -> warning -> impact -> recovery -> cooldown
  // Returns transition object or null if no phase transition happened.
  public CometTransition tickCometController(int tickDelta, int cooldownTicks, int warningTicks, int impactTicks, int recoveryTicks) {
    if (!cometUnlocked) return null;
    int delta = Math.max(1, tickDelta);
    if (cometPhaseTicks > 0) {
      cometPhaseTicks = Math.max(0, cometPhaseTicks - delta);
      setDirty();
      return null;
    }

    String from = cometPhase;
    switch (cometPhase) {
      case "cooldown" -> {
        cometPhase = "warning";
        cometPhaseTicks = warningTicks;
      }
      case "warning" -> {
        cometPhase = "impact";
        cometPhaseTicks = impactTicks;
      }
      case "impact" -> {
        cometPhase = "recovery";
        cometPhaseTicks = recoveryTicks;
      }
      default -> {
        cometPhase = "cooldown";
        cometPhaseTicks = cooldownTicks;
      }
    }
    setDirty();
    return new CometTransition(from, cometPhase, cometPhaseTicks);
  }

  // Phase-4 bridge: sync mod state from KubeJS persistentData flags.
  // Reads both namespaced (sfd__...) and legacy flat keys.
  public boolean syncFromPersistentFlags(CompoundTag rootTag) {
    boolean changed = false;

    boolean weatherFromPersistent = readFlag(rootTag, WEATHER_UNLOCKED_KEY);
    if (weatherFromPersistent != weatherUnlocked) {
      weatherUnlocked = weatherFromPersistent;
      changed = true;
    }

    boolean cometFromPersistent = readFlag(rootTag, COMET_UNLOCKED_KEY);
    if (cometFromPersistent != cometUnlocked) {
      cometUnlocked = cometFromPersistent;
      changed = true;
    }

    if (changed) {
      setDirty();
    }
    return changed;
  }

  private static boolean readFlag(CompoundTag rootTag, String flatKey) {
    if (rootTag == null) return false;
    String namespaced = ROOT_KEY + "__" + flatKey;
    return rootTag.getBoolean(namespaced) || rootTag.getBoolean(flatKey);
  }
}
