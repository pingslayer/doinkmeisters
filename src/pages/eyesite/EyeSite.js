import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router";
//components
import Search from "./search/Search";
import Categories from "./categories/Categories";
import Results from "./results/Results";
import NotFound from "../notfound/NotFound";
import ComingSoon from "../../components/comingsoon/ComingSoon";
//css
import "bootstrap/dist/css/bootstrap.min.css";
//api
import { GamersHubPublicAPIs } from "../../apis/gamers-hub-api";

const EyeSite = () => {
  return (
    <Fragment>
      {/* Search Component */}
      <Search />
      {/* Categories Section */}
      <Categories />
      {/* Nested Pages Section */}
      <Switch>
        <Route key={0} path="/eyesite" exact>
          <Redirect to="/eyesite/gamers-hub" />
        </Route>
        <Route path="/eyesite/gamers-hub" exact>
          <Results apiRef={GamersHubPublicAPIs} />
        </Route>
        <Route path="/eyesite/*">
          <ComingSoon mode="light" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default EyeSite;
