const getUsersOnReady = require("../data/usersonready");

const onReady = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};

module.exports = onReady;
