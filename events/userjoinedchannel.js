const { joinVoiceChannel } = require("@discordjs/voice");
const { EventEmitter } = require("events");
const {
  createAudioPlayer,
  createAudioResource,
  NoSubscriberBehavior,
} = require("@discordjs/voice");
const { SlashCommandRoleOption } = require("@discordjs/builders");
const emitter = new EventEmitter();

emitter.setMaxListeners(10);

const resource = createAudioResource("thornberry.mp3");
console.log(resource.playStream._events.end);

let end = resource.playStream._events;

console.log(end);

const player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});
if (resource.ended) {
  player.play(resource);
}
player.play(resource);

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
      connection.subscribe(player);
      connection.receiver.speaking.on("start", (userId) => {
        player.play();
        console.log(playAudio);
      });
      connection.receiver.speaking.on("end", (userId) => {
        // connection.subscribe(stop);
        player.pause();
        console.log(playAudio);
      });
    }
  },
};
