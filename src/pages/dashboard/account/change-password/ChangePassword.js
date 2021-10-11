import { Fragment, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Alert } from "react-bootstrap";
//css
import classes from "./ChangePassword.module.css";
import darkFormClasses from "../../../../components/css/DarkForm.module.css";
//ui
import CardDark from "../../../../ui/card-dark/CardDark";
import LoadingSpinnerXS from "../../../../ui/loading-spinner-xs/LoadingSpinnerXS";
//store
import { useAuth } from "../../../../store/AuthContext";

const ChangePassword = () => {
  /**
   * initilizations
   */
  const { updatePassword } = useAuth();
  const initState = {
    value: "",
    message: "",
    isError: true,
    isPristine: true,
  };

  /**
   * form states
   */
  const [updateState, setUpdateState] = useState({
    status: "pending",
    error: false,
    message: "",
  });
  const [newPasswordState, setNewPasswordState] = useState({ ...initState });
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState({
    ...initState,
  });
  const newPasswordRef = useRef("");
  const confirmNewPasswordRef = useRef("");

  /**
   * validators
   * validate and set state
   */
  function validateNewPassword(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value.trim() === "") {
      data.isError = true;
      data.message = "New password is required";
    }
    if (value.indexOf(" ") >= 0) {
      data.isError = true;
      data.message = "New password cannot have spaces";
    }
    if (value.length < 8) {
      data.isError = true;
      data.message = "New password cannot be less than 8 characters";
    }
    if (value.length > 16) {
      data.isError = true;
      data.message = "New password cannot be more than 16 characters";
    }
    setNewPasswordState(data);
  }

  function validateConfirmNewPassword(value) {
    let data = {
      value: value,
      message: "",
      isError: false,
      isPristine: false,
    };
    if (value.trim() === "") {
      data.isError = true;
      data.message = "Confirm new password is required";
    }
    if (value !== newPasswordState.value) {
      data.isError = true;
      data.message = "Confirm New password did not match the new password";
    }
    setConfirmNewPasswordState(data);
  }

  function validateChangePasswordForm() {
    validateNewPassword(newPasswordState.value);
    validateConfirmNewPassword(confirmNewPasswordState.value);

    const newPassword = newPasswordRef.current.value;
    const confirmNewPassword = confirmNewPasswordRef.current.value;
    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      return false;
    }
    if (newPassword !== confirmNewPassword) {
      return false;
    }
    return true;
  }

  /**
   * onChange Handlers
   */
  function onNewPasswordChangeHandler(event) {
    let value = event.target.value;
    validateNewPassword(value);
  }

  function onConfirmNewPasswordChangeHandler(event) {
    let value = event.target.value;
    validateConfirmNewPassword(value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    if (!validateChangePasswordForm()) {
      return;
    }
    const newPassword = newPasswordRef.current.value;

    setUpdateState({
      status: "sending",
      error: false,
    });
    const promises = [];
    promises.push(updatePassword(newPassword));
    Promise.all(promises)
      .then(() => {
        setUpdateState({
          status: "done",
          error: false,
          message: "Password changed successfully",
        });
      })
      .catch((error) => {
        setUpdateState({
          status: "done",
          error: true,
          message: "Password was not changed",
        });
      })
      .finally(() => {
        resetAddFormHandler();
      });
  }

  /**
   * reset form Handlers
   */
  function resetAddFormHandler() {
    setNewPasswordState({ ...initState });
    setConfirmNewPasswordState({ ...initState });
  }

  return (
    <div className={classes["dm-change-password-wrapper"]}>
      <Container>
        <br />
        <CardDark>
          <h4>Change Password</h4>
        </CardDark>
        <br />
        <CardDark>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <br />
              {updateState.status === "done" && (
                <Alert variant="dark">{updateState.message}</Alert>
              )}
              <br />
              <Form onSubmit={onSubmitHandler}>
                {/* New Password */}
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    New Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Min of 8 characters, Max of 15 characters, No Spaces"
                      maxLength="16"
                      className={`mb-3 ${
                        darkFormClasses["dm-form-control-dark-bg"]
                      }  ${
                        !newPasswordState.isPristine && newPasswordState.isError
                          ? darkFormClasses["dm-form-control-error-border"]
                          : darkFormClasses["dm-form-control-default-border"]
                      }`}
                      value={newPasswordState.value}
                      onChange={onNewPasswordChangeHandler}
                      ref={newPasswordRef}
                    />
                    <p className={darkFormClasses["dm-form-control-message"]}>
                      {newPasswordState.message}
                    </p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={3}>
                    Confirm New Password
                  </Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="Match the new password"
                      maxLength="16"
                      className={`mb-3 ${
                        darkFormClasses["dm-form-control-dark-bg"]
                      } ${
                        !confirmNewPasswordState.isPristine &&
                        confirmNewPasswordState.isError
                          ? darkFormClasses["dm-form-control-error-border"]
                          : darkFormClasses["dm-form-control-default-border"]
                      }`}
                      value={confirmNewPasswordState.value}
                      onChange={onConfirmNewPasswordChangeHandler}
                      ref={confirmNewPasswordRef}
                    />
                    <p className={darkFormClasses["dm-form-control-message"]}>
                      {confirmNewPasswordState.message}
                    </p>
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mt-3 mb-3">
                  <Col lg={{ span: 8 }}></Col>
                  {(updateState.status === "pending" ||
                    updateState.status === "done") && (
                    <Col
                      lg={{ span: 4 }}
                      className="d-flex justify-content-end"
                    >
                      <button
                        type="button"
                        className={darkFormClasses["dm-form-btn"]}
                        onClick={resetAddFormHandler}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className={darkFormClasses["dm-form-btn"]}
                      >
                        Update
                      </button>
                    </Col>
                  )}
                  {updateState.status === "sending" && (
                    <Col
                      lg={{ span: 4 }}
                      className="d-flex justify-content-end"
                    >
                      <LoadingSpinnerXS />
                    </Col>
                  )}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </CardDark>
      </Container>
    </div>
  );
};

export default ChangePassword;
