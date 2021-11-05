import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router";
//components
import Search from "./search/Search";
import Categories from "./categories/Categories";
import GamersHub from "./results/gamers-hub/GamersHub";
import MediaAndEntertainment from "./results/media-and-entertainment/MediaAndEntertainment";
import ComingSoon from "../../components/comingsoon/ComingSoon";
//css
import "bootstrap/dist/css/bootstrap.min.css";

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
          <Redirect to="/eyesite/media-and-entertainment" />
        </Route>
        <Route path="/eyesite/media-and-entertainment" exact>
          <MediaAndEntertainment />
        </Route>
        <Route path="/eyesite/gamers-hub" exact>
          <GamersHub />
        </Route>
        <Route path="/eyesite/*">
          <ComingSoon mode="light" />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default EyeSite;
