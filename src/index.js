import React from "react";
import ReactDOM from "react-dom/client";
import "./App.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/About";
import User from "./components/User";
import Home from "./components/Home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import GroupRole from "./components/GroupRole";
import PriavteRoutes from "./routes/privateRoutes";
import { UserProvider } from "./context/UserContext";
import Role from "./components/role";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter basename="/cc">
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/about" element={<About />} />

          <Route
            path="users"
            element={
              <PriavteRoutes name="cong">
                <User />
              </PriavteRoutes>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route index element={<Home />} />
          <Route
            path="roles"
            element={
              <PriavteRoutes name="cong">
                <Role />
              </PriavteRoutes>
            }
          />
          <Route
            path="group-role"
            element={
              <PriavteRoutes name="cong">
                <GroupRole />
              </PriavteRoutes>
            }
          />
          <Route path="*" element={"404"} />
        </Route>
      </Routes>
    </UserProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
