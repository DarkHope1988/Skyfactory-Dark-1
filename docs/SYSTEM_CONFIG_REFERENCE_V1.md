# SFD System Config Reference V1

Source of truth:
- `kubejs/server_scripts/_core/15_system_config.js`

Purpose:
- Central balancing knobs for comet progression, ore chain, planetization and HUD behavior.

## comet
- `startStage`: Stage at which comet gameplay may unlock. Default: `sfd_stage_2_stone`
- `startTier`: First comet loot tier considered active. Default: `2`
- `directVanillaOreLoot`: Allows direct vanilla ore-tier loot from comet tables. Default: `false`

## planetization
- `waterBucketCellCost`: Number of `sfd_comets:condensed_water_cell` needed for one water bucket craft.
- `allowDirectWaterBeforeUnlock`: Reserved policy flag for strict water gating.

## oreChain
- `protoToNuggetYield`: Output amount for proto iron conversion into iron nuggets.
- `nuggetsToIngot`: Reference factor for metal progression balancing.

## gateway
- `enabled`: Master toggle for gateway pathway systems.
- `allowInNonSkyPacks`: Enables integration mode for non-sky modpacks.

## ui
- `showPlanetStatusInHud`: Show planet status in actionbar line.
- `showStageEtaInHud`: Show per-stage ETA in actionbar line.

## Notes
- Keep this file data-only.
- Gameplay scripts must read from config and avoid hardcoded balancing constants when possible.

