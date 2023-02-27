import { Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate, Redirect } from "react-router-dom";

const PriavteRoutes = ({ children }) => {
  const navigate = useNavigate();
  let session;
  useEffect(() => {
    session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  }, []);
  return <>{session ? children : <h1>Loanding .....</h1>}</>;
};
export default PriavteRoutes;
