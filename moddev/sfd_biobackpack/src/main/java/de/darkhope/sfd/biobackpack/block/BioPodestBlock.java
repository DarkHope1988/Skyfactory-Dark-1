package de.darkhope.sfd.biobackpack.block;

import de.darkhope.sfd.biobackpack.blockentity.BioPodestBlockEntity;
import de.darkhope.sfd.biobackpack.registry.ModBlockEntities;
import net.minecraft.core.BlockPos;
import net.minecraft.server.level.ServerPlayer;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.InteractionResult;
import net.minecraft.world.Containers;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.inventory.AbstractContainerMenu;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.BaseEntityBlock;
import net.minecraft.world.level.block.EntityBlock;
import net.minecraft.world.level.block.RenderShape;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.block.entity.BlockEntityTicker;
import net.minecraft.world.level.block.entity.BlockEntityType;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.phys.BlockHitResult;
import net.minecraftforge.network.NetworkHooks;
import org.jetbrains.annotations.Nullable;

public class BioPodestBlock extends BaseEntityBlock implements EntityBlock {
  public BioPodestBlock(Properties properties) {
    super(properties);
  }

  @Override
  public RenderShape getRenderShape(BlockState state) {
    return RenderShape.MODEL;
  }

  @Nullable
  @Override
  public BlockEntity newBlockEntity(BlockPos pos, BlockState state) {
    return new BioPodestBlockEntity(pos, state);
  }

  @Override
  public InteractionResult use(BlockState state, Level level, BlockPos pos, Player player, InteractionHand hand, BlockHitResult hit) {
    if (level.isClientSide) return InteractionResult.SUCCESS;
    BlockEntity blockEntity = level.getBlockEntity(pos);
    if (blockEntity instanceof BioPodestBlockEntity podest && player instanceof ServerPlayer serverPlayer) {
      NetworkHooks.openScreen(serverPlayer, podest, pos);
      return InteractionResult.CONSUME;
    }
    return InteractionResult.PASS;
  }

  @Override
  public void onRemove(BlockState state, Level level, BlockPos pos, BlockState newState, boolean movedByPiston) {
    if (state.getBlock() != newState.getBlock()) {
      BlockEntity blockEntity = level.getBlockEntity(pos);
      if (blockEntity instanceof BioPodestBlockEntity podest) {
        Containers.dropContents(level, pos, podest);
        level.updateNeighbourForOutputSignal(pos, this);
      }
      super.onRemove(state, level, pos, newState, movedByPiston);
    }
  }

  @Override
  public boolean hasAnalogOutputSignal(BlockState state) {
    return true;
  }

  @Override
  public int getAnalogOutputSignal(BlockState state, Level level, BlockPos pos) {
    BlockEntity blockEntity = level.getBlockEntity(pos);
    if (blockEntity instanceof BioPodestBlockEntity podest) {
      return AbstractContainerMenu.getRedstoneSignalFromContainer(podest);
    }
    return 0;
  }

  @Nullable
  @Override
  public <T extends BlockEntity> BlockEntityTicker<T> getTicker(Level level, BlockState state, BlockEntityType<T> type) {
    return createTickerHelper(type, ModBlockEntities.BIO_PODEST.get(), BioPodestBlockEntity::tick);
  }
}
