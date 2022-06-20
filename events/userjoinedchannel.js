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
          // we set a timeout here because when a user stops talking, it takes time for that user to be removed from the speakingMap. specifically a DELAY of 100. (whatever 100 means, i could not tell in the docs)
          // We are utilizing this speakingMap to detect who is accuratley speaking, and who is not.
          // because of this, we need to give appropriate time for the speakingMap to update. Therefore, we are waiting just 10 miliseconds before executing the code.
          setTimeout(() => {
            let speakingSize = connection.receiver.speaking.users.size;
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
          }, 10);
        });
      }
    }
  },
};
