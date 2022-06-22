// Create the DynamoDB service client module using ES6 syntax.
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
// const AWS = require("aws-sdk");
require("dotenv").config();
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
// Set the AWS Region.
const REGION = "us-west-2"; // For example, "us-east-1".
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: REGION,
});

exports.ddbClient = ddbClient;
