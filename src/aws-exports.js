// src/aws-exports.js
const awsConfig = {
    Auth: {
      region: 'ap-south-1', // Your AWS region
      userPoolId: 'ap-south-1_xxxxxxxx', // Your Cognito User Pool ID
      userPoolWebClientId: 'xxxxxxxxxxxxxxxxxxxx', // Your Cognito App Client ID
    }
  };
  
  export default awsConfig;
  