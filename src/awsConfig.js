// src/awsConfig.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
});

export default AWS;
