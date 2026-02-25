package de.darkhope.sfd.biobackpack.registry;

import de.darkhope.sfd.biobackpack.SfdBioBackpackMod;
import de.darkhope.sfd.biobackpack.block.BioPodestBlock;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.material.MapColor;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModBlocks {
  public static final DeferredRegister<Block> BLOCKS =
      DeferredRegister.create(ForgeRegistries.BLOCKS, SfdBioBackpackMod.MOD_ID);

  public static final RegistryObject<Block> BIO_PODEST = BLOCKS.register(
      "bio_podest",
      () -> new BioPodestBlock(BlockBehaviour.Properties.of()
          .mapColor(MapColor.WOOD)
          .strength(1.0F, 2.0F)
          .sound(SoundType.WOOD))
  );

  private ModBlocks() {
  }
}
