const { ModalSubmitFieldsResolver } = require("discord.js");
const Sequelize = require("sequelize");

/* ############# SEQUELIZE DATA STORAGE ################## */

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

module.exports = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    unique: true,
  },
  discordId: {
    type: Sequelize.INTEGER,
    unique: true,
  },
});
