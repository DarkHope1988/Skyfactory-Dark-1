// System: world rules (dimensions, gamerules)
// Sterile start: no natural mobs/NPCs and no weather cycle.

ServerEvents.loaded(event => {
  const server = event.server;

  server.runCommandSilent('gamerule doMobSpawning false');
  server.runCommandSilent('gamerule doTraderSpawning false');
  server.runCommandSilent('gamerule doPatrolSpawning false');
  server.runCommandSilent('gamerule doInsomnia false');
  server.runCommandSilent('gamerule doWeatherCycle false');
  server.runCommandSilent('weather clear 1000000');
});
