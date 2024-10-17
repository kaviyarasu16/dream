// src/utils/s3GetUrl.js

import AWS from 'aws-sdk';

export const getVideoUrl = async (fileName) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.MY_ACCESS_KEY_ID,
      secretAccessKey: process.env.MY_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION, // Set region from the environment
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME, // S3 Bucket name from env
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
