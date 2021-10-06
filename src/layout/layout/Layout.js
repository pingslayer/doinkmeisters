import { Fragment, useState } from "react";
//components
import PublicNavigation from "../main-navigation/publicNavigation/PublicNavigation";
import Aside from "../aside/Aside";
import ToggleButton from "../aside/ToggleButton/ToggleButton";
//css
import classes from "./Layout.module.css";
//store
import { useAuth } from "../../store/AuthContext";
import PrivateNavigation from "../main-navigation/privateNavigation/PrivateNavigation";

const Layout = (props) => {
  const { currentUser } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(true);

  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleToggleSidebar = (value) => {
    console.log("toggle called...");
    setToggled(value);
  };

  return (
    <div className={classes["dm-layout"]}>
      {!currentUser && (
        <Fragment>
          <div className={classes["dm-top-nav"]}>
            <PublicNavigation />
          </div>
          <div className={classes["dm-main"]}>{props.children}</div>
        </Fragment>
      )}
      {currentUser && (
        <div className={classes["dm-layout-dashboard"]}>
          <Aside
            collapsed={collapsed}
            toggled={toggled}
            handleToggleSidebar={handleToggleSidebar}
          />
          <div className={classes["dm-dashboard-main"]}>
            <PrivateNavigation handleToggleSidebar={handleToggleSidebar} />
            <div className={classes["dm-dashboard-main-content"]}>
              {props.children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
