import React, { Fragment, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
//ui
import ModalDarkConfirmation from "../../ui/modal-dark-confirmation/ModalDarkConfirmation";
//css
import "react-pro-sidebar/dist/css/styles.css";
import classes from "./Aside.module.css";
//stote
import { useAuth } from "../../store/AuthContext";

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

  const logoutHandler = async (event) => {
    event.preventDefault();
    setIsModalVisible(true);
  };

  const onModalCloseHandler = () => {
    setIsModalVisible(false);
  };

  const deleteContentConfirmationHandler = async (isAccepted) => {
    setIsModalVisible(false);
    if (isAccepted) {
      await logout();
      history.replace("/login");
    }
  };

  return (
    <Fragment>
      <ModalDarkConfirmation
        isModalVisible={isModalVisible}
        onModalCloseHandler={onModalCloseHandler}
        onConfirmation={deleteContentConfirmationHandler}
      >
        <h6>Are you sure you want to logout?</h6>
      </ModalDarkConfirmation>

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
                Home
              </NavLink>
            </MenuItem>
            <SubMenu title="Eyesite">
              <MenuItem>
                <span className={classes["dm-sidebar-item"]}>
                  <NavLink
                    to="/dashboard/eyesite/media-and-entertainment"
                    className={classes["dm-nav-item"]}
                    activeClassName={classes.active}
                  >
                    Media And Entertainment
                  </NavLink>
                </span>
              </MenuItem>
              <MenuItem>
                <span className={classes["dm-sidebar-item"]}>
                  <NavLink
                    to="/dashboard/eyesite/gamers-hub"
                    className={classes["dm-nav-item"]}
                    activeClassName={classes.active}
                  >
                    Gamers hub
                  </NavLink>
                </span>
              </MenuItem>
            </SubMenu>
            <SubMenu title="Account">
              <MenuItem>
                <NavLink
                  to="/dashboard/account/change-password"
                  className={classes["dm-nav-item"]}
                  activeClassName={classes.active}
                >
                  Change Password
                </NavLink>
              </MenuItem>
            </SubMenu>
            <MenuItem>
              <NavLink
                to="/logout"
                className={classes["dm-nav-item-red"]}
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
    </Fragment>
  );
};

export default Aside;
