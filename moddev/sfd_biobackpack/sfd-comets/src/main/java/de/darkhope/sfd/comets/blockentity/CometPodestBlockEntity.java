package de.darkhope.sfd.comets.blockentity;

import de.darkhope.sfd.comets.config.SfdConfig;
import de.darkhope.sfd.comets.menu.CometPodestMenu;
import de.darkhope.sfd.comets.registry.ModBlockEntities;
import de.darkhope.sfd.core.ids.SfdBlockIds;
import de.darkhope.sfd.core.ids.SfdItemIds;
import de.darkhope.sfd.core.api.SfdWorldStateBridge;
import net.minecraft.core.BlockPos;
import net.minecraft.core.NonNullList;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.network.chat.Component;
import net.minecraft.world.Container;
import net.minecraft.world.ContainerHelper;
import net.minecraft.world.MenuProvider;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.inventory.ContainerData;
import net.minecraft.world.inventory.ContainerLevelAccess;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.registries.ForgeRegistries;
import org.jetbrains.annotations.Nullable;

public class CometPodestBlockEntity extends BlockEntity implements Container, MenuProvider {
  public static final int SLOT_INPUT_EARTH = 0;
  public static final int SLOT_INPUT_WORM = 1;
  public static final int SLOT_OUTPUT_START = 2;
  public static final int OUTPUT_COLUMNS = 3;
  public static final int OUTPUT_ROWS = 3;
  public static final int OUTPUT_SLOT_COUNT = OUTPUT_COLUMNS * OUTPUT_ROWS;
  public static final int SLOT_COUNT = SLOT_OUTPUT_START + OUTPUT_SLOT_COUNT;
  // Base stage intentionally slow; values can be tuned via config.
  private static final int PROCESS_INTERVAL_TICKS = 200;
  private static final ResourceLocation EARTH_ID = SfdBlockIds.EARTH_BLOCK;
  private static final ResourceLocation WORM_ID = SfdItemIds.WORM;
  private static final ResourceLocation WORMY_EARTH_ID = SfdBlockIds.WORMY_EARTH_BLOCK;
  private static final ResourceLocation WOOD_SHAVINGS_ID = SfdItemIds.WOOD_SHAVINGS;
  private static final ResourceLocation DRIED_WORM_ID = SfdItemIds.DRIED_WORM;
  private static final ResourceLocation WORM_BAIT_ID = SfdItemIds.WORM_BAIT;
  private static final ResourceLocation EARTH_CLUMP_ID = SfdItemIds.EARTH_CLUMP;
  private static final ResourceLocation BARK_BLOCK_ID = SfdBlockIds.BARK_BLOCK;
  private static final ResourceLocation WORMY_BARK_BLOCK_ID = SfdBlockIds.WORMY_BARK_BLOCK;
  private static final ResourceLocation HOLLOW_BARK_BLOCK_ID = SfdBlockIds.HOLLOW_BARK_BLOCK;
  private static final ResourceLocation TREATED_HOLLOW_BARK_BLOCK_ID = SfdBlockIds.TREATED_HOLLOW_BARK_BLOCK;
  private static final ResourceLocation ORGANIC_ROD_ID = SfdItemIds.ORGANIC_ROD;
  private static final ResourceLocation RESIN_FRAGMENT_ID = SfdItemIds.RESIN_FRAGMENT;
  private static final ResourceLocation CRUDE_MALLET_ID = SfdItemIds.CRUDE_MALLET;
  private static final ResourceLocation OAK_PLANKS_ID = ResourceLocation.parse("minecraft:oak_planks");
  private static final ResourceLocation PODEST_STONE_BASE_ID = SfdBlockIds.PODEST_STONE_BASE;

