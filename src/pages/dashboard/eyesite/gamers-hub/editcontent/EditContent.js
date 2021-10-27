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
//components
import {
  validateNameHelper,
  validateSummaryHelper,
  validateLinkHelper,
  validateDescriptionHelper,
  validateEditPhotoHelper,
} from "../helpers/Validation";
import ImgCropperForUpdate from "../../../../../components/imgcropper/ImgCropperForUpdate";
//ui
import ModalDark from "../../../../../ui/modal-dark/ModalDark";
import RadioDark from "../../../../../ui/radio-dark/RadioDark";
import WysiwugEditorModded from "../../../../../ui/wysiwug-editor/WysiwugEditorModded";
import CardGrey from "../../../../../ui/card-grey/CardGrey";
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
  const citations = [
    { name: "Update External Link", value: 1 },
    { name: "Or Update Your Description", value: 2 },
  ];
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
    if (citation == 2) {
      descriptionEditorRef.current.onContentPresent(props.content.description);
    }
  }, [status]);

  /**
   * form states
   */
  const [nameState, setNameState] = useState({
    ...initState,
    value: props.content.name,
  });
  const [summaryState, setSummaryState] = useState({
    ...initState,
    value: props.content.summary,
  });
  const [photoState, setPhotoState] = useState({
    ...initState,
    value: undefined,
    snapshot: { name: props.content.photo_name, url: props.content.photo_url },
  });
  const [citation, setCitation] = useState(props.content.citation);
  const [linkState, setLinkState] = useState({
    ...initState,
    value: props.content.link,
  });
  const [descriptionState, setDescriptionState] = useState({
    ...initState,
    value: props.content.description,
  });
  const [descriptionEditorState, setDescriptionEditorState] = useState({
    ...initState,
    value: props.content.description,
  });

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
    return data;
  }

  function validateSummary(value) {
    let data = validateSummaryHelper(value);
    setSummaryState(data);
    return data;
  }

  function validateLink(value) {
    let data = validateLinkHelper(value);
    setLinkState(data);
    return data;
  }

  function validateDescription(value) {
    let data = validateDescriptionHelper(value);
    setDescriptionState(data);
    return data;
  }

  function validateEditForm() {
    var photo = ImgCropperRef.current.validatePhotoImpHandle();
    let name = validateName(nameState.value);
    let summary = validateSummary(summaryState.value);
    let link = validateLink(linkState.value);

    let description = null;
    if (citation == 2) {
      description = validateDescription(
        descriptionEditorRef.current.onGetEditor()
      );
    } else {
      description = validateDescription(descriptionEditorState);
    }

    if (name.isError || summary.isError || photo.isError) {
      return false;
    } else if (citation == 1 && link.isError) {
      return false;
    } else if (citation == 2 && description.isError) {
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
    setCitation(+value);
  }

  function onPhotoModalOpenHandler() {
    setIsModalVisible(true);
  }

  function onPhotoModalCloseHandler() {
    setIsModalVisible(false);
  }

  async function onCancelHandler() {
    props.showAllContent();
  }

  /**
   * reset form Handler
   */
  useEffect(() => {
    //resets user description content when citation get auto changed by reset button
    if (citation == 2) {
      descriptionEditorRef.current.onContentPresent(props.content.description);
    }
  }, [citation]);

  function onResetHandler() {
    setNameState({
      ...initState,
      value: props.content.name,
    });
    setSummaryState({
      ...initState,
      value: props.content.summary,
    });
    setPhotoState({
      ...initState,
      value: undefined,
      snapshot: {
        name: props.content.photo_name,
        url: props.content.photo_url,
      },
    });
    if (ImgCropperRef.current) {
      ImgCropperRef.current.resetPhotoImpHandle();
    }
    setCitation(props.content.citation);
    setLinkState({
      ...initState,
      value: props.content.link,
    });
    setDescriptionState({
      ...initState,
      value: props.content.description,
    });
    setDescriptionEditorState({
      ...initState,
      value: props.content.description,
    });
    //user description content is reset when staying on the editor
    if (descriptionEditorRef.current && props.content.citation == 2) {
      descriptionEditorRef.current.onContentPresent(props.content.description);
    }
  }

  /**
   * On Submit
   */
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
        summary: summaryState.value,
        photo: photoBuilder,
        citation: citation,
        link: linkState.value,
        description: descriptionState.value,
        status: props.content.status,
      };
      sendRequest(data);
      return;
    }

    let photoName = +new Date() + "-" + photoState.value.name;

    // if new photo is set
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
          };
          const data = {
            id: props.content.id,
            name: nameState.value,
            summary: summaryState.value,
            photo: photoBuilder,
            citation: citation,
            link: linkState.value,
            description: descriptionState.value,
            status: props.content.status,
          };
          sendRequest(data);
        });
      }
    );
  }

  return (
    <Fragment>
      <ModalDark
        isModalVisible={isModalVisible}
        onModalCloseHandler={onPhotoModalCloseHandler}
      >
        <div className={classes["original-photo-wrapper"]}>
          <img src={props.content.photo_url} />
        </div>
      </ModalDark>

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
                  <ImgCropperForUpdate
                    ref={ImgCropperRef}
                    onPhotoModalOpen={onPhotoModalOpenHandler}
                    onGetCropperPhoto={onGetCropperPhotoHandler}
                    validationHelperFn={validateEditPhotoHelper}
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
                  )}
                  {/* Description */}
                  {citation === 2 && (
                    <Form.Group className="mb-3">
                      <WysiwugEditorModded
                        content={descriptionState}
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
