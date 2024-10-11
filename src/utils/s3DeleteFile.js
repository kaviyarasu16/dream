// src/utils/s3DeleteFile.js
import AWS from 'aws-sdk';
import { awsConfig } from '../aws-config';

AWS.config.update({
  region: awsConfig.region,
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
});

const s3 = new AWS.S3();

export const deleteVideo = (videoName) => {
  const params = {
    Bucket: awsConfig.bucket,
    Key: videoName,
  };

  return s3.deleteObject(params).promise();
};
