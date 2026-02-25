package de.darkhope.sfd.biobackpack.menu;

import de.darkhope.sfd.biobackpack.blockentity.BioPodestBlockEntity;
import de.darkhope.sfd.biobackpack.registry.ModBlocks;
import de.darkhope.sfd.biobackpack.registry.ModMenus;
import net.minecraft.core.BlockPos;
import net.minecraft.network.FriendlyByteBuf;
import net.minecraft.world.Container;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.inventory.ContainerData;
import net.minecraft.world.inventory.ContainerLevelAccess;
import net.minecraft.world.inventory.SimpleContainerData;
import net.minecraft.world.inventory.Slot;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraftforge.registries.ForgeRegistries;

public class BioPodestMenu extends AbstractContainerMenu {
  private static final int SLOT_COUNT = 3;
  private static final ResourceLocation EARTH_ID = new ResourceLocation("kubejs", "earth_block");
  private static final ResourceLocation WORM_ID = new ResourceLocation("kubejs", "worm");
  private final Container container;
  private final ContainerLevelAccess access;
  private final ContainerData data;

  public BioPodestMenu(int windowId, Inventory playerInventory, FriendlyByteBuf buf) {
    this(windowId, playerInventory, buf.readBlockPos());
  }
  
  private BioPodestMenu(int windowId, Inventory playerInventory, BlockPos pos) {
    this(windowId, playerInventory, getContainer(playerInventory.player.level(), pos),
        ContainerLevelAccess.create(playerInventory.player.level(), pos),
        new SimpleContainerData(1));
  }

  public BioPodestMenu(int windowId, Inventory playerInventory, Container container, ContainerLevelAccess access, ContainerData data) {
    super(ModMenus.BIO_PODEST_MENU.get(), windowId);
    this.container = container;
    this.access = access;
    this.data = data;
    this.container.startOpen(playerInventory.player);

    // Left: earth input.
    addSlot(new Slot(container, BioPodestBlockEntity.SLOT_INPUT_EARTH, 27, 47) {
      @Override
      public boolean mayPlace(ItemStack stack) {
        return isStackItem(stack, EARTH_ID);
      }
    });

    // Middle: worm input.
    addSlot(new Slot(container, BioPodestBlockEntity.SLOT_INPUT_WORM, 76, 47) {
      @Override
      public boolean mayPlace(ItemStack stack) {
        return isStackItem(stack, WORM_ID);
      }
    });

    // Right output.
    addSlot(new Slot(container, BioPodestBlockEntity.SLOT_OUTPUT, 134, 47) {
      @Override
      public boolean mayPlace(ItemStack stack) {
        return false;
      }
    });

    addPlayerInventory(playerInventory);
    addDataSlots(data);
  }

  private static Container getContainer(Level level, BlockPos pos) {
    BlockEntity blockEntity = level.getBlockEntity(pos);
    if (blockEntity instanceof BioPodestBlockEntity podest) {
      return podest;
    }
    throw new IllegalStateException("Expected BioPodestBlockEntity at " + pos);
  }

  private void addPlayerInventory(Inventory inventory) {
    for (int row = 0; row < 3; row++) {
      for (int col = 0; col < 9; col++) {
        addSlot(new Slot(inventory, col + row * 9 + 9, 8 + col * 18, 84 + row * 18));
      }
    }

    for (int hotbar = 0; hotbar < 9; hotbar++) {
      addSlot(new Slot(inventory, hotbar, 8 + hotbar * 18, 142));
    }
  }

  @Override
  public boolean stillValid(Player player) {
    return stillValid(access, player, ModBlocks.BIO_PODEST.get());
  }

  @Override
  public ItemStack quickMoveStack(Player player, int index) {
    Slot sourceSlot = slots.get(index);
    if (!sourceSlot.hasItem()) return ItemStack.EMPTY;

    ItemStack sourceStack = sourceSlot.getItem();
    ItemStack sourceCopy = sourceStack.copy();

    if (index < SLOT_COUNT) {
      if (!moveItemStackTo(sourceStack, SLOT_COUNT, slots.size(), true)) {
        return ItemStack.EMPTY;
      }
    } else {
      if (isStackItem(sourceStack, EARTH_ID)) {
        if (!moveItemStackTo(sourceStack, BioPodestBlockEntity.SLOT_INPUT_EARTH, BioPodestBlockEntity.SLOT_INPUT_EARTH + 1, false)) {
          return ItemStack.EMPTY;
        }
      } else if (isStackItem(sourceStack, WORM_ID)) {
        if (!moveItemStackTo(sourceStack, BioPodestBlockEntity.SLOT_INPUT_WORM, BioPodestBlockEntity.SLOT_INPUT_WORM + 1, false)) {
          return ItemStack.EMPTY;
        }
      } else {
        return ItemStack.EMPTY;
      }
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

  private static boolean isStackItem(ItemStack stack, ResourceLocation id) {
    Item item = ForgeRegistries.ITEMS.getValue(id);
    return item != null && stack.is(item);
  }

  public int getProgressScaled(int pixels) {
    int tick = data.get(0);
    int max = BioPodestBlockEntity.getProcessIntervalTicks();
    if (tick <= 0 || max <= 0) return 0;
    return Math.min(pixels, (tick * pixels) / max);
  }
}
