const { SlashCommandBuilder } = require("@discordjs/builders");
const Users = require("../dataStorage/db");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getusers")
    .setDescription("Replies with the users the bot will interupt"),
  async execute(interaction) {
    let userList = await Users.findAll({ attributes: ["name"] });
    let userString = userList.map((user) => user.name).join(" ");
    return interaction.reply(
      `These are the users currently being interupted: ${userString}`
    );
  },
};
