// kubejs/server_scripts/debug/00_sanity.js
// Sanity Check: beweist, dass server_scripts wirklich laufen.

ServerEvents.loaded(event => {
  // Log (Konsole)
  console.info('[SF-DARK] ServerEvents.loaded fired ✅');

  // Chat (nur wenn Spieler da sind)
  event.server.players.forEach(p => {
    p.tell('[SF-DARK] ServerEvents.loaded fired ✅ (du siehst diese Nachricht nur, wenn server_scripts laufen)');
  });
});