const { SlashCommandBuilder } = require("@discordjs/builders");

const client = require("../client");
const putItem = require("../dataStorage/putitem");

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
    const userMentiond = interaction.options._hoistedOptions[0].value;
    const user = await getUserFromMention(userMentiond);
    const guildId = interaction.member.guild.id;
    const discordId = user.id;
    const username = user.username;
    //call the function to store the command and its information into the database
    putItem(guildId, discordId, username);
  },
};
