import React from "react";
import { useLoggedInUserQuery } from "../../feature/usersApi";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";

const DeleteConfirmation = ({ member, setShowModal, deletMember }) => {
  const {data, isLoading} = useLoggedInUserQuery();
  const handleClick = () => {
    if(data?._id === member?._id){
      return toast.warning("Can't Remove Yourself!")
    }
    deletMember(member?._id);
    setShowModal({});
  };
  if(isLoading){
    return <Loading/>
  }
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
            Are You Really Want to Remove <span className="text-bold text-sky-400">{member?.name}</span> from SMEB Member!
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
