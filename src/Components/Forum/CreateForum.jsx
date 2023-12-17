import React, { useEffect, useState } from "react";
import { useCreateForumMutation } from "../../feature/forumApi";
import Loading from "../../Components/shared/Loading";
import { toast } from "react-toastify";

const CreateForum = () => {
  const [postForum, { isLoading, isSuccess, data, isError, error }] =
    useCreateForumMutation();
  const [inputData, setInputData] = useState({
    title: "",
    description: "",
  });
  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    postForum(inputData);
    setInputData({
      title: "",
      description: "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <h4 className="text-xl underline text-center">Write Forum</h4>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Forum Title:</span>
          </div>
          <input
            type="text"
            name="title"
            value={inputData.title}
            onChange={handleChange}
            placeholder="Write Title Here"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description:</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Write Description"
            name="description"
            value={inputData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <input
          className="btn btn-success mt-2"
          type="submit"
          value="Post Forum"
        />
      </form>
    </section>
  );
};

export default CreateForum;
