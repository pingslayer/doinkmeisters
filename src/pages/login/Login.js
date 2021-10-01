import { useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Container, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCampground } from "@fortawesome/free-solid-svg-icons";
//ui
import LoadingSpinnerXS from "../../ui/loading-spinner-xs/LoadingSpinnerXS";
//css
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Login.module.css";
//store
import { useAuth } from "../../store/AuthContext";

const Login = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginFormRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const showErrorMessageTimeout = useCallback((errorMessage) => {
    setIsLoading(false);
    setErrorMessage(errorMessage);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, []);

  const validateLoginFormHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username.length === 0) {
      showErrorMessageTimeout("Invaild Username");
      return;
    }

    if (password.length === 0) {
      showErrorMessageTimeout("Invaild Password");
      return;
    }

    try {
      await login(username, password);
      history.replace("/dashboard");
    } catch {
      showErrorMessageTimeout("ACCESS DENIED");
    } finally {
      setIsLoading(false);
    }
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
                    {errorMessage !== "" ? (
                      <p className="text-center text-danger">{errorMessage}</p>
                    ) : (
                      "PLEASE LOG IN"
                    )}
                  </p>
                  <Form onSubmit={validateLoginFormHandler} ref={loginFormRef}>
                    <Form.Group as={Row}>
                      <Form.Label column sm={3}>
                        Username
                      </Form.Label>
                      <Col sm={9}>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                          ref={usernameRef}
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
                          ref={passwordRef}
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
                        {isLoading === false ? (
                          <button
                            type="submit"
                            className={classes["dm-login-btn"]}
                          >
                            Log In
                          </button>
                        ) : (
                          <LoadingSpinnerXS />
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
