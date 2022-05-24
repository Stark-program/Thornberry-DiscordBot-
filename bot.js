const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(process.env.DISCORD_LOGIN);

// WHAT WE NEED DYNAMICALLY, FOR THIS BOT TO WORK IN EVERY DISCORD.
// USER ID OF USERS WE WANT THE BOT TO INTERUPT
// GUILD ID'S
// CHANNEL ID'S

client.on("ready", () => {
  console.log("I am ready!");
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection
  // With the key as the command name and the value as the exported module
  client.commands.set(command.data.name, command);
}

client.on("interactionCreate", async (interaction) => {
  console.log(interaction.commandName);
  console.log(client.commands.get(interaction.commandName));
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});
