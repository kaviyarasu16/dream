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

  const params = {
    Bucket: awsConfig.bucket,
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
