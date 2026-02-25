package de.darkhope.sfd.biobackpack.registry;

import de.darkhope.sfd.biobackpack.SfdBioBackpackMod;
import de.darkhope.sfd.biobackpack.blockentity.BioPodestBlockEntity;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModBlockEntities {
  public static final DeferredRegister<BlockEntityType<?>> BLOCK_ENTITY_TYPES =
      DeferredRegister.create(ForgeRegistries.BLOCK_ENTITY_TYPES, SfdBioBackpackMod.MOD_ID);

  public static final RegistryObject<BlockEntityType<BioPodestBlockEntity>> BIO_PODEST = BLOCK_ENTITY_TYPES.register(
      "bio_podest",
      () -> BlockEntityType.Builder.of(BioPodestBlockEntity::new, ModBlocks.BIO_PODEST.get()).build(null)
  );

  private ModBlockEntities() {
  }
}
