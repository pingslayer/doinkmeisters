import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
//data
import { SidebarData } from "./SidebarData";
//css
import classes from "./Sidebar.module.css";
//store
import { useAuth } from "../../store/AuthContext";
import { CategoriesData } from "../../store/eyesite";

const Sidebar = () => {
  const [error, setError] = useState("");
  const history = useHistory();
  const { logout } = useAuth();
  const categories = CategoriesData();

  const logoutHandler = async (event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to logout?")) {
      setError("");
      try {
        await logout();
        history.replace("/login");
      } catch {
        setError("Failed to logout");
        alert(error);
      }
    }
  };

  return (
    <div className={classes["dm-dashboard-sidebar"]}>
      <ul className={classes["dm-sidebar-list"]}>
        {SidebarData.map((val, key) => {
          var isActive = window.location.pathname == val.link;
          var onClick =
            val.link == "/logout"
              ? logoutHandler
              : () => {
                  history.push(val.link);
                };
          return (
            <li
              key={key}
              className={`${classes["dm-sidebar-row"]} ${
                isActive && classes.active
              }`}
              onClick={onClick}
            >
              <div className={classes["dm-sidebar-icon"]}>{val.icon}</div>{" "}
              <div className={classes["dm-sidebar-title"]}>{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
