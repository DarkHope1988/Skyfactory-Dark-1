package de.darkhope.sfd.comets;

import de.darkhope.sfd.comets.client.CometFieldPackScreen;
import de.darkhope.sfd.comets.client.CometCacheScreen;
import de.darkhope.sfd.comets.client.CometPodestScreen;
import de.darkhope.sfd.comets.blockentity.CometCacheBlockEntity;
import de.darkhope.sfd.comets.config.SfdConfig;
import de.darkhope.sfd.comets.registry.ModBlockEntities;
import de.darkhope.sfd.comets.registry.ModBlocks;
import de.darkhope.sfd.comets.registry.ModItems;
import de.darkhope.sfd.comets.registry.ModMenus;
import de.darkhope.sfd.core.world.SfdWorldStateData;
import com.mojang.brigadier.arguments.BoolArgumentType;
import com.mojang.brigadier.arguments.IntegerArgumentType;
import com.mojang.brigadier.context.CommandContext;
import net.minecraft.commands.CommandSourceStack;
import net.minecraft.commands.Commands;
import net.minecraft.core.BlockPos;
import net.minecraft.core.Direction;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.network.chat.Component;
import net.minecraft.server.MinecraftServer;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.util.Mth;
import net.minecraft.world.phys.Vec3;
import net.minecraft.world.entity.Entity;
import net.minecraft.world.entity.EntityType;
import net.minecraft.world.entity.LightningBolt;
import net.minecraft.world.entity.animal.horse.TraderLlama;
import net.minecraft.world.entity.monster.Monster;
import net.minecraft.world.entity.monster.Phantom;
import net.minecraft.world.entity.npc.WanderingTrader;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.CreativeModeTabs;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.GameRules;
import net.minecraft.world.level.levelgen.Heightmap;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.ClipContext;
import net.minecraft.world.level.storage.loot.LootParams;
import net.minecraft.world.level.storage.loot.LootTable;
import net.minecraft.world.level.storage.loot.parameters.LootContextParamSets;
import net.minecraft.world.level.storage.loot.parameters.LootContextParams;
import net.minecraft.world.phys.BlockHitResult;
import net.minecraft.world.phys.HitResult;
import net.minecraft.client.gui.screens.MenuScreens;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.TickEvent;
import net.minecraftforge.event.level.BlockEvent;
import net.minecraftforge.event.entity.EntityJoinLevelEvent;
import net.minecraftforge.event.RegisterCommandsEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.ModLoadingContext;
import net.minecraftforge.fml.config.ModConfig;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.event.BuildCreativeModeTabContentsEvent;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.registries.ForgeRegistries;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.util.List;
import java.util.function.Supplier;

@Mod(SfdCometsMod.MOD_ID)
public class SfdCometsMod {
  public static final String MOD_ID = "sfd_comets";
  public static final String MOD_BRAND = "SFD Comet Systems";
  private static final Logger LOGGER = LogManager.getLogger();
  private static final String WORLD_RULES_JVM_OVERRIDE_KEY = "sfd.port.worldrules";
  private static final FallbackLootEntry[] COMET_FALLBACK_LOOT = new FallbackLootEntry[]{
      new FallbackLootEntry("kubejs:microbe_culture", 1, 2),
      new FallbackLootEntry("kubejs:meteoric_slag", 1, 3),
      new FallbackLootEntry("kubejs:mineral_catalyst", 1, 2),
      new FallbackLootEntry("kubejs:raw_metal_lattice", 1, 2),
      new FallbackLootEntry("kubejs:proto_iron_cluster", 1, 2),
      new FallbackLootEntry("kubejs:proto_copper_cluster", 1, 2),
      new FallbackLootEntry("kubejs:hydro_seed", 1, 2),
      new FallbackLootEntry("kubejs:condensed_water_cell", 1, 2),
      new FallbackLootEntry("kubejs:atmo_filament", 1, 2),
      new FallbackLootEntry("kubejs:oxygen_matrix", 1, 2),
      new FallbackLootEntry("minecraft:bone_meal", 2, 12),
      new FallbackLootEntry("minecraft:clay_ball", 2, 10),
      new FallbackLootEntry("minecraft:redstone", 3, 12),
      new FallbackLootEntry("minecraft:quartz", 2, 8),
      new FallbackLootEntry("minecraft:iron_nugget", 4, 16),
      new FallbackLootEntry("minecraft:copper_ingot", 1, 4)
  };

