const { SlashCommandBuilder } = require("@discordjs/builders");
const getUsers = require("../dataStorage/getusers");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("getusers")
    .setDescription("Replies with the users the bot will interupt"),
  async execute(interaction) {
    const guildId = interaction.member.guild.id;
    const userList = await getUsers(guildId);
    let userString = userList.map((user) => user).join(" ");
    return interaction.reply(
      `These are the users currently being interupted: ${userString}`
    );
  },
};
