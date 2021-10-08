import { faSleigh } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
//css
import "./ModalDarkConfirmation.css";

const ModalDarkConfirmation = (props) => {
  function acceptHandler() {
    props.onConfirmation(true);
  }

  function deniedHandler() {
    props.onConfirmation(false);
  }

  return (
    <Modal
      show={props.isModalVisible}
      backdrop="static"
      onHide={props.onModalCloseHandler}
      className="modal-bg-dark"
    >
      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button type="button" variant="secondary" onClick={acceptHandler}>
          Yes
        </Button>
        <Button type="button" variant="secondary" onClick={deniedHandler}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDarkConfirmation;
