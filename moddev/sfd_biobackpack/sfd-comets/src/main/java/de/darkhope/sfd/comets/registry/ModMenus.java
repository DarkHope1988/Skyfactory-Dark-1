package de.darkhope.sfd.comets.registry;

import de.darkhope.sfd.comets.SfdCometsMod;
import de.darkhope.sfd.comets.menu.CometCacheMenu;
import de.darkhope.sfd.comets.menu.CometFieldPackMenu;
import de.darkhope.sfd.comets.menu.CometPodestMenu;
import net.minecraft.world.inventory.MenuType;
import net.minecraftforge.common.extensions.IForgeMenuType;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModMenus {
  public static final DeferredRegister<MenuType<?>> MENUS =
      DeferredRegister.create(ForgeRegistries.MENU_TYPES, SfdCometsMod.MOD_ID);

  public static final RegistryObject<MenuType<CometFieldPackMenu>> BIO_BACKPACK_MENU = MENUS.register(
      "bio_backpack",
      () -> IForgeMenuType.create(CometFieldPackMenu::new)
  );

  public static final RegistryObject<MenuType<CometPodestMenu>> BIO_PODEST_MENU = MENUS.register(
      "bio_podest",
      () -> IForgeMenuType.create(CometPodestMenu::new)
  );

  public static final RegistryObject<MenuType<CometCacheMenu>> COMET_CACHE_MENU = MENUS.register(
      "comet_cache",
      () -> IForgeMenuType.create(CometCacheMenu::new)
  );

  private ModMenus() {
  }
}


