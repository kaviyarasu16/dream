Dream Project Setup


Prerequesistes:
1. Create one AWS cognito user pool and create a group for admins in that user pool. Add admin user into it.
2. Configure .env file your aws account details in following format,

        REACT_APP_AWS_REGION=<your s3 region>
        REACT_APP_AWS_ACCESS_KEY_ID=<access key>
        REACT_APP_AWS_SECRET_ACCESS_KEY=<secret_key>
        REACT_APP_AWS_S3_BUCKET=<bucket_name>

3. update aws-exports.js file with cognito user pool details with below format,
    // replace the user pool region, id, and app client id details
        const awsmobile = {
        "aws_project_region": "replace",
        "aws_cognito_region": "replace",
        "aws_user_pools_id": "replace",
        "aws_user_pools_web_client_id": "replace"
        }

export default awsmobile;
    
Steps:
1. Clone the repo git clone 
2. npm i
3. npm start
4. check http://localhost:3000
5. Boom
