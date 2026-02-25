package de.darkhope.sfd.biobackpack.config;

import net.minecraftforge.common.ForgeConfigSpec;

public final class SfdConfig {
  public static final ForgeConfigSpec SPEC;

  public static final ForgeConfigSpec.BooleanValue WORLD_RULES_PORT_ENABLED;
  public static final ForgeConfigSpec.IntValue WORLD_RULES_INTERVAL_TICKS;
  public static final ForgeConfigSpec.IntValue CLEAR_WEATHER_DURATION_TICKS;

  public static final ForgeConfigSpec.BooleanValue ENFORCE_DO_MOB_SPAWNING_FALSE;
  public static final ForgeConfigSpec.BooleanValue ENFORCE_DO_TRADER_SPAWNING_FALSE;
  public static final ForgeConfigSpec.BooleanValue ENFORCE_DO_PATROL_SPAWNING_FALSE;
  public static final ForgeConfigSpec.BooleanValue ENFORCE_WEATHER_CYCLE_FALSE;

  public static final ForgeConfigSpec.BooleanValue BLOCK_HOSTILE_SPAWNS;
  public static final ForgeConfigSpec.BooleanValue BLOCK_TRADER_ENTITIES;
  public static final ForgeConfigSpec.BooleanValue BLOCK_PHANTOMS_UNTIL_COMET_UNLOCK;

  public static final ForgeConfigSpec.BooleanValue COMET_HEARTBEAT_ENABLED;
  public static final ForgeConfigSpec.IntValue COMET_HEARTBEAT_INTERVAL_TICKS;
  public static final ForgeConfigSpec.BooleanValue COMET_CONTROLLER_ENABLED;
  public static final ForgeConfigSpec.IntValue COMET_CONTROLLER_TICK_INTERVAL;

  public static final ForgeConfigSpec.IntValue COMET_COOLDOWN_TICKS;
  public static final ForgeConfigSpec.IntValue COMET_WARNING_TICKS;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_TICKS;
  public static final ForgeConfigSpec.IntValue COMET_RECOVERY_TICKS;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_LIGHTNING_ENABLED;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_LIGHTNING_BOLTS;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_TARGET_MIN_RADIUS_BLOCKS;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_TARGET_MAX_RADIUS_BLOCKS;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_DAMAGE_ENABLED;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_BLOCK_DAMAGE_ENABLED;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_LIGHTNING_REAL;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_CHEST_ENABLED;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_CHEST_NO_DROP;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_CHEST_REQUIRE_STABLE_SUPPORT;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_CHEST_FALLBACK_TO_ABOVE;
  public static final ForgeConfigSpec.BooleanValue COMET_IMPACT_CRATER_ENABLED;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_CRATER_RADIUS;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_CRATER_DEPTH;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_CHEST_LOOT_STACKS;
  public static final ForgeConfigSpec.IntValue COMET_IMPACT_TEST_DISTANCE_BLOCKS;

  public static final ForgeConfigSpec.BooleanValue LOG_WORLD_RULES_ENABLED;
  public static final ForgeConfigSpec.BooleanValue LOG_COMET_HEARTBEAT;
  public static final ForgeConfigSpec.BooleanValue LOG_COMET_TRANSITIONS;
  public static final ForgeConfigSpec.BooleanValue LOG_BRIDGE_SYNC;
  public static final ForgeConfigSpec.BooleanValue DEBUG_COMMANDS_ENABLED;
  public static final ForgeConfigSpec.IntValue DEBUG_COMMAND_PERMISSION_LEVEL;

