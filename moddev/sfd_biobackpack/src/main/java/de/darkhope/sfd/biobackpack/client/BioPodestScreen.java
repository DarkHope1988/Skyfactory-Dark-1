package de.darkhope.sfd.biobackpack.client;

import com.mojang.blaze3d.systems.RenderSystem;
import de.darkhope.sfd.biobackpack.menu.BioPodestMenu;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.client.gui.screens.inventory.AbstractContainerScreen;
import net.minecraft.network.chat.Component;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.entity.player.Inventory;

public class BioPodestScreen extends AbstractContainerScreen<BioPodestMenu> {
  private static final ResourceLocation TEXTURE = new ResourceLocation("minecraft", "textures/gui/container/anvil.png");

  public BioPodestScreen(BioPodestMenu menu, Inventory playerInventory, Component title) {
    super(menu, playerInventory, title);
    this.imageWidth = 176;
    this.imageHeight = 166;
    this.inventoryLabelY = 72;
  }

  @Override
  protected void renderBg(GuiGraphics graphics, float partialTick, int mouseX, int mouseY) {
    RenderSystem.setShaderColor(1.0F, 1.0F, 1.0F, 1.0F);
    int x = (width - imageWidth) / 2;
    int y = (height - imageHeight) / 2;
    graphics.blit(TEXTURE, x, y, 0, 0, imageWidth, imageHeight);

    // Hide the red anvil indicator and replace it with a custom progress bar.
    graphics.fill(x + 98, y + 43, x + 126, y + 61, 0xFFC7C7C7);
    graphics.fill(x + 100, y + 49, x + 124, y + 54, 0xFF555555);
    int w = menu.getProgressScaled(24);
    if (w > 0) {
      graphics.fill(x + 100, y + 49, x + 100 + w, y + 54, 0xFF67B64A);
    }
  }

  @Override
  public void render(GuiGraphics graphics, int mouseX, int mouseY, float partialTick) {
    renderBackground(graphics);
    super.render(graphics, mouseX, mouseY, partialTick);
    renderTooltip(graphics, mouseX, mouseY);
  }
}
