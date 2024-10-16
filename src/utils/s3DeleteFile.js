// src/utils/s3DeleteFile.js
import AWS from '../awsConfig'; // Import AWS from the new config file

const secretsManager = new AWS.SecretsManager();

const getSecrets = async () => {
  const secretName = 'auth-cred'; // Your secret name
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    return JSON.parse(data.SecretString);
  } catch (error) {
    console.error('Error retrieving secrets:', error);
    throw error;
  }
};

export const deleteVideo = async (videoName) => {
  const awsConfig = await getSecrets();

  const s3 = new AWS.S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  const params = {
    Bucket: awsConfig.bucket,
    Key: videoName,
  };

  return s3.deleteObject(params).promise();
};
