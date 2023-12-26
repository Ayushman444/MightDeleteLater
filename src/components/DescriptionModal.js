import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DescriptionModal({
  handleDescClose,
  handleDescShow,
  descShow,
  selectedTask,
}) {
  return (
    <>
      <Modal
        show={descShow}
        onHide={handleDescClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTask ? (
            <>
              <h2 className="text-xl font-bold mb-2">
                {selectedTask.description}
              </h2>
              <p className="text-gray-600">
                Due:{" "}
                {selectedTask.dueDate
                  ? selectedTask.dueDate.toLocaleDateString()
                  : "Not specified"}
              </p>
              <p className="text-gray-600 mt-4">
                {selectedTask.details ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
              </p>
              {selectedTask.imageUrl && (
                <img
                  src={selectedTask.imageUrl}
                  alt="Task Image"
                  className="mt-4 rounded-md w-[200px]"
                />
              )}
            </>
          ) : (
            <p className="text-center text-gray-400">
              Select a task to see the description
            </p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DescriptionModal;
