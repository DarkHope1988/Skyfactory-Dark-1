# SFD Systems (Forge 1.20.1)

Multi-module mod setup for Skyfactory Dark.

Modules:
- `sfd-core` (`modid: sfd_core`) shared world state + bridge API
- `sfd-comets` (`modid: sfd_comets`) comet controller, impacts, loot and debug commands
- `sfd-planetization` (`modid: sfd_planetization`) planet progression scaffold (water/atmosphere/gateway track)

## Features (v0.1.0)
- Comet phase controller with impact targeting and world-state integration
- Stage-based comet chest loot tables (`comet_tier_*.json`)
- Impact lightning/chest/crater rules with config toggles
- Debug command suite (`/sfdstate ...`) for fast testing
- Legacy bio-backpack and podest content retained for compatibility

## Build
1. Open this folder in IntelliJ/Eclipse as Gradle project.
2. Ensure Java 17 is used for Gradle.
3. Generate/run Gradle wrapper (`gradlew`) from IDE or local Gradle.
4. Build all modules with `gradlew build`.
5. Use jars from:
   - `sfd-core/build/libs`
   - `sfd-comets/build/libs`
   - `sfd-planetization/build/libs`
