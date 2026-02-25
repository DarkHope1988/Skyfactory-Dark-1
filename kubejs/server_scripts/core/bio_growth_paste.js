// Bio-Wachstumspaste: applies vanilla bonemeal behavior on right-clicked blocks.

const BoneMealItem = Java.loadClass('net.minecraft.world.item.BoneMealItem');
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

BlockEvents.rightClicked(event => {
  const { player, item, block, level, hand } = event;
  if (hand !== 'MAIN_HAND' || !player || !item || item.empty || !block || !level) return;
  const itemId = String(item.id);
  // Mod item has native behavior in Java; this script is fallback for legacy KubeJS item only.
  if (itemId !== 'sfd_comets:bio_growth_paste') return;

  if (level.isClientSide()) return;

  const mcLevel = level;
  const mcPos = new BlockPos(block.x, block.y, block.z);
  const mcStack = item;
  const facing = event.facing ? event.facing.minecraftFacing : null;

  // Capture before BoneMeal calls because vanilla logic may shrink the stack.
  const keepCount = Math.max(1, Number(item.count || 1));
  let used = false;
  try {
    // Direct call is the most reliable trigger path for saplings/crops in this pack.
    used = BoneMealItem.growCrop(mcStack, mcLevel, mcPos)
      || BoneMealItem.growWaterPlant(mcStack, mcLevel, mcPos, facing);
  } catch (err) {
    console.error(`[SF-DARK] Bio-Wachstumspaste Fehler: ${err}`);
  }

  if (!used) return;

  // Keep the tool infinite during development.
  if (!player.creativeMode) {
    player.runCommandSilent(`item replace entity @s weapon.mainhand with sfd_comets:bio_growth_paste ${keepCount}`);
  }

  mcLevel.levelEvent(1505, mcPos, 0);
  event.cancel();
});

