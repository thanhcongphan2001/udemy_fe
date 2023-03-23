import axios from "../setup/axios";
const registerNewUser = (data) => {
  return axios.post("/v1/register", data);
};
const loginUser = (islogin, pass) => {
  return axios.post("/v1/login", {
    islogin,
    Password: pass,
  });
};
const allUsers = (page, limit) => {
  return axios.get(`/v1/allUsers?page=${page}&limit=${limit}`);
};
const deleteUserAxios = (id) => {
  return axios.delete(
    `/v1/deleteUser`,
    {
      data: { id },
    },
    { withCredentials: true }
  );
};
const fetchGroup = () => {
  return axios.get("/v1/group/read");
};
const createNewUser = (data) => {
  return axios.post(
    "/v1/createUser",
    {
      ...data,
    },
    { withCredentials: true }
  );
};
const updateCurrentUser = (data) => {
  return axios.put("/v1/updateUser", {
    ...data,
  });
};
const getUserAccount = () => {
  return axios.get("/v1/account");
};
const logoutUser = () => {
  return axios.post("/v1/logout");
};

export {
  registerNewUser,
  loginUser,
  allUsers,
  deleteUserAxios,
  fetchGroup,
  createNewUser,
  updateCurrentUser,
  getUserAccount,
  logoutUser,
};
