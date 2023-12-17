import React, { useEffect, useState } from "react";
import {
  useAllMemberQuery,
  useDeletMemberMutation,
} from "../../../feature/authApi";
import Loading from "../../../Components/shared/Loading";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../Components/Modals/DeleteConfirmation";
import Pagination from "../../../Components/shared/Pagination";
import {
  useCountMemberQuery,
  useLoggedInUserQuery,
} from "../../../feature/usersApi";
import ApproveConfirmation from "../../../Components/Modals/ApproveConfirmation";

const Member = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(1);
  const { data: allUser, isLoading } = useAllMemberQuery({ page, size });
  const [showModal, setShowModal] = useState({});
  const [activModal, setActiveModal] = useState({});
  const { data: loggedInMember, isLoading: loggedInMemberLoading } =
    useLoggedInUserQuery();
  const {
    data: countMember,
    isLoading: memberCountLoading,
    isSuccess: memberCountSuccess,
  } = useCountMemberQuery();
  const [
    deletMember,
    { data, isSuccess, isLoading: deleteLoading, isError, error },
  ] = useDeletMemberMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      console.log(error);
    }
    if (memberCountSuccess) {
      setPageCount(countMember.count);
    }
  }, [isSuccess, isError, memberCountSuccess]);

  if (
    isLoading ||
    deleteLoading ||
    memberCountLoading ||
    loggedInMemberLoading
  ) {
    return <Loading />;
  }
  return (
    <div>
      <div className="flex justify-evenly">
        <Link
          className="text-xl underline text-sky-500"
          to="/dashboard/add-member"
        >
          Add Member
        </Link>
        <p>Total Member: {countMember?.count}</p>
        <Link
          className="text-xl underline text-sky-500"
          to="/dashboard/pending-member"
        >
          Pending Member
        </Link>
      </div>
      <div className="overflow-x-auto my-2">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>Sl</th>
              <td>ID</td>
              <td>Name</td>
              <td>Status</td>
              <td>role</td>
              <td>Approval</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {allUser?.users &&
              allUser?.users?.map((member, index) => (
                <tr key={member?._id}>
                  <th>{index + 1}</th>
                  <td>{member?.smebId}</td>
                  <td>{member?.name}</td>
                  <td>{member?.status}</td>
                  <td>{member?.role}</td>
                  <td>
                    {member?.status === loggedInMember?.role && (
                      <label
                      onClick={() => setActiveModal(member)}
                      htmlFor="activation_modal"
                      className="btn btn-xs btn-info"
                    >
                      Approve
                    </label>
                    )}
                  </td>

                  <td>
                    <label
                      onClick={() => setShowModal(member)}
                      htmlFor="delete_modal"
                      className="btn btn-sm btn-warning"
                    >
                      delete
                    </label>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {Object.keys(showModal).length > 0 && (
          <DeleteConfirmation
            member={showModal}
            setShowModal={setShowModal}
            deletMember={deletMember}
          />
        )}
        {Object.keys(activModal).length > 0 && (
          <ApproveConfirmation
            member={activModal}
            setShowModal={setActiveModal}
          />
        )}
      </div>
      <Pagination
        count={pageCount}
        page={page}
        setPage={setPage}
        size={size}
        setSize={setSize}
      />
    </div>
  );
};

export default Member;
