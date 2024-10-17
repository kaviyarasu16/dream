// src/utils/s3DeleteFile.js

import AWS from 'aws-sdk';

export const deleteVideo = async (fileName) => {
  try {
    const s3 = new AWS.S3({
      accessKeyId: process.env.MY_ACCESS_KEY_ID,
      secretAccessKey: process.env.MY_SECRET_ACCESS_KEY,
      region: process.env.REACT_APP_AWS_REGION, // Region is set from the environment
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME, // Ensure the environment variable is set
      Key: fileName,
    };

    await s3.deleteObject(params).promise();
    console.log(`Successfully deleted ${fileName}`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
  }
};
