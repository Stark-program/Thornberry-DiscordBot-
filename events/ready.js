const Users = require("../dataStorage/db");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // Users.sync();
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
