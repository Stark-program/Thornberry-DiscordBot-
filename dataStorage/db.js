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
// const {
//   DynamoDBClient,
//   ListTablesCommand,
// } = require("@aws-sdk/client-dynamodb");
// require("dotenv").config();

// (async () => {
//   const client = new DynamoDBClient({ region: "us-west-2" });
//   const command = new ListTablesCommand({});
//   try {
//     console.log("running");
//     const results = await client.send(command);
//     console.log(results.TableNames.join("\n"));
//   } catch (err) {
//     console.error(err);
//   }
// })();
