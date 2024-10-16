// src/utils/getSecrets.js

import { SecretsManager } from 'aws-sdk';

// Utility function to get secrets
export const getSecrets = async () => {
  const secretsManager = new SecretsManager({ region: process.env.REGION });

  try {
    const data = await secretsManager.getSecretValue({
      SecretId: 'auth-cred', // The name of your secret in Secrets Manager
    }).promise();

    if (data.SecretString) {
      const secret = JSON.parse(data.SecretString);
      return {
        AccessKey: secret.AccessKeyId,
        SecretKey: secret.SecretAccessKey,
      };
    } else {
      throw new Error('No secret string found');
    }
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
};
