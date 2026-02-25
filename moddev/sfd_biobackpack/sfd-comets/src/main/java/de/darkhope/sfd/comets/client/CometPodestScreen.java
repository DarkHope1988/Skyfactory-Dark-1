package de.darkhope.sfd.comets.client;

import com.mojang.blaze3d.systems.RenderSystem;
import de.darkhope.sfd.comets.menu.CometPodestMenu;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.screens.inventory.AbstractContainerScreen;
import net.minecraft.network.chat.Component;
import net.minecraft.world.entity.player.Inventory;

public class CometPodestScreen extends AbstractContainerScreen<CometPodestMenu> {
  public CometPodestScreen(CometPodestMenu menu, Inventory playerInventory, Component title) {
    super(menu, playerInventory, title);
    this.imageWidth = 176;
    this.imageHeight = 166;
    this.titleLabelX = 8;
    this.titleLabelY = 6;
  }

  @Override
  protected void renderBg(GuiGraphics graphics, float partialTick, int mouseX, int mouseY) {
    RenderSystem.setShaderColor(1.0F, 1.0F, 1.0F, 1.0F);
    int x = (width - imageWidth) / 2;
    int y = (height - imageHeight) / 2;

    // Main panel
    graphics.fill(x, y, x + imageWidth, y + imageHeight, 0xFFB1A59F);
    graphics.fill(x + 1, y + 1, x + imageWidth - 1, y + imageHeight - 1, 0xFFACA09A);

    // Top work area
    graphics.fill(x + 8, y + 18, x + imageWidth - 8, y + 74, 0xFFA99D97);

    // Input/output slots
    drawSlot(graphics, x + 27, y + 47);
    drawSlot(graphics, x + 76, y + 47);
    drawSlot(graphics, x + 134, y + 47);

    // Plus and arrow separators
    graphics.fill(x + 52, y + 55, x + 65, y + 57, 0xFF6B615D);
    graphics.fill(x + 57, y + 50, x + 59, y + 63, 0xFF6B615D);
    graphics.fill(x + 100, y + 55, x + 112, y + 57, 0xFF6B615D);
    graphics.fill(x + 112, y + 52, x + 113, y + 60, 0xFF6B615D);
    graphics.fill(x + 113, y + 53, x + 114, y + 59, 0xFF6B615D);
    graphics.fill(x + 114, y + 54, x + 115, y + 58, 0xFF6B615D);

    // Player inventory slot frames
    for (int row = 0; row < 3; row++) {
      for (int col = 0; col < 9; col++) {
        drawSlot(graphics, x + 8 + col * 18, y + 84 + row * 18);
      }
    }
    for (int hotbar = 0; hotbar < 9; hotbar++) {
      drawSlot(graphics, x + 8 + hotbar * 18, y + 142);
    }

    // Progress bar
    int w = menu.getProgressScaled(32);
    if (w > 0) {
      graphics.fill(x + 96, y + 66, x + 96 + w, y + 69, 0xFF6DAE53);
    }
  }

  private static void drawSlot(GuiGraphics graphics, int x, int y) {
    graphics.fill(x, y, x + 18, y + 18, 0xFF7A6E68);
    graphics.fill(x + 1, y + 1, x + 17, y + 17, 0xFF5A514D);
    graphics.fill(x + 2, y + 2, x + 16, y + 16, 0xFF4B4340);
  }

  @Override
  public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTick) {
    renderBackground(graphics);
    super.render(graphics, mouseX, mouseY, partialTick);
    renderTooltip(graphics, mouseX, mouseY);
  }
}


