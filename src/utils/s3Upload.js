import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

// Fetch region and bucket name from environment variables
const region = 'ap-south-1';
const bucketName = process.env.Bucket_name;

// Function to upload a video to the S3 bucket
export const uploadVideo = async (file) => {
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
      Key: `${file.name}`,
      Body: file,
      ContentType: file.type,
      // ACL: 'public-read', // adjust as needed
    };

    return s3.upload(params).promise();
  } catch (error) {
    console.error('Error uploading video to S3:', error);
    throw error;
  }
};
