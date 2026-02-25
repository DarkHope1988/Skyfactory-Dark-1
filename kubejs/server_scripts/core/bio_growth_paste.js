// Bio-Wachstumspaste: applies vanilla bonemeal behavior on right-clicked blocks.

const BoneMealItem = Java.loadClass('net.minecraft.world.item.BoneMealItem');
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

BlockEvents.rightClicked(event => {
  const { player, item, block, level, hand } = event;
  if (hand !== 'MAIN_HAND' || !player || !item || item.empty || !block || !level) return;
  if (String(item.id) !== 'kubejs:bio_growth_paste') return;

  if (level.isClientSide()) {
    event.cancel();
    return;
  }

  const mcLevel = level;
  const mcPos = new BlockPos(block.x, block.y, block.z);
  const mcStack = item;
  const facing = event.facing ? event.facing.minecraftFacing : null;
  const held = player.mainHandItem;
  const countBefore = Number(held?.count || 1);

  let used = false;
  try {
    used = BoneMealItem.growCrop(mcStack, mcLevel, mcPos) || BoneMealItem.growWaterPlant(mcStack, mcLevel, mcPos, facing);
  } catch (err) {
    console.error(`[SF-DARK] Bio-Wachstumspaste Fehler: ${err}`);
  }

  // Dev-Phase: item is never consumed.
  // BoneMeal can replace/shrink stacks internally, so restore mainhand explicitly.
  if (!player.creativeMode) {
    try {
      if (held && !held.empty && String(held.id) === 'kubejs:bio_growth_paste') {
        held.count = countBefore;
      }
      player.runCommandSilent(`item replace entity @s weapon.mainhand with kubejs:bio_growth_paste ${countBefore}`);
    } catch (err) {
      console.error(`[SF-DARK] Bio-Wachstumspaste Restore-Fehler: ${err}`);
    }
  }

  if (used) {
    mcLevel.levelEvent(1505, mcPos, 0);
  }

  event.cancel();
});
