import { Fragment } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Landing.module.css";

const Landing = () => {
  const text = "Tommy Vercetti \n Carl Johnson";

  return (
    <Container fluid>
      <Form>
        <Row className="justify-content-md-center">
          <Col lg={{ span: 2 }}></Col>
          <Col lg={{ span: 8 }}>
            <Form.Group className={classes["dm-form-group-centered"]}>
              <Form.Control
                type="text"
                placeholder=""
                className={classes["dm-form-control-dark-bg"]}
              />
              <Form.Text className="text-muted">
                * Enter the top secret super classified key you received by the
                super secret agent, and then proceed as instructed *
              </Form.Text>
            </Form.Group>
          </Col>
          <Col lg={{ span: 2 }}></Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Landing;
