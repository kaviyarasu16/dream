// src/utils/s3Upload.js
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

export const uploadVideo = async (file) => {
  const awsConfig = await getSecrets();

  const s3 = new AWS.S3({
    region: awsConfig.region,
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  const params = {
    Bucket: awsConfig.bucket,
    Key: `${file.name}`,
    Body: file,
    ContentType: file.type,
    // ACL: 'public-read', // adjust as needed
  };

  return s3.upload(params).promise();
};
