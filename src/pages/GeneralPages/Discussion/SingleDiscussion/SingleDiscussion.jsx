import { Link, useParams } from "react-router-dom";
import Comment from "../../../../Components/ForumComp/Comment";
import { useGetForumByIdQuery } from "../../../../feature/forumApi";
import Loading from "../../../../Components/shared/Loading";

const SingleDiscussion = () => {
  const { id } = useParams();
  const { isLoading, isSuccess, data } = useGetForumByIdQuery(id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="my-2">
      {isSuccess && (
        <div className="flex flex-col items-center lg:items-start lg:flex-row gap-2">
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-32">                
              <img
                src={data?.author?.photo}
                alt={data?.author?.name}
                className="rounded"
              />
            </div>
            <Link className="link-hover link-info" target="_blank" to={`/profile/${data?.author?._id}`}>{data?.author?.name}</Link>
          </div>
          <div>
            <h3 className="text-xl font-bold uppercase">{data?.title}</h3>
            <p className="font-mono mb-2">Published on: {new Date(data?.createdAt).toDateString("en-GB")} {new Date(data?.createdAt).toLocaleTimeString()}</p>
            <hr />
            <p className="my-2 text-justify px-2">{data?.description}</p>
          </div>
        </div>
      )}
      <Comment forum={data}/>
      
    </div>
  );
};

export default SingleDiscussion;
