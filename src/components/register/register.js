import React, { useState, useEffect } from "react";
import "./register.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerNewUser } from "../../services/User";
function Register(props) {
  const dataState = {
    Email: "",
    Phone: "",
    Password: "",
    ConfirmPassword: "",
    UserName: "",
  };
  const isvaliddata = {
    isEmail: true,
    isPhone: true,
    isPassword: true,
    isConfirmPassword: true,
    isUserName: true,
  };

  const [data, setData] = useState(dataState);
  const [valid, setValid] = useState(isvaliddata);
  const navigate = useNavigate();
  console.log("render");
  const isValid = () => {
    setValid(isvaliddata);

    if (!data.Email) {
      toast.error("no email");
      setValid({
        ...isvaliddata,
        isEmail: false,
      });
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.Email)) {
      toast.error("error email");
      setValid({
        ...isvaliddata,
        isEmail: false,
      });
      return false;
    }
    if (!data.Phone) {
      toast.error("no Phone");
      setValid({
        ...isvaliddata,
        isPhone: false,
      });
      return false;
    }
    if (!data.Password) {
      toast.error("no Password");
      setValid({
        ...isvaliddata,
        isPassword: false,
      });
      return false;
    }
    if (data.Password != data.ConfirmPassword) {
      toast.error(" Password not the same");
      setValid({
        ...isvaliddata,
        isConfirmPassword: false,
      });
      return false;
    }

    return true;
  };

  const handleregister = async () => {
    let valid = isValid();

    if (valid) {
      const response = await registerNewUser(data);
      const serverData = response.data;
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        navigate("/login");
      } else {
        toast.error(serverData.EM);
      }
    }
  };
  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <Col className="col-12 col-md-6 box p-4">
          <h1 className="text-center">Register</h1>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                className={
                  valid.isEmail ? "form-control " : "form-control is-invalid"
                }
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={data.Email}
                onChange={(e) => {
                  setData({
                    ...data,
                    Email: e.target.value,
                  });
                }}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                username
              </label>
              <input
                type="email"
                className={
                  valid.isUserName ? "form-control " : "form-control is-invalid"
                }
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={data.UserName}
                onChange={(e) => {
                  setData({
                    ...data,
                    UserName: e.target.value,
                  });
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                phone
              </label>
              <input
                type="email"
                className={
                  valid.isPhone ? "form-control " : "form-control is-invalid"
                }
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={data.Phone}
                onChange={(e) => {
                  setData({
                    ...data,
                    Phone: e.target.value,
                  });
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                password
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={data.Password}
                onChange={(e) => {
                  setData({
                    ...data,
                    Password: e.target.value,
                  });
                }}
                className={
                  valid.isPassword ? "form-control " : "form-control is-invalid"
                }
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                confirm password
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={data.ConfirmPassword}
                onChange={(e) => {
                  setData({
                    ...data,
                    ConfirmPassword: e.target.value,
                  });
                }}
                className={
                  valid.isConfirmPassword
                    ? "form-control "
                    : "form-control is-invalid"
                }
              />
            </div>
            <div class="mb-3">
              <label
                className="btn btn-success"
                onClick={() => navigate("/login")}
              >
                I am account
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleregister();
              }}
            >
              Submit
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
