import { useState } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Card,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./NotFound.module.css";
//components
import ComingSoon from "../../components/comingsoon/ComingSoon";

const NotFound = () => {
  return (
    <div className={classes["dm-notfound-wrapper"]}>
      <Container>
        <ComingSoon mode="light" />
      </Container>
    </div>
  );
};

export default NotFound;
