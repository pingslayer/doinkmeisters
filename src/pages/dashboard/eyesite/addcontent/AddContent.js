import { Fragment, useEffect } from "react";
import { useState, useRef } from "react";
import { Row, Col, Container, Form, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
//components
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";
import CardDark from "../../../../ui/card-dark/CardDark";
//css
import classes from "./AddContent.module.css";
//hooks
import useHttp from "../../../../hooks/use-http";
//store
import { useAuth } from "../../../../store/AuthContext";

const AddContent = (props) => {
  const { currentUser } = useAuth();
  const [isAddVideoGameFormValid, setIsAddVideoGameFormValid] = useState(false);
  const addVideoGameFormRef = useRef();
  const nameRef = useRef();
  const nickNameRef = useRef();
  const descriptionRef = useRef();
  const bestReviewRef = useRef();

  console.log(props);

  const {
    sendRequest,
    status,
    data: loadedData,
    error,
  } = useHttp(props.getApiRef().add, true);

  function handlePhotoUpload(event) {
    event.preventDefault();
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    setIsAddVideoGameFormValid(true);
    const name = nameRef.current.value;
    const nickName = nickNameRef.current.value;
    const description = descriptionRef.current.value;
    const bestReview = bestReviewRef.current.value;

    const gameData = {
      name: name,
      nickName: nickName,
      description: description,
      bestReview: bestReview,
      userId: currentUser.uid,
    };

    sendRequest(gameData);
  }

  function clearAddGameFormHandler() {
    addVideoGameFormRef.current.reset();
  }

  useEffect(() => {
    if (status === "completed") {
      clearAddGameFormHandler();
      props.showAllContent();
    }
  }, [clearAddGameFormHandler]);

  return (
    <Fragment>
      <div className={classes["dm-add-data-wrapper"]}>
        <CardDark>
          <Row>
            <Col lg={1} md={1} sm={0}></Col>
            <Col lg={10} md={10} sm={12}>
              <br />
              <Form onSubmit={onSubmitHandler} ref={addVideoGameFormRef}>
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
                    Photo
                  </Form.Label>
                  <Col sm={10}>
                    <label
                      className={`btn btn-outline-dark btn-md ${classes["dm-upload-file-btn"]}`}
                    >
                      <FontAwesomeIcon icon={faFileUpload} />
                      &nbsp;&nbsp;&nbsp;Select Photo
                      <input type="file" onChange={handlePhotoUpload} />
                    </label>
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mt-3 mb-3">
                  <Col lg={{ span: 8 }}></Col>
                  <Col lg={{ span: 4 }} className="d-flex justify-content-end">
                    <button
                      type="button"
                      className={classes["dm-form-btn"]}
                      onClick={clearAddGameFormHandler}
                    >
                      Clear
                    </button>
                    {(status === "pending" || status === "completed") && (
                      <button type="submit" className={classes["dm-form-btn"]}>
                        Add
                      </button>
                    )}
                    {status === "sending" && (
                      <button type="button" className={classes["dm-form-btn"]}>
                        Adding...
                      </button>
                    )}
                  </Col>
                </Form.Group>
              </Form>
              <br />
            </Col>
            <Col lg={1} md={1} sm={0}></Col>
          </Row>
        </CardDark>
      </div>
    </Fragment>
  );
};

export default AddContent;
