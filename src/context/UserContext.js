import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserAccount } from "../services/User";
const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  console.log("usercontext");
  const defaultUser = {
    isLoading: true,
    isAuthenticated: false,
    token: "",
    account: {},
  };
  const [user, setUser] = useState(defaultUser);
  useEffect(() => {
    // if (
    //   window.location.pathname !== "/" &&
    //   window.location.pathname !== "/login"
    // ) {
    //   fetchUser();
    // } else {
    //   setUser({ ...user, isLoading: false });
    // }
    fetchUser();
  }, []);
  console.log("usersssss", user);
  const fetchUser = async () => {
    let response = await getUserAccount();
    console.log("27");
    console.log(response);
    if (response && response.data && response.data.EC === 0) {
      console.log("if");
      let groupWithRoles = response.data.DT.groupWithRoles;
      let email = response.data.DT.email;
      let token = response.data.DT.access_token;
      let data = {
        isAuthenticated: "true",
        token: token,
        isLoading: false,
        account: {
          groupWithRoles,
          email,
        },
      };

      setUser(data);
    } else {
      console.log("else");

      setUser({ ...defaultUser, isLoading: false });
    }
  };

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({
      ...userData,
      isLoading: false,
    });
  };

  // Logout updates the user data to default
  const logoutContext = () => {
    setUser({
      ...defaultUser,
      isLoading: false,
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };
