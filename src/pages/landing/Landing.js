import { useState } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Landing.module.css";

const Landing = () => {
  const [superSecretKey, setSuperSecretKey] = useState("");
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const superSecretKeyChangeHandler = (event) => {
    setSuperSecretKey(event.target.value);
  };

  const validateSuperSecretKeyForm = (event) => {
    event.preventDefault();
    setSuperSecretKey("");
    setIsErrorMessageVisible(true);

    setTimeout(() => {
      setIsErrorMessageVisible(false);
    }, 7000);
  };

  return (
    <Container fluid>
      <Form onSubmit={validateSuperSecretKeyForm}>
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
                placeholder=">> Type the key here and then press [ENTER]"
                className={classes["dm-form-control-dark-bg"]}
                onChange={superSecretKeyChangeHandler}
                value={superSecretKey}
              />
              {isErrorMessageVisible && (
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
