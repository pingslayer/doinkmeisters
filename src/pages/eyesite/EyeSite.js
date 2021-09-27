import React, { useState, useEffect, Fragment } from "react";
import { Container } from "react-bootstrap";
import { Route, Switch, Redirect } from "react-router";
import { collection, getDocs } from "firebase/firestore/lite";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EyeSite.module.css";
//components
import Search from "./search/Search";
import Categories from "./categories/Categories";
import Results from "./results/Results";
import ComingSoon from "../../components/comingsoon/ComingSoon";
import NotFound from "../notfound/NotFound";
import LoadingSpinner from "../../ui/loading-spinner/LoadingSpinner";

const EyeSite = () => {
  return (
    <Fragment>
      {/* Search Component */}
      <Search />
      {/* Categories Section */}
      <Categories />
      {/* Nested Pages Section */}
      <Container>
        <Route path="/eyesite/" exact>
          <Redirect to="/eyesite/gamers-hub" />
        </Route>
        <Route path="/eyesite/gamers-hub" exact>
          <Results />
        </Route>
      </Container>
    </Fragment>
  );
};

export default EyeSite;
