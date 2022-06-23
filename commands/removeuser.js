const { SlashCommandBuilder } = require("@discordjs/builders");
const deleteItem = require("../data/deleteitem");
const {
  MessageMentions: { USERS_PATTERN },
} = require("discord.js");
const client = require("../client");

function getUserFromMention(mention) {
  // The id is the first and only match found by the RegEx.
  const matches = mention.matchAll(USERS_PATTERN).next().value;

  // If supplied variable was not a mention, matches will be null instead of an array.
  if (!matches) return;

  // The first element in the matches array will be the entire mention, not just the ID,
  // so use index 1.
  const id = matches[1];

  return client.users.cache.get(id);
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
    let user = getUserFromMention(userMentiond);

    const guildId = interaction.member.guild.id;
    const discordId = user.id;
    const deletedUser = await deleteItem(guildId, discordId);

    interaction.reply({
      content: "User deleted from interupt list",
      ephemeral: true,
    });
  },
};
