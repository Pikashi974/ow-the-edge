import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Modal";
import Heggy from "./Rescue Hedgehog.jpg";

export default function PortalButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn btn-outline-light" onClick={handleShow}>
        Help ?
      </button>
      <Modal className="modal-xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to use?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="d-grid"
            style={{
              gridTemplateColumns: "auto 40%",
            }}
          >
            <img
              src={Heggy}
              alt="Rescue Hedgehog"
              width="60%"
              style={{
                margin: "0 auto",
              }}
            />
            <ol>
              You can search in 3 ways
              <li>
                Search a Normal Monster
                <br /> Example :<dd>Skull Servant</dd>
                <dd>Flamvell Guard</dd>
              </li>
              <li>
                Search an Effect Monster Example :<dd>Fabled Lurrie</dd>
                <dd>Magicians' Souls</dd>
              </li>
              <li>
                Search corresponding type, level and/or attribute (min. 1){" "}
                <br />
                Example :<dd>Level 1 LIGHT Beast</dd>
                <dd>Level 2 FIRE Dinosaur</dd>
                Then use {"the "}
                <button type="button" className="btn btn-success">
                  Find
                </button>
                {" button "}
              </li>
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