  public SfdCometsMod() {
    ModLoadingContext.get().registerConfig(ModConfig.Type.COMMON, SfdConfig.SPEC);
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
    LOGGER.info("[{}] Starting mod bootstrap", MOD_BRAND);
    SfdWorldStateData state = SfdWorldStateData.get(event.getServer());
    LOGGER.info("[SFD] WorldState initialized (weatherUnlocked={}, cometUnlocked={}, cometPhase={}, phaseTicks={}, stageLootTier={})",
        state.isWeatherUnlocked(), state.isCometUnlocked(), state.getCometPhase(), state.getCometPhaseTicks(), state.getStageLootTier());

    if (isWorldRulesPortEnabled()) {
      applyBaseWorldRules(event.getServer());
      enforceWorldStatePolicies(event.getServer(), state);
      if (SfdConfig.LOG_WORLD_RULES_ENABLED.get()) {
        String source = hasWorldRulesJvmOverride() ? "jvm override" : "config";
        LOGGER.info("[SFD] World-rules port enabled (source={})", source);
      }
    }
  }

  @SubscribeEvent
  public void onServerTick(TickEvent.ServerTickEvent event) {
    if (event.phase != TickEvent.Phase.END) return;

    MinecraftServer server = event.getServer();
    if (server == null) return;
    int tick = server.getTickCount();

    SfdWorldStateData state = SfdWorldStateData.get(server);
    int controllerInterval = getPositive(SfdConfig.COMET_CONTROLLER_TICK_INTERVAL.get());
    if (SfdConfig.COMET_CONTROLLER_ENABLED.get() && tick % controllerInterval == 0) {
      SfdWorldStateData.CometTransition transition = state.tickCometController(
          controllerInterval,
          getPositive(SfdConfig.COMET_COOLDOWN_TICKS.get()),
          getPositive(SfdConfig.COMET_WARNING_TICKS.get()),
          getPositive(SfdConfig.COMET_IMPACT_TICKS.get()),
          getPositive(SfdConfig.COMET_RECOVERY_TICKS.get()));
      if (transition != null) {
        if ("warning".equals(transition.to())) {
          prepareCometImpactTarget(server, state);
        } else if ("impact".equals(transition.to())) {
          spawnImpactLightning(server, state);
        } else if ("recovery".equals(transition.to())) {
          state.clearCometImpactTarget();
        }
        if (SfdConfig.LOG_COMET_TRANSITIONS.get()) {
          LOGGER.info("[SFD] Comet phase transition: {}", transition);
        }
      }
    }

    if (SfdConfig.COMET_HEARTBEAT_ENABLED.get()
        && tick % getPositive(SfdConfig.COMET_HEARTBEAT_INTERVAL_TICKS.get()) == 0
        && SfdConfig.LOG_COMET_HEARTBEAT.get()) {
      LOGGER.info("[SFD] Comet heartbeat tick (enabled={}, tick={})",
          state.isCometUnlocked(), tick);
    }

    if (tick % 1200 == 0) {
      int regen = Math.max(0, SfdConfig.WORLD_STABILITY_REGEN_PER_MINUTE.get());
      if (regen > 0) {
        state.addWorldStability(regen);
      }
    }

    if (!isWorldRulesPortEnabled()) return;
    if (tick % getPositive(SfdConfig.WORLD_RULES_INTERVAL_TICKS.get()) != 0) return;

    applyBaseWorldRules(server);
    enforceWorldStatePolicies(server, state);
  }

