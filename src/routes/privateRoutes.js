import { Route } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
const PriavteRoutes = ({ children }) => {
  useEffect(() => {
    console.log("hello");
  }, []);
  const { user } = useContext(UserContext);
  console.log(user);
  if (user.isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
};
export default PriavteRoutes;
