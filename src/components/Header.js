import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { logoutUser } from "../services/User";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const { user, logoutContext } = useContext(UserContext);
  const handleLogOut = async () => {
    let data = await logoutUser();
    logoutContext();
    if (data && data.data && data.data.EC === 0) {
      toast.success("log out success");
      navigate("/login");
    } else {
      toast.error("logout fail");
    }
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          {" "}
          <NavLink to="/" className="nav-link">
            Cong It
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>

            <NavLink to="/roles" className="nav-link">
              Roles
            </NavLink>
            <NavLink to="/group-role" className="nav-link">
              Group Role
            </NavLink>
          </Nav>
          <Nav>
            {user && user.isAuthenticated ? (
              <>
                <Navbar.Brand href="#home" className="text-success">
                  welcome {user.account.email}
                </Navbar.Brand>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>Change password</NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <span onClick={handleLogOut}>Log out</span>
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
