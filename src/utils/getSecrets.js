// src/utils/getSecrets.js
import AWS from 'aws-sdk';

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
