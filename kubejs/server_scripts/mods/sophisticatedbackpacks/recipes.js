// Mod Integration: Sophisticated Backpacks
// Pack policy: native sophisticated backpacks are locked for now
// and can be reintroduced in later stages.

ServerEvents.recipes(event => {
  if (!Platform.isLoaded('sophisticatedbackpacks')) return;

  event.remove({ output: 'sophisticatedbackpacks:backpack' });
  event.remove({ output: 'sophisticatedbackpacks:copper_backpack' });
  event.remove({ output: 'sophisticatedbackpacks:iron_backpack' });
  event.remove({ output: 'sophisticatedbackpacks:gold_backpack' });
  event.remove({ output: 'sophisticatedbackpacks:diamond_backpack' });
  event.remove({ output: 'sophisticatedbackpacks:netherite_backpack' });
});
