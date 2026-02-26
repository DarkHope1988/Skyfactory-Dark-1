package de.darkhope.sfd.comets.registry;

import de.darkhope.sfd.comets.blockentity.CometCacheBlockEntity;
import de.darkhope.sfd.comets.SfdCometsMod;
import de.darkhope.sfd.comets.blockentity.CometPodestBlockEntity;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModBlockEntities {
  public static final DeferredRegister<BlockEntityType<?>> BLOCK_ENTITY_TYPES =
      DeferredRegister.create(ForgeRegistries.BLOCK_ENTITY_TYPES, SfdCometsMod.MOD_ID);

  public static final RegistryObject<BlockEntityType<CometPodestBlockEntity>> BIO_PODEST = BLOCK_ENTITY_TYPES.register(
      "machine_bio_podest",
      () -> BlockEntityType.Builder.of(CometPodestBlockEntity::new, ModBlocks.BIO_PODEST.get()).build(null)
  );

  public static final RegistryObject<BlockEntityType<CometCacheBlockEntity>> COMET_CACHE = BLOCK_ENTITY_TYPES.register(
      "comet_cache",
      () -> BlockEntityType.Builder.of(CometCacheBlockEntity::new, ModBlocks.COMET_CACHE.get()).build(null)
  );

  private ModBlockEntities() {
  }
}


