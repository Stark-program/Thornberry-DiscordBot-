const { SlashCommandBuilder } = require("@discordjs/builders");

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
  data: new SlashCommandBuilder()
    .setName("removeuser")
    .setDescription("Removes the user mentioned from the interupt list")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription("Tag the user you want removed. Example: @user")
        .setRequired(true);
    }),
  async execute(interaction) {
    let userMentiond = interaction.options._hoistedOptions[0].value;
    let user = await getUserFromMention(userMentiond);

    const deletedUser = await Users.destroy({ where: { discordId: user.id } });

    if (!deletedUser) {
      return interaction.reply({
        content: "That user does not exist",
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: "User deleted from interupt list",
        ephemeral: true,
      });
    }
  },
};
