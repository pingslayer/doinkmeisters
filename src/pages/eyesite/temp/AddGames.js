import { Fragment, useEffect } from "react";
import { useState, useRef } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
//components
import LoadingSpinner from "../../../ui/loading-spinner/LoadingSpinner";
//css
import classes from "./AddGames.module.css";
//hooks
import useHttp from "../../../hooks/use-http";
//api
import { addVideoGame } from "../../../apis/video-games-api";
//config
import Properties from "../../../config/properties.js";

const AddGames = () => {
  const [isAddVideoGameFormValid, setIsAddVideoGameFormValid] = useState(false);
  const addVideoGameFormRef = useRef();
  const nameRef = useRef();
  const nickNameRef = useRef();
  const logoURLRef = useRef();
  const descriptionRef = useRef();
  const bestReviewRef = useRef();
  const statusRef = useRef();
  const passCodeRef = useRef();

  const {
    sendRequest,
    status,
    data: loadedData,
    error,
  } = useHttp(addVideoGame, true);

  function validateAddGameForm(event) {
    event.preventDefault();
    const passCode = passCodeRef.current.value;
    const passCodeReduced = passCode.replace(/ /g, "").toLowerCase();
    const secretKeyReduced = Properties.secretKey
      .replace(/ /g, "")
      .toLowerCase();
    if (passCodeReduced !== secretKeyReduced) {
      setIsAddVideoGameFormValid(false);
      return;
    }
    setIsAddVideoGameFormValid(true);

    const name = nameRef.current.value;
    const nickName = nickNameRef.current.value;
    const logoURL = logoURLRef.current.value;
    const description = descriptionRef.current.value;
    const bestReview = bestReviewRef.current.value;
    const status = statusRef.current.value;

    const gameData = {
      name: name,
      nickName: nickName,
      logoURL: logoURL,
      description: description,
      bestReview: bestReview,
      status: status,
    };

    sendRequest(gameData);
  }

  function clearAddGameForm() {
    addVideoGameFormRef.current.reset();
  }

  useEffect(() => {
    if (status === "completed") {
      clearAddGameForm();
    }
  }, [clearAddGameForm]);

  return (
    <Fragment>
      <div className={classes["dm-add-data-wrapper"]}>
        <Container>
          <br />
          <Card className={`${classes["dm-form-card"]}`}>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <br />
                <Form onSubmit={validateAddGameForm} ref={addVideoGameFormRef}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        ref={nameRef}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Nick Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        ref={nickNameRef}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Logo URL
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        ref={logoURLRef}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Description
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        as="textarea"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} ${classes["dm-form-control-text-area"]} mb-3`}
                        ref={descriptionRef}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Best Review
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        as="textarea"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} ${classes["dm-form-control-text-area"]} mb-3`}
                        ref={bestReviewRef}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Status
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Select
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        ref={statusRef}
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Passcode
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="password"
                        placeholder=""
                        className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                        ref={passCodeRef}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mt-3 mb-3">
                    <Col lg={{ span: 8 }}></Col>
                    <Col
                      lg={{ span: 4 }}
                      className="d-flex justify-content-end"
                    >
                      <button
                        type="button"
                        className={classes["dm-form-btn"]}
                        onClick={clearAddGameForm}
                      >
                        Clear
                      </button>
                      {(status === "pending" || status === "completed") && (
                        <button
                          type="submit"
                          className={classes["dm-form-btn"]}
                        >
                          Add
                        </button>
                      )}
                      {status === "sending" && (
                        <button
                          type="button"
                          className={classes["dm-form-btn"]}
                        >
                          Sending...
                        </button>
                      )}
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Card>
          <br />
        </Container>
      </div>
    </Fragment>
  );
};

export default AddGames;
