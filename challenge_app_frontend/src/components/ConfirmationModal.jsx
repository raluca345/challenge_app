import React from "react";

export default function ConfirmationModal({
  show,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className={`modal fade ${show ? "show" : ""} custom-confirmation-modal`}
      id="confirmationModal"
      tabIndex="-1"
      aria-labelledby="confirmationModalLabel"
      aria-hidden={!show}
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content border border-danger">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title" id="confirmationModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            ></button>
          </div>
          <div className="modal-body">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-bs-dismiss="modal"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
