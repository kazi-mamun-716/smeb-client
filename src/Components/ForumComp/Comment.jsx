/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateCommentMutation } from "../../feature/forumApi";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";
import Pagination from "../shared/Pagination";

const Comment = ({ forum }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  const indexOfLastRecord = (currentPage + 1) * size;
  const indexOfFirstRecord = indexOfLastRecord - size;
  const showComments = forum?.comments?.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  //pagination end
  const [reply, setReply] = useState("");
  const token = localStorage.getItem("authToken");
  const [replyComment, { isLoading, isSuccess, isError, error, data }] =
    useCreateCommentMutation();
  const handleSubmit = (event) => {
    event.preventDefault();
    replyComment({ data: { reply }, fId: forum?._id });
  };
  // console.log(forum);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setReply("");
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, data, error]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {token ? (
        <div>
          <form onSubmit={handleSubmit}>
            <label className="form-control">
              <div className="label">
                <span className="label-text">Reply Here:</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full px-2 lg:w-1/2 h-24"
                placeholder="Write your comment here"
                onChange={(e) => setReply(e.target.value)}
                value={reply}
                required
              ></textarea>
            </label>
            <label className="form-control w-full max-w-full lg:max-w-xs my-2">
              <input
                type="submit"
                className="btn text-white font-bold w-full max-w-full  btn-info"
                value="Submit"
              />
            </label>
          </form>
        </div>
      ) : (
        <p className="mb-2">
          You must be logged in to reply to this discussion. <br />
          <Link className="btn btn-info btn-sm" to="/login">
            Login Here
          </Link>
        </p>
      )}
      {forum?.comments?.length > 0 ? (
        <>
          <h3 className="text-xl font-bold">Comments:</h3>
          <ul className="menu menu-md rounded-box">
            {showComments?.map((comment) => (
              <li key={comment?._id} className="flex mb-2 bg-base-200 rounded">
                <div>
                  <img
                    className="w-8 rounded-full"
                    src={comment?.author?.photo}
                    alt={comment?.author?.name}
                  />
                  <Link to={`/profile/${comment?.author?._id}`}>
                    <h3 className="link-info">{comment?.author?.name}</h3>
                  </Link>
                  <div>
                    <p className="text-end">{new Date(comment?.updatedAt).toLocaleDateString("en-GB")}</p>
                    <p>{new Date(comment?.updatedAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <p>{comment?.content}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-xl text-red-400 font-bold">No reply yet</p>
      )}
      <div className="flex justify-center">
        {forum?.comments.length > size && (
          <Pagination
            count={forum?.comments.length}
            size={size}
            setSize={setSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
