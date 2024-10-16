import AWS from 'aws-sdk';
import { secret } from '@aws-amplify/backend';

// Access secrets and environment variables
const accessKeyId = secret('AccessKey');
const secretAccessKey = secret('SecretKey');
const region = process.env.REGION;
const bucketName = process.env.S3_BUCKET_NAME;

// Configure AWS SDK
AWS.config.update({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

// Create the S3 client
const s3 = new AWS.S3();

// Function to list all video files from the S3 bucket
export const listVideoFiles = async () => {
  const params = {
    Bucket: bucketName,
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
