// Custom fuel balance for early progression.
// Vanilla smelt = 200 ticks, bark briquette = 50 ticks -> ~4 per item.

ItemEvents.modification(event => {
  event.modify('kubejs:bark_briquette', item => {
    item.burnTime = 50;
  });
});
