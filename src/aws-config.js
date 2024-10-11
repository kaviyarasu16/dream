// src/aws-config.js
export const awsConfig = {
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    bucket: process.env.REACT_APP_AWS_S3_BUCKET,
  };
  