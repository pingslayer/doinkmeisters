import { useState } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCampground,
  faBaseballBall,
} from "@fortawesome/free-solid-svg-icons";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Login.module.css";

const Login = () => {
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const validateLoginForm = (event) => {
    event.preventDefault();
    setIsErrorMessageVisible(true);
    setTimeout(() => {
      setIsErrorMessageVisible(false);
    }, 3000);
  };

  return (
    <div className={classes["dm-login-wrapper"]}>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col lg={3} md={2} sm={0}></Col>
          <Col lg={6} md={8} sm={12}>
            <Card className={`${classes["login-card"]} mt-5`}>
              <div className={classes["inner-container"]}>
                <Card.Body>
                  <div className={`${classes["login-icon-wrapper"]} mt-3 mb-3`}>
                    <FontAwesomeIcon
                      icon={faCampground}
                      className={classes["login-icon"]}
                    />
                    <h5>SecuroLaunch</h5>
                  </div>
                  <p className="text-center mb-3">
                    {isErrorMessageVisible ? (
                      <p className="text-center text-danger">ACCESS DENIED</p>
                    ) : (
                      "PLEASE LOG IN"
                    )}
                  </p>
                  <Form onSubmit={validateLoginForm}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Username
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Password
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="password"
                          placeholder=""
                          className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mt-3 mb-3">
                      <Col
                        lg={{ span: 4 }}
                        className="d-flex justify-content-start"
                      >
                        <p className="text-muted mt-2 mb-0">VERSION 1.0.0</p>
                      </Col>
                      <Col lg={{ span: 4 }}></Col>
                      <Col
                        lg={{ span: 4 }}
                        className="d-flex justify-content-end"
                      >
                        {!isErrorMessageVisible && (
                          <button
                            type="submit"
                            className={classes["dm-login-btn"]}
                          >
                            Log In
                          </button>
                        )}
                      </Col>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </div>
            </Card>
          </Col>
          <Col lg={3} md={2} sm={0}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
