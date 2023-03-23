import axios from "../setup/axios";
const createRoles = (roles) => {
  return axios.post("v1/createRole", [...roles]);
};
const fetchAllRole = () => {
  return axios.get("v1/allRoles");
};
const deleteRole = (role) => {
  return axios.delete("v1/deleteRole", {
    data: {
      id: role.id,
    },
  });
};
const fetchRolesByGroup = (groupid) => {
  return axios.get(`v1/role/by-group/${groupid}`);
};
const assignRolesToGroup = (data) => {
  return axios.post(`v1/role/assign-to-group`, { data });
};
export {
  createRoles,
  fetchAllRole,
  deleteRole,
  fetchRolesByGroup,
  assignRolesToGroup,
};
