package de.darkhope.sfd.comets.blockentity;

import de.darkhope.sfd.comets.menu.CometPodestMenu;
import de.darkhope.sfd.comets.registry.ModBlockEntities;
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
  public static final int SLOT_OUTPUT = 2;
  // Base stage intentionally slow; later upgrades can reduce this again.
  private static final int PROCESS_INTERVAL_TICKS = 200;
  private static final ResourceLocation EARTH_ID = new ResourceLocation("kubejs:earth_block");
  private static final ResourceLocation WORM_ID = new ResourceLocation("kubejs:worm");
  private static final ResourceLocation WORMY_EARTH_ID = new ResourceLocation("kubejs:wormy_earth_block");
  private static final ResourceLocation WOOD_SHAVINGS_ID = new ResourceLocation("kubejs:wood_shavings");
  private static final ResourceLocation DRIED_WORM_ID = new ResourceLocation("kubejs:dried_worm");
  private static final ResourceLocation BARK_BLOCK_ID = new ResourceLocation("kubejs:bark_block");
  private static final ResourceLocation WORMY_BARK_BLOCK_ID = new ResourceLocation("kubejs:wormy_bark_block");
  private static final ResourceLocation HOLLOW_BARK_BLOCK_ID = new ResourceLocation("kubejs:hollow_bark_block");
  private static final ResourceLocation TREATED_HOLLOW_BARK_BLOCK_ID = new ResourceLocation("kubejs:treated_hollow_bark_block");
  private static final ResourceLocation ORGANIC_ROD_ID = new ResourceLocation("kubejs:organic_rod");
  private static final ResourceLocation RESIN_FRAGMENT_ID = new ResourceLocation("kubejs:resin_fragment");
  private static final ResourceLocation OAK_PLANKS_ID = new ResourceLocation("minecraft:oak_planks");
  private static final ResourceLocation PODEST_STONE_BASE_ID = new ResourceLocation("kubejs:podest_stone_base");

  private final NonNullList<ItemStack> items = NonNullList.withSize(3, ItemStack.EMPTY);
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
    return 3;
  }

  @Override
  public boolean isEmpty() {
    return items.get(SLOT_INPUT_EARTH).isEmpty()
        && items.get(SLOT_INPUT_WORM).isEmpty()
        && items.get(SLOT_OUTPUT).isEmpty();
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
    if (slot == SLOT_OUTPUT) return false;
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
          || isStackItem(stack, WOOD_SHAVINGS_ID)
          || isStackItem(stack, ORGANIC_ROD_ID)
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
    items.set(SLOT_INPUT_EARTH, ItemStack.EMPTY);
    items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);
    items.set(SLOT_OUTPUT, ItemStack.EMPTY);
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
    items.set(SLOT_INPUT_EARTH, ItemStack.EMPTY);
    items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);
    items.set(SLOT_OUTPUT, ItemStack.EMPTY);
    ContainerHelper.loadAllItems(tag, items);
    processTick = tag.getInt("ProcessTick");
    processMaxTick = tag.contains("ProcessMaxTick") ? tag.getInt("ProcessMaxTick") : PROCESS_INTERVAL_TICKS;
  }

  public static void tick(Level level, BlockPos pos, BlockState state, CometPodestBlockEntity podest) {
    if (level.isClientSide) return;

    ItemStack earth = podest.items.get(SLOT_INPUT_EARTH);
    ItemStack catalyst = podest.items.get(SLOT_INPUT_WORM);
    ItemStack output = podest.items.get(SLOT_OUTPUT);

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

    if (!canAcceptOutput(output, rule.output, rule.maxOutputCount)) return;

    podest.processTick++;
    if (podest.processTick < interval) return;
    podest.processTick = 0;

    if (rule.consumeInputBAlways) {
      catalyst.shrink(1);
      if (catalyst.isEmpty()) podest.items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);
    }

    boolean success = level.random.nextDouble() < rule.successChance;
    if (success) {
      earth.shrink(1);
      if (earth.isEmpty()) podest.items.set(SLOT_INPUT_EARTH, ItemStack.EMPTY);

      int produced = rule.minOutputCount;
      if (rule.maxOutputCount > rule.minOutputCount) {
        produced += level.random.nextInt(rule.maxOutputCount - rule.minOutputCount + 1);
      }

      if (output.isEmpty()) {
        Item item = ForgeRegistries.ITEMS.getValue(rule.output);
        if (item != null) {
          podest.items.set(SLOT_OUTPUT, new ItemStack(item, produced));
        }
      } else {
        output.grow(produced);
      }
    }

    podest.setChanged();
    level.sendBlockUpdated(pos, state, state, 3);
  }

  private static ProcessRule matchRule(Level level, ItemStack a, ItemStack b) {
    if (a.isEmpty() || b.isEmpty()) return null;

    if (isStackItem(a, EARTH_ID) && isStackItem(b, WORM_ID)) {
      return new ProcessRule(WORMY_EARTH_ID, 0.28D, 1, 1, true);
    }
    if (isStackItem(a, WORMY_EARTH_ID) && isStackItem(b, WOOD_SHAVINGS_ID)) {
      return new ProcessRule(DRIED_WORM_ID, 1.0D, 1, 2, true);
    }
    if (isStackItem(a, BARK_BLOCK_ID) && isStackItem(b, WORM_ID)) {
      return new ProcessRule(WORMY_BARK_BLOCK_ID, 0.34D, 1, 1, true);
    }
    if (isStackItem(a, WORMY_BARK_BLOCK_ID) && isStackItem(b, ORGANIC_ROD_ID)) {
      return new ProcessRule(HOLLOW_BARK_BLOCK_ID, 1.0D, 1, 1, false);
    }
    if (isStackItem(a, HOLLOW_BARK_BLOCK_ID) && (isStackItem(b, RESIN_FRAGMENT_ID) || isStackItem(b, WOOD_SHAVINGS_ID))) {
      return new ProcessRule(TREATED_HOLLOW_BARK_BLOCK_ID, 1.0D, 1, 1, true);
    }
    if (isStackItem(a, TREATED_HOLLOW_BARK_BLOCK_ID) && isStackItem(b, ORGANIC_ROD_ID)) {
      return new ProcessRule(OAK_PLANKS_ID, 1.0D, 1, 1, false);
    }
    return null;
  }

  private static boolean canAcceptOutput(ItemStack output, ResourceLocation outId, int amount) {
    Item item = ForgeRegistries.ITEMS.getValue(outId);
    if (item == null) return false;
    if (output.isEmpty()) return true;
    if (!output.is(item)) return false;
    return output.getCount() + amount <= output.getMaxStackSize();
  }

  private static boolean isStackItem(ItemStack stack, ResourceLocation id) {
    Item item = ForgeRegistries.ITEMS.getValue(id);
    return item != null && stack.is(item);
  }

  private static int getCurrentProcessInterval(Level level, BlockPos pos) {
    Block under = level.getBlockState(pos.below()).getBlock();
    if (isBlockId(under, PODEST_STONE_BASE_ID)) {
      return 100;
    }
    if (under == Blocks.FURNACE || under == Blocks.BLAST_FURNACE || under == Blocks.SMOKER) {
      return 120;
    }
    if (under == Blocks.COBBLESTONE || under == Blocks.STONE || under == Blocks.STONE_BRICKS) {
      return 160;
    }
    return PROCESS_INTERVAL_TICKS;
  }

  private static boolean isBlockId(Block block, ResourceLocation id) {
    Block target = ForgeRegistries.BLOCKS.getValue(id);
    return target != null && block == target;
  }

  private static class ProcessRule {
    final ResourceLocation output;
    final double successChance;
    final int minOutputCount;
    final int maxOutputCount;
    final boolean consumeInputBAlways;

    ProcessRule(ResourceLocation output, double successChance, int minOutputCount, int maxOutputCount, boolean consumeInputBAlways) {
      this.output = output;
      this.successChance = successChance;
      this.minOutputCount = minOutputCount;
      this.maxOutputCount = maxOutputCount;
      this.consumeInputBAlways = consumeInputBAlways;
    }
  }

  public static int getProcessIntervalTicks() {
    return PROCESS_INTERVAL_TICKS;
  }
}


