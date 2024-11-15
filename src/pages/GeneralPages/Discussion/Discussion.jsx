import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCountForumQuery,
  useGetAllForumQuery,
} from "../../../feature/forumApi";
import Loading from "../../../Components/shared/Loading";
import Comment from "../../../assets/images/comment.png";
import Pagination from "../../../Components/shared/Pagination";

function Discussion() {
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(20);
  const { isLoading, isSuccess, data } = useGetAllForumQuery({
    page: currentPage,
    size,
    filter: 'published'
  });
  const { data: count, isLoading: countLoading } = useCountForumQuery();
  const [discussion, setDiscussion] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      setDiscussion(data);
      console.log(data)
    }
  }, [isSuccess, data]);
  if (isLoading || countLoading) {
    return <Loading />;
  }
  return (
    <div>
      <section className="flex flex-col lg:flex-row items-center lg:items-start gap-2 my-2">
        <aside className="w-4/12">
          <Link
            to="/discussion/create"
            className="btn btn-info btn-sm font-bold text-white"
          >
            Start Discussion
          </Link>
        </aside>
        <div className="overflow-x-auto w-full">
          {discussion?.length > 0 ? (
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Comments</th>
                  <th>Last discussed on</th>
                </tr>
              </thead>
              <tbody>
                {discussion?.map((topic) => (
                  <tr key={topic?._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold uppercase">
                            <Link
                              to={`/discussion/${topic?._id}`}
                              className=" link-accent"
                            >
                              {topic?.title}
                            </Link>
                          </div>
                          <div className="text-sm opacity-50">
                            Started By:{" "}
                            <Link
                              to={`/profile/${topic?.author?._id}`}
                              className="text-sky-500"
                              target="_blank"
                            >
                              {topic?.author?.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {topic?.comments?.length > 0 ? (
                        <div>
                          <p className="flex items-center gap-1">
                            {" "}
                            <img
                              width="15px"
                              src={Comment}
                              alt="comment"
                            />{" "}
                            {topic?.comments?.length}
                          </p>
                          <span className="badge badge-ghost badge-sm">
                            Latest comment by: {topic?.lastComment?.author?.name}
                          </span>
                        </div>
                      ) : (
                        <span>No comment yet</span>
                      )}
                    </td>
                    <td>
                      {topic?.comments?.length > 0
                        ? new Date(
                            topic?.lastComment?.updatedAt
                          ).toLocaleDateString()
                        : new Date(topic?.updatedAt).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-2xl font-bold text-red-400 text-center">
              No Disucssion Started Yet
            </p>
          )}
        </div>
      </section>
      <div className="flex justify-center">
        {count?.count > size && (
          <Pagination
            count={count?.count}
            size={size}
            setSize={setSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default Discussion;
