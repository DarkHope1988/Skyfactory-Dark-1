package de.darkhope.sfd.biobackpack;

import de.darkhope.sfd.biobackpack.client.BioBackpackScreen;
import de.darkhope.sfd.biobackpack.client.BioPodestScreen;
import de.darkhope.sfd.biobackpack.registry.ModBlockEntities;
import de.darkhope.sfd.biobackpack.registry.ModBlocks;
import de.darkhope.sfd.biobackpack.registry.ModItems;
import de.darkhope.sfd.biobackpack.registry.ModMenus;
import de.darkhope.sfd.biobackpack.world.SfdWorldStateData;
import net.minecraft.world.item.CreativeModeTabs;
import net.minecraft.server.MinecraftServer;
import net.minecraft.client.gui.screens.MenuScreens;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.event.BuildCreativeModeTabContentsEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(SfdBioBackpackMod.MOD_ID)
public class SfdBioBackpackMod {
  public static final String MOD_ID = "sfd_biobackpack";
  private static final Logger LOGGER = LogManager.getLogger();
  private static final int COMET_HEARTBEAT_INTERVAL_TICKS = 1200;

  public SfdBioBackpackMod() {
    IEventBus modBus = FMLJavaModLoadingContext.get().getModEventBus();
    ModBlocks.BLOCKS.register(modBus);
    ModBlockEntities.BLOCK_ENTITY_TYPES.register(modBus);
    ModItems.ITEMS.register(modBus);
    ModMenus.MENUS.register(modBus);
    modBus.addListener(this::buildCreativeTabContents);
    MinecraftForge.EVENT_BUS.register(this);
  }

  private void buildCreativeTabContents(BuildCreativeModeTabContentsEvent event) {
    if (event.getTabKey() == CreativeModeTabs.TOOLS_AND_UTILITIES) {
      event.accept(ModItems.BIO_BACKPACK.get());
    }
    if (event.getTabKey() == CreativeModeTabs.FUNCTIONAL_BLOCKS) {
      event.accept(ModItems.BIO_PODEST.get());
    }
  }

  @SubscribeEvent
  public void onServerStarting(ServerStartingEvent event) {
    SfdWorldStateData state = SfdWorldStateData.get(event.getServer());
    LOGGER.info("[SFD] WorldState initialized (weatherUnlocked={}, cometUnlocked={})",
        state.isWeatherUnlocked(), state.isCometUnlocked());
  }

  @SubscribeEvent
  public void onServerTick(TickEvent.ServerTickEvent event) {
    if (event.phase != TickEvent.Phase.END) return;

    MinecraftServer server = event.getServer();
    if (server == null) return;
    if (server.getTickCount() % COMET_HEARTBEAT_INTERVAL_TICKS != 0) return;

    SfdWorldStateData state = SfdWorldStateData.get(server);
    LOGGER.info("[SFD] Comet heartbeat tick (enabled={}, tick={})",
        state.isCometUnlocked(), server.getTickCount());
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
