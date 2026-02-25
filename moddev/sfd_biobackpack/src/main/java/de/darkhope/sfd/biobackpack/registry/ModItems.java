package de.darkhope.sfd.biobackpack.registry;

import de.darkhope.sfd.biobackpack.SfdBioBackpackMod;
import de.darkhope.sfd.biobackpack.item.BioBackpackItem;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModItems {
  public static final DeferredRegister<Item> ITEMS =
      DeferredRegister.create(ForgeRegistries.ITEMS, SfdBioBackpackMod.MOD_ID);

  public static final RegistryObject<Item> BIO_BACKPACK = ITEMS.register(
      "bio_backpack",
      () -> new BioBackpackItem(new Item.Properties().stacksTo(1))
  );

  public static final RegistryObject<Item> BIO_PODEST = ITEMS.register(
      "bio_podest",
      () -> new BlockItem(ModBlocks.BIO_PODEST.get(), new Item.Properties())
  );

  private ModItems() {
  }
}
