package de.darkhope.sfd.core.ids;

import net.minecraft.resources.ResourceLocation;

public final class SfdBlockIds {
  public static final ResourceLocation BIO_PODEST = id(SfdMods.COMETS, "bio_podest");
  public static final ResourceLocation COMET_CACHE = id(SfdMods.COMETS, "comet_cache");
  public static final ResourceLocation EARTH_BLOCK = id(SfdMods.COMETS, "earth_block");
  public static final ResourceLocation WORMY_EARTH_BLOCK = id(SfdMods.COMETS, "wormy_earth_block");
  public static final ResourceLocation BARK_BLOCK = id(SfdMods.COMETS, "bark_block");
  public static final ResourceLocation WORMY_BARK_BLOCK = id(SfdMods.COMETS, "wormy_bark_block");
  public static final ResourceLocation HOLLOW_BARK_BLOCK = id(SfdMods.COMETS, "hollow_bark_block");
  public static final ResourceLocation TREATED_HOLLOW_BARK_BLOCK = id(SfdMods.COMETS, "treated_hollow_bark_block");
  public static final ResourceLocation PACKED_SOIL = id(SfdMods.COMETS, "packed_soil");
  public static final ResourceLocation BUILDER_EARTH_BLOCK = id(SfdMods.COMETS, "builder_earth_block");
  public static final ResourceLocation PODEST_STONE_BASE = id(SfdMods.COMETS, "podest_stone_base");

  public static final ResourceLocation KUBEJS_EARTH_BLOCK = id(SfdMods.KUBEJS, "earth_block");
  public static final ResourceLocation KUBEJS_BARK_BLOCK = id(SfdMods.KUBEJS, "bark_block");
  public static final ResourceLocation KUBEJS_WORMY_EARTH_BLOCK = id(SfdMods.KUBEJS, "wormy_earth_block");
  public static final ResourceLocation KUBEJS_WORMY_BARK_BLOCK = id(SfdMods.KUBEJS, "wormy_bark_block");
  public static final ResourceLocation KUBEJS_HOLLOW_BARK_BLOCK = id(SfdMods.KUBEJS, "hollow_bark_block");
  public static final ResourceLocation KUBEJS_TREATED_HOLLOW_BARK_BLOCK = id(SfdMods.KUBEJS, "treated_hollow_bark_block");
  public static final ResourceLocation KUBEJS_PODEST_STONE_BASE = id(SfdMods.KUBEJS, "podest_stone_base");

  private SfdBlockIds() {
  }

  private static ResourceLocation id(String namespace, String path) {
    return ResourceLocation.fromNamespaceAndPath(namespace, path);
  }
}
