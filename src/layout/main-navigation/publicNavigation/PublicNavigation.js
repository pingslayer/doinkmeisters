import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
//store
import { useAuth } from "../../../store/AuthContext";
//css
import classes from "./PublicNavigation.module.css";

const PublicNavigation = () => {
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
              to="/eyesite"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              Eyesite
            </NavLink>
            <NavLink
              to="/about"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              About
            </NavLink>
            <NavLink
              to="/login"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              <Button variant="outline-danger">LOGIN</Button>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PublicNavigation;
