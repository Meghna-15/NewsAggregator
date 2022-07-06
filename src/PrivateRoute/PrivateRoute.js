import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/common";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="home" replace={true} />;
};

export default PrivateRoute;
