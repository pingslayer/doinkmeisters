import { Fragment, useEffect, useState, useRef } from "react";
import { storage } from "../../../../../firebase";
import { Row, Col, Form, Card, ProgressBar, Toast } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
//components
import {
  validateNameHelper,
  validateSummaryHelper,
  validatePhotoHelper,
  validateLinkHelper,
  validateDescriptionHelper,
} from "../helpers/Validation";
import ImgCropper from "../../../../../components/imgcropper/ImgCropper";
//ui
import RadioDark from "../../../../../ui/radio-dark/RadioDark";
import WysiwugEditorModded from "../../../../../ui/wysiwug-editor/WysiwugEditorModded";
import CardGrey from "../../../../../ui/card-grey/CardGrey";
//css
import classes from "./AddContent.module.css";
//hooks
import useHttp from "../../../../../hooks/use-http";
//store
import { useAuth } from "../../../../../store/AuthContext";

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
  var requestFunction = props.apiRef.add;
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
  const citations = [
    { name: "Add An External Link", value: 1 },
    { name: "Or Write Your Own Description", value: 2 },
  ];
  const [citation, setCitation] = useState(1);

  useEffect(() => {
    if (status === "completed") {
      setUploadingPhoto({
        isUploading: false,
        name: null,
        progress: 0,
        error: false,
      });
      props.showAllContent();
      props.reloadContent();
    }
  }, [status]);

  /**
   * form states
   */
  const [nameState, setNameState] = useState({ ...initState });
  const [summaryState, setSummaryState] = useState({ ...initState });
  const [linkState, setLinkState] = useState({ ...initState });
  const [descriptionState, setDescriptionState] = useState({ ...initState });
  const [descriptionEditorState, setDescriptionEditorState] = useState({
    ...initState,
  });
  const [photoState, setPhotoState] = useState(null);

  /**
   * refs
   */
  const ImgCropperRef = useRef(null);
  const descriptionEditorRef = useRef(null);

  /**
   * validators
   * Helper functions to validate and set state
   */
  function validateName(value) {
    let data = validateNameHelper(value);
    setNameState(data);
  }

  function validateSummary(value) {
    let data = validateSummaryHelper(value);
    setSummaryState(data);
  }

  function validateLink(value) {
    let data = validateLinkHelper(value);
    setLinkState(data);
  }

  function validateDescription(value) {
    let data = validateDescriptionHelper(value);
    setDescriptionState(data);
  }

  function validateAddForm() {
    var photo = ImgCropperRef.current.validatePhotoImpHandle();
    validateName(nameState.value);
    validateSummary(summaryState.value);
    validateLink(linkState.value);
    validateDescription(descriptionEditorState);

    if (nameState.isError || summaryState.isError || photo.isError) {
      return false;
    } else if (citation == 1 && linkState.isError) {
      return false;
    } else if (citation == 2 && descriptionState.isError) {
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

  function onSummaryChangeHandler(event) {
    let value = event.target.value;
    validateSummary(value);
  }

  function onGetCropperPhotoHandler(cropperPhotoData) {
    setPhotoState(cropperPhotoData);
  }

  function onLinkChangeHandler(event) {
    let value = event.target.value;
    validateLink(value);
  }

  function onDescriptionChangeHandler(editor) {
    setDescriptionEditorState(editor);
    validateDescription(editor);
  }

  function onCitationChangeHandler(value) {
    setLinkState({ ...initState });
    setDescriptionState({ ...initState });
    setCitation(+value);
  }

  function onCancelHandler() {
    props.showAllContent();
  }

  /**
   * reset form Handlers
   */
  function resetAddFormHandler() {
    setNameState({ ...initState });
    setSummaryState({ ...initState });
    setPhotoState(null);
    if (ImgCropperRef.current) {
      ImgCropperRef.current.resetPhotoImpHandle();
    }

    setLinkState({ ...initState });
    setDescriptionState({ ...initState });
    setDescriptionEditorState({ ...initState });
    if (descriptionEditorRef.current) {
      descriptionEditorRef.current.onResetHandler();
    }
  }

  /**
   * On Submit
   */
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

    let photoName = +new Date() + "-" + photoState.value.name;

    const uploadTask = storage
      .ref(`${STORAGE_FOLDER}/${photoName}`)
      .putString(photoState.base64Value, "data_url", {
        contentType: "image/jpeg",
      });

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
            name: photoName,
            url: url,
            file: photoState.value,
          };
          const data = {
            name: nameState.value,
            summary: summaryState.value,
            photo: photoBuilder,
            citation: citation,
            link: linkState.value,
            description: descriptionState.value,
            userId: currentUser.uid,
          };
          sendRequest(data);
        });
      }
    );
  }

  return (
    <Fragment>
      <div className={classes["dm-add-data-wrapper"]}>
        <Card className={classes["dm-card-dark"]}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <br />
              <Form onSubmit={onSubmitHandler} className="mb-3">
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
                {/* Summary */}
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Summary
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      as="textarea"
                      placeholder="Maximum of 1000 characters"
                      className={`${classes["dm-form-control-dark-bg"]} ${classes["dm-form-control-text-area"]}`}
                      style={
                        !summaryState.isPristine && summaryState.isError
                          ? errorBorder
                          : defaultBorder
                      }
                      value={summaryState.value}
                      onChange={onSummaryChangeHandler}
                    />
                    <p className={classes["dm-form-control-message"]}>
                      {summaryState.message}
                    </p>
                  </Col>
                </Form.Group>
                {/* Photo */}
                <CardGrey>
                  <ImgCropper
                    ref={ImgCropperRef}
                    onGetCropperPhoto={onGetCropperPhotoHandler}
                    validationHelperFn={validatePhotoHelper}
                  />
                </CardGrey>
                <br />
                <CardGrey>
                  {/* citation toggler */}
                  <div className="centered mt-0">
                    <RadioDark
                      value={citation}
                      radios={citations}
                      setRadioValue={onCitationChangeHandler}
                    />
                  </div>
                  {/* Link */}
                  {citation === 1 && (
                    <Form.Group>
                      <Form.Control
                        type="text"
                        placeholder="Provide a link, it can be a link to store page, guide, blog or anything similar"
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
                    </Form.Group>
                  )}
                  {/* Description */}
                  {citation === 2 && (
                    <Form.Group className="mb-3">
                      <WysiwugEditorModded
                        onContentStateChange={onDescriptionChangeHandler}
                        ref={descriptionEditorRef}
                      />
                      <p className={classes["dm-form-control-message"]}>
                        {descriptionState.message}
                      </p>
                    </Form.Group>
                  )}
                </CardGrey>
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

export default AddContent;
