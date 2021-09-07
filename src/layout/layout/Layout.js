import { Fragment } from "react";
//components
import MainNavigation from "../main-navigation/MainNavigation";
//css
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
