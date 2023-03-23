import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalDelete(props) {
  const [test, setTest] = useState(1);
  console.log("modal delete");
  useEffect(() => {
    console.log("effect ddelete");
    setTest(2);
  }, []);

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure delete user {props.datamodal.email}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete user</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.confirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalDelete;
