# Mob Unlocks - Stage Driven

## Current State
1. Hostile mobs are globally disabled by default.
2. Unlock map exists but is empty.

## File
1. `kubejs/server_scripts/systems/world/mob_unlocks.js`

## How To Unlock Later
1. Add mob ids to a stage bucket in `global.sfdMobUnlocksByStage`.
2. Example:
   - `global.sfdMobUnlocksByStage['sfd_stage_2_stone'] = ['minecraft:zombie']`
3. The system applies unlocks automatically on:
   - player login
   - stage unlock events via crafted milestones

## Notes
1. If no mob is unlocked for active stages, hostile spawning stays blocked.
2. Phantoms are still hard-blocked in `world_rules.js` until explicitly changed.
