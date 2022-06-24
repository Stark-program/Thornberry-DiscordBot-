const { joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice");
const { createReadStream } = require("node:fs");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType,
} = require("@discordjs/voice");
const dbGetUsers = require("../data/usersonready");
const client = require("../client");

const interuptObj = {};
client.on("ready", async (client) => {
  const guildIds = Array.from(client.guilds.cache.keys());
  for (var i = 0; i < guildIds.length; i++) {
    const key = guildIds[i];
    const interuptIds = await dbGetUsers(guildIds[i]);
    interuptObj[key] = interuptIds;
  }
});

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
let resource = createAudioResource(createReadStream("thornberry.ogg"), {
  inputType: StreamType.OggOpus,
});

// this detects the current state of the audio player. When the audio resource becomes idle, it is immediatley created again, ready to be played.

player.on(AudioPlayerStatus.Idle, () => {
  resource = createAudioResource(createReadStream("thornberry.ogg"));
});
player.on("error", (error) => {
  console.log(
    `Error: ${error.message} with resource ${error.resource.metadata.title}`
  );
  resource = createAudioResource(createReadStream("thornberry.ogg"));
});

module.exports = {
  name: "voiceStateUpdate",
  async execute(oldState, newState) {
    //gets the id of the user joining the channel
    let userJoiningChannel = newState.member.user.id;

    if (oldState.channelId !== newState.channelId) {
      //check if the user joining the voice channel is on the interupt list
      if (interuptObj[newState.guild.id].includes(userJoiningChannel)) {
        let voiceChannel = newState.channelId;
        let guildId = newState.guild.id;
        //check for null here because newState channelid will equal null when user leaves the voice channel
        if (voiceChannel !== null) {
          let connection = joinVoiceChannel({
            channelId: voiceChannel,
            guildId: guildId,
            adapterCreator: newState.channel.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false,
          });

          // have the bot subscribe to the audio resource, ready to play

          // When a user starts talking, emmit the speaking event
          connection.receiver.speaking.on("start", (userId) => {
            //if the user speaking is in the interupt list, play the audio resource
            if (interuptObj[guildId].includes(userId)) {
              connection.subscribe(player);
              if (
                player.state.status !== "paused" &&
                player.state.status !== "playing"
              ) {
                player.play(resource);
              } else {
                player.unpause(resource);
              }
            }
          });

          connection.receiver.speaking.on("end", (userId) => {
            console.log("stopped speaking");

            // we set a timeout here because when a user stops talking, it takes time for that user to be removed from the speakingMap. specifically a DELAY of 100. (whatever 100 means, i could not tell in the docs)
            // We are utilizing this speakingMap to detect who is accuratley speaking, and who is not.
            // because of this, we need to give appropriate time for the speakingMap to update. Therefore, we are waiting just 10 miliseconds before executing the code.
            let user = interuptObj[guildId];
            console.log(user);
            setTimeout(() => {
              for (var i = 0; i < user.length; i++) {
                let isInteruptSpeaking = connection.receiver.speaking.users.has(
                  user[i]
                );
                if (isInteruptSpeaking) {
                  return;
                } else {
                  return player.pause(resource);
                }
              }
            }, 10);
          });
        }
      }
    }
  },
};
