import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_jvaqG9oF6",
  ClientId: "7e3rqq4mpufgfns2bfk6jkfa7a",
};

export default new CognitoUserPool(poolData);
