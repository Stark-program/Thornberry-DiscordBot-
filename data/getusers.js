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
    const users = data.Items;
    if (users.length === 0) {
      return false;
    } else {
      const listedUsers = users.map((element) => {
        const username = element.discordName;
        return username;
      });
      return listedUsers;
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = getUsers;
