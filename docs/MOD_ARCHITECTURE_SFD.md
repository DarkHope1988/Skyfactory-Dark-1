# SFD Module Architecture

## Goal
Stable IDs and clean module boundaries so Minecraft/Forge upgrades are predictable.

## Current placement (decision)
1. `sfd-core`
- Shared API and data contracts only.
- World state (`SfdWorldStateData`) and bridge API.
- Central IDs (`SfdItemIds`, `SfdBlockIds`, `SfdMods`).
- Migration helpers (`SfdItemIdMigration`).

2. `sfd-comets`
- Comet controller, impacts, crater/cache behavior, comet commands.
- Active content registry used by the current pack loop:
  custom items, comet cache, bio podest/backpack/growth paste.
- Uses `sfd-core` constants and migration APIs.

3. `sfd-planetization`
- Reserved for phase-2 extraction (water/atmosphere/ore-chain systems).
- Keep empty until systems are ported in one coherent batch.

## Why not move all item IDs to `sfd-planetization` immediately
1. IDs are now stable in production saves.
2. Immediate namespace move would force broad ID remaps and increase break risk.
3. We first lock contracts in `sfd-core`, then migrate feature-by-feature.

## Upgrade readiness rules
1. Never hardcode mod IDs in feature logic; use `sfd-core` ID constants.
2. Keep world/save schema versioned (`data_version`) and migrate forward.
3. Keep Forge/Minecraft/mappings versions centralized in root `gradle.properties`.
4. Use one migration point for legacy item IDs (`SfdItemIdMigration`).
5. Move systems from `sfd-comets` to `sfd-planetization` only when:
- feature complete,
- data migration defined,
- KubeJS references switched in one pass.

