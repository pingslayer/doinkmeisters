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

const NotFound = (props) => {
  let modeClass;
  if (props.mode === "dark") {
    modeClass = classes["mode-dark"];
  } else {
    modeClass = classes["mode-white"];
  }
  return (
    <div
      className={`${classes["dm-coming-soon-message-container"]} ${modeClass}`}
    >
      <Container>
        <h2>404 PAGE NOT FOUND</h2>
        <br />
        <h4>LOOKS LIKE THIS PAGE GOT LOST IN THE MATRIX</h4>
      </Container>
    </div>
  );
};

export default NotFound;
