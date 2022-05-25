const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  users: [],
  data: new SlashCommandBuilder()
    .setName("interupt")
    .setDescription("Sets the user you would like to be interupted"),
  async execute(interaction) {
    await interaction.reply("Pong!");
  },
};
