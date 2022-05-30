const { SlashCommandBuilder } = require("@discordjs/builders");
const { Users } = require("../dataStorage/db");
const client = require("../client");
async function getUserFromMention(mention) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }
    let user = await client.users.fetch(mention);
    return user;
  }
}

module.exports = {
  users: [],
  data: new SlashCommandBuilder()
    .setName("interupt")
    .setDescription("Sets the user you would like to be interupted")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Tag the user you want interupted. Example: @user")
        .setRequired(true);
    }),
  async execute(interaction) {
    console.log("before", this.users);
    let userMentiond = interaction.options._hoistedOptions[0].value;
    let user = await getUserFromMention(userMentiond);
    console.log(user);
    // if (this.users.includes(userMentiond)) {
    //   return;
    // } else {
    //   this.users.push(userName);
    // }

    console.log("after", this.users);
  },
};
