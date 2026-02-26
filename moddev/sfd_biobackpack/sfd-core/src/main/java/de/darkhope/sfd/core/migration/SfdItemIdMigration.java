package de.darkhope.sfd.core.migration;

import de.darkhope.sfd.core.ids.SfdItemIds;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.registries.ForgeRegistries;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Collections;

public final class SfdItemIdMigration {
  private static final Map<ResourceLocation, ResourceLocation> LEGACY_TO_CURRENT = new LinkedHashMap<>();

  static {
    register(SfdItemIds.KUBEJS_WOOD_SHAVINGS, SfdItemIds.WOOD_SHAVINGS);
    register(SfdItemIds.KUBEJS_LEAF_THREADS, SfdItemIds.LEAF_THREADS);
    register(SfdItemIds.KUBEJS_LEAF_BUNDLE, SfdItemIds.LEAF_BUNDLE);
    register(SfdItemIds.KUBEJS_EARTH_CLUMP, SfdItemIds.EARTH_CLUMP);
    register(SfdItemIds.KUBEJS_WORM, SfdItemIds.WORM);
    register(SfdItemIds.KUBEJS_DRIED_WORM, SfdItemIds.DRIED_WORM);
    register(SfdItemIds.KUBEJS_TREE_BARK, SfdItemIds.TREE_BARK);
    register(SfdItemIds.KUBEJS_ORGANIC_ROD, SfdItemIds.ORGANIC_ROD);
    register(SfdItemIds.KUBEJS_SPROUT_MASH, SfdItemIds.SPROUT_MASH);
    register(SfdItemIds.KUBEJS_SURVIVAL_RATION, SfdItemIds.SURVIVAL_RATION);
    register(SfdItemIds.KUBEJS_RAW_FORAGE, SfdItemIds.RAW_FORAGE);
    register(SfdItemIds.KUBEJS_DRIED_FORAGE, SfdItemIds.DRIED_FORAGE);
    register(SfdItemIds.KUBEJS_WORM_BAIT, SfdItemIds.WORM_BAIT);
    register(SfdItemIds.KUBEJS_PROTEIN_CAKE, SfdItemIds.PROTEIN_CAKE);
    register(SfdItemIds.KUBEJS_ORGANIC_DUST, SfdItemIds.ORGANIC_DUST);
    register(SfdItemIds.KUBEJS_RESIN_FRAGMENT, SfdItemIds.RESIN_FRAGMENT);
    register(SfdItemIds.KUBEJS_LEAF_SHREDS, SfdItemIds.LEAF_SHREDS);
    register(SfdItemIds.KUBEJS_COMPOST_PILE, SfdItemIds.COMPOST_PILE);
    register(SfdItemIds.KUBEJS_COMPOST_PULP, SfdItemIds.COMPOST_PULP);
    register(SfdItemIds.KUBEJS_RAW_SOIL_CHUNK, SfdItemIds.RAW_SOIL_CHUNK);
    register(SfdItemIds.KUBEJS_PEBBLE_CLUSTER, SfdItemIds.PEBBLE_CLUSTER);
    register(SfdItemIds.KUBEJS_STONE_GRIT, SfdItemIds.STONE_GRIT);
    register(SfdItemIds.KUBEJS_ROUGH_STONE_MIX, SfdItemIds.ROUGH_STONE_MIX);
    register(SfdItemIds.KUBEJS_BARK_BRIQUETTE, SfdItemIds.BARK_BRIQUETTE);
    register(SfdItemIds.KUBEJS_ORGANIC_FIBER, SfdItemIds.ORGANIC_FIBER);
    register(SfdItemIds.KUBEJS_CRUDE_MALLET, SfdItemIds.CRUDE_MALLET);
    register(SfdItemIds.KUBEJS_BIO_GROWTH_PASTE, SfdItemIds.BIO_GROWTH_PASTE);
    register(SfdItemIds.KUBEJS_MICROBE_CULTURE, SfdItemIds.MICROBE_CULTURE);
    register(SfdItemIds.KUBEJS_HYDRO_SEED, SfdItemIds.HYDRO_SEED);
    register(SfdItemIds.KUBEJS_CONDENSED_WATER_CELL, SfdItemIds.CONDENSED_WATER_CELL);
    register(SfdItemIds.KUBEJS_ATMO_FILAMENT, SfdItemIds.ATMO_FILAMENT);
    register(SfdItemIds.KUBEJS_OXYGEN_MATRIX, SfdItemIds.OXYGEN_MATRIX);
    register(SfdItemIds.KUBEJS_METEORIC_SLAG, SfdItemIds.METEORIC_SLAG);
    register(SfdItemIds.KUBEJS_MINERAL_CATALYST, SfdItemIds.MINERAL_CATALYST);
    register(SfdItemIds.KUBEJS_RAW_METAL_LATTICE, SfdItemIds.RAW_METAL_LATTICE);
    register(SfdItemIds.KUBEJS_PROTO_IRON_CLUSTER, SfdItemIds.PROTO_IRON_CLUSTER);
    register(SfdItemIds.KUBEJS_PROTO_COPPER_CLUSTER, SfdItemIds.PROTO_COPPER_CLUSTER);
  }

  private SfdItemIdMigration() {
  }

  public static boolean hasLegacyItemId(ResourceLocation id) {
    return id != null && LEGACY_TO_CURRENT.containsKey(id);
  }

  public static ResourceLocation getMappedId(ResourceLocation legacyId) {
    if (legacyId == null) return null;
    return LEGACY_TO_CURRENT.get(legacyId);
  }

  public static Map<ResourceLocation, ResourceLocation> mappingView() {
    return Collections.unmodifiableMap(LEGACY_TO_CURRENT);
  }

  public static ItemStack remapIfNeeded(ItemStack source) {
    if (source == null || source.isEmpty()) return source;
    ResourceLocation currentId = ForgeRegistries.ITEMS.getKey(source.getItem());
    if (currentId == null) return source;

    ResourceLocation targetId = LEGACY_TO_CURRENT.get(currentId);
    if (targetId == null) return source;

    Item targetItem = ForgeRegistries.ITEMS.getValue(targetId);
    if (targetItem == null) return source;

    ItemStack target = new ItemStack(targetItem, source.getCount());
    if (source.hasTag()) {
      target.setTag(source.getTag().copy());
    }
    return target;
  }

  private static void register(ResourceLocation oldId, ResourceLocation newId) {
    LEGACY_TO_CURRENT.put(oldId, newId);
  }
}
