// src/utils/s3GetUrl.js
import AWS from 'aws-sdk';
import { awsConfig } from '../aws-config';

// Configure your AWS credentials
AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
});

const s3 = new AWS.S3();
console.log('AWS Config:', awsConfig.region);
console.log('AWS Config:', awsConfig.accessKeyId);
console.log('AWS Config:', awsConfig.secretAccessKey);
console.log('AWS Config:', awsConfig.bucket);
console.log('AWS Config:', process.env.REACT_TEST);

export const getVideoUrl = (fileName) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: fileName,
    Expires: 60 // The URL will expire after 60 seconds
  };

  return s3.getSignedUrl('getObject', params);
};
