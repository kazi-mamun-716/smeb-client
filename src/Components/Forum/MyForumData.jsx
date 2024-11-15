import React, { useEffect, useState } from "react";
import Loading from "../shared/Loading";
import {
  useDeleteForumMutation,
  useGetForumByUserQuery,
} from "../../feature/forumApi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ForumDeleteConfirmation from "../Modals/ForumDeleteConfirmation";

const MyForumData = () => {
  const { data, isLoading } = useGetForumByUserQuery();
  const [show, setShow] = useState(null);
  const [
    deleteForum,
    { isLoading: deleteLoading, isSuccess, data: deleteData, isError, error },
  ] = useDeleteForumMutation();
  const handleDelete = (id) => {
    setShow(null);
    deleteForum(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(deleteData?.message);
    }
    if (isError) {
      console.log(error);
      toast.error(error?.message);
    }
  }, [isSuccess, deleteData, isError, error]);
  if (isLoading || deleteLoading) {
    return <Loading />;
  }
  return (
    <section>
      <h4 className="text-xl text-center underline">My Discussion</h4>
      <div className="flex justify-center lg:justify-end my-2">
      <Link
        to="/discussion/create"
        className="btn btn-info btn-sm font-bold text-white"
      >
        Start Discussion
      </Link>
      </div>
      {data?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Comments</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((forum, index) => (
                <tr key={forum?._id}>
                  <th>{index + 1}</th>
                  <td>
                    <Link
                      className="link-info"
                      to={`/discussion/${forum?._id}`}
                    >
                      {forum?.title}
                    </Link>
                  </td>
                  <td>
                    {forum?.comments?.length > 0 ? (
                      <p>{forum?.comments?.length} no</p>
                    ) : (
                      "No comments yet!"
                    )}
                  </td>
                  <td>{forum?.status}</td>
                  <td>
                    <Link
                      className="btn btn-xs bg-sky-400 font-bold text-white"
                      to={`/discussion/${forum?._id}/edit`}
                    >
                      Edit
                    </Link>{" "}
                    |{" "}
                    <label
                      onClick={() => setShow(forum?._id)}
                      htmlFor="forum_delete_modal"
                      className="btn btn-xs bg-red-400 font-bold text-white"
                    >
                      Delete
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xl text-red-500 font-bold">
          No Discussion Started Yet!
        </p>
      )}
      {show && (
        <ForumDeleteConfirmation forumId={show} handleClick={handleDelete} />
      )}
    </section>
  );
};

export default MyForumData;
