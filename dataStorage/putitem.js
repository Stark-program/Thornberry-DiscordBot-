const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./dynamodocumentclient");

putItem = async (guildId, discordId, name) => {
  // Set the parameters.
  const params = {
    TableName: "InteruptUsers",
    Item: {
      guildId: guildId,
      discordId: discordId,
      discordName: name,
    },
  };
  try {
    const data = await ddbDocClient.send(new PutCommand(params));
    console.log("Success - item added or updated", data);
  } catch (err) {
    console.log("Error", err.stack);
  }
};
module.exports = putItem;
