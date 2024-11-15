import React, { useEffect, useState } from "react";
import { useCreateForumMutation } from "../../../../feature/forumApi";
import Loading from "../../../../Components/shared/Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateDiscussion() {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [createDiscussion, {isLoading, isSuccess, isError, error, data}] = useCreateForumMutation();
    const handleSubmit = event =>{
        event.preventDefault();
        createDiscussion({title, description})
    }
    useEffect(()=>{
      if(isError){
        console.log(error)
      }
      if(isSuccess){
        toast.success(data?.message)
        navigate('/dashboard/my-discussion')
        setTitle("");
        setDescription("")
      }
    },[isError, isSuccess, error, data, navigate])
    if(isLoading){
      return <Loading />
    }
  return (
    <div>
      <h3 className="text-xl font-bold text-center bg-sky-400 py-2 rounded">
        {" "}
        Start Discussion
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Discussion Title</span>
          </div>
          <input
            type="text"
            placeholder="Input Title"
            className="input input-bordered w-full max-w-xs"
            onChange={e=>setTitle(e.target.value)}
            value={title}
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Write Description Body"
            onChange={e=>setDescription(e.target.value)}
            value={description}
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-full lg:max-w-xs my-2">
          <input
            type="submit"
            placeholder="Input Title"
            className="btn text-white font-bold w-full max-w-full  btn-info"
            value="Post"
          />
        </label>
      </form>
    </div>
  );
}

export default CreateDiscussion;
