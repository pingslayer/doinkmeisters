import React, { useState, useEffect, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EyeSite.module.css";
//data
import { CategoriesData } from "../../store/eyesite";
//components
import Search from "./search/Search";
import Categories from "./categories/Categories";
import Results from "./results/Results";
import NotFound from "../notfound/NotFound";
import AddGames from "../eyesite/temp/AddGames";

const EyeSite = () => {
  const categories = CategoriesData();

  var routes = [];
  routes.push(
    <Route key={0} path="/eyesite" exact>
      <Redirect to="/eyesite/media-and-entertainment" />
    </Route>
  );
  var baseRoutes = categories.map((category) => {
    return (
      <Route key={category.id} path={category.url} exact>
        <Results categoryId={category.id} />
      </Route>
    );
  });
  routes.push(baseRoutes);
  routes.push(
    <Route key={categories.length + 1} path="/eyesite/gamers-hub/add" exact>
      <AddGames />
    </Route>
  );
  routes.push(
    <Route key={categories.length + 1} path="/eyesite/*">
      <NotFound />
    </Route>
  );

  return (
    <Fragment>
      {/* Search Component */}
      <Search />
      {/* Categories Section */}
      <Categories />
      {/* Nested Pages Section */}
      <Switch>{routes}</Switch>
    </Fragment>
  );
};

export default EyeSite;
