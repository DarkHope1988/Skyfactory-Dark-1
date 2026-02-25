package de.darkhope.sfd.biobackpack.world;

import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.Tag;
import net.minecraft.server.MinecraftServer;
import net.minecraft.world.level.saveddata.SavedData;
import net.minecraft.world.level.storage.DimensionDataStorage;

public class SfdWorldStateData extends SavedData {
  public static final String DATA_NAME = "sfd_world_state";
  public static final String ROOT_KEY = "sfd";
  public static final String WEATHER_UNLOCKED_KEY = "sfd_weather_unlocked";
  public static final String COMET_UNLOCKED_KEY = "sfd_comet_unlocked";

  private boolean weatherUnlocked;
  private boolean cometUnlocked;

  public static SfdWorldStateData get(MinecraftServer server) {
    DimensionDataStorage storage = server.overworld().getDataStorage();
    return storage.computeIfAbsent(SfdWorldStateData::load, SfdWorldStateData::new, DATA_NAME);
  }

  public static SfdWorldStateData load(CompoundTag tag) {
    SfdWorldStateData data = new SfdWorldStateData();

    // Primary format: nested root object.
    if (tag.contains(ROOT_KEY, Tag.TAG_COMPOUND)) {
      CompoundTag root = tag.getCompound(ROOT_KEY);
      data.weatherUnlocked = root.getBoolean(WEATHER_UNLOCKED_KEY);
      data.cometUnlocked = root.getBoolean(COMET_UNLOCKED_KEY);
      return data;
    }

    // Legacy fallback: flat keys.
    data.weatherUnlocked = tag.getBoolean(WEATHER_UNLOCKED_KEY);
    data.cometUnlocked = tag.getBoolean(COMET_UNLOCKED_KEY);
    return data;
  }

  @Override
  public CompoundTag save(CompoundTag tag) {
    CompoundTag root = new CompoundTag();
    root.putBoolean(WEATHER_UNLOCKED_KEY, weatherUnlocked);
    root.putBoolean(COMET_UNLOCKED_KEY, cometUnlocked);
    tag.put(ROOT_KEY, root);

    // Keep legacy mirrors while KubeJS side still reads/writes flat keys.
    tag.putBoolean(WEATHER_UNLOCKED_KEY, weatherUnlocked);
    tag.putBoolean(COMET_UNLOCKED_KEY, cometUnlocked);
    return tag;
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
}
