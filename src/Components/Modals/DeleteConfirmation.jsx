import React from "react";

const DeleteConfirmation = ({ payment, setShowModal, deletePayment }) => {
  const handleClick = () => {    
    deletePayment(payment);
    setShowModal(null);
  };
  return (
    <div>
      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label
            htmlFor="delete_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="font-bold text-lg">Delete Confirmation</h3>
          <p className="py-4">
            Are You Really Want to Remove this Payment
          </p>
          <div className="modal-action">
            <label
              onClick={handleClick}
              htmlFor="delete_modal"
              className="btn btn-sm btn-accent"
            >
              Delete
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
