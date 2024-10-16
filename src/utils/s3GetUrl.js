// src/utils/s3GetUrl.js

import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets'; // Importing the getSecrets function

export const getVideoUrl = async (fileName) => {
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
      Key: fileName,
      Expires: 60, // URL expiration time in seconds
    };

    const url = await s3.getSignedUrlPromise('getObject', params);
    console.log(`Generated signed URL for ${fileName}:`, url);
    return url;
  } catch (error) {
    console.error('Error generating signed URL:', error);
  }
};
