// src/aws-config.js
export const awsConfig = {
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_MY_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_MY_SECRET_ACCESS_KEY,
    bucket: process.env.REACT_APP_S3_BUCKET_NAME,
    test: process.env.REACT_APP_TEST
  };
  