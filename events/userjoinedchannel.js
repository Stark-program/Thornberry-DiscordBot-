const { joinVoiceChannel } = require("@discordjs/voice");
const { createReadStream } = require("node:fs");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
let resource = createAudioResource(createReadStream("thornberry.ogg"), {
  inputType: StreamType.OggOpus,
});
player.play(resource);

player.on("stateChange", (oldState, newState) => {
  console.log(
    `Audio player transitioned from ${oldState.status} to ${newState.status}`
  );
  if (newState.status === "idle") {
    resource = createAudioResource("thornberry.mp3");
  }
});
module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    let voiceChannel = newState.channelId;
    let guildId = newState.guild.id;
    if (voiceChannel !== null) {
      let connection = joinVoiceChannel({
        channelId: voiceChannel,
        guildId: guildId,
        adapterCreator: newState.channel.guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false,
      });

      connection.receiver.speaking.on("start", (userId) => {
        connection.subscribe(player);
        player.play(resource);
        player.unpause(resource);
      });

      connection.receiver.speaking.on("end", (userId) => {
        player.pause(resource);
      });
    }
  },
};
