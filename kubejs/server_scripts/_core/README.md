# server_scripts/_core
Shared utilities and global rules. Keep this small and stable.

Load order contract (do not reorder without reason):
1. `00_constants.js`
2. `01_world_state.js`
3. `02_unlock_policy.js`
4. `03_stage_manager.js`

Other files in this folder should start at `10_...` and must only consume these APIs.

Current data profiles:
- `13_planetization_profile.js` = staged world/planet transformation SSOT bridge.
- `14_comet_loot_profile.js` = comet tier loot profile (tier 2+ start).
- `15_system_config.js` = central runtime knobs (comet, ore chain, hud, gateway).
- `16_ore_chain_profile.js` = custom ore unlock bridge profile.
