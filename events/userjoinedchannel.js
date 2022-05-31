const Users = require("../dataStorage/db");
const client = require("../client");

module.exports = {
  name: "voiceStateUpdate",
  execute(oldState, newState) {
    console.log("listening");
  },
};