  private final NonNullList<ItemStack> items = NonNullList.withSize(SLOT_COUNT, ItemStack.EMPTY);
  private int processTick = 0;
  private int processMaxTick = PROCESS_INTERVAL_TICKS;
  private final ContainerData dataAccess = new ContainerData() {
    @Override
    public int get(int index) {
      if (index == 0) return processTick;
      if (index == 1) return processMaxTick;
      return 0;
    }

    @Override
    public void set(int index, int value) {
      if (index == 0) processTick = value;
      if (index == 1) processMaxTick = value;
    }

    @Override
    public int getCount() {
      return 2;
    }
  };

  public CometPodestBlockEntity(BlockPos pos, BlockState state) {
    super(ModBlockEntities.BIO_PODEST.get(), pos, state);
  }

  @Override
  public int getContainerSize() {
    return SLOT_COUNT;
  }

  @Override
  public boolean isEmpty() {
    for (ItemStack stack : items) {
      if (!stack.isEmpty()) return false;
    }
    return true;
  }

  @Override
  public ItemStack getItem(int slot) {
    return slot >= 0 && slot < items.size() ? items.get(slot) : ItemStack.EMPTY;
  }

  @Override
  public ItemStack removeItem(int slot, int amount) {
    if (slot < 0 || slot >= items.size()) return ItemStack.EMPTY;
    ItemStack result = ContainerHelper.removeItem(items, slot, amount);
    if (!result.isEmpty()) setChanged();
    return result;
  }

  @Override
  public ItemStack removeItemNoUpdate(int slot) {
    if (slot < 0 || slot >= items.size()) return ItemStack.EMPTY;
    return ContainerHelper.takeItem(items, slot);
  }

  @Override
  public void setItem(int slot, ItemStack stack) {
    if (slot < 0 || slot >= items.size()) return;
    items.set(slot, stack);
    if (stack.getCount() > getMaxStackSize()) {
      stack.setCount(getMaxStackSize());
    }
    setChanged();
  }

  @Override
  public boolean canPlaceItem(int slot, ItemStack stack) {
    if (slot >= SLOT_OUTPUT_START && slot < SLOT_COUNT) return false;
    if (slot == SLOT_INPUT_EARTH) {
      return isStackItem(stack, EARTH_ID)
          || isStackItem(stack, WORMY_EARTH_ID)
          || isStackItem(stack, BARK_BLOCK_ID)
          || isStackItem(stack, WORMY_BARK_BLOCK_ID)
          || isStackItem(stack, HOLLOW_BARK_BLOCK_ID)
          || isStackItem(stack, TREATED_HOLLOW_BARK_BLOCK_ID);
    }
    if (slot == SLOT_INPUT_WORM) {
      return isStackItem(stack, WORM_ID)
          || isStackItem(stack, WORM_BAIT_ID)
          || isStackItem(stack, WOOD_SHAVINGS_ID)
          || isStackItem(stack, ORGANIC_ROD_ID)
          || isStackItem(stack, CRUDE_MALLET_ID)
          || isStackItem(stack, RESIN_FRAGMENT_ID);
    }
    return false;
  }

  @Override
  public boolean stillValid(Player player) {
    if (level == null) return false;
    return Container.stillValidBlockEntity(this, player);
  }

  @Override
  public void clearContent() {
    for (int i = 0; i < items.size(); i++) {
      items.set(i, ItemStack.EMPTY);
    }
    setChanged();
  }

  @Override
  public Component getDisplayName() {
    return Component.translatable("container.sfd_comets.bio_podest");
  }

  @Nullable
  @Override
  public AbstractContainerMenu createMenu(int windowId, Inventory playerInventory, Player player) {
    return new CometPodestMenu(windowId, playerInventory, this, ContainerLevelAccess.create(level, worldPosition), dataAccess);
  }

  @Override
  protected void saveAdditional(CompoundTag tag) {
    super.saveAdditional(tag);
    ContainerHelper.saveAllItems(tag, items);
    tag.putInt("ProcessTick", processTick);
    tag.putInt("ProcessMaxTick", processMaxTick);
  }

