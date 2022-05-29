const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  users: [],
  data: new SlashCommandBuilder()
    .setName("interupt")
    .setDescription("Sets the user you would like to be interupted")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("The user you want interupted")
        .setRequired(true);
    }),
  async execute(interaction) {
    console.log("before", this.users);
    let userMentiond = interaction.options._hoistedOptions[0].value;
    let filteredUserMentioned = userMentiond.replace(/[^0-9]/g, "");
    if (this.users.includes(filteredUserMentioned)) {
      return;
    } else {
      this.users.push(filteredUserMentioned);
    }

    console.log("after", this.users);
  },
};