  @SubscribeEvent
  public void onEntityJoinLevel(EntityJoinLevelEvent event) {
    if (!isWorldRulesPortEnabled() || event.getLevel().isClientSide()) return;
    if (!(event.getLevel() instanceof ServerLevel serverLevel)) return;

    SfdWorldStateData state = SfdWorldStateData.get(serverLevel.getServer());
    Entity entity = event.getEntity();

    if (SfdConfig.BLOCK_PHANTOMS_UNTIL_COMET_UNLOCK.get() && !state.isCometUnlocked() && entity instanceof Phantom) {
      event.setCanceled(true);
      return;
    }

    if (SfdConfig.BLOCK_HOSTILE_SPAWNS.get() && entity instanceof Monster) {
      event.setCanceled(true);
      return;
    }

    if (SfdConfig.BLOCK_TRADER_ENTITIES.get() && (entity instanceof WanderingTrader || entity instanceof TraderLlama)) {
      event.setCanceled(true);
    }
  }

  @SubscribeEvent
  public void onBlockBreak(BlockEvent.BreakEvent event) {
    if (!(event.getLevel() instanceof ServerLevel serverLevel)) return;

    MinecraftServer server = serverLevel.getServer();
    SfdWorldStateData state = SfdWorldStateData.get(server);
    BlockPos pos = event.getPos();
    if (!state.isCometChestPos(pos)) return;

    state.removeCometChestPos(pos);

    if (SfdConfig.COMET_IMPACT_CHEST_NO_DROP.get()) {
      serverLevel.setBlock(pos, Blocks.AIR.defaultBlockState(), 3);
      event.setCanceled(true);
    }
  }

  @SubscribeEvent
  public void onRegisterCommands(RegisterCommandsEvent event) {
    if (!SfdConfig.DEBUG_COMMANDS_ENABLED.get()) {
      return;
    }

    event.getDispatcher().register(
        Commands.literal("sfdstate")
            .requires(src -> src.hasPermission(SfdConfig.DEBUG_COMMAND_PERMISSION_LEVEL.get()))
            .then(Commands.literal("show")
                .executes(this::runSfdStateShow))
            .then(Commands.literal("weather")
                .then(Commands.argument("value", BoolArgumentType.bool())
                    .executes(ctx -> runSfdStateSetWeather(ctx, BoolArgumentType.getBool(ctx, "value")))))
            .then(Commands.literal("comet")
                .then(Commands.argument("value", BoolArgumentType.bool())
                    .executes(ctx -> runSfdStateSetComet(ctx, BoolArgumentType.getBool(ctx, "value")))))
            .then(Commands.literal("impacttest")
                .executes(ctx -> runSfdImpactTest(ctx, null))
                .then(Commands.argument("tier", IntegerArgumentType.integer(0, 6))
                    .executes(ctx -> runSfdImpactTest(ctx, IntegerArgumentType.getInteger(ctx, "tier")))))
            .then(Commands.literal("phase")
                .then(Commands.literal("reset")
                    .executes(this::runSfdStateResetPhase))));
  }

  private static void applyBaseWorldRules(MinecraftServer server) {
    for (ServerLevel level : server.getAllLevels()) {
      if (SfdConfig.ENFORCE_DO_MOB_SPAWNING_FALSE.get()) {
        level.getGameRules().getRule(GameRules.RULE_DOMOBSPAWNING).set(false, server);
      }
      if (SfdConfig.ENFORCE_DO_TRADER_SPAWNING_FALSE.get()) {
        level.getGameRules().getRule(GameRules.RULE_DO_TRADER_SPAWNING).set(false, server);
      }
      if (SfdConfig.ENFORCE_DO_PATROL_SPAWNING_FALSE.get()) {
        level.getGameRules().getRule(GameRules.RULE_DO_PATROL_SPAWNING).set(false, server);
      }
      if (SfdConfig.ENFORCE_WEATHER_CYCLE_FALSE.get()) {
        level.getGameRules().getRule(GameRules.RULE_WEATHER_CYCLE).set(false, server);
      }
    }
  }

  private static void enforceWorldStatePolicies(MinecraftServer server, SfdWorldStateData state) {
    ServerLevel overworld = server.overworld();

    if (!state.isWeatherUnlocked()) {
      // Lock weather to clear until stage policy unlocks weather.
      overworld.setWeatherParameters(getPositive(SfdConfig.CLEAR_WEATHER_DURATION_TICKS.get()), 0, false, false);
    }

    if (SfdConfig.BLOCK_PHANTOMS_UNTIL_COMET_UNLOCK.get() && !state.isCometUnlocked()) {
      server.getCommands().performPrefixedCommand(
          server.createCommandSourceStack().withSuppressedOutput(),
          "kill @e[type=minecraft:phantom]");
    }
  }