  @Override
  public void load(CompoundTag tag) {
    super.load(tag);
    for (int i = 0; i < items.size(); i++) {
      items.set(i, ItemStack.EMPTY);
    }
    ContainerHelper.loadAllItems(tag, items);
    processTick = tag.getInt("ProcessTick");
    processMaxTick = tag.contains("ProcessMaxTick") ? tag.getInt("ProcessMaxTick") : PROCESS_INTERVAL_TICKS;
  }

  public static void tick(Level level, BlockPos pos, BlockState state, CometPodestBlockEntity podest) {
    if (level.isClientSide) return;

    ItemStack earth = podest.items.get(SLOT_INPUT_EARTH);
    ItemStack catalyst = podest.items.get(SLOT_INPUT_WORM);
    ProcessRule rule = matchRule(level, earth, catalyst);
    if (rule == null) {
      if (podest.processTick != 0) {
        podest.processTick = 0;
        podest.setChanged();
      }
      return;
    }

    int interval = getCurrentProcessInterval(level, pos);
    podest.processMaxTick = interval;

    if (!canAcceptOutput(podest.items, rule.output, rule.maxOutputCount)) {
      if (podest.processTick != 0) {
        podest.processTick = 0;
        podest.setChanged();
      }
      return;
    }

    podest.processTick++;
    if (podest.processTick < interval) return;
    podest.processTick = 0;

    if (rule.consumeInputBAlways) {
      catalyst.shrink(1);
      if (catalyst.isEmpty()) podest.items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);
    }
    if (rule.consumeInputBDurability > 0) {
      damageCatalyst(catalyst, podest, rule.consumeInputBDurability);
    }

    boolean success = level.random.nextDouble() < rule.successChance;
    if (success) {
      if (rule.consumeInputAOnSuccess) {
        earth.shrink(1);
        if (earth.isEmpty()) podest.items.set(SLOT_INPUT_EARTH, ItemStack.EMPTY);
      }

      int produced = rule.minOutputCount;
      if (rule.maxOutputCount > rule.minOutputCount) {
        produced += level.random.nextInt(rule.maxOutputCount - rule.minOutputCount + 1);
      }

      Item item = ForgeRegistries.ITEMS.getValue(rule.output);
      if (item != null) {
        insertOutput(podest.items, item, produced);
      }
    } else if (SfdConfig.BIO_PODEST_FAIL_OUTPUT_ENABLED.get() && rule.failOutput != null) {
      double failChance = SfdConfig.BIO_PODEST_FAIL_OUTPUT_CHANCE.get();
      if (level.random.nextDouble() < failChance) {
        int amount = Math.max(1, SfdConfig.BIO_PODEST_FAIL_OUTPUT_COUNT.get());
        if (canAcceptOutput(podest.items, rule.failOutput, amount)) {
          Item failItem = ForgeRegistries.ITEMS.getValue(rule.failOutput);
          if (failItem != null) {
            insertOutput(podest.items, failItem, amount);
          }
        }
      }
    }

