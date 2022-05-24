const { Client, Intents } = require("discord.js");
require("dotenv").config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// WHAT WE NEED DYNAMICALLY, FOR THIS BOT TO WORK IN EVERY DISCORD.
// USER ID OF USERS WE WANT THE BOT TO INTERUPT
// GUILD ID'S
// CHANNEL ID'S

client.on("ready", (guild) => {
  console.log("I am ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply("Server info.");
  } else if (commandName === "user") {
    await interaction.reply("User info.");
  }
});

client.login(process.env.DISCORD_LOGIN);
