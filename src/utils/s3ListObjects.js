// src/utils/s3ListObjects.js
import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets';

export const listVideoFiles = async () => {
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
      Prefix: '',
    };

    const response = await s3.listObjectsV2(params).promise();
    return response.Contents.map((item) => item.Key);
  } catch (error) {
    console.error('Error listing video files from S3:', error);
    return [];
  }
};
