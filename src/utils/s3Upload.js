// src/utils/s3Upload.js
import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

export const uploadVideo = async (file) => {
  try {
    const { AccessKey, SecretKey } = await getSecrets();

    // Configure AWS SDK with retrieved credentials
    AWS.config.update({
      accessKeyId: AccessKey,
      secretAccessKey: SecretKey,
      region: 'ap-south-1',
    });

    const s3 = new AWS.S3();
    
    // Log the bucket name and region
    console.log('S3 Bucket Name:', process.env.S3_BUCKET_NAME);
    console.log('AWS Region:', process.env.AWS_REGION);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    return s3.upload(params).promise();
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};
