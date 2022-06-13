const { joinVoiceChannel } = require("@discordjs/voice");
const { createReadStream } = require("node:fs");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");
const client = require("../client");
const Users = require("../dataStorage/db");

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
let resource = createAudioResource(createReadStream("thornberry.ogg"), {
  inputType: StreamType.OggOpus,
});

player.on("stateChange", (oldState, newState) => {
  console.log(
    `Audio player transitioned from ${oldState.status} to ${newState.status}`
  );
  if (newState.status === "idle") {
    resource = createAudioResource(createReadStream("thornberry.ogg"));
  }
  if (newState.status === "ended") {
    resource = createAudioResource(createReadStream("thornberry.ogg"));
  }
});
let user = [];

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    if (oldState.channelId !== newState.channelId) {
      let voiceChannel = newState.channelId;
      let guildId = newState.guild.id;
      const discordIds = await Users.findAll();
      // let channelInfo = await client.channels.fetch(voiceChannel);
      // console.log(channelInfo);

      if (voiceChannel !== null) {
        let connection = joinVoiceChannel({
          channelId: voiceChannel,
          guildId: guildId,
          adapterCreator: newState.channel.guild.voiceAdapterCreator,
          selfDeaf: false,
          selfMute: false,
        });

        connection.subscribe(player);
        connection.receiver.speaking.on("start", (userId) => {
          console.log(connection.receiver.speaking.users);

          // console.log(
          //   connection.receiver.speaking.addListener("keyPress", (event) => {
          //     console.log(event), null;
          //   })
          // );
          if (user.includes(userId)) {
            player.play(resource);
            player.unpause(resource);
          }
        });

        connection.receiver.speaking.on("end", (userId) => {
          let speakingSize = connection.receiver.speaking.users.size;
          console.log(speakingSize);
          if (speakingSize === 1 && user.includes(userId)) {
            return player.pause(resource);
          } else {
            for (var i = 0; i < user.length; i++) {
              let test = connection.receiver.speaking.users.has(user[i]);
              if (test) {
                return;
              } else {
                return player.pause(resource);
              }
            }
          }
        });
      }
    }
  },
};

// push to talk fucks the bot up. fix it.
// if another user beings talking when person who is interupted is talking, the audio files continues even if interupted user stops talking.