  private static boolean hasWorldRulesJvmOverride() {
    return System.getProperty(WORLD_RULES_JVM_OVERRIDE_KEY) != null;
  }

  private static boolean isWorldRulesPortEnabled() {
    String override = System.getProperty(WORLD_RULES_JVM_OVERRIDE_KEY);
    if (override != null) {
      return Boolean.parseBoolean(override);
    }
    return SfdConfig.WORLD_RULES_PORT_ENABLED.get();
  }

  private static int getPositive(int value) {
    return Math.max(1, value);
  }

  private static void prepareCometImpactTarget(MinecraftServer server, SfdWorldStateData state) {
    ServerLevel overworld = server.overworld();

    List<ServerPlayer> players = server.getPlayerList()
        .getPlayers()
        .stream()
        .filter(p -> p.level() == overworld && !p.isSpectator())
        .toList();

    int baseX;
    int baseZ;
    if (!players.isEmpty()) {
      ServerPlayer anchor = players.get(overworld.random.nextInt(players.size()));
      baseX = anchor.blockPosition().getX();
      baseZ = anchor.blockPosition().getZ();
    } else {
      BlockPos spawn = overworld.getSharedSpawnPos();
      baseX = spawn.getX();
      baseZ = spawn.getZ();
    }

    int minRadius = Math.max(0, SfdConfig.COMET_IMPACT_TARGET_MIN_RADIUS_BLOCKS.get());
    int maxRadius = Math.max(minRadius, SfdConfig.COMET_IMPACT_TARGET_MAX_RADIUS_BLOCKS.get());
    int chosen = (maxRadius == minRadius)
        ? maxRadius
        : Mth.nextInt(overworld.random, minRadius, maxRadius);
    double angle = overworld.random.nextDouble() * (Math.PI * 2.0D);

    int targetX = baseX + (int) Math.round(Math.cos(angle) * chosen);
    int targetZ = baseZ + (int) Math.round(Math.sin(angle) * chosen);
    int targetY = overworld.getHeight(Heightmap.Types.MOTION_BLOCKING, targetX, targetZ);
    targetY = Math.max(overworld.getMinBuildHeight() + 1, targetY);
    state.setCometImpactTarget(targetX, targetY, targetZ);
  }

  private static void spawnImpactLightning(MinecraftServer server, SfdWorldStateData state) {
    spawnImpactLightning(server, state, null);
  }

  private static void spawnImpactLightning(MinecraftServer server, SfdWorldStateData state, Integer forcedTier) {
    if (!SfdConfig.COMET_IMPACT_LIGHTNING_ENABLED.get()) {
      return;
    }

    ServerLevel overworld = server.overworld();
    if (!state.hasCometImpactTarget()) {
      prepareCometImpactTarget(server, state);
    }

    if (!state.hasCometImpactTarget()) {
      return;
    }

    int x = state.getCometImpactX();
    int y = state.getCometImpactY();
    int z = state.getCometImpactZ();
    boolean damageEnabled = SfdConfig.COMET_IMPACT_DAMAGE_ENABLED.get();

    int bolts = getPositive(SfdConfig.COMET_IMPACT_LIGHTNING_BOLTS.get());
    for (int i = 0; i < bolts; i++) {
      LightningBolt bolt = EntityType.LIGHTNING_BOLT.create(overworld);
      if (bolt == null) continue;
      bolt.moveTo(x + 0.5D, y, z + 0.5D);
      bolt.setVisualOnly(!(damageEnabled && SfdConfig.COMET_IMPACT_LIGHTNING_REAL.get()));
      overworld.addFreshEntity(bolt);
    }

    BlockPos spawnedChestPos = null;
    if (SfdConfig.COMET_IMPACT_CHEST_ENABLED.get()) {
      spawnedChestPos = trySpawnImpactChest(overworld, state, new BlockPos(x, y, z));
      if (spawnedChestPos != null) {
        fillImpactChestLoot(overworld, spawnedChestPos, forcedTier);
        if (damageEnabled
            && SfdConfig.COMET_IMPACT_BLOCK_DAMAGE_ENABLED.get()
            && SfdConfig.COMET_IMPACT_CRATER_ENABLED.get()) {
          createImpactCrater(overworld, spawnedChestPos);
        }
      }
    }

    LOGGER.info("[{}] Comet impact lightning at ({}, {}, {}) with {} bolt(s)", MOD_BRAND, x, y, z, bolts);
    int stabilityDamage = Math.max(0, SfdConfig.WORLD_STABILITY_IMPACT_DAMAGE.get());
    if (stabilityDamage > 0) {
      state.addWorldStability(-stabilityDamage);
      LOGGER.info("[{}] World stability now {} (impact damage {})", MOD_BRAND, state.getWorldStability(), stabilityDamage);
    }
    if (spawnedChestPos == null) {
      LOGGER.info("[{}] No impact chest spawned (missing stable support at impact target)", MOD_BRAND);
    } else {
      LOGGER.info("[{}] Impact chest spawned at ({}, {}, {})", MOD_BRAND, spawnedChestPos.getX(), spawnedChestPos.getY(), spawnedChestPos.getZ());
    }
  }

