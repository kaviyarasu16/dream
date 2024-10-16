// src/utils/s3DeleteFile.js
import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

export const deleteVideo = async (videoName) => {
  try {
    const { AccessKey, SecretKey } = await getSecrets();

    // Configure AWS SDK with retrieved credentials
    AWS.config.update({
      accessKeyId: AccessKey,
      secretAccessKey: SecretKey,
      region: process.env.AWS_REGION,
    });

    const s3 = new AWS.S3();
    
    // Log the bucket name and region
    console.log('S3 Bucket Name:', process.env.S3_BUCKET_NAME);
    console.log('AWS Region:', process.env.AWS_REGION);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: videoName,
    };

    return s3.deleteObject(params).promise();
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};
