import { Fragment, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { storage } from "../../../../firebase";
import {
  Row,
  Col,
  Container,
  Form,
  Card,
  Button,
  ProgressBar,
  Toast,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidV4 } from "uuid";
//components
import LoadingSpinner from "../../../../ui/loading-spinner/LoadingSpinner";
//css
import classes from "./AddContent.module.css";
//hooks
import useHttp from "../../../../hooks/use-http";
//store
import { useAuth } from "../../../../store/AuthContext";

const AddContent = (props) => {
  /**
   * initilizations
   */
  const { currentUser } = useAuth();
  const STORAGE_FOLDER = "gamers_hub";
  const [uploadingPhoto, setUploadingPhoto] = useState({
    isUploading: false,
    name: null,
    progress: 0,
    error: false,
  });
  const defaultBorder = { border: "1px solid transparent" };
  const errorBorder = { border: "1px solid red" };
  var requestFunction = props.getApiRef().add;
  const initState = {
    value: "",
    message: "",
    isError: true,
    isPristine: true,
  };
  const {
    sendRequest,
    setRequestFunction,
    status,
    data: loadedData,
    error,
  } = useHttp(requestFunction, true);

  useEffect(() => {
    if (status === "completed") {
      props.showAllContent();
    }
  }, [status]);

  /**
   * form states
   */
  const [nameState, setNameState] = useState({ ...initState });
  const [nickNameState, setNickNameState] = useState({ ...initState });
  const [descriptionState, setDescriptionState] = useState({ ...initState });
  const [bestReviewState, setBestReviewState] = useState({ ...initState });
  const [photoState, setPhotoState] = useState({
    ...initState,
    value: undefined,
  });

  /**
   * validators
   */
  function validateName(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value.trim() === "") {
      data.isError = true;
      data.message = "Name cannot be blank";
    }
    if (value.lenght > 255) {
      data.isError = true;
      data.message = "Name cannot be more than 255 characters";
    }
    setNameState(data);
  }

  function validateNickName(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value.trim() === "") {
      data.isError = true;
      data.message = "Nick Name cannot be blank";
    } else if (value.lenght > 255) {
      data.isError = true;
      data.message = "Nick Name cannot be more than 255 characters";
    }
    setNickNameState(data);
  }

  function validateDescription(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value.trim() === "") {
      data.isError = true;
      data.message = "Description cannot be blank";
    } else if (value.lenght > 1000) {
      data.isError = true;
      data.message = "Description cannot be more than 1000 characters";
    }
    setDescriptionState(data);
  }

  function validateBestReview(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value.trim() === "") {
      data.isError = true;
      data.message = "Best review cannot be blank";
    } else if (value.lenght > 1000) {
      data.isError = true;
      data.message = "Best review cannot be more than 1000 characters";
    }
    setBestReviewState(data);
  }

  function validatePhoto(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value === null || value === undefined) {
      data.isError = true;
      data.message = "Photo is required";
    } else if (!value.type.match("image.*")) {
      data.isError = true;
      data.message = "Only JPG, JPEG or PNG Allowed";
    }
    setPhotoState(data);
  }

  function validateAddForm() {
    validateName(nameState.value);
    validateNickName(nickNameState.value);
    validateDescription(descriptionState.value);
    validateBestReview(bestReviewState.value);
    validatePhoto(photoState.value);

    if (
      nameState.isError ||
      nickNameState.isError ||
      descriptionState.isError ||
      bestReviewState.isError ||
      photoState.isError
    ) {
      return false;
    }
    return true;
  }

  /**
   * onChange Handlers
   */
  function onNameChangeHandler(event) {
    let value = event.target.value;
    validateName(value);
  }

  function onNickNameChangeHandler(event) {
    let value = event.target.value;
    validateNickName(value);
  }

  function onDescriptionChangeHandler(event) {
    let value = event.target.value;
    validateDescription(value);
  }

  function onBestReviewChangeHandler(event) {
    let value = event.target.value;
    validateBestReview(value);
  }

  function onPhotoChangeHandler(event) {
    let value = event.target.files[0];
    validatePhoto(value);
  }

  async function onSubmitHandler() {
    if (!validateAddForm()) {
      return;
    }

    setUploadingPhoto({
      isUploading: true,
      name: photoState.value.name,
      progress: 0,
      error: false,
    });

    const uploadTask = storage
      .ref(`${STORAGE_FOLDER}/${photoState.value.name}`)
      .put(photoState.value);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //upload progress
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingPhoto({
          isUploading: true,
          name: photoState.value.name,
          progress: progress,
          error: false,
        });
      },
      () => {
        //error
      },
      () => {
        //finally
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setUploadingPhoto({
            isUploading: false,
            name: null,
            progress: 0,
            error: false,
          });
          var photoBuilder = {
            name: +new Date() + photoState.value.name,
            url: url,
            file: photoState.value,
          };
          const gameData = {
            name: nameState.value,
            nickName: nickNameState.value,
            description: descriptionState.value,
            bestReview: bestReviewState.value,
            photo: photoBuilder,
            userId: currentUser.uid,
          };
          sendRequest(gameData).then();
        });
      }
    );
  }

  /**
   * reset form Handlers
   */
  function resetAddFormHandler() {
    setNameState({ ...initState });
    setNickNameState({ ...initState });
    setDescriptionState({ ...initState });
    setBestReviewState({ ...initState });
    setPhotoState({ ...initState, value: undefined });
  }

  return (
    <Fragment>
      <div className={classes["dm-add-data-wrapper"]}>
        <Card className={classes["dm-card-dark"]}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <br />
              <Form onSubmit={onSubmitHandler}>
                {/* Name */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Maximum of 255 characters"
                      className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      style={
                        !nameState.isPristine && nameState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                      value={nameState.value}
                      onChange={onNameChangeHandler}
                    />
                    <p className={classes["dm-form-control-message"]}>
                      {nameState.message}
                    </p>
                  </Col>
                </Form.Group>
                {/* Nick Name */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Nick Name
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Maximum of 255 characters"
                      className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      style={
                        !nickNameState.isPristine && nickNameState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                      value={nickNameState.value}
                      onChange={onNickNameChangeHandler}
                    />
                    <p className={classes["dm-form-control-message"]}>
                      {nickNameState.message}
                    </p>
                  </Col>
                </Form.Group>
                {/* Description */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Description
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Maximum of 1000 characters"
                      className={`${classes["dm-form-control-dark-bg"]} ${classes["dm-form-control-text-area"]} mb-3`}
                      style={
                        !descriptionState.isPristine && descriptionState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                      value={descriptionState.value}
                      onChange={onDescriptionChangeHandler}
                    />
                    <p className={classes["dm-form-control-message"]}>
                      {descriptionState.message}
                    </p>
                  </Col>
                </Form.Group>
                {/* Best Review */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Best Review
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Maximum of 1000 characters"
                      className={`${classes["dm-form-control-dark-bg"]} ${classes["dm-form-control-text-area"]} mb-3`}
                      style={
                        !bestReviewState.isPristine && bestReviewState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                      value={bestReviewState.value}
                      onChange={onBestReviewChangeHandler}
                    />
                    <p className={classes["dm-form-control-message"]}>
                      {bestReviewState.message}
                    </p>
                  </Col>
                </Form.Group>
                {/* Photo */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Photo
                  </Form.Label>
                  <Col sm={10}>
                    <label
                      className={`btn btn-outline-dark btn-md mb-2 ${classes["dm-upload-file-btn"]}`}
                      style={
                        !photoState.isPristine && photoState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                    >
                      <FontAwesomeIcon icon={faFileUpload} />
                      &nbsp;&nbsp;&nbsp;
                      {photoState.value === undefined
                        ? "Select Photo"
                        : photoState.value.name}
                      <input type="file" onChange={onPhotoChangeHandler} />
                    </label>
                    <p className={classes["dm-form-control-message"]}>
                      {photoState.message}
                    </p>
                  </Col>
                </Form.Group>
              </Form>
              {!uploadingPhoto.isUploading && (
                <Form.Group as={Row} className="mt-3 mb-3">
                  <Col lg={{ span: 8 }}></Col>
                  <Col lg={{ span: 4 }} className="d-flex justify-content-end">
                    <button
                      type="button"
                      className={classes["dm-form-btn"]}
                      onClick={resetAddFormHandler}
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={onSubmitHandler}
                      className={classes["dm-form-btn"]}
                    >
                      Add
                    </button>
                  </Col>
                </Form.Group>
              )}
              {uploadingPhoto.isUploading && (
                <Toast className="w-100 d-block bg-dark">
                  <Toast.Header
                    className="text-truncate w-100 d-block bg-dark"
                    closeButton={uploadingPhoto.error}
                  >
                    {uploadingPhoto.name == null ? "" : uploadingPhoto.name}
                  </Toast.Header>
                  <Toast.Body>
                    <ProgressBar
                      animated={!uploadingPhoto.error}
                      variant={uploadingPhoto.error ? "danger" : "primary"}
                      now={
                        uploadingPhoto.error
                          ? 100
                          : uploadingPhoto.progress * 100
                      }
                      label={
                        uploadingPhoto.error
                          ? "Error"
                          : `${Math.round(uploadingPhoto.progress * 100)}%`
                      }
                    ></ProgressBar>
                  </Toast.Body>
                </Toast>
              )}
            </Col>
          </Row>
        </Card>
        <br />
      </div>
    </Fragment>
  );
};

export default AddContent;