    podest.setChanged();
    level.sendBlockUpdated(pos, state, state, 3);
  }

  private static ProcessRule matchRule(Level level, ItemStack a, ItemStack b) {
    if (a.isEmpty() || b.isEmpty()) return null;
    int tier = getStageTier(level);
    boolean gates = SfdConfig.BIO_PODEST_STAGE_GATES_ENABLED.get();

    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_EARTH_WORM_MIN_TIER.get())
        && isStackItem(a, EARTH_ID) && isStackItem(b, WORM_ID)) {
      return new ProcessRule(
          WORMY_EARTH_ID,
          SfdConfig.BIO_PODEST_EARTH_WORM_CHANCE.get(),
          1,
          1,
          true,
          0,
          true,
          EARTH_CLUMP_ID
      );
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_EARTH_WORM_BAIT_MIN_TIER.get())
        && isStackItem(a, EARTH_ID) && isStackItem(b, WORM_BAIT_ID)) {
      return new ProcessRule(
          WORM_ID,
          SfdConfig.BIO_PODEST_EARTH_WORM_BAIT_CHANCE.get(),
          1,
          1,
          true,
          0,
          false
      );
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_WORMY_EARTH_WOOD_MIN_TIER.get())
        && isStackItem(a, WORMY_EARTH_ID) && isStackItem(b, WOOD_SHAVINGS_ID)) {
      return new ProcessRule(DRIED_WORM_ID, 1.0D, 1, 2, true);
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_WORMY_EARTH_MALLET_MIN_TIER.get())
        && isStackItem(a, WORMY_EARTH_ID) && isStackItem(b, CRUDE_MALLET_ID)) {
      return new ProcessRule(
          WORM_ID,
          SfdConfig.BIO_PODEST_WORMY_EARTH_MALLET_WORM_CHANCE.get(),
          1,
          1,
          false,
          1,
          true
      );
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_BARK_WORM_MIN_TIER.get())
        && isStackItem(a, BARK_BLOCK_ID) && isStackItem(b, WORM_ID)) {
      return new ProcessRule(WORMY_BARK_BLOCK_ID, 0.34D, 1, 1, true);
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_WORMY_BARK_ROD_MIN_TIER.get())
        && isStackItem(a, WORMY_BARK_BLOCK_ID) && isStackItem(b, ORGANIC_ROD_ID)) {
      return new ProcessRule(HOLLOW_BARK_BLOCK_ID, 1.0D, 1, 1, false);
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_HOLLOW_BARK_TREAT_MIN_TIER.get())
        && isStackItem(a, HOLLOW_BARK_BLOCK_ID) && (isStackItem(b, RESIN_FRAGMENT_ID) || isStackItem(b, WOOD_SHAVINGS_ID))) {
      return new ProcessRule(TREATED_HOLLOW_BARK_BLOCK_ID, 1.0D, 1, 1, true);
    }
    if ((!gates || tier >= SfdConfig.BIO_PODEST_GATE_TREATED_BARK_ROD_MIN_TIER.get())
        && isStackItem(a, TREATED_HOLLOW_BARK_BLOCK_ID) && isStackItem(b, ORGANIC_ROD_ID)) {
      return new ProcessRule(OAK_PLANKS_ID, 1.0D, 1, 1, false);
    }
    return null;
  }

  private static boolean canAcceptOutput(NonNullList<ItemStack> stacks, ResourceLocation outId, int amount) {
    Item item = ForgeRegistries.ITEMS.getValue(outId);
    if (item == null) return false;
    for (int i = SLOT_OUTPUT_START; i < SLOT_COUNT; i++) {
      ItemStack output = stacks.get(i);
      if (output.isEmpty()) return true;
      if (output.is(item) && output.getCount() + amount <= output.getMaxStackSize()) return true;
    }
    return false;
  }

  private static void insertOutput(NonNullList<ItemStack> stacks, Item item, int amount) {
    int remaining = amount;

    for (int i = SLOT_OUTPUT_START; i < SLOT_COUNT; i++) {
      ItemStack output = stacks.get(i);
      if (!output.isEmpty() && output.is(item) && output.getCount() < output.getMaxStackSize()) {
        int move = Math.min(remaining, output.getMaxStackSize() - output.getCount());
        output.grow(move);
        remaining -= move;
        if (remaining <= 0) return;
      }
    }

    for (int i = SLOT_OUTPUT_START; i < SLOT_COUNT; i++) {
      ItemStack output = stacks.get(i);
      if (output.isEmpty()) {
        stacks.set(i, new ItemStack(item, remaining));
        return;
      }
    }
  }

  private static boolean isStackItem(ItemStack stack, ResourceLocation id) {
    Item item = ForgeRegistries.ITEMS.getValue(id);
    return item != null && stack.is(item);
  }

  private static void damageCatalyst(ItemStack stack, CometPodestBlockEntity podest, int amount) {
    if (stack.isEmpty() || amount <= 0) return;
    if (!stack.isDamageableItem()) return;

    int next = stack.getDamageValue() + amount;
    if (next >= stack.getMaxDamage()) {
      stack.shrink(1);
      if (stack.isEmpty()) {
        podest.items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);
      }
      return;
    }
    stack.setDamageValue(next);
  }

  private static int getCurrentProcessInterval(Level level, BlockPos pos) {
    Block under = level.getBlockState(pos.below()).getBlock();
    if (isBlockId(under, PODEST_STONE_BASE_ID)) {
      return SfdConfig.BIO_PODEST_PROCESS_INTERVAL_STONE_BASE_TICKS.get();
    }
    if (under == Blocks.FURNACE || under == Blocks.BLAST_FURNACE || under == Blocks.SMOKER) {
      return SfdConfig.BIO_PODEST_PROCESS_INTERVAL_HEAT_BASE_TICKS.get();
    }
    if (under == Blocks.COBBLESTONE || under == Blocks.STONE || under == Blocks.STONE_BRICKS) {
      return SfdConfig.BIO_PODEST_PROCESS_INTERVAL_STONE_BASEBLOCK_TICKS.get();
    }
    return SfdConfig.BIO_PODEST_PROCESS_INTERVAL_TICKS.get();
  }

  private static boolean isBlockId(Block block, ResourceLocation id) {
    Block target = ForgeRegistries.BLOCKS.getValue(id);
    return target != null && block == target;
  }

  private static int getStageTier(Level level) {
    if (level == null || level.getServer() == null) return 0;
    try {
      return Math.max(0, SfdWorldStateBridge.getStageLootTier(level.getServer()));
    } catch (Throwable ignored) {
      return 0;
    }
  }

  private static class ProcessRule {
    final ResourceLocation output;
    final double successChance;
    final int minOutputCount;
    final int maxOutputCount;
    final boolean consumeInputBAlways;
    final int consumeInputBDurability;
    final boolean consumeInputAOnSuccess;
    final ResourceLocation failOutput;

    ProcessRule(ResourceLocation output, double successChance, int minOutputCount, int maxOutputCount, boolean consumeInputBAlways) {
      this(output, successChance, minOutputCount, maxOutputCount, consumeInputBAlways, 0, true, null);
    }

    ProcessRule(ResourceLocation output, double successChance, int minOutputCount, int maxOutputCount, boolean consumeInputBAlways, int consumeInputBDurability) {
      this(output, successChance, minOutputCount, maxOutputCount, consumeInputBAlways, consumeInputBDurability, true, null);
    }

    ProcessRule(
        ResourceLocation output,
        double successChance,
        int minOutputCount,
        int maxOutputCount,
        boolean consumeInputBAlways,
        int consumeInputBDurability,
        boolean consumeInputAOnSuccess
    ) {
      this(output, successChance, minOutputCount, maxOutputCount, consumeInputBAlways, consumeInputBDurability, consumeInputAOnSuccess, null);
    }

    ProcessRule(
        ResourceLocation output,
        double successChance,
        int minOutputCount,
        int maxOutputCount,
        boolean consumeInputBAlways,
        int consumeInputBDurability,
        boolean consumeInputAOnSuccess,
        ResourceLocation failOutput
    ) {
      this.output = output;
      this.successChance = successChance;
      this.minOutputCount = minOutputCount;
      this.maxOutputCount = maxOutputCount;
      this.consumeInputBAlways = consumeInputBAlways;
      this.consumeInputBDurability = consumeInputBDurability;
      this.consumeInputAOnSuccess = consumeInputAOnSuccess;
      this.failOutput = failOutput;
    }
  }

  public static int getProcessIntervalTicks() {
    return SfdConfig.BIO_PODEST_PROCESS_INTERVAL_TICKS.get();
  }
}



