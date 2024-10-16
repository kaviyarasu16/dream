// src/utils/getSecrets.js
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'ap-south-1', // Ensure you set the region from environment variable
  });
const secretsManager = new AWS.SecretsManager();

// Fetch bucket name from environment variables
const bucketName = process.env.Bucket_name;
const region = process.env.Region; // Get the region from environment variable

// Log region and bucket name
console.log(`Region: ${region}`);
console.log(`Bucket Name: ${bucketName}`);

export const getSecrets = async () => {
  try {
    const secret = await secretsManager.getSecretValue({ SecretId: 'auth-cred' }).promise();
    const { AccessKey, SecretKey } = JSON.parse(secret.SecretString);
    return { AccessKey, SecretKey };
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
};
