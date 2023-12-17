import React, { useState } from "react";
import {
  useAllMemberQuery,
  useApproveMemberMutation,
} from "../../../feature/authApi";
import Loading from "../../../Components/shared/Loading";
import { useLoggedInUserQuery } from "../../../feature/usersApi";
import ApproveConfirmation from "../../../Components/Modals/ApproveConfirmation";

const PendingMember = () => {
  const [showModal, setShowModal] = useState({});
  const { data, isLoading } = useAllMemberQuery();
  const { data: user, isLoading: userLoading } = useLoggedInUserQuery();
  const [
    approveMember,
    { isLoading: approveLoading },
  ] = useApproveMemberMutation();
  const pending = data?.users?.filter(
    (member) => member?.status !== "active"
  );
  if (isLoading || userLoading || approveLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="overflow-x-auto">
        {
          pending?.length>0 ? <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>Sl</th>
              <td>Name</td>
              <td>Email</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {pending?.map((member) => (
                <tr key={member?._id}>
                  <th>1</th>
                  <td>{member?.name}</td>
                  <td>{member?.email}</td>
                  <td>{member?.status}</td>
                  <td>
                    <label
                      onClick={() => setShowModal(member)}
                      htmlFor="activation_modal"
                      className={`btn btn-sm btn-warning ${
                        (user?.role === member?.status ||
                          user?.role === "admin") &&
                        "hidden"
                      }`}
                    >
                      Approve
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>: <p className="text-center text-xl">No Pending Request</p>
        }
      </div>
      {Object.keys(showModal).length > 0 && (
        <ApproveConfirmation
          member={showModal}
          approveMember={approveMember}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default PendingMember;
