import { Route, Switch, Redirect } from "react-router";
import {
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Container,
} from "react-bootstrap";
//css
import classes from "./Categories.module.css";

const Categories = () => {
  return (
    <Container className={classes["dm-categories-wrapper"]}>
      {/* <Route path="/eyesite/welcome">
        <h1>Nested route</h1>
      </Route> */}
    </Container>
  );
};

export default Categories;
