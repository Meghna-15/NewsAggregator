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

const App = () => {
  return (
    <ChakraProvider>
      <Account>
        <BrowserRouter>
          <Routes>
            <Route
              path="/categories"
              element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<NewsCard />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </BrowserRouter>
      </Account>
    </ChakraProvider>
  );
};

export default App;
