package de.darkhope.sfd.comets.registry;

import de.darkhope.sfd.comets.SfdCometsMod;
import de.darkhope.sfd.comets.item.BioGrowthPasteItem;
import de.darkhope.sfd.comets.item.CometFieldPackItem;
import net.minecraft.world.food.FoodProperties;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

public class ModItems {
  public static final DeferredRegister<Item> ITEMS =
      DeferredRegister.create(ForgeRegistries.ITEMS, SfdCometsMod.MOD_ID);

  public static final RegistryObject<Item> BIO_BACKPACK = ITEMS.register(
      "bio_backpack",
      () -> new CometFieldPackItem(new Item.Properties().stacksTo(1))
  );

  public static final RegistryObject<Item> WOOD_SHAVINGS = simple("wood_shavings");
  public static final RegistryObject<Item> LEAF_THREADS = simple("leaf_threads");
  public static final RegistryObject<Item> LEAF_BUNDLE = simple("leaf_bundle");
  public static final RegistryObject<Item> EARTH_CLUMP = simple("earth_clump");
  public static final RegistryObject<Item> WORM = simple("worm");
  public static final RegistryObject<Item> DRIED_WORM = simple("dried_worm");
  public static final RegistryObject<Item> TREE_BARK = simple("tree_bark");
  public static final RegistryObject<Item> ORGANIC_ROD = tool("organic_rod", 96);
  public static final RegistryObject<Item> SPROUT_MASH = food("sprout_mash", 2, 0.2f);
  public static final RegistryObject<Item> SURVIVAL_RATION = food("survival_ration", 4, 0.5f);
  public static final RegistryObject<Item> RAW_FORAGE = simple("raw_forage");
  public static final RegistryObject<Item> DRIED_FORAGE = food("dried_forage", 5, 0.7f);
  public static final RegistryObject<Item> WORM_BAIT = simple("worm_bait");
  public static final RegistryObject<Item> PROTEIN_CAKE = food("protein_cake", 7, 0.9f);

  public static final RegistryObject<Item> ORGANIC_DUST = simple("organic_dust");
  public static final RegistryObject<Item> RESIN_FRAGMENT = simple("resin_fragment");
  public static final RegistryObject<Item> LEAF_SHREDS = simple("leaf_shreds");
  public static final RegistryObject<Item> COMPOST_PILE = simple("compost_pile");
  public static final RegistryObject<Item> COMPOST_PULP = simple("compost_pulp");
  public static final RegistryObject<Item> RAW_SOIL_CHUNK = simple("raw_soil_chunk");
  public static final RegistryObject<Item> PEBBLE_CLUSTER = simple("pebble_cluster");
  public static final RegistryObject<Item> STONE_GRIT = simple("stone_grit");
  public static final RegistryObject<Item> ROUGH_STONE_MIX = simple("rough_stone_mix");
  public static final RegistryObject<Item> BARK_BRIQUETTE = simple("bark_briquette");
  public static final RegistryObject<Item> ORGANIC_FIBER = simple("organic_fiber");

  public static final RegistryObject<Item> MICROBE_CULTURE = simple("microbe_culture");
  public static final RegistryObject<Item> HYDRO_SEED = simple("hydro_seed");
  public static final RegistryObject<Item> CONDENSED_WATER_CELL = simple("condensed_water_cell");
  public static final RegistryObject<Item> ATMO_FILAMENT = simple("atmo_filament");
  public static final RegistryObject<Item> OXYGEN_MATRIX = simple("oxygen_matrix");
  public static final RegistryObject<Item> METEORIC_SLAG = simple("meteoric_slag");
  public static final RegistryObject<Item> MINERAL_CATALYST = simple("mineral_catalyst");
  public static final RegistryObject<Item> RAW_METAL_LATTICE = simple("raw_metal_lattice");
  public static final RegistryObject<Item> PROTO_IRON_CLUSTER = simple("proto_iron_cluster");
  public static final RegistryObject<Item> PROTO_COPPER_CLUSTER = simple("proto_copper_cluster");
  public static final RegistryObject<Item> PLANETARY_ANCHOR = simple("planetary_anchor");
  public static final RegistryObject<Item> DIMENSIONAL_GATEWAY_CORE = simple("dimensional_gateway_core");
  public static final RegistryObject<Item> INTERDIMENSIONAL_GATEWAY_CORE = simple("interdimensional_gateway_core");
  public static final RegistryObject<Item> GATEWAY_ATTUNEMENT_MAP = ITEMS.register(
      "gateway_attunement_map",
      () -> new Item(new Item.Properties().stacksTo(1))
  );
  public static final RegistryObject<Item> CRUDE_MALLET = tool("crude_mallet", 128);

