// src/utils/s3ListObjects.js
import AWS from 'aws-sdk';

// Initialize the Secrets Manager client
const secretsManager = new AWS.SecretsManager();

// Function to get secrets
const getSecrets = async () => {
  const secretName = 'auth-cred'; // Replace with your secret name
  try {
    const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
    if ('SecretString' in data) {
      return JSON.parse(data.SecretString);
    } else {
      // Handle binary secret (if needed)
      const buff = Buffer.from(data.SecretBinary, 'base64');
      return JSON.parse(buff.toString('utf-8'));
    }
  } catch (error) {
    console.error('Error retrieving secrets:', error);
    throw error; // Propagate error to the caller
  }
};

export const listVideoFiles = async () => {
  const awsConfig = await getSecrets(); // Fetch the AWS credentials from Secrets Manager

  const s3 = new AWS.S3({
    region: awsConfig.region,
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
