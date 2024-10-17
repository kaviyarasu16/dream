// src/utils/s3Upload.js

import AWS from 'aws-sdk';

export const uploadVideo = async (file) => {
  try {
    const s3 = new AWS.S3({
      region: process.env.REACT_APP_AWS_REGION, // Set region from the environment
    });

    const params = {
      Bucket: process.env.REACT_APP_S3_BUCKET_NAME, // S3 Bucket name from env
      Key: file.name, // Use the file name as the S3 object key
      Body: file, // The file to upload
      ContentType: file.type, // MIME type of the file
    };

    const data = await s3.upload(params).promise();
    console.log(`Successfully uploaded ${file.name}:`, data.Location);
    return data.Location;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
  }
};