  public static final RegistryObject<Item> BIO_PODEST = ITEMS.register(
      "bio_podest",
      () -> new BlockItem(ModBlocks.BIO_PODEST.get(), new Item.Properties())
  );

  public static final RegistryObject<Item> COMET_CACHE = ITEMS.register(
      "comet_cache",
      () -> new BlockItem(ModBlocks.COMET_CACHE.get(), new Item.Properties())
  );

  public static final RegistryObject<Item> EARTH_BLOCK = block("earth_block", ModBlocks.EARTH_BLOCK);
  public static final RegistryObject<Item> WORMY_EARTH_BLOCK = block("wormy_earth_block", ModBlocks.WORMY_EARTH_BLOCK);
  public static final RegistryObject<Item> BARK_BLOCK = block("bark_block", ModBlocks.BARK_BLOCK);
  public static final RegistryObject<Item> WORMY_BARK_BLOCK = block("wormy_bark_block", ModBlocks.WORMY_BARK_BLOCK);
  public static final RegistryObject<Item> HOLLOW_BARK_BLOCK = block("hollow_bark_block", ModBlocks.HOLLOW_BARK_BLOCK);
  public static final RegistryObject<Item> TREATED_HOLLOW_BARK_BLOCK = block("treated_hollow_bark_block", ModBlocks.TREATED_HOLLOW_BARK_BLOCK);
  public static final RegistryObject<Item> PACKED_SOIL = block("packed_soil", ModBlocks.PACKED_SOIL);
  public static final RegistryObject<Item> BUILDER_EARTH_BLOCK = block("builder_earth_block", ModBlocks.BUILDER_EARTH_BLOCK);
  public static final RegistryObject<Item> PODEST_STONE_BASE = block("podest_stone_base", ModBlocks.PODEST_STONE_BASE);

  public static final RegistryObject<Item> BIO_GROWTH_PASTE = ITEMS.register(
      "bio_growth_paste",
      () -> new BioGrowthPasteItem(new Item.Properties(), BioGrowthPasteItem.Mode.CONSUME)
  );

  public static final RegistryObject<Item> BIO_GROWTH_PASTE_ADMIN = ITEMS.register(
      "bio_growth_paste_admin",
      () -> new BioGrowthPasteItem(new Item.Properties().stacksTo(1), BioGrowthPasteItem.Mode.INFINITE)
  );

  public static final RegistryObject<Item> BIO_GROWTH_PASTE_T2 = ITEMS.register(
      "bio_growth_paste_t2",
      () -> new BioGrowthPasteItem(new Item.Properties().stacksTo(1).durability(8), BioGrowthPasteItem.Mode.CHARGES)
  );

  public static final RegistryObject<Item> BIO_GROWTH_PASTE_T3 = ITEMS.register(
      "bio_growth_paste_t3",
      () -> new BioGrowthPasteItem(new Item.Properties().stacksTo(1).durability(16), BioGrowthPasteItem.Mode.CHARGES)
  );

  private static RegistryObject<Item> simple(String id) {
    return ITEMS.register(id, () -> new Item(new Item.Properties()));
  }

  private static RegistryObject<Item> tool(String id, int durability) {
    return ITEMS.register(id, () -> new Item(new Item.Properties().durability(durability)));
  }

  private static RegistryObject<Item> food(String id, int hunger, float saturation) {
    return ITEMS.register(
        id,
        () -> new Item(
            new Item.Properties().food(
                new FoodProperties.Builder()
                    .nutrition(hunger)
                    .saturationMod(saturation)
                    .build()
            )
        )
    );
  }

  private static RegistryObject<Item> block(String id, RegistryObject<net.minecraft.world.level.block.Block> block) {
    return ITEMS.register(id, () -> new BlockItem(block.get(), new Item.Properties()));
  }

  private ModItems() {
  }
}


