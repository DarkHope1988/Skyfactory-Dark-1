package de.darkhope.sfd.comets.menu;

import de.darkhope.sfd.comets.registry.ModItems;
import de.darkhope.sfd.comets.registry.ModMenus;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.ListTag;
import net.minecraft.nbt.Tag;
import net.minecraft.network.FriendlyByteBuf;
import net.minecraft.world.Container;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.inventory.Slot;
import net.minecraft.world.item.ItemStack;

public class CometFieldPackMenu extends AbstractContainerMenu {
  private static final String NBT_KEY = "CometInventory";
  private static final int BACKPACK_SLOTS = 9;

  private final InteractionHand hand;
  private final ItemStack backpackStack;
  private final BackpackContainer backpack;

  public CometFieldPackMenu(int windowId, Inventory playerInventory, FriendlyByteBuf buf) {
    this(windowId, playerInventory, buf.readEnum(InteractionHand.class));
  }

  public CometFieldPackMenu(int windowId, Inventory playerInventory, InteractionHand hand) {
    super(ModMenus.BIO_BACKPACK_MENU.get(), windowId);
    this.hand = hand;
    this.backpackStack = playerInventory.player.getItemInHand(hand);
    this.backpack = new BackpackContainer(BACKPACK_SLOTS, this.backpackStack);

    addBackpackSlots();
    addPlayerInventory(playerInventory);
  }

  private void addBackpackSlots() {
    for (int row = 0; row < 3; row++) {
      for (int col = 0; col < 3; col++) {
        int slot = col + row * 3;
        int x = 62 + col * 18;
        int y = 17 + row * 18;
        addSlot(new Slot(backpack, slot, x, y) {
        @Override
        public boolean mayPlace(ItemStack stack) {
          return !stack.is(ModItems.BIO_BACKPACK.get());
        }
        });
      }
    }
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
    ItemStack current = player.getItemInHand(hand);
    return !current.isEmpty() && current.getItem() == ModItems.BIO_BACKPACK.get();
  }

  @Override
  public ItemStack quickMoveStack(Player player, int index) {
    Slot sourceSlot = slots.get(index);
    if (!sourceSlot.hasItem()) return ItemStack.EMPTY;

    ItemStack sourceStack = sourceSlot.getItem();
    ItemStack sourceCopy = sourceStack.copy();

    if (index < BACKPACK_SLOTS) {
      if (!moveItemStackTo(sourceStack, BACKPACK_SLOTS, slots.size(), true)) {
        return ItemStack.EMPTY;
      }
    } else {
      if (sourceStack.is(ModItems.BIO_BACKPACK.get())) return ItemStack.EMPTY;
      if (!moveItemStackTo(sourceStack, 0, BACKPACK_SLOTS, false)) {
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
    backpack.saveToStack();
  }

  private static class BackpackContainer implements Container {
    private final ItemStack[] items;
    private final ItemStack sourceStack;

    BackpackContainer(int size, ItemStack sourceStack) {
      this.items = new ItemStack[size];
      this.sourceStack = sourceStack;
      for (int i = 0; i < size; i++) {
        items[i] = ItemStack.EMPTY;
      }
      loadFromStack();
    }

    void loadFromStack() {
      if (!sourceStack.hasTag()) return;
      CompoundTag tag = sourceStack.getTag();
      if (tag == null || !tag.contains(NBT_KEY, Tag.TAG_LIST)) return;

      ListTag list = tag.getList(NBT_KEY, Tag.TAG_COMPOUND);
      for (int i = 0; i < list.size(); i++) {
        CompoundTag entry = list.getCompound(i);
        int slot = entry.getByte("Slot") & 255;
        if (slot >= 0 && slot < items.length) {
          items[slot] = ItemStack.of(entry);
        }
      }
    }

    void saveToStack() {
      ListTag list = new ListTag();
      for (int i = 0; i < items.length; i++) {
        ItemStack stack = items[i];
        if (stack.isEmpty()) continue;
        CompoundTag entry = new CompoundTag();
        entry.putByte("Slot", (byte) i);
        stack.save(entry);
        list.add(entry);
      }

      sourceStack.getOrCreateTag().put(NBT_KEY, list);
    }

    @Override
    public int getContainerSize() {
      return items.length;
    }

    @Override
    public boolean isEmpty() {
      for (ItemStack item : items) {
        if (!item.isEmpty()) return false;
      }
      return true;
    }

    @Override
    public ItemStack getItem(int slot) {
      return slot >= 0 && slot < items.length ? items[slot] : ItemStack.EMPTY;
    }

    @Override
    public ItemStack removeItem(int slot, int amount) {
      if (slot < 0 || slot >= items.length) return ItemStack.EMPTY;
      ItemStack stack = items[slot];
      if (stack.isEmpty()) return ItemStack.EMPTY;

      ItemStack result = stack.split(amount);
      if (stack.isEmpty()) {
        items[slot] = ItemStack.EMPTY;
      }
      setChanged();
      return result;
    }

    @Override
    public ItemStack removeItemNoUpdate(int slot) {
      if (slot < 0 || slot >= items.length) return ItemStack.EMPTY;
      ItemStack stack = items[slot];
      items[slot] = ItemStack.EMPTY;
      return stack;
    }

    @Override
    public void setItem(int slot, ItemStack stack) {
      if (slot < 0 || slot >= items.length) return;
      items[slot] = stack;
      if (stack.getCount() > getMaxStackSize()) {
        stack.setCount(getMaxStackSize());
      }
      setChanged();
    }

    @Override
    public void setChanged() {
      saveToStack();
    }

    @Override
    public boolean stillValid(Player player) {
      return true;
    }

    @Override
    public void clearContent() {
      for (int i = 0; i < items.length; i++) {
        items[i] = ItemStack.EMPTY;
      }
      setChanged();
    }
  }
}


