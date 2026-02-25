package de.darkhope.sfd.biobackpack.blockentity;

import de.darkhope.sfd.biobackpack.menu.BioPodestMenu;
import de.darkhope.sfd.biobackpack.registry.ModBlockEntities;
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
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.registries.ForgeRegistries;
import org.jetbrains.annotations.Nullable;

public class BioPodestBlockEntity extends BlockEntity implements Container, MenuProvider {
  public static final int SLOT_INPUT_EARTH = 0;
  public static final int SLOT_INPUT_WORM = 1;
  public static final int SLOT_OUTPUT = 2;
  private static final int PROCESS_INTERVAL_TICKS = 20;
  private static final double SUCCESS_CHANCE = 0.28D;
  private static final ResourceLocation EARTH_ID = new ResourceLocation("kubejs", "earth_block");
  private static final ResourceLocation WORM_ID = new ResourceLocation("kubejs", "worm");
  private static final ResourceLocation WORMY_EARTH_ID = new ResourceLocation("kubejs", "wormy_earth_block");

  private final NonNullList<ItemStack> items = NonNullList.withSize(3, ItemStack.EMPTY);
  private int processTick = 0;
  private final ContainerData dataAccess = new ContainerData() {
    @Override
    public int get(int index) {
      if (index == 0) return processTick;
      return 0;
    }

    @Override
    public void set(int index, int value) {
      if (index == 0) processTick = value;
    }

    @Override
    public int getCount() {
      return 1;
    }
  };

  public BioPodestBlockEntity(BlockPos pos, BlockState state) {
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
    if (slot == SLOT_INPUT_EARTH) return isStackItem(stack, EARTH_ID);
    if (slot == SLOT_INPUT_WORM) return isStackItem(stack, WORM_ID);
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
    return Component.translatable("container.sfd_biobackpack.bio_podest");
  }

  @Nullable
  @Override
  public AbstractContainerMenu createMenu(int windowId, Inventory playerInventory, Player player) {
    return new BioPodestMenu(windowId, playerInventory, this, ContainerLevelAccess.create(level, worldPosition), dataAccess);
  }

  @Override
  protected void saveAdditional(CompoundTag tag) {
    super.saveAdditional(tag);
    ContainerHelper.saveAllItems(tag, items);
    tag.putInt("ProcessTick", processTick);
  }

  @Override
  public void load(CompoundTag tag) {
    super.load(tag);
    items.set(SLOT_INPUT_EARTH, ItemStack.EMPTY);
    items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);
    items.set(SLOT_OUTPUT, ItemStack.EMPTY);
    ContainerHelper.loadAllItems(tag, items);
    processTick = tag.getInt("ProcessTick");
  }

  public static void tick(Level level, BlockPos pos, BlockState state, BioPodestBlockEntity podest) {
    if (level.isClientSide) return;

    podest.processTick++;
    if (podest.processTick < PROCESS_INTERVAL_TICKS) return;
    podest.processTick = 0;

    ItemStack earth = podest.items.get(SLOT_INPUT_EARTH);
    ItemStack worm = podest.items.get(SLOT_INPUT_WORM);
    ItemStack output = podest.items.get(SLOT_OUTPUT);

    if (earth.isEmpty() || worm.isEmpty()) return;
    if (!isStackItem(earth, EARTH_ID)) return;
    if (!isStackItem(worm, WORM_ID)) return;

    Item wormyEarthItem = ForgeRegistries.ITEMS.getValue(WORMY_EARTH_ID);
    if (wormyEarthItem == null) return;
    ItemStack targetOutput = new ItemStack(wormyEarthItem, 1);
    if (targetOutput.isEmpty()) return;

    if (!output.isEmpty() && (!ItemStack.isSameItemSameTags(output, targetOutput) || output.getCount() >= output.getMaxStackSize())) {
      return;
    }

    // Wurm wird immer verbraucht.
    worm.shrink(1);
    if (worm.isEmpty()) podest.items.set(SLOT_INPUT_WORM, ItemStack.EMPTY);

    // Erfolg: Erdblock wird umgewandelt und in Output gelegt.
    if (level.random.nextDouble() < SUCCESS_CHANCE) {
      earth.shrink(1);
      if (earth.isEmpty()) podest.items.set(SLOT_INPUT_EARTH, ItemStack.EMPTY);

      if (output.isEmpty()) {
        podest.items.set(SLOT_OUTPUT, targetOutput.copy());
      } else {
        output.grow(1);
      }
    }

    podest.setChanged();
    level.sendBlockUpdated(pos, state, state, 3);
  }

  private static boolean isStackItem(ItemStack stack, ResourceLocation id) {
    Item item = ForgeRegistries.ITEMS.getValue(id);
    return item != null && stack.is(item);
  }

  public static int getProcessIntervalTicks() {
    return PROCESS_INTERVAL_TICKS;
  }
}
