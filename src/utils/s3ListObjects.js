// src/utils/s3ListObjects.js

import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets'; // Importing the getSecrets function

export const listVideoFiles = async () => {
  try {
    const { AccessKey, SecretKey } = await getSecrets();

    AWS.config.update({
      accessKeyId: AccessKey,
      secretAccessKey: SecretKey,
      region: process.env.REGION,
    });

    const s3 = new AWS.S3();

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
    };

    const data = await s3.listObjectsV2(params).promise();
    console.log('Video files:', data.Contents);
    return data.Contents;
  } catch (error) {
    console.error('Error listing video files from S3:', error);
  }
};
