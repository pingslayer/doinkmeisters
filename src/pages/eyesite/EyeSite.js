import React, { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch, Redirect } from "react-router";
import { collection, getDocs } from "firebase/firestore/lite";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EyeSite.module.css";
//data
import { CategoriesData } from "../../store/eyesite";
//components
import Search from "./search/Search";
import Categories from "./categories/Categories";
import Results from "./results/Results";
import ComingSoon from "../../components/comingsoon/ComingSoon";
import NotFound from "../notfound/NotFound";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner";

const EyeSite = () => {
  const categories = CategoriesData();

  var routes = [];
  routes.push(
    <Route key={0} path="/eyesite" exact>
      <Redirect to="/eyesite/gamers-hub" />
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
      <Container>
        <Switch>{routes}</Switch>
      </Container>
    </Fragment>
  );
};

export default EyeSite;
