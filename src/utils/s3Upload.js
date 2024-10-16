// src/utils/s3Upload.js

import AWS from 'aws-sdk';
import { getSecrets } from './getSecrets'; // Importing the getSecrets function

export const uploadVideo = async (file) => {
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
      Key: file.name,
      Body: file,
      ContentType: file.type,
    };

    const data = await s3.upload(params).promise();
    console.log(`Successfully uploaded ${file.name}:`, data.Location);
    return data.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
  }
};
