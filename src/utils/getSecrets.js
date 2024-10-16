// src/utils/getSecrets.js
import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.Region, // Ensure you set the region from environment variable
  });
const secretsManager = new AWS.SecretsManager();

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
