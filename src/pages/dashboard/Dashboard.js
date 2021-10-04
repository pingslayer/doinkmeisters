import React from "react";
import { Route, Switch, Redirect } from "react-router";
//components
import Home from "./home/Home";
import Eyesite from "./eyesite/Eyesite";
//css
import classes from "./Dashboard.module.css";
//store
import { CategoriesData } from "../../store/eyesite";

const Dashboard = () => {
  const categories = CategoriesData();

  var categoriesRoutes = categories.map((category) => {
    return (
      <Route key={category.id} path={"/dashboard" + category.url} exact>
        <Eyesite category={category} />
      </Route>
    );
  });

  return (
    <div className={classes["dm-dashboard-wrapper"]}>
      <Switch>
        <Route key={0} path="/dashboard" exact>
          <Home />
        </Route>
        {categoriesRoutes}
      </Switch>
    </div>
  );
};

export default Dashboard;
