import React from "react";
import { useApproveMemberMutation } from "../../feature/authApi";

const ApproveConfirmation = ({member, setShowModal}) => {
  const [approveMember] = useApproveMemberMutation();
  const handleClick = () => {
    approveMember({id: member?._id, data: {status: member?.status}});
    setShowModal({});
  };
  return (
    <div>
      <input type="checkbox" id="activation_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <label
            htmlFor="activation_modal"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            x
          </label>
          <h3 className="font-bold text-lg">Approval Confirmation</h3>
          <p className="py-4">
            Are You Really Want to Approve{" "}
            <span className="text-bold text-sky-400">{member?.name}</span> as
            SMEB Member!
          </p>
          <div className="modal-action">
            <label
              onClick={handleClick}
              htmlFor="activation_modal"
              className="btn btn-sm btn-accent"
            >
              Confirm
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveConfirmation;
