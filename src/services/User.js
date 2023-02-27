import axios from "axios";
const registerNewUser = (data) => {
  return axios.post("http://localhost:8081/v1/register", data);
};
const loginUser = (islogin, pass) => {
  return axios.post("http://localhost:8081/v1/login", {
    islogin,
    Password: pass,
  });
};
const allUsers = () => {
  return axios.get("http://localhost:8081/v1/allUsers");
};
export { registerNewUser, loginUser,allUsers };
