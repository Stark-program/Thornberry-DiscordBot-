const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageMentions: { USERS_PATTERN },
} = require("discord.js");

const client = require("../client");
const putItem = require("../dataStorage/putitem");

function getUserFromMention(mention) {
  console.log(mention);
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
    .setName("interupt")
    .setDescription("Sets the user you would like to be interupted")
    .addStringOption((option) => {
      return option
        .setName("name")
        .setDescription(
          "Tag the user you want interupted (only one). Example: @user"
        )
        .setRequired(true);
    }),
  async execute(interaction) {
    const userMentiond = interaction.options._hoistedOptions[0].value;
    const user = await getUserFromMention(userMentiond);
    if (!user) {
      return interaction.reply({
        content:
          "Please enter the user in correctly, with no extra characters. example: @user",
        ephemeral: true,
      });
    }
    console.log(user);
    const guildId = interaction.member.guild.id;
    const discordId = user.id;
    const username = user.username;
    //call the function to store the information into the database
    // putItem(guildId, discordId, username);
  },
};
