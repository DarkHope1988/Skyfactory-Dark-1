package de.darkhope.sfd.comets.client;

import com.mojang.blaze3d.systems.RenderSystem;
import de.darkhope.sfd.comets.menu.CometCacheMenu;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.screens.inventory.AbstractContainerScreen;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.entity.player.Inventory;

public class CometCacheScreen extends AbstractContainerScreen<CometCacheMenu> {
  private static final ResourceLocation TEXTURE = ResourceLocation.fromNamespaceAndPath("minecraft", "textures/gui/container/generic_54.png");
  private static final int ROWS = 3;

  public CometCacheScreen(CometCacheMenu menu, Inventory playerInventory, Component title) {
    super(menu, playerInventory, title);
    this.imageHeight = 114 + ROWS * 18;
    this.inventoryLabelY = this.imageHeight - 94;
  }

  @Override
  protected void renderBg(GuiGraphics graphics, float partialTick, int mouseX, int mouseY) {
    RenderSystem.setShaderColor(1.0F, 1.0F, 1.0F, 1.0F);
    int x = (width - imageWidth) / 2;
    int y = (height - imageHeight) / 2;
    graphics.blit(TEXTURE, x, y, 0, 0, imageWidth, ROWS * 18 + 17);
    graphics.blit(TEXTURE, x, y + ROWS * 18 + 17, 0, 126, imageWidth, 96);
  }

  @Override
  public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTick) {
    renderBackground(graphics);
    super.render(graphics, mouseX, mouseY, partialTick);
    renderTooltip(graphics, mouseX, mouseY);
  }
}
