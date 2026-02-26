package de.darkhope.sfd.comets.registry;

import de.darkhope.sfd.comets.SfdCometsMod;
import de.darkhope.sfd.comets.block.CometCacheBlock;
import de.darkhope.sfd.comets.block.CometPodestBlock;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.material.MapColor;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModBlocks {
  public static final DeferredRegister<Block> BLOCKS =
      DeferredRegister.create(ForgeRegistries.BLOCKS, SfdCometsMod.MOD_ID);

  public static final RegistryObject<Block> BIO_PODEST = BLOCKS.register(
      "bio_podest",
      () -> new CometPodestBlock(BlockBehaviour.Properties.of()
          .mapColor(MapColor.WOOD)
          .strength(1.0F, 2.0F)
          .sound(SoundType.WOOD))
  );

  public static final RegistryObject<Block> COMET_CACHE = BLOCKS.register(
      "comet_cache",
      () -> new CometCacheBlock(BlockBehaviour.Properties.of()
          .mapColor(MapColor.COLOR_BLACK)
          .strength(2.5F, 6.0F)
          .sound(SoundType.AMETHYST)
          .noOcclusion())
  );

  public static final RegistryObject<Block> EARTH_BLOCK = BLOCKS.register(
      "earth_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.DIRT)
          .strength(0.6F, 0.6F)
          .sound(SoundType.GRAVEL))
  );

  public static final RegistryObject<Block> WORMY_EARTH_BLOCK = BLOCKS.register(
      "wormy_earth_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.DIRT)
          .strength(0.6F, 0.6F)
          .sound(SoundType.GRAVEL))
  );

  public static final RegistryObject<Block> BARK_BLOCK = BLOCKS.register(
      "bark_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.WOOD)
          .strength(0.8F, 0.8F)
          .sound(SoundType.WOOD))
  );

  public static final RegistryObject<Block> WORMY_BARK_BLOCK = BLOCKS.register(
      "wormy_bark_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.WOOD)
          .strength(0.8F, 0.8F)
          .sound(SoundType.WOOD))
  );

  public static final RegistryObject<Block> HOLLOW_BARK_BLOCK = BLOCKS.register(
      "hollow_bark_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.WOOD)
          .strength(0.8F, 0.8F)
          .sound(SoundType.WOOD))
  );

  public static final RegistryObject<Block> TREATED_HOLLOW_BARK_BLOCK = BLOCKS.register(
      "treated_hollow_bark_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.WOOD)
          .strength(0.8F, 0.8F)
          .sound(SoundType.WOOD))
  );

  public static final RegistryObject<Block> PACKED_SOIL = BLOCKS.register(
      "packed_soil",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.DIRT)
          .strength(0.8F, 0.8F)
          .sound(SoundType.GRAVEL))
  );

  public static final RegistryObject<Block> BUILDER_EARTH_BLOCK = BLOCKS.register(
      "builder_earth_block",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.DIRT)
          .strength(0.8F, 1.0F)
          .sound(SoundType.GRAVEL))
  );

  public static final RegistryObject<Block> PODEST_STONE_BASE = BLOCKS.register(
      "podest_stone_base",
      () -> new Block(BlockBehaviour.Properties.of()
          .mapColor(MapColor.STONE)
          .strength(1.4F, 2.0F)
          .sound(SoundType.STONE))
  );

  private ModBlocks() {
  }
}


