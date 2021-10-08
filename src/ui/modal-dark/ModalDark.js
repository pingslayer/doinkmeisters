import { Modal, Button } from "react-bootstrap";
//css
import "./ModalDark.css";

const ModalDark = (props) => {
  return (
    <Modal
      show={props.isModalVisible}
      backdrop="static"
      dialogClassName="modal-60w"
      onHide={props.onModalCloseHandler}
      className="modal-bg-dark"
    >
      <Modal.Body>{props.children}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.onModalCloseHandler}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDark;
