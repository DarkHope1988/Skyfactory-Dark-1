package de.darkhope.sfd.planetization;

import net.minecraftforge.fml.common.Mod;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Mod(SfdPlanetizationMod.MOD_ID)
public class SfdPlanetizationMod {
  public static final String MOD_ID = "sfd_planetization";
  private static final Logger LOGGER = LogManager.getLogger();

  public SfdPlanetizationMod() {
    LOGGER.info("[SFD Planetization] Initialized");
  }
}
