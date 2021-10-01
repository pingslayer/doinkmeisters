import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
//store
import { useAuth } from "../../../store/AuthContext";
//css
import classes from "./PrivateNavigation.module.css";

const PrivateNavigation = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

  const logoutHandler = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await logout();
      history.replace("/login");
    } catch {
      setError("Failed to logout");
      alert(error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" className={classes["dm-header"]}>
      <Container>
        <Navbar.Brand>
          <div className={classes["dm-logo"]}>
            <NavLink to="/">Doinkmeisters.</NavLink>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className={classes.nav}>
            <NavLink
              to="/dashboard"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/about"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              About
            </NavLink>
            <NavLink
              to="/logout"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
              onClick={logoutHandler}
            >
              <Button variant="outline-danger">LOGOUT</Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrivateNavigation;
