import React from "react";
import { Route, Switch, Redirect } from "react-router";
//components
import Home from "./home/Home";
import GamersHub from "./eyesite/gamers-hub/GamersHub";
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
        <Route path="/dashboard/eyesite/gamers-hub" exact>
          <GamersHub />
        </Route>
        <Route path="/dashboard/*">
          <NotFound mode="light" />
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
