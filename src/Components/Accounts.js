import React, { createContext } from "react";
import {
  CognitoUser,
  AuthenticationDetails,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { useState, useEffect } from "react";
import axios from "axios";

const AccountContext = createContext();

const Account = (props) => {
  const [poolcred, setPoolCred] = useState("");

  useEffect(() => {
    getCredential();
  }, []);

  const getCredential = () => {
    axios
      .get(
        "https://vhfrosov44r5iiwekwpmfp5z2u0sfyup.lambda-url.us-east-1.on.aws/"
      )
      .then((response) => {
        setPoolCred(response.data.body);
      })
      .catch((err) => console.log(err));
  };

  const getUserPool = () => {
    return new CognitoUserPool({
      UserPoolId: poolcred.USER_POOL_ID,
      ClientId: poolcred.USER_POOL_CLIENT_ID,
    });
  };

  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const pool = getUserPool();
      const user = pool.getCurrentUser();

      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject(err);
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }
                  resolve(results);
                }
              });
            });

            const token = session.getIdToken().getJwtToken();

            resolve({
              user,
              headers: {
                Authorization: token,
              },
              ...session,
              ...attributes,
            });
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const pool = getUserPool();

      const user = new CognitoUser({
        Username: Username,
        Pool: pool,
      });

      const authDetails = new AuthenticationDetails({
        Username: Username,
        Password: Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("user logged in");
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("NewPasswordRequired:", data);
          resolve(data);
        },
      });
    });

  const logout = () => {
    const pool = getUserPool();
    const user = pool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  const confirmUser = (username, code) => {
    const pool = getUserPool();
    const user = new CognitoUser({
      Username: username,
      Pool: pool,
    });

    user.confirmRegistration(123, true, (err, result) => {
      if (err) {
        console.log(err);
        return err;
      } else {
        console.log(result);
        return result;
      }
    });
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
        confirmUser,
        poolcred,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
