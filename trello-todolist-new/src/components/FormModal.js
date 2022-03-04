import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function FormModal({
  users,
  handleClose,
  showModal,
  edit,
  setEdit,
  EditData
}) {
  const [title, setTitle] = useState();

  const inputTitle = edit?.title;

  useEffect(() => {
    setTitle(inputTitle);
  }, [edit]);



  const handleSubmitForm = (data) => {
    EditData(edit.id, edit);
    handleClose();
  };

  const handleChangeInput = (e) => {
    setTitle(e.target.value);
    setEdit({ ...edit, title: e.target.value });
  };

  const handleChangeStatus = (e) => {
    const convertCompleted = !!e.target.value;
    setEdit({ ...edit, completed: convertCompleted });
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Todo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="title">
            <label className="label">Title:</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={handleChangeInput}
            />
          </div>
          <div className="status">
            <label className="label">Status:</label>
            <select className="form-select" onChange={handleChangeStatus}>
              {edit?.completed ? (
                <option value={true}>Completed</option>
              ) : (
                <option value={false}>Incomplete</option>
              )}
              {edit?.completed ? (
                <option value={false}>Incomplete</option>
              ) : (
                <option value={true}>Completed</option>
              )}
            </select>
          </div>
          <div className="assignee">
            <label className="label">Assignee:</label>
            <select className="form-select">
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
          <Button variant="primary" onClick={handleSubmitForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FormModal;
