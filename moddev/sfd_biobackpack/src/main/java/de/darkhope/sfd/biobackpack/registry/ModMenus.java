package de.darkhope.sfd.biobackpack.registry;

import de.darkhope.sfd.biobackpack.SfdBioBackpackMod;
import de.darkhope.sfd.biobackpack.menu.BioBackpackMenu;
import de.darkhope.sfd.biobackpack.menu.BioPodestMenu;
import net.minecraft.world.inventory.MenuType;
import net.minecraftforge.common.extensions.IForgeMenuType;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModMenus {
  public static final DeferredRegister<MenuType<?>> MENUS =
      DeferredRegister.create(ForgeRegistries.MENU_TYPES, SfdBioBackpackMod.MOD_ID);

  public static final RegistryObject<MenuType<BioBackpackMenu>> BIO_BACKPACK_MENU = MENUS.register(
      "bio_backpack",
      () -> IForgeMenuType.create(BioBackpackMenu::new)
  );

  public static final RegistryObject<MenuType<BioPodestMenu>> BIO_PODEST_MENU = MENUS.register(
      "bio_podest",
      () -> IForgeMenuType.create(BioPodestMenu::new)
  );

  private ModMenus() {
  }
}
