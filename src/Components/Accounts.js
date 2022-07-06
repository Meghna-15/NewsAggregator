import React, { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

const AccountContext = createContext();

const Account = (props) => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            // console.log(session);
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });

  const authenticate = async (Username, Password) =>
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: Username,
        Password: Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
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
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{
        authenticate,
        getSession,
        logout,
      }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
