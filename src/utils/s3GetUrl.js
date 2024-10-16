import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

// Fetch region and bucket name from environment variables
const region = 'ap-south-1';
const bucketName = process.env.Bucket_name;

// Function to get a signed URL for a video file
export const getVideoUrl = async (fileName) => {
  try {
    const { AccessKey, SecretKey } = await getSecrets(); // Get credentials from Secrets Manager

    AWS.config.update({
      region: region,
      accessKeyId: AccessKey,
      secretAccessKey: SecretKey,
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Expires: 60, // The URL will expire after 60 seconds
    };

    return s3.getSignedUrl('getObject', params);
  } catch (error) {
    console.error('Error getting signed URL:', error);
    throw error;
  }
};
