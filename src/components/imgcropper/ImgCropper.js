import { useState, Fragment, forwardRef, useImperativeHandle } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import ReactCrop from "react-image-crop";
//css
import classes from "./ImgCropper.module.css";
import "react-image-crop/dist/ReactCrop.css";

const ImgCropper = forwardRef((props, ref) => {
  const defaultBorder = { border: "1px solid transparent" };
  const errorBorder = { border: "1px solid red" };

  const initState = {
    value: undefined,
    base64Value: undefined,
    message: "",
    isError: true,
    isPristine: true,
  };
  const [photoState, setPhotoState] = useState({
    ...initState,
    value: undefined,
  });

  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [cropPhotoSrc, setCropPhotoSrc] = useState(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  useImperativeHandle(ref, () => ({
    validatePhotoImpHandle() {
      var data = validatePhoto(photoState.value);
      if (result == null || result == undefined) {
        data.isError = true;
        data.message = "Photo is not cropped";
      }
      return data;
    },
    resetPhotoImpHandle() {
      resetPhotoStateHandler();
    },
  }));

  function validatePhoto(value) {
    let data = props.validationHelperFn(value);
    setPhotoState(data);
    return data;
  }

  function resetPhotoStateHandler() {
    setCrop({ aspect: 16 / 9 });
    setCropPhotoSrc(null);
    setImage(null);
    setResult(null);
    setPhotoState({ ...initState });
  }

  function onPhotoChangeHandler(event) {
    var data = validatePhoto(event.target.files[0]);
    if (data.isError) {
      return;
    }
    setCropPhotoSrc(URL.createObjectURL(event.target.files[0]));
  }

  function getCroppedImg() {
    if (crop.width == 0 && crop.height == 0) {
      return;
    }
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    setResult(base64Image);
    var photoData = validatePhoto(photoState.value);
    photoData.base64Value = base64Image;
    props.onGetCropperPhoto(photoData);
  }

  return (
    <Fragment>
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
            <input
              type="file"
              accept="image/*"
              onChange={onPhotoChangeHandler}
            />
          </label>
          <p className={classes["dm-form-control-message"]}>
            {photoState.message}
          </p>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={6}>
          {cropPhotoSrc && (
            <Fragment>
              <ReactCrop
                src={cropPhotoSrc}
                onImageLoaded={setImage}
                crop={crop}
                onChange={setCrop}
              />
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-dark mx-3"
                  onClick={getCroppedImg}
                >
                  Crop
                </button>
              </div>
            </Fragment>
          )}
        </Col>
        <Col sm={6}>
          {result && (
            <div>
              <img src={result} alt="Cropped Image" className="img-fluid" />
            </div>
          )}
        </Col>
      </Form.Group>
    </Fragment>
  );
});

export default ImgCropper;
