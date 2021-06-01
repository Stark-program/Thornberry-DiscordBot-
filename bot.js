const Discord = require("discord.js");
const path = require("path");
require("dotenv").config();

const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  let newUserChannel = newMember.channelID;
  let oldUserChannel = oldMember.channelID;

  const authorized = [process.env.A_DISCORD_ID];
  const talkingUsers = [];

  if (newUserChannel === process.env.DISCORD_CHANNEL_ID) {
    const channel = client.channels.cache.get(process.env.DISCORD_CHANNEL_ID);
    if (!channel) {
      return console.log("The channel does not exist");
    }
    channel
      .join()
      .then((connection) => {
        const audio = {
          status: false,
          dispatcher: function () {
            return connection.play(
              path.join(__dirname, "thornberry.audio.mp3")
            );
          },
        };
        client.on("guildMemberSpeaking", (newMember, speaking) => {
          if (speaking.equals(1) && !authorized.includes(newMember.id)) {
            console.log(newMember.displayName + " is speaking!");
            audio["status"] = true;
            if ((audio["status"] = true)) {
              return audio.dispatcher();
            }
          }

          if (speaking.equals(0) && !authorized.includes(newMember.id)) {
            audio["status"] = false;
            console.log(newMember.displayName + " stopped talking");
            connection.play(path.join(__dirname, "silence.mp3"));
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    console.log("Left vc");
  }
});

client.login(process.env.DISCORD_LOGIN);
