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

  private ModBlocks() {
  }
}


