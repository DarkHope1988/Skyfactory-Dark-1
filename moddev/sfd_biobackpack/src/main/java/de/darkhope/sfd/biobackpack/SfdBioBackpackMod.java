package de.darkhope.sfd.biobackpack;

import de.darkhope.sfd.biobackpack.client.BioBackpackScreen;
import de.darkhope.sfd.biobackpack.client.BioPodestScreen;
import de.darkhope.sfd.biobackpack.registry.ModBlockEntities;
import de.darkhope.sfd.biobackpack.registry.ModBlocks;
import de.darkhope.sfd.biobackpack.registry.ModItems;
import de.darkhope.sfd.biobackpack.registry.ModMenus;
import net.minecraft.world.item.CreativeModeTabs;
import net.minecraft.client.gui.screens.MenuScreens;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.event.BuildCreativeModeTabContentsEvent;

@Mod(SfdBioBackpackMod.MOD_ID)
public class SfdBioBackpackMod {
  public static final String MOD_ID = "sfd_biobackpack";

  public SfdBioBackpackMod() {
    IEventBus modBus = FMLJavaModLoadingContext.get().getModEventBus();
    ModBlocks.BLOCKS.register(modBus);
    ModBlockEntities.BLOCK_ENTITY_TYPES.register(modBus);
    ModItems.ITEMS.register(modBus);
    ModMenus.MENUS.register(modBus);
    modBus.addListener(this::buildCreativeTabContents);
  }

  private void buildCreativeTabContents(BuildCreativeModeTabContentsEvent event) {
    if (event.getTabKey() == CreativeModeTabs.TOOLS_AND_UTILITIES) {
      event.accept(ModItems.BIO_BACKPACK.get());
    }
    if (event.getTabKey() == CreativeModeTabs.FUNCTIONAL_BLOCKS) {
      event.accept(ModItems.BIO_PODEST.get());
    }
  }

  @Mod.EventBusSubscriber(modid = MOD_ID, bus = Mod.EventBusSubscriber.Bus.MOD, value = Dist.CLIENT)
  public static class ClientEvents {
    @SubscribeEvent
    public static void onClientSetup(FMLClientSetupEvent event) {
      event.enqueueWork(() ->
          {
            MenuScreens.register(ModMenus.BIO_BACKPACK_MENU.get(), BioBackpackScreen::new);
            MenuScreens.register(ModMenus.BIO_PODEST_MENU.get(), BioPodestScreen::new);
          }
      );
    }
  }
}