  private static BlockPos trySpawnImpactChest(ServerLevel level, SfdWorldStateData state, BlockPos target) {
    BlockPos[] candidates = SfdConfig.COMET_IMPACT_CHEST_FALLBACK_TO_ABOVE.get()
        ? new BlockPos[]{target, target.above()}
        : new BlockPos[]{target};
    for (BlockPos pos : candidates) {
      BlockPos below = pos.below();
      boolean emptyAtPos = level.isEmptyBlock(pos);
      boolean solidSupport = !SfdConfig.COMET_IMPACT_CHEST_REQUIRE_STABLE_SUPPORT.get()
          || level.getBlockState(below).isFaceSturdy(level, below, Direction.UP);
      if (!emptyAtPos || !solidSupport) {
        continue;
      }
      level.setBlockAndUpdate(pos, ModBlocks.COMET_CACHE.get().defaultBlockState());
      state.addCometChestPos(pos);
      return pos;
    }
    return null;
  }

  private static void fillImpactChestLoot(ServerLevel level, BlockPos chestPos, Integer forcedTier) {
    BlockEntity be = level.getBlockEntity(chestPos);
    if (!(be instanceof CometCacheBlockEntity chest)) {
      return;
    }

    int stacks = getPositive(SfdConfig.COMET_IMPACT_CHEST_LOOT_STACKS.get());
    int rawTier = forcedTier != null ? Math.max(0, forcedTier) : SfdWorldStateData.get(level.getServer()).getStageLootTier();
    int tier = clampLootTier(rawTier);
    ResourceLocation tableId = new ResourceLocation(MOD_ID, "chests/comet_tier_" + tier);
    LootTable table = level.getServer().getLootData().getLootTable(tableId);
    LootParams params = new LootParams.Builder(level)
        .withParameter(LootContextParams.ORIGIN, Vec3.atCenterOf(chestPos))
        .create(LootContextParamSets.CHEST);
    List<ItemStack> generated = table.getRandomItems(params);

    if (!generated.isEmpty()) {
      int size = chest.getContainerSize();
      int[] order = new int[size];
      for (int i = 0; i < size; i++) order[i] = i;
      for (int i = size - 1; i > 0; i--) {
        int j = level.random.nextInt(i + 1);
        int tmp = order[i];
        order[i] = order[j];
        order[j] = tmp;
      }

      int idx = 0;
      for (int slotIdx = 0; slotIdx < size && idx < generated.size() && idx < stacks; slotIdx++) {
        int slot = order[slotIdx];
        if (!chest.getItem(slot).isEmpty()) continue;
        chest.setItem(slot, generated.get(idx++));
      }
      chest.setChanged();
      return;
    }

    // Safety fallback if loot table is missing/empty. Keep it aligned with comet progression IDs.
    for (int i = 0; i < stacks; i++) {
      int slot = level.random.nextInt(chest.getContainerSize());
      if (!chest.getItem(slot).isEmpty()) {
        continue;
      }
      ItemStack stack = createCometFallbackStack(level);
      if (stack.isEmpty()) {
        continue;
      }
      chest.setItem(slot, stack);
    }
    chest.setChanged();
  }

