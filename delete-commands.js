const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const guildId = process.env.DISCORD_GUILD_ID;
const clientId = process.env.DISCORD_APPLICATION_ID;
const applicationToken = process.env.DISCORD_LOGIN;
const commandId = "979077609747021844";

const rest = new REST({ version: "9" }).setToken(applicationToken);

rest
  .get(`/applications/${clientId}/guilds/${guildId}/commands`)
  .then((res) => console.log(res));
// rest
//   .delete(`/applications/${clientId}/guilds/${guildId}/commands/${commandId}`)
//   .then((res) => {
//     console.log(res);
//   });
