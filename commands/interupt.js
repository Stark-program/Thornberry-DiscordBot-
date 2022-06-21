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
    const userExist = await Users.findOne({ where: { discordId: user.id } });

    if (userExist) {
      interaction.reply({
        content: "User is already on the interupt list",
        ephemeral: true,
      });
    } else {
      const addUserToDb = await Users.create({
        name: user.username,
        discordId: user.id,
      });
      interaction.reply({
        content: "User successfully added to interupt list!,",
        ephemeral: true,
      });
    }
  },
};