  private static ItemStack createCometFallbackStack(ServerLevel level) {
    for (int i = 0; i < COMET_FALLBACK_LOOT.length; i++) {
      FallbackLootEntry entry = COMET_FALLBACK_LOOT[level.random.nextInt(COMET_FALLBACK_LOOT.length)];
      ItemStack stack = entry.create(level);
      if (!stack.isEmpty()) {
        return stack;
      }
    }
    return ItemStack.EMPTY;
  }

  private static void createImpactCrater(ServerLevel level, BlockPos center) {
    int radius = Math.max(1, SfdConfig.COMET_IMPACT_CRATER_RADIUS.get());
    int depth = Math.max(1, SfdConfig.COMET_IMPACT_CRATER_DEPTH.get());
    int radiusSq = radius * radius;

    for (int dx = -radius; dx <= radius; dx++) {
      for (int dz = -radius; dz <= radius; dz++) {
        int distSq = dx * dx + dz * dz;
        if (distSq > radiusSq) {
          continue;
        }

        double distNorm = Math.sqrt(distSq) / radius;
        int localDepth = Math.max(1, (int) Math.round((1.0D - distNorm) * depth));
        int x = center.getX() + dx;
        int z = center.getZ() + dz;
        int topY = level.getHeight(Heightmap.Types.MOTION_BLOCKING, x, z) - 1;

        for (int d = 0; d < localDepth; d++) {
          int y = topY - d;
          BlockPos pos = new BlockPos(x, y, z);
          if (pos.equals(center)) {
            continue;
          }
          if (y <= level.getMinBuildHeight()) {
            break;
          }

          var state = level.getBlockState(pos);
          if (state.isAir() || state.is(Blocks.BEDROCK) || state.getDestroySpeed(level, pos) < 0) {
            continue;
          }
          level.setBlock(pos, Blocks.AIR.defaultBlockState(), 3);
        }
      }
    }
  }

  private int runSfdStateShow(CommandContext<CommandSourceStack> ctx) {
    MinecraftServer server = ctx.getSource().getServer();
    SfdWorldStateData state = SfdWorldStateData.get(server);
    ctx.getSource().sendSuccess(
        () -> Component.literal(String.format(
            "[SFD] weatherUnlocked=%s, cometUnlocked=%s, cometPhase=%s, phaseTicks=%d",
            state.isWeatherUnlocked(), state.isCometUnlocked(), state.getCometPhase(), state.getCometPhaseTicks())),
        false);
    return 1;
  }

  private int runSfdStateSetWeather(CommandContext<CommandSourceStack> ctx, boolean value) {
    MinecraftServer server = ctx.getSource().getServer();
    SfdWorldStateData state = SfdWorldStateData.get(server);
    state.setWeatherUnlocked(value);
    ctx.getSource().sendSuccess(() -> Component.literal("[SFD] weatherUnlocked -> " + value), true);
    return 1;
  }

  private int runSfdStateSetComet(CommandContext<CommandSourceStack> ctx, boolean value) {
    MinecraftServer server = ctx.getSource().getServer();
    SfdWorldStateData state = SfdWorldStateData.get(server);
    state.setCometUnlocked(value);
    ctx.getSource().sendSuccess(() -> Component.literal("[SFD] cometUnlocked -> " + value), true);
    return 1;
  }

  private int runSfdStateResetPhase(CommandContext<CommandSourceStack> ctx) {
    MinecraftServer server = ctx.getSource().getServer();
    SfdWorldStateData state = SfdWorldStateData.get(server);
    state.setCometPhase("cooldown");
    state.setCometPhaseTicks(getPositive(SfdConfig.COMET_COOLDOWN_TICKS.get()));
    state.clearCometImpactTarget();
    ctx.getSource().sendSuccess(
        () -> Component.literal("[SFD] comet phase reset -> cooldown (" + state.getCometPhaseTicks() + " ticks)"),
        true);
    return 1;
  }

