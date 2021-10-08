import { Fragment, useEffect, useState, useRef } from "react";
import { storage } from "../../../../../firebase";
import {
  Row,
  Col,
  Container,
  Form,
  Card,
  Button,
  ProgressBar,
  Toast,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
//components
import {
  validateNameHelper,
  validateNickNameHelper,
  validateLinkHelper,
  validateDescriptionHelper,
  validateBestReviewHelper,
  validateEditPhotoHelper,
} from "../helpers/Validation";
//ui
import ModalDark from "../../../../../ui/modal-dark/ModalDark";
//css
import classes from "./EditContent.module.css";
//hooks
import useHttp from "../../../../../hooks/use-http";

const EditContent = (props) => {
  /**
   * initilizations
   */
  const STORAGE_FOLDER = "gamers_hub";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState({
    isUploading: false,
    name: null,
    progress: 0,
    error: false,
  });
  const defaultBorder = { border: "1px solid transparent" };
  const errorBorder = { border: "1px solid red" };
  var requestFunction = props.apiRef.update;
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
      setUploadingPhoto({
        isUploading: false,
        name: null,
        progress: 0,
        error: false,
      });
      props.reloadContent();
      props.showAllContent();
    }
  }, [status]);

  /**
   * form states
   */
  const [nameState, setNameState] = useState({
    ...initState,
    value: props.content.name,
  });
  const [nickNameState, setNickNameState] = useState({
    ...initState,
    value: props.content.nick_name,
  });
  const [linkState, setLinkState] = useState({
    ...initState,
    value: props.content.link,
  });
  const [descriptionState, setDescriptionState] = useState({
    ...initState,
    value: props.content.description,
  });
  const [bestReviewState, setBestReviewState] = useState({
    ...initState,
    value: props.content.best_review,
  });
  const [photoState, setPhotoState] = useState({
    ...initState,
    value: undefined,
    snapshot: { name: props.content.photo_name, url: props.content.photo_url },
  });

  /**
   * validators
   * Helper functions to validate and set state
   */
  function validateName(value) {
    let data = validateNameHelper(value);
    setNameState(data);
  }

  function validateNickName(value) {
    let data = validateNickNameHelper(value);
    setNickNameState(data);
  }

  function validateLink(value) {
    let data = validateLinkHelper(value);
    setLinkState(data);
  }

  function validateDescription(value) {
    let data = validateDescriptionHelper(value);
    setDescriptionState(data);
  }

  function validateBestReview(value) {
    let data = validateBestReviewHelper(value);
    setBestReviewState(data);
  }

  function validatePhoto(value) {
    let data = validateEditPhotoHelper(value);
    setPhotoState(data);
  }

  function validateEditForm() {
    validateName(nameState.value);
    validateNickName(nickNameState.value);
    validateLink(linkState.value);
    validateDescription(descriptionState.value);
    validateBestReview(bestReviewState.value);
    validatePhoto(photoState.value);
    if (
      (nameState.isError && !nameState.isPristine) ||
      (nickNameState.isError && !nickNameState.isPristine) ||
      (linkState.isError && !linkState.isPristine) ||
      (descriptionState.isError && !descriptionState.isPristine) ||
      (bestReviewState.isError && !bestReviewState.isPristine) ||
      (photoState.isError && !photoState.isPristine)
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

  function onLinkChangeHandler(event) {
    let value = event.target.value;
    validateLink(value);
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

  function onModalOpenHandler() {
    setIsModalVisible(true);
  }

  function onModalCloseHandler() {
    setIsModalVisible(false);
  }

  async function onCancelHandler() {
    props.showAllContent();
  }

  async function onSubmitHandler() {
    if (!validateEditForm()) {
      return;
    }
    setUploadingPhoto({
      isUploading: true,
      name: "Uploading data, please wait",
      progress: 0,
      error: false,
    });

    // if new photo is not set
    if (photoState.value === null || photoState.value === undefined) {
      var photoBuilder = {
        name: photoState.snapshot.name,
        url: photoState.snapshot.url,
      };
      const data = {
        id: props.content.id,
        name: nameState.value,
        nickName: nickNameState.value,
        link: linkState.value,
        description: descriptionState.value,
        bestReview: bestReviewState.value,
        photo: photoBuilder,
        status: props.content.status,
      };
      sendRequest(data);
      return;
    }

    // if new phot is set
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
        setUploadingPhoto({
          isUploading: true,
          name: "An error has occurred while sending data over the network",
          progress: 0,
          error: true,
        });
      },
      () => {
        //finally
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          var photoBuilder = {
            name: +new Date() + photoState.value.name,
            url: url,
          };
          const data = {
            id: props.content.id,
            name: nameState.value,
            nickName: nickNameState.value,
            link: linkState.value,
            description: descriptionState.value,
            bestReview: bestReviewState.value,
            photo: photoBuilder,
            status: props.content.status,
          };
          sendRequest(data);
        });
      }
    );
  }

  /**
   * reset form Handler
   */
  function onResetHandler() {
    setNameState({
      ...initState,
      value: props.content.name,
    });
    setNickNameState({
      ...initState,
      value: props.content.nick_name,
    });
    setLinkState({
      ...initState,
      value: props.content.link,
    });
    setDescriptionState({
      ...initState,
      value: props.content.description,
    });
    setBestReviewState({
      ...initState,
      value: props.content.best_review,
    });
    setPhotoState({
      ...initState,
      value: undefined,
      snapshot: {
        name: props.content.photo_name,
        url: props.content.photo_url,
      },
    });
  }

  return (
    <Fragment>
      <ModalDark
        isModalVisible={isModalVisible}
        onModalCloseHandler={onModalCloseHandler}
      >
        <img src={props.content.photo_url} width="100%" />
      </ModalDark>

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
                {/* Link */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    External Link
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Provide a link, it can be a link to guide, blog or anything similar"
                      className={`${classes["dm-form-control-dark-bg"]} mb-3`}
                      style={
                        !linkState.isPristine && linkState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                      value={linkState.value}
                      onChange={onLinkChangeHandler}
                    />
                    <p className={classes["dm-form-control-message"]}>
                      {linkState.message}
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
                  <Col sm={5}>
                    {/* <img src={photoState.snapshot.url} width="100%" /> */}
                    <button
                      type="button"
                      className={`btn btn-outline-dark btn-md mb-2 ${classes["dm-upload-file-btn"]}`}
                      onClick={onModalOpenHandler}
                    >
                      Show current photo
                    </button>
                  </Col>
                  <Col sm={5}>
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
                        ? "Select New Photo"
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
                      onClick={onCancelHandler}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className={classes["dm-form-btn"]}
                      onClick={onResetHandler}
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      onClick={onSubmitHandler}
                      className={classes["dm-form-btn"]}
                    >
                      Update
                    </button>
                  </Col>
                </Form.Group>
              )}
              {uploadingPhoto.isUploading && (
                <Toast
                  className="w-100 d-block bg-dark"
                  onClose={() => {
                    setUploadingPhoto({
                      isUploading: false,
                      name: null,
                      progress: 0,
                      error: false,
                    });
                  }}
                >
                  <Toast.Header
                    className="text-center w-100 d-block bg-dark"
                    closeButton={uploadingPhoto.error}
                  >
                    {uploadingPhoto.name == null
                      ? ""
                      : "Uploading data, please wait."}
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

export default EditContent;
