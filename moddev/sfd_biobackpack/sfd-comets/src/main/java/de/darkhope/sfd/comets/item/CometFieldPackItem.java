package de.darkhope.sfd.comets.item;

import de.darkhope.sfd.comets.menu.CometFieldPackMenu;
import net.minecraft.network.chat.Component;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResultHolder;
import net.minecraft.world.SimpleMenuProvider;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraftforge.network.NetworkHooks;

public class CometFieldPackItem extends Item {
  public CometFieldPackItem(Properties properties) {
    super(properties);
  }

  @Override
  public InteractionResultHolder<ItemStack> use(Level level, Player player, InteractionHand hand) {
    ItemStack stack = player.getItemInHand(hand);

    if (!level.isClientSide && player instanceof ServerPlayer serverPlayer) {
      NetworkHooks.openScreen(
          serverPlayer,
          new SimpleMenuProvider(
              (windowId, inventory, p) -> new CometFieldPackMenu(windowId, inventory, hand),
              Component.translatable("container.sfd_comets.bio_backpack")
          ),
          buf -> buf.writeEnum(hand)
      );
    }

    return InteractionResultHolder.sidedSuccess(stack, level.isClientSide);
  }
}


