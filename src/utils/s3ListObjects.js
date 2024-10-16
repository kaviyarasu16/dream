import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

// Fetch region and bucket name from environment variables
const region = 'ap-south-1';
const bucketName = process.env.Bucket_name;

// Function to list all video files from the S3 bucket
export const listVideoFiles = async () => {
  try {
    const { AccessKey, SecretKey } = await getSecrets(); // Get credentials from Secrets Manager

    AWS.config.update({
      region: region,
      accessKeyId: AccessKey,
      secretAccessKey: SecretKey,
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: bucketName, // Use environment variable for bucket name
      Prefix: '', 
    };

    const response = await s3.listObjectsV2(params).promise();
    return response.Contents.map((item) => item.Key);
  } catch (error) {
    console.error('Error listing video files from S3:', error);
    return [];
  }
};