  static {
    ForgeConfigSpec.Builder b = new ForgeConfigSpec.Builder();

    b.push("world_rules_port");
    WORLD_RULES_PORT_ENABLED = b
        .comment("Enable mod-side world-rules/weather/spawn control port.")
        .define("enabled", false);
    WORLD_RULES_INTERVAL_TICKS = b
        .comment("How often world rules and policies are enforced (ticks).")
        .defineInRange("enforce_interval_ticks", 200, 20, 24000);
    CLEAR_WEATHER_DURATION_TICKS = b
        .comment("Duration used when forcing clear weather while weather is locked.")
        .defineInRange("clear_weather_duration_ticks", 1_000_000, 100, 10_000_000);

    ENFORCE_DO_MOB_SPAWNING_FALSE = b.define("set_doMobSpawning_false", true);
    ENFORCE_DO_TRADER_SPAWNING_FALSE = b.define("set_doTraderSpawning_false", true);
    ENFORCE_DO_PATROL_SPAWNING_FALSE = b.define("set_doPatrolSpawning_false", true);
    ENFORCE_WEATHER_CYCLE_FALSE = b.define("set_doWeatherCycle_false", true);

    BLOCK_HOSTILE_SPAWNS = b.define("block_hostile_spawns", true);
    BLOCK_TRADER_ENTITIES = b.define("block_trader_entities", true);
    BLOCK_PHANTOMS_UNTIL_COMET_UNLOCK = b.define("block_phantoms_until_comet_unlock", true);
    b.pop();

    b.push("comet_controller");
    COMET_HEARTBEAT_ENABLED = b.define("heartbeat_enabled", true);
    COMET_HEARTBEAT_INTERVAL_TICKS = b
        .defineInRange("heartbeat_interval_ticks", 1200, 20, 24000);
    COMET_CONTROLLER_ENABLED = b.define("controller_enabled", true);
    COMET_CONTROLLER_TICK_INTERVAL = b
        .defineInRange("controller_tick_interval", 20, 1, 24000);

    COMET_COOLDOWN_TICKS = b.defineInRange("cooldown_ticks", 24000, 1, 1_000_000);
    COMET_WARNING_TICKS = b.defineInRange("warning_ticks", 200, 1, 1_000_000);
    COMET_IMPACT_TICKS = b.defineInRange("impact_ticks", 40, 1, 1_000_000);
    COMET_RECOVERY_TICKS = b.defineInRange("recovery_ticks", 600, 1, 1_000_000);
    COMET_IMPACT_LIGHTNING_ENABLED = b
        .comment("Spawn lightning at the computed comet impact position when phase switches to impact.")
        .define("impact_lightning_enabled", true);
    COMET_IMPACT_LIGHTNING_BOLTS = b
        .comment("Number of lightning bolts spawned on each impact event.")
        .defineInRange("impact_lightning_bolts", 1, 1, 16);
    COMET_IMPACT_TARGET_MIN_RADIUS_BLOCKS = b
        .comment("Minimum horizontal distance from player to impact target.")
        .defineInRange("impact_target_min_radius_blocks", 8, 0, 2048);
    COMET_IMPACT_TARGET_MAX_RADIUS_BLOCKS = b
        .comment("Maximum horizontal distance from player to impact target.")
        .defineInRange("impact_target_max_radius_blocks", 32, 0, 2048);
    COMET_IMPACT_DAMAGE_ENABLED = b
        .comment("Master switch: allow comet impacts to deal real damage/effects.")
        .define("impact_damage_enabled", false);
    COMET_IMPACT_BLOCK_DAMAGE_ENABLED = b
        .comment("Allow impact to modify terrain blocks (crater).")
        .define("impact_block_damage_enabled", false);
    COMET_IMPACT_LIGHTNING_REAL = b
        .comment("If true, lightning is real (damage/fire). If false, visual-only lightning.")
        .define("impact_lightning_real", false);
    COMET_IMPACT_CHEST_ENABLED = b
        .comment("Spawn an impact chest at the strike position.")
        .define("impact_chest_enabled", true);
    COMET_IMPACT_CHEST_NO_DROP = b
        .comment("If true, impact chest is removed without item drops when broken.")
        .define("impact_chest_no_drop", true);
    COMET_IMPACT_CHEST_REQUIRE_STABLE_SUPPORT = b
        .comment("Require solid support block below impact chest.")
        .define("impact_chest_require_stable_support", true);
    COMET_IMPACT_CHEST_FALLBACK_TO_ABOVE = b
        .comment("If target block is occupied, try one block above for chest.")
        .define("impact_chest_fallback_to_above", true);
    COMET_IMPACT_CRATER_ENABLED = b
        .comment("Create a small crater around spawned impact chests.")
        .define("impact_crater_enabled", false);
    COMET_IMPACT_CRATER_RADIUS = b
        .comment("Crater radius around impact chest.")
        .defineInRange("impact_crater_radius", 4, 1, 16);
    COMET_IMPACT_CRATER_DEPTH = b
        .comment("Crater max depth in blocks.")
        .defineInRange("impact_crater_depth", 3, 1, 16);
    COMET_IMPACT_CHEST_LOOT_STACKS = b
        .comment("How many random loot stacks are inserted into impact chest.")
        .defineInRange("impact_chest_loot_stacks", 4, 1, 27);
    COMET_IMPACT_TEST_DISTANCE_BLOCKS = b
        .comment("Distance used by /sfdstate impacttest in look direction.")
        .defineInRange("impact_test_distance_blocks", 6, 1, 64);
    b.pop();

    b.push("logging");
    LOG_WORLD_RULES_ENABLED = b.define("log_world_rules_enabled", true);
    LOG_COMET_HEARTBEAT = b.define("log_comet_heartbeat", true);
    LOG_COMET_TRANSITIONS = b.define("log_comet_transitions", true);
    LOG_BRIDGE_SYNC = b.define("log_bridge_sync", true);
    b.pop();

    b.push("debug_commands");
    DEBUG_COMMANDS_ENABLED = b
        .comment("Enable /sfdstate command for runtime testing of world-state flags.")
        .define("enabled", true);
    DEBUG_COMMAND_PERMISSION_LEVEL = b
        .comment("Required permission level for /sfdstate (2 = cheats/op commands in singleplayer).")
        .defineInRange("permission_level", 2, 0, 4);
    b.pop();

    SPEC = b.build();
  }

  private SfdConfig() {
  }
}
