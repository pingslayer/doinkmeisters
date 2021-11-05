import React from "react";
import { Route, Switch, Redirect } from "react-router";
//components
import Home from "./home/Home";
import MediaAndEntertainment from "./eyesite/media-and-entertainment/MediaAndEntertainment";
import GamersHub from "./eyesite/gamers-hub/GamersHub";
import ChangePassword from "./account/change-password/ChangePassword";
import NotFound from "../notfound/NotFound";
//css
import classes from "./Dashboard.module.css";
//store

const Dashboard = () => {
  return (
    <div className={classes["dm-dashboard-wrapper"]}>
      <Switch>
        <Route key={0} path="/dashboard" exact>
          <Home />
        </Route>
        <Route path="/dashboard/eyesite/media-and-entertainment" exact>
          <MediaAndEntertainment />
        </Route>
        <Route path="/dashboard/eyesite/gamers-hub" exact>
          <GamersHub />
        </Route>
        <Route path="/dashboard/account/change-password" exact>
          <ChangePassword />
        </Route>
        <Route path="/dashboard/*">
          <NotFound mode="light" />
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
