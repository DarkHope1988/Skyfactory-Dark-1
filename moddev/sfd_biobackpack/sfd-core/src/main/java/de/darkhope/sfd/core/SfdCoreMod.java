package de.darkhope.sfd.core;

import net.minecraftforge.fml.common.Mod;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(SfdCoreMod.MOD_ID)
public class SfdCoreMod {
  public static final String MOD_ID = "sfd_core";
  private static final Logger LOGGER = LogManager.getLogger();

  public SfdCoreMod() {
    LOGGER.info("[SFD Core] Initialized");
  }
}
