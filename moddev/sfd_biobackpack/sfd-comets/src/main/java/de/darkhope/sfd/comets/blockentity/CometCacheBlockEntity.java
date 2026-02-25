package de.darkhope.sfd.comets.blockentity;

import de.darkhope.sfd.comets.menu.CometCacheMenu;
import de.darkhope.sfd.comets.registry.ModBlockEntities;
import net.minecraft.core.BlockPos;
import net.minecraft.core.NonNullList;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.nbt.Tag;
import net.minecraft.network.chat.Component;
import net.minecraft.world.Container;
import net.minecraft.world.MenuProvider;
import net.minecraft.world.entity.player.Inventory;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.state.BlockState;

public class CometCacheBlockEntity extends BlockEntity implements Container, MenuProvider {
  public static final int SLOT_COUNT = 27;
  private final NonNullList<ItemStack> items = NonNullList.withSize(SLOT_COUNT, ItemStack.EMPTY);

  public CometCacheBlockEntity(BlockPos pos, BlockState state) {
    super(ModBlockEntities.COMET_CACHE.get(), pos, state);
  }

  @Override
  public Component getDisplayName() {
    return Component.translatable("container.sfd_comets.comet_cache");
  }

  @Override
  public AbstractContainerMenu createMenu(int windowId, Inventory playerInventory, Player player) {
    return new CometCacheMenu(windowId, playerInventory, this);
  }

  @Override
  public int getContainerSize() {
    return SLOT_COUNT;
  }

  @Override
  public boolean isEmpty() {
    for (ItemStack stack : items) {
      if (!stack.isEmpty()) {
        return false;
      }
    }
    return true;
  }

  @Override
  public ItemStack getItem(int slot) {
    if (slot < 0 || slot >= SLOT_COUNT) return ItemStack.EMPTY;
    return items.get(slot);
  }

  @Override
  public ItemStack removeItem(int slot, int amount) {
    if (slot < 0 || slot >= SLOT_COUNT || amount <= 0) return ItemStack.EMPTY;
    ItemStack stack = items.get(slot);
    if (stack.isEmpty()) return ItemStack.EMPTY;

    ItemStack split = stack.split(amount);
    if (stack.isEmpty()) {
      items.set(slot, ItemStack.EMPTY);
    }
    setChanged();
    return split;
  }

  @Override
  public ItemStack removeItemNoUpdate(int slot) {
    if (slot < 0 || slot >= SLOT_COUNT) return ItemStack.EMPTY;
    ItemStack stack = items.get(slot);
    items.set(slot, ItemStack.EMPTY);
    return stack;
  }

  @Override
  public void setItem(int slot, ItemStack stack) {
    if (slot < 0 || slot >= SLOT_COUNT) return;
    items.set(slot, stack);
    if (stack.getCount() > getMaxStackSize()) {
      stack.setCount(getMaxStackSize());
    }
    setChanged();
  }

  @Override
  public boolean stillValid(Player player) {
    return Container.stillValidBlockEntity(this, player);
  }

  @Override
  public void clearContent() {
    for (int i = 0; i < SLOT_COUNT; i++) {
      items.set(i, ItemStack.EMPTY);
    }
    setChanged();
  }

  @Override
  public void load(CompoundTag tag) {
    super.load(tag);
    for (int i = 0; i < SLOT_COUNT; i++) {
      items.set(i, ItemStack.EMPTY);
    }
    if (!tag.contains("Items", Tag.TAG_LIST)) {
      return;
    }
    var list = tag.getList("Items", Tag.TAG_COMPOUND);
    for (int i = 0; i < list.size(); i++) {
      CompoundTag entry = list.getCompound(i);
      int slot = entry.getByte("Slot") & 255;
      if (slot >= 0 && slot < SLOT_COUNT) {
        items.set(slot, ItemStack.of(entry));
      }
    }
  }

  @Override
  protected void saveAdditional(CompoundTag tag) {
    super.saveAdditional(tag);
    var list = new net.minecraft.nbt.ListTag();
    for (int slot = 0; slot < SLOT_COUNT; slot++) {
      ItemStack stack = items.get(slot);
      if (stack.isEmpty()) continue;
      CompoundTag entry = new CompoundTag();
      entry.putByte("Slot", (byte) slot);
      stack.save(entry);
      list.add(entry);
    }
    tag.put("Items", list);
  }
}
