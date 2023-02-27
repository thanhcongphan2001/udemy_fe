import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import User from "./components/User";
import Home from "./components/Home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import PriavteRoutes from "./routes/privateRoutes";
const root = ReactDOM.createRoot(document.getElementById("root"));
const Private = () => <div>private</div>;
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="admins" element={<Admin />} />

        <Route
          path="users"
          element={
            <PriavteRoutes name={18} age={19}>
              <User />
            </PriavteRoutes>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route index element={<Home />} />

        <Route path="*" element={"404"} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
