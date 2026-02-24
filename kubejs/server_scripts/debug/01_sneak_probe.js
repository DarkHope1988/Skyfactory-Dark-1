// // kubejs/server_scripts/debug/01_sneak_probe.js
// // Testet verschiedene Tick-Events, weil KubeJS-Versionen sich unterscheiden können.
// // Du solltest beim Sneaken eine Chatmeldung bekommen (max 1x pro Sekunde).

// const COOLDOWN_TICKS = 20; // 1 Sekunde
// const seen = {}; // uuid -> lastTick

// function canSpeak(server, player) {
  // const t = server.ticks;
  // const id = String(player.uuid);
  // const last = seen[id] ?? -999999;
  // if (t - last < COOLDOWN_TICKS) return false;
  // seen[id] = t;
  // return true;
// }

// // Variante A: PlayerEvents.tick (bei vielen Setups korrekt)
// PlayerEvents.tick(event => {
  // const p = event.player;
  // const s = p.server;
  // if (!s) return;

  // if (p.isCrouching() && canSpeak(s, p)) {
    // p.tell('[SF-DARK] PlayerEvents.tick: Sneak erkannt ✅');
  // }
// });

// // Variante B: ServerEvents.tick (falls PlayerEvents.tick nicht feuert)
// ServerEvents.tick(event => {
  // const s = event.server;
  // if (!s) return;

  // s.players.forEach(p => {
    // if (p.isCrouching() && canSpeak(s, p)) {
      // p.tell('[SF-DARK] ServerEvents.tick: Sneak erkannt ✅');
    // }
  // });
// });