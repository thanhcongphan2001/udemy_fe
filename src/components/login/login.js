import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Toast } from "react-bootstrap";
import { toast } from "react-toastify";
import { loginUser } from "../../services/User";
import "./login.scss";
import { UserContext } from "../../context/UserContext";
function Login() {
  const { loginContext, user } = useContext(UserContext);

  const navigate = useNavigate();
  const isvaliddata = {
    isLogin: true,

    isPassword: true,
  };

  const [valid, setValid] = useState(isvaliddata);
  const [isLogin, setIsLogin] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    setValid(isvaliddata);
    if (!isLogin) {
      setValid({
        ...isvaliddata,
        isLogin: false,
      });
      toast.error("emty login");
      return;
    }
    if (!password) {
      setValid({
        ...isvaliddata,
        isPassword: false,
      });
      toast.error("emty pass");
      return;
    }

    const datares = await loginUser(isLogin, password);
    console.log(datares);
    if (datares && datares.data && +datares.data.EC === 0) {
      toast.success(datares.data.EM);
      let groupWithRoles = datares.data.DT.groupWithRoles;
      let email = datares.data.DT.email;
      let token = datares.data.DT.access_token;
      let data = {
        isAuthenticated: "true",
        isLoading: false,
        token: token,
        account: {
          groupWithRoles,
          email,
        },
      };

      loginContext(data);

      navigate("/users");
      return;
    }
    if (datares && datares.data && +datares.data.EC !== 0) {
      toast.error(datares.data.EM);
    }
    // } else {
    //   toast.error("Server Die");
    // }
  };

  return (
    <Container className="mt-3">
      <Row className="d-flex justify-content-center">
        <Col className="col-12 col-md-6 box p-4">
          <h1 className="text-center">Login</h1>
          <form>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                className={
                  valid.isLogin ? "form-control " : "form-control is-invalid"
                }
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={isLogin}
                onChange={(e) => {
                  setIsLogin(e.target.value);
                }}
              />
              <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                className={
                  valid.isPassword ? "form-control " : "form-control is-invalid"
                }
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div class="mb-3">
              <label
                className="btn btn-success"
                onClick={() => navigate("/register")}
              >
                Create new account
              </label>
            </div>
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
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

export default Login;
