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

// Function to get a signed URL for a video file
export const getVideoUrl = (fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60, // The URL will expire after 60 seconds
  };

  return s3.getSignedUrl('getObject', params);
};
