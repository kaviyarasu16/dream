// src/utils/s3Upload.js
import AWS from 'aws-sdk';
import { awsConfig } from '../aws-config';

AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
});

const s3 = new AWS.S3();

export const uploadVideo = (file) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: `${file.name}`,
    Body: file,
    ContentType: file.type,
    //ACL: 'public-read', // adjust as needed
  };

  return s3.upload(params).promise();
};
