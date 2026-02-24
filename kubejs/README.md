# Skyfactory Dark – KubeJS Baseline (v1)

## Early Game Progress (current)
1. **Leaves + Crook** → `Organic Dust` (+ selten `Resin Fragment`)
2. `Organic Dust`:
   - **2x2** → `Compost Pile`
   - **Cross Pattern** → `Compost Pulp`
3. **2x2 Compost Pile** → `Dirt`
4. **Packed Soil**: `Dirt` + `Compost Pulp` → `Packed Soil`
5. **Mallet**: craft `Crude Mallet` (uses `Resin Fragment`)
6. **Break Packed Soil with Mallet** → `Stone Grit` / `Pebble Cluster` / `Organic Fiber`
7. **2x2 Stone Grit** → `Cobblestone` → ab hier Vanilla (Furnace, Tools, etc.)

## Files that define this
- Loot: `server_scripts/systems/resources/leaves_system.js`
- Loot: `server_scripts/loot/vanilla_overrides/packed_soil_mallet.js`
- Recipes: `server_scripts/recipes/custom/organic_processing.js`
- Recipes: `server_scripts/recipes/custom/stone_processing.js`
- Registry: `startup_scripts/_core/03_items.js`, `startup_scripts/_core/04_blocks.js`
- Ingame helper: `client_scripts/_core/10_tooltips.js`
