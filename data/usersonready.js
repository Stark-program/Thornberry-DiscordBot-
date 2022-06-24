const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./dynamoclient");
const client = require("../client");
console.log(client.guilds.cache);
const getInteruptUsers = async () => {
  const guildIds = Array.from(client.guilds.cache.keys());
  console.log(guildIds);
  const interuptObj = {};
  for (var i = 0; i < guildIds.length; i++) {
    const key = guildIds[i];
    const interuptIds = await dbGetUsers(guildIds[i]);
    interuptObj[key] = interuptIds;
  }
  console.log(interuptObj);
};

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

getInteruptUsers();

module.exports = dbGetUsers;
