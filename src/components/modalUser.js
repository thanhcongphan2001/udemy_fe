import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { fetchGroup, createNewUser, updateCurrentUser } from "../services/User";
import { toast } from "react-toastify";
import { act } from "react-dom/test-utils";
function ModalUser(props) {
  const { action, dataModalUser } = props;
  const defaultUserData = {
    email: "",
    phone: "",
    password: "",
    address: "",
    sex: "",
    groupId: "",
  };
  const validInputsDefault = {
    email: true,
    phone: true,
    password: true,
    address: true,
    sex: true,
    groupId: true,
  };
  const [userGroups, setUserGroups] = useState([]);
  const [userData, setUserData] = useState(defaultUserData);
  const [validInputs, setValidinputs] = useState(validInputsDefault);

  useEffect(() => {
    getGroups();
  }, []);
  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        groupId: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);
  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({
          ...dataModalUser,
          groupId: dataModalUser.Group ? dataModalUser.Group.id : "",
        });
      }
    }
  }, [action]);
  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.data && res.data.EC === 0) {
      setUserGroups(res.data.DT);
      if (res.data.DT && res.data.DT.length > 0) {
        let groups = res.data.DT;
        setUserData({ ...userData, groupId: groups[0].id });
      }
    } else {
      toast.error(res.data.EM);
    }
  };
  const handleOnchangeInput = (value, name) => {
    let data = {
      ...userData,
      [name]: value,
    };
    setUserData(data);
  };
  const checkValidateInputs = () => {
    if (action === "UPDATE") {
      return true;
    }
    setValidinputs(validInputsDefault);
    let arr = ["email", "phone", "password", "groupId"];
    let check = true;
    for (let i = 0; i < arr.length; i++) {
      if (!userData[arr[i]]) {
        let data = {
          ...validInputsDefault,
          [arr[i]]: false,
        };
        setValidinputs(data);
        toast.error(`empty input ${arr[i]}`);
        check = false;
        break;
      }
    }
    return check;
  };
  const handleConfirm = async () => {
    let check = checkValidateInputs();
    if (check === true) {
      let res =
        action === "CREATE"
          ? await createNewUser(userData)
          : await updateCurrentUser(userData);
      console.log(res.data);
      if (res.data && res.data.EC === 0) {
        props.onHide();
        setUserData({
          ...defaultUserData,
          groupId: userGroups && userGroups.length > 0 ? userGroups[0].id : "",
        });
        toast.success(res.data.EM);
      } else {
        toast.error("error create user");
      }
    }
  };
  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaultUserData);
  };
  return (
    <>
      <Modal show={props.show} size="lg" onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {props.action === "CREATE" ? "Create new user" : "Edit a user "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-6">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                disabled={action === "CREATE" ? false : true}
                value={userData.email}
                onChange={(e) => {
                  handleOnchangeInput(e.target.value, "email");
                }}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleInputEmail1" class="form-label">
                Phone
              </label>
              <input
                className="form-control "
                disabled={action === "CREATE" ? false : true}
                value={userData.phone}
                onChange={(e) => {
                  handleOnchangeInput(e.target.value, "phone");
                }}
              />
            </div>
            <div className="col-12 col-sm-6">
              {action === "CREATE" && (
                <>
                  <label for="exampleInputEmail1" class="form-label">
                    Password
                  </label>
                  <input
                    type="email"
                    className="form-control "
                    value={userData.password}
                    onChange={(e) => {
                      handleOnchangeInput(e.target.value, "password");
                    }}
                  />
                </>
              )}
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleInputEmail1" class="form-label">
                Adress
              </label>
              <input
                type="email"
                className="form-control "
                value={userData.address}
                onChange={(e) => {
                  handleOnchangeInput(e.target.value, "address");
                }}
              />
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleInputEmail1" class="form-label">
                Gender
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={userData.sex}
                onChange={(e) => {
                  handleOnchangeInput(e.target.value, "sex");
                }}
              >
                <option defaultValue="male" selected>
                  Male
                </option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-12 col-sm-6">
              <label for="exampleInputEmail1" class="form-label">
                Group
              </label>
              <select
                class="form-select"
                aria-label="Default select example"
                value={userData.groupId}
                onChange={(e) => {
                  handleOnchangeInput(e.target.value, "groupId");
                }}
              >
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleCloseModalUser();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={() => handleConfirm()}>
            {action === "CREATE" ? "Save" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalUser;
