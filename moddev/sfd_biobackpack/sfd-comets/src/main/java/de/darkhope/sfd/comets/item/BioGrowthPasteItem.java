package de.darkhope.sfd.comets.item;

import net.minecraft.core.BlockPos;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.BoneMealItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.item.Items;
import net.minecraft.world.item.context.UseOnContext;
import net.minecraft.world.level.Level;

public class BioGrowthPasteItem extends Item {
  public enum Mode {
    CONSUME,
    CHARGES,
    INFINITE
  }

  private final Mode mode;

  public BioGrowthPasteItem(Properties properties, Mode mode) {
    super(properties);
    this.mode = mode;
  }

  @Override
  public InteractionResult useOn(UseOnContext context) {
    Level level = context.getLevel();
    BlockPos pos = context.getClickedPos();
    ItemStack stack = context.getItemInHand();
    Player player = context.getPlayer();

    // Use a temporary bonemeal stack so we can fully control consumption logic.
    ItemStack helperBoneMeal = new ItemStack(Items.BONE_MEAL);
    boolean used = BoneMealItem.growCrop(helperBoneMeal, level, pos)
        || BoneMealItem.growWaterPlant(helperBoneMeal, level, pos, context.getClickedFace());

    if (!used) {
      return InteractionResult.PASS;
    }

    if (!level.isClientSide) {
      level.levelEvent(1505, pos, 0);
      if (player == null || !player.getAbilities().instabuild) {
        switch (mode) {
          case CONSUME -> stack.shrink(1);
          case CHARGES -> {
            ServerPlayer sp = player instanceof ServerPlayer ? (ServerPlayer) player : null;
            if (stack.hurt(1, level.random, sp)) {
              stack.shrink(1);
              stack.setDamageValue(0);
            }
          }
          case INFINITE -> {
            // Intentionally does not consume.
          }
        }
      }
    }

    return InteractionResult.sidedSuccess(level.isClientSide);
  }
}
