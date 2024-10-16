// src/awsConfig.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1', // Set your AWS region here
});

export default AWS;
