// src/utils/s3DeleteFile.js

import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets'; // Importing the getSecrets function

export const deleteVideo = async (fileName) => {
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
    };

    await s3.deleteObject(params).promise();
    console.log(`Successfully deleted ${fileName}`);
  } catch (error) {
    console.error('Error deleting file from S3:', error);
  }
};
