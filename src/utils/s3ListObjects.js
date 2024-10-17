// src/utils/s3ListObjects.js

import AWS from 'aws-sdk';

export const listVideoFiles = async () => {
  try {
    const s3 = new AWS.S3({
      region: process.env.REACT_APP_AWS_REGION, // Set region from the environment
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME, // S3 Bucket name from env
    };

    const data = await s3.listObjectsV2(params).promise();
    console.log('Video files:', data.Contents);
    return data.Contents;
  } catch (error) {
    console.error('Error listing video files from S3:', error);
  }
};
