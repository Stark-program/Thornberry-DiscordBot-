const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const { ddbDocClient } = require("./dynamodocumentclient");

// Set the parameters.

deleteItem = async (guildId, discordId) => {
  const params = {
    TableName: "InteruptUsers",
    Key: {
      guildId: guildId,
      discordId: discordId,
    },
  };
  try {
    const data = await ddbDocClient.send(new DeleteCommand(params));
    console.log(data);
    console.log("Success - item deleted");
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports = deleteItem;
