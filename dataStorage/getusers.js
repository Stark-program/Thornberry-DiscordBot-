const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbClient } = require("./dynamoclient");

getUsers = async (guildId) => {
  const params = {
    KeyConditionExpression: `guildId = :guildId`,
    ExpressionAttributeValues: {
      ":guildId": guildId,
    },
    TableName: "InteruptUsers",
  };

  try {
    const data = await ddbClient.send(new QueryCommand(params));
    let users = data.Items;
    const listedUsers = users.map((element) => {
      let username = element.discordName;
      return username;
    });
    return listedUsers;
  } catch (err) {
    console.error(err);
  }
};

module.exports = getUsers;
