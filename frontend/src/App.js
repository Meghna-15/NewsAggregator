import React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Categories from "./Components/Categories";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Account } from "./Components/Accounts";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Home from "./Components/home";
import NewsCard from "./Components/home";
import { dataPromise } from "./UserPool";
import NavBar from "./Components/NavBar";
import ConfirmUser from "./Components/Confirmation";

const App = () => {
  return (
    <ChakraProvider>
      <Account>
        <BrowserRouter>
          <Routes>
            <Route path="/navbar" element={<NavBar />} />
            <Route
              path="/categories"
              element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              }
            />
            {console.log("ENV VARS: ", process.env)}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/confirmation" element={<ConfirmUser />} />
          </Routes>
        </BrowserRouter>
      </Account>
    </ChakraProvider>
  );
};

export default App;
