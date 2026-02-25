// Bio-Wachstumspaste: applies vanilla bonemeal behavior on right-clicked blocks.

const BoneMealItem = Java.loadClass('net.minecraft.world.item.BoneMealItem');
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos');

BlockEvents.rightClicked(event => {
  const { player, item, block, level, hand } = event;
  if (hand !== 'MAIN_HAND' || !player || !item || item.empty || !block || !level) return;
  if (String(item.id) !== 'kubejs:bio_growth_paste') return;

  if (level.isClientSide()) return;

  const mcLevel = level;
  const mcPos = new BlockPos(block.x, block.y, block.z);
  const mcStack = item;
  const facing = event.facing ? event.facing.minecraftFacing : null;

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
    player.runCommandSilent('item replace entity @s weapon.mainhand with kubejs:bio_growth_paste 1');
  }

  mcLevel.levelEvent(1505, mcPos, 0);
  event.cancel();
});
