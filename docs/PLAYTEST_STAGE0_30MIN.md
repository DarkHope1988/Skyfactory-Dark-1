# Stage 0 - 30 Minute Playtest

## Goal
Validate that the first 30 minutes are stable, readable, and not trivial.

## Expected Start State
1. Starter items:
   - `minecraft:oak_sapling` x1
   - `minecraft:oak_slab` x1
   - Bone meal refills continuously (temporary infinite system)
2. No natural mobs/NPCs/trader/weather cycle active.
3. No early `minecraft:crafting_table` recipe available.

## Core Loop To Test
1. Grow tree with starter tools.
2. Break leaves:
   - Should drop `kubejs:leaf_shreds`.
   - Should not drop sticks/apples as primary loop drops.
3. Break logs:
   - Should not be a direct vanilla log progression.
   - Should feed early custom resources (`organic_fiber`, `resin_fragment`, sapling safety).
4. Craft in 2x2 only:
   - `leaf_shreds -> organic_dust/resin_fragment`
   - `organic_dust -> compost_pile`
   - `compost_pile -> dirt`
5. Continue into packed soil / mallet setup without 3x3 crafting.

## 30-Minute Success Criteria
1. Player always has a recoverable sapling route (drops or fallback craft).
2. No hard softlock occurs from bad RNG.
3. JEI info is sufficient to understand where core Stage 0 items come from.
4. Stage 0 quests are completable but not instant.
5. Player should still have open goals after 30 minutes (not "finished pack" feeling).

## Known Temporary Design
1. Infinite bone meal is currently implemented as inventory top-up.
2. This will be replaced later by a dedicated growth mechanic item/system.
