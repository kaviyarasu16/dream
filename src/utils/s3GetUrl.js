// src/utils/s3GetUrl.js
import AWS from 'aws-sdk';

const secretsManager = new AWS.SecretsManager();

const getSecrets = async () => {
  const secretName = 'auth-cred'; // Your secret name
  AWS.config.update({ region: 'ap-south-1' }); // Your AWS region
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error('Error retrieving secrets:', error);
    throw error;
  }
};

export const getVideoUrl = async (fileName) => {
  const awsConfig = await getSecrets();

  const s3 = new AWS.S3({
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  const params = {
    Bucket: awsConfig.bucket,
    Key: fileName,
    Expires: 60, // The URL will expire after 60 seconds
  };

  return s3.getSignedUrl('getObject', params);
};
