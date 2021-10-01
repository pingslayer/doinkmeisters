import React, { useState } from "react";
import { Container, Nav, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCampground } from "@fortawesome/free-solid-svg-icons";
//components
import Sidebar from "../../components/sidebar/Sidebar";
//css
import "react-pro-sidebar/dist/css/styles.css";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return <div className={classes["dm-dashboard-wrapper"]}>Hello</div>;
};

export default Dashboard;
