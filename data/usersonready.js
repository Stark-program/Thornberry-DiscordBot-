const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./dynamoclient");
const client = require("../client");

// console.log(client.guilds.cache);

dbGetUsers = async (guildId) => {
  const params = {
    KeyConditionExpression: `guildId = :guildId`,
    ExpressionAttributeValues: {
      ":guildId": guildId,
    },
    TableName: "InteruptUsers",
  };

  try {
    const data = await ddbClient.send(new QueryCommand(params));
    const users = data.Items;
    const listedUsers = users.map((element) => {
      const discordId = element.discordId;
      return discordId;
    });
    return listedUsers;
  } catch (err) {
    console.error(err);
  }
};

module.exports = dbGetUsers;
