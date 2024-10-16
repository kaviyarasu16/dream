// src/utils/s3ListObjects.js
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

export const listVideoFiles = async () => {
  const awsConfig = await getSecrets();

  const s3 = new AWS.S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
  });

  const params = {
    Bucket: awsConfig.bucket,
    Prefix: '',
  };

  try {
    const response = await s3.listObjectsV2(params).promise();
    return response.Contents.map((item) => item.Key);
  } catch (error) {
    console.error('Error listing video files from S3:', error);
    return [];
  }
};
