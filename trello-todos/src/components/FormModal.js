import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

function FormModal({ data,users, handleClose, showModal,EditData,handleSubmit }) {
  return (
    <>
      <Modal show={showModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="title">
            <label>Title:</label>
            <input type="text" className="form-control" value={data.lanes[0].cards.title} />
          </div>
          <div className="status">
            <label>Status:</label>
            <select>
              <option value={false}>Incomplete</option>
              <option value={true}>Completed</option>
            </select>
          </div>
          <div className="assignee">
            <label>Assignee:</label>
            <select>
              {users?.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormModal;
