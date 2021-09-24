import { Fragment } from "react";
import { Container } from "react-bootstrap";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./EyeSite.module.css";
//components
import Search from "./search/Search";
import Categories from "./categories/Categories";

const EyeSite = () => {
  return (
    <Fragment>
      {/* Search Component */}
      <Search />
      {/* Categories Section */}
      <Categories />
      {/* <Route path="/eyesite/welcome">
        <h1>Nested route</h1>
      </Route> */}
    </Fragment>
  );
};

export default EyeSite;
