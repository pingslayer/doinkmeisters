import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { NavLink, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
//css
import "react-pro-sidebar/dist/css/styles.css";
import classes from "./Aside.module.css";
//stote
import { CategoriesData } from "../../store/eyesite";
import { useAuth } from "../../store/AuthContext";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const categories = CategoriesData();
  const [error, setError] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

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
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div className={classes["dm-logo"]}>
          <h2>Doinkmeisters</h2>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem>
            <NavLink
              to="/dashboard"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
            >
              Dashboard
            </NavLink>
          </MenuItem>
          <SubMenu title="Eyesite">
            {categories.map((category) => {
              const toBuilder = "/dashboard" + category.url;
              return (
                <MenuItem key={category.id}>
                  <span className={classes["dm-sidebar-item"]}>
                    <NavLink
                      to={toBuilder}
                      className={classes["dm-nav-item"]}
                      activeClassName={classes.active}
                    >
                      {category.nameCasual}
                    </NavLink>
                  </span>
                </MenuItem>
              );
            })}
          </SubMenu>
          <MenuItem>
            <NavLink
              to="/logout"
              className={classes["dm-nav-item"]}
              activeClassName={classes.active}
              onClick={logoutHandler}
            >
              Logout
            </NavLink>
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: "center" }}></SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
