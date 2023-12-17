import React from "react";
import Comment from "../../Components/ForumComp/Comment";

const SingleForum = () => {
  const token = localStorage.getItem("authToken");
  return (
    <div>
      single forum
      {token && <Comment />}
    </div>
  );
};

export default SingleForum;
