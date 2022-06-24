const { SlashCommandBuilder } = require("@discordjs/builders");
const getUsers = require("../data/getusers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getusers")
    .setDescription("Replies with the users the bot will interupt"),
  async execute(interaction) {
    const guildId = interaction.member.guild.id;
    const userList = await getUsers(guildId);
    if (!userList) {
      return interaction.reply({
        content: "There are no users currently being interupted",
        ephemeral: true,
      });
    } else {
      let userString = userList.map((user) => user).join(" ");
      return interaction.reply({
        content: `These are the users currently being interupted: ${userString}`,
        ephemeral: true,
      });
    }
  },
};
