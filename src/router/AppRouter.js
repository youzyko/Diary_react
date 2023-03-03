import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Header from "../Header";

const AppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRouter;
