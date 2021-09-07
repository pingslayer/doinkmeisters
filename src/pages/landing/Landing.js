import { useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Landing.module.css";

const Landing = () => {
  const [isAllowedToJoin, setIsAllowedToJoin] = useState(true);

  const gotoChannelHandler = (event) => {
    event.preventDefault();
    setIsAllowedToJoin(false);
  };

  return (
    <Container fluid>
      <Form onSubmit={gotoChannelHandler}>
        <Row className="justify-content-md-center">
          <Col lg={{ span: 2 }}></Col>
          <Col lg={{ span: 8 }}>
            <Form.Group className={classes["dm-form-group-centered"]}>
              <Form.Label className="text-muted">
                * Enter the top secret super classified key you received by the
                super secret agent, and then proceed as instructed *
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                className={classes["dm-form-control-dark-bg"]}
              />
              {!isAllowedToJoin && (
                <Form.Text className="text-danger">
                  Oh snap, It looks like the top secret super classified key you
                  provided did not do so good.
                </Form.Text>
              )}
            </Form.Group>
          </Col>
          <Col lg={{ span: 2 }}></Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Landing;
