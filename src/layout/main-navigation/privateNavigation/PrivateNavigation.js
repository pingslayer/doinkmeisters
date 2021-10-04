import React from "react";
import { Navbar, Nav } from "react-bootstrap";
//components
import ToggleButton from "../../aside/ToggleButton/ToggleButton";
//css
import classes from "./PrivateNavigation.module.css";

const PrivateNavigation = ({ handleToggleSidebar }) => {
  return (
    <Navbar bg="dark" className={classes["dm-private-navigation-bar"]}>
      <Nav className="me-auto"></Nav>
      <Nav>
        <ToggleButton handleToggleSidebar={handleToggleSidebar} />
      </Nav>
    </Navbar>
  );
};

export default PrivateNavigation;
