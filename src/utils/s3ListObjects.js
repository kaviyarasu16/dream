// src/utils/s3ListObjects.js
import AWS from 'aws-sdk';
import { awsConfig } from '../aws-config';
// Configure the AWS SDK
AWS.config.update({
  region: awsConfig.region, // Replace with your region
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,

});

const s3 = new AWS.S3();

export const listVideoFiles = async () => {
  console.log('Bucket Name:', awsConfig.bucket); // Check this log output

  const params = {
    Bucket: awsConfig.bucket,
    Prefix: '', // If your videos are in a folder, specify it here like 'videos/'
  };

  try {
    const response = await s3.listObjectsV2(params).promise();
    console.log('S3 Response:', response);
    return response.Contents.map((item) => item.Key);
  } catch (error) {
    console.error('Error listing video files from S3:', error);
    return [];
  }
};
