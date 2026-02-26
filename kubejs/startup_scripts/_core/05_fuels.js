// Custom fuel balance for early progression.
// Startup script type is required for ItemEvents.modification.
// Vanilla smelt = 200 ticks, bark briquette = 50 ticks -> ~4 per item.

ItemEvents.modification(function (event) {
  event.modify('sfd_comets:bark_briquette', function (item) {
    item.burnTime = 50;
  });
});