  private int runSfdImpactTest(CommandContext<CommandSourceStack> ctx, Integer forcedTier) {
    if (!(ctx.getSource().getEntity() instanceof ServerPlayer player)) {
      ctx.getSource().sendFailure(Component.literal("[SFD] impacttest is player-only"));
      return 0;
    }
    ServerLevel level = player.serverLevel();
    MinecraftServer server = level.getServer();
    SfdWorldStateData state = SfdWorldStateData.get(server);
    int testDistance = getPositive(SfdConfig.COMET_IMPACT_TEST_DISTANCE_BLOCKS.get());

    var eye = player.getEyePosition();
    var look = player.getLookAngle();
    var end = eye.add(look.scale(testDistance));
    BlockHitResult hit = level.clip(new ClipContext(
        eye,
        end,
        ClipContext.Block.OUTLINE,
        ClipContext.Fluid.NONE,
        player));
    if (hit.getType() != HitResult.Type.BLOCK) {
      ctx.getSource().sendFailure(Component.literal(
          "[SFD] no block in sight (max " + testDistance + " blocks), nothing spawned"));
      return 0;
    }

    BlockPos lookedPos = hit.getBlockPos();
    int x = lookedPos.getX();
    int y = Math.max(level.getMinBuildHeight() + 1, lookedPos.getY());
    int z = lookedPos.getZ();
    final int fx = x;
    final int fy = y;
    final int fz = z;
    final int ftier = forcedTier == null ? -1 : Math.max(0, forcedTier);
    final int effectiveTier = ftier < 0 ? clampLootTier(state.getStageLootTier()) : clampLootTier(ftier);

    state.setCometImpactTarget(x, y, z);
    spawnImpactLightning(server, state, forcedTier);
    ctx.getSource().sendSuccess(
        () -> Component.literal(ftier < 0
            ? "[SFD] manual impact test at (" + fx + ", " + fy + ", " + fz + "), tier=" + effectiveTier
            : "[SFD] manual impact test at (" + fx + ", " + fy + ", " + fz + "), requestedTier=" + ftier + ", effectiveTier=" + effectiveTier),
        true);
    return 1;
  }

  private static int clampLootTier(int tier) {
    int configuredMinTier = Math.max(0, SfdConfig.COMET_IMPACT_MIN_LOOT_TIER.get());
    int configuredMaxTier = Math.max(configuredMinTier, SfdConfig.COMET_IMPACT_MAX_LOOT_TIER.get());
    return Mth.clamp(Math.max(0, tier), configuredMinTier, configuredMaxTier);
  }

  @Mod.EventBusSubscriber(modid = MOD_ID, bus = Mod.EventBusSubscriber.Bus.MOD, value = Dist.CLIENT)
  public static class ClientEvents {
    @SubscribeEvent
    public static void onClientSetup(FMLClientSetupEvent event) {
      event.enqueueWork(() ->
          {
            MenuScreens.register(ModMenus.BIO_BACKPACK_MENU.get(), CometFieldPackScreen::new);
            MenuScreens.register(ModMenus.BIO_PODEST_MENU.get(), CometPodestScreen::new);
            MenuScreens.register(ModMenus.COMET_CACHE_MENU.get(), CometCacheScreen::new);
          }
      );
    }
  }

  private record FallbackLootEntry(String itemId, int minCount, int maxCount) {
    ItemStack create(ServerLevel level) {
      if (itemId == null || itemId.isBlank()) return ItemStack.EMPTY;
      ItemStack fallback = ItemStack.EMPTY;
      try {
        var id = new ResourceLocation(itemId);
        var item = ForgeRegistries.ITEMS.getValue(id);
        if (item == null || item == Items.AIR) return ItemStack.EMPTY;
        int min = Math.max(1, minCount);
        int max = Math.max(min, maxCount);
        int count = Mth.nextInt(level.random, min, max);
        fallback = new ItemStack(item, count);
      } catch (Exception ignored) {
      }
      return fallback;
    }
  }
}


