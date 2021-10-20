import { Modal, Button } from "react-bootstrap";
//css
import "./ModalLightFullScreen.css";

const ModalLightFullScreen = (props) => {
  return (
    <Modal
      show={props.isModalVisible}
      onHide={props.onModalCloseHandler}
      className="modal-bg-light"
      fullscreen={true}
    >
      <Modal.Header>
        <Button
          variant="secondary"
          className="pull-right"
          onClick={props.onModalCloseHandler}
        >
          (X) Close
        </Button>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
};

export default ModalLightFullScreen;
