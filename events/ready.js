const getUsersOnReady = require("../data/usersonready");

const interuptObj = {};

const onReady = {
  name: "ready",
  once: true,
  async execute(client) {
    const guildIds = Array.from(client.guilds.cache.keys());
    for (var i = 0; i < guildIds.length; i++) {
      const interuptIds = await getUsersOnReady(guildIds[i]);
      console.log(interuptIds);
    }
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
module.exports = onReady;
