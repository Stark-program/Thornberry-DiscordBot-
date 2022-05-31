const { SlashCommandBuilder } = require("@discordjs/builders");
const Users = require("../dataStorage/db");
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
    let userMentiond = interaction.options._hoistedOptions[0].value;
    let user = await getUserFromMention(userMentiond);
    let discordUser = {
      name: user.username,
      discordId: user.id,
    };
    // if (this.users.includes(discordUser)) {
    //   return;
    // } else this.users.push(discordUser);

    const addUserToDb = await Users.create({
      name: user.username,
      discordId: user.id,
    });
    console.log("added user to Sequelize");
  },
};
