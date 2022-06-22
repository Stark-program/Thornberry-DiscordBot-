const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

const guildId = process.env.DISCORD_GUILD_ID;
const clientId = process.env.DISCORD_APPLICATION_ID;
const applicationToken = process.env.DISCORD_LOGIN;

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(applicationToken);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() =>
    console.log(
      "Successfully registered application commands to guild for development."
    )
  )
  .catch(console.error);
