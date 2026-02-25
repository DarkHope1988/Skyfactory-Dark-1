package de.darkhope.sfd.comets.menu;

import de.darkhope.sfd.comets.blockentity.CometCacheBlockEntity;
import de.darkhope.sfd.comets.registry.ModMenus;
import net.minecraft.core.BlockPos;
import net.minecraft.network.FriendlyByteBuf;
import net.minecraft.world.Container;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.inventory.ContainerLevelAccess;
import net.minecraft.world.inventory.Slot;
import net.minecraft.world.item.ItemStack;

public class CometCacheMenu extends AbstractContainerMenu {
  private static final int ROWS = 3;
  private static final int COLUMNS = 9;
  private static final int CONTAINER_SLOTS = ROWS * COLUMNS;

  private final Container container;
  private final ContainerLevelAccess access;

  public CometCacheMenu(int windowId, Inventory playerInventory, FriendlyByteBuf buf) {
    this(windowId, playerInventory, readContainer(playerInventory, buf.readBlockPos()), ContainerLevelAccess.NULL);
  }

  public CometCacheMenu(int windowId, Inventory playerInventory, Container container) {
    this(windowId, playerInventory, container, ContainerLevelAccess.NULL);
  }

  public CometCacheMenu(int windowId, Inventory playerInventory, Container container, ContainerLevelAccess access) {
    super(ModMenus.COMET_CACHE_MENU.get(), windowId);
    checkContainerSize(container, CONTAINER_SLOTS);
    this.container = container;
    this.access = access;
    container.startOpen(playerInventory.player);

    addCacheSlots(container);
    addPlayerInventory(playerInventory);
  }

  private static Container readContainer(Inventory playerInventory, BlockPos pos) {
    var blockEntity = playerInventory.player.level().getBlockEntity(pos);
    if (blockEntity instanceof CometCacheBlockEntity cache) {
      return cache;
    }
    throw new IllegalStateException("Expected CometCacheBlockEntity at " + pos);
  }

  private void addCacheSlots(Container container) {
    for (int row = 0; row < ROWS; row++) {
      for (int col = 0; col < COLUMNS; col++) {
        int slot = col + row * COLUMNS;
        addSlot(new Slot(container, slot, 8 + col * 18, 18 + row * 18));
      }
    }
  }

  private void addPlayerInventory(Inventory playerInventory) {
    for (int row = 0; row < 3; row++) {
      for (int col = 0; col < 9; col++) {
        addSlot(new Slot(playerInventory, col + row * 9 + 9, 8 + col * 18, 84 + row * 18));
      }
    }
    for (int hotbar = 0; hotbar < 9; hotbar++) {
      addSlot(new Slot(playerInventory, hotbar, 8 + hotbar * 18, 142));
    }
  }

  @Override
  public boolean stillValid(Player player) {
    return container.stillValid(player);
  }

  @Override
  public ItemStack quickMoveStack(Player player, int index) {
    Slot sourceSlot = slots.get(index);
    if (!sourceSlot.hasItem()) return ItemStack.EMPTY;

    ItemStack sourceStack = sourceSlot.getItem();
    ItemStack sourceCopy = sourceStack.copy();

    if (index < CONTAINER_SLOTS) {
      if (!moveItemStackTo(sourceStack, CONTAINER_SLOTS, slots.size(), true)) {
        return ItemStack.EMPTY;
      }
    } else if (!moveItemStackTo(sourceStack, 0, CONTAINER_SLOTS, false)) {
      return ItemStack.EMPTY;
    }

    if (sourceStack.isEmpty()) {
      sourceSlot.set(ItemStack.EMPTY);
    } else {
      sourceSlot.setChanged();
    }

    return sourceCopy;
  }

  @Override
  public void removed(Player player) {
    super.removed(player);
    container.stopOpen(player);
  }
}
