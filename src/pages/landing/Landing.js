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
import classes from "./Landing.module.css";
//components
import ComingSoon from "../../components/comingsoon/ComingSoon";

const Landing = () => {
  return (
    <div className={classes["dm-landing-wrapper"]}>
      <Container>
        <ComingSoon mode="light" />
      </Container>
    </div>
  );
};

export default Landing;
