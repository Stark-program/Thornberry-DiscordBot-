const Users = require("../dataStorage/db");
const client = require("../client");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    let voiceChannel = newState.channelId;
    let guildId = newState.guild.id;
    if (voiceChannel !== null) {
      joinVoiceChannel({
        channelId: voiceChannel,
        guildId: guildId,
        adapterCreator: newState.channel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
      });
    }
  },
};
