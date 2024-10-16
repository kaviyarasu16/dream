import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

// Fetch region and bucket name from environment variables
const region = 'ap-south-1';
const bucketName = process.env.Bucket_name;

// Function to delete a video file from the S3 bucket
export const deleteVideo = async (videoName) => {
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
      Key: videoName,
    };

    return s3.deleteObject(params).promise();
  } catch (error) {
    console.error('Error deleting video from S3:', error);
    throw error;
  }
};
