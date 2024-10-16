// src/utils/getSecrets.js
import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'ap-south-1', // Use the environment variable
});

const secretsManager = new AWS.SecretsManager();

export const getSecrets = async () => {
  try {
    const secret = await secretsManager.getSecretValue({ SecretId: 'auth-cred' }).promise();
    
    // Assuming your secret is stored as a JSON string
    const { AccessKey, SecretKey } = JSON.parse(secret.SecretString);

    // Log the retrieved values
    console.log('Retrieved AWS Region:', process.env.AWS_REGION);
    console.log('Retrieved S3 Bucket Name:', process.env.S3_BUCKET_NAME);
    
    return { AccessKey, SecretKey };
  } catch (err) {
    console.error('Error retrieving secret:', err);
    throw err;
  }
};
