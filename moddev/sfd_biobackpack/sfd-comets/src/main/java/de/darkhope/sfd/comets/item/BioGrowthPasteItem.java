package de.darkhope.sfd.comets.item;

import net.minecraft.core.BlockPos;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.item.BoneMealItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.context.UseOnContext;
import net.minecraft.world.level.Level;

public class BioGrowthPasteItem extends Item {
  public BioGrowthPasteItem(Properties properties) {
    super(properties);
  }

  @Override
  public InteractionResult useOn(UseOnContext context) {
    Level level = context.getLevel();
    BlockPos pos = context.getClickedPos();
    ItemStack stack = context.getItemInHand();
    int keepCount = Math.max(1, stack.getCount());

    boolean used = BoneMealItem.growCrop(stack, level, pos)
        || BoneMealItem.growWaterPlant(stack, level, pos, context.getClickedFace());

    if (!used) {
      return InteractionResult.PASS;
    }

    if (!level.isClientSide) {
      level.levelEvent(1505, pos, 0);
      if (context.getPlayer() == null || !context.getPlayer().getAbilities().instabuild) {
        stack.setCount(keepCount);
      }
    }

    return InteractionResult.sidedSuccess(level.isClientSide);
  }
}
