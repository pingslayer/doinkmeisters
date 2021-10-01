import { Fragment } from "react";
//components
import PublicNavigation from "../main-navigation/publicNavigation/PublicNavigation";
import Aside from "../aside/Aside";
//css
import classes from "./Layout.module.css";
//store
import { useAuth } from "../../store/AuthContext";

const Layout = (props) => {
  const { currentUser } = useAuth();
  return (
    <div className={classes["dm-layout"]}>
      {!currentUser && (
        <Fragment>
          <PublicNavigation />
          <div className={classes["dm-main-with-top-nav"]}>
            {props.children}
          </div>
        </Fragment>
      )}
      {currentUser && (
        <div className={classes["dm-layout-dashboard"]}>
          <Aside />
          <div className={classes["dm-dashboard-main"]}>{props.children}</div>
        </div>
      )}
    </div>
  );
};

export default Layout;
