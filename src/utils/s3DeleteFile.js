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

// Function to delete a video file from the S3 bucket
export const deleteVideo = (videoName) => {
  const params = {
    Bucket: bucketName, // Use environment variable for bucket name
    Key: videoName,
  };

  return s3.deleteObject(params).promise();
};
