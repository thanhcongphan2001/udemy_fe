import React, { useState, useEffect } from "react";

import { fetchGroup, createNewUser, updateCurrentUser } from "../services/User";
import {
  fetchAllRole,
  fetchRolesByGroup,
  assignRolesToGroup,
} from "../services/roleService";
import { toast } from "react-toastify";
import _ from "lodash";
const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [listRoles, setlistRoles] = useState([]);
  const [selectGroups, setselectGroups] = useState(0);
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
  useEffect(() => {
    getGroups();
    getAllRoles();
  }, []);

  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroups(res.data.DT);
    } else {
      toast.error(res.data.EM);
    }
  };
  const getAllRoles = async () => {
    let data = await fetchAllRole();
    if (data && data.data.EC === 0) {
      setlistRoles(data.data.DT);
    }
  };
  const handleOnChangeGroup = async (value) => {
    setselectGroups(value);
    if (value) {
      let data = await fetchRolesByGroup(value);
      if (data && data.data.EC === 0) {
        let result = buildDataRolesByGroup(data.data.DT.Roles, listRoles);
        setAssignRolesByGroup(result);
      }
    }
  };
  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let object = {};
        object.url = role.url;
        object.id = role.id;
        object.description = role.description;
        object.isAssigned = false;
        if (groupRoles && groupRoles.length > 0) {
          object.isAssigned = groupRoles.some(
            (item) => item.url === object.url
          );
        }
        result.push(object);
      });
    }
    return result;
  };
  const handleSelectRole = (value) => {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex(
      (item) => +item.id === +value
    );
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssigned =
        !_assignRolesByGroup[foundIndex].isAssigned;
    }
    setAssignRolesByGroup(_assignRolesByGroup);
  };
  const buildDataToSave = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroups;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { RoleId: +item.id, GroupId: selectGroups };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    console.log(data);
    let res = await assignRolesToGroup(data);
    if (res && res.data && res.data.EC === 0) {
      toast.success(res.data.EM);
    } else {
      toast.error(res.data.EM);
    }
  };
  return (
    <>
      <div className="container">
        <div className="mt-3 row">
          <div className="col-12 col-sm-6">
            <div>
              <h2 for="exampleInputEmail1" class="form-label">
                Select Group
              </h2>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  handleOnChangeGroup(e.target.value);
                }}
              >
                {selectGroups === 0 && <option value={0}>Please select</option>}

                {userGroups.length > 0 &&
                  userGroups.map((item, i) => {
                    return (
                      <option value={item.id} key={`group-${i}`}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <h2 for="exampleInputEmail1" class="form-label">
                Assign Roles
              </h2>
              {assignRolesByGroup &&
                assignRolesByGroup.length > 0 &&
                assignRolesByGroup.map((item, index) => {
                  return (
                    <div class="form-check" key={`listrole-${index}`}>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value={item.id}
                        checked={item.isAssigned}
                        id={`listrole-${index}`}
                        onChange={(e) => {
                          handleSelectRole(e.target.value);
                        }}
                      />
                      <label class="form-check-label" for={`listrole-${index}`}>
                        {item.url}
                      </label>
                    </div>
                  );
                })}
              {assignRolesByGroup && assignRolesByGroup.length > 0 && (
                <div className="mt-3">
                  <button className="btn btn-warning" onClick={handleSave}>
                    Save
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupRole;
