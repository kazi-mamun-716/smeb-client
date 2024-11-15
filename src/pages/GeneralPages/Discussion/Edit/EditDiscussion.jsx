import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetForumByIdQuery, useUpdateForumMutation } from '../../../../feature/forumApi';
import Loading from '../../../../Components/shared/Loading';
import { toast } from 'react-toastify';

function EditDiscussion() {
    const {id} = useParams();
    const [fData, setFData] = useState({title: '', description: ''});
    const { isLoading, isSuccess, data } = useGetForumByIdQuery(id);
    const [update, {isLoading: updateLoading, isSuccess: updateSuccess, data:updateData}] = useUpdateForumMutation();
    const handleChange=event=>{
        setFData({
            ...fData,
            [event.target.name] : event.target.value
        })
    }
    const handleSubmit=event=>{
        event.preventDefault();
        update({id, data: fData})
    }
    useEffect(()=>{
        if(isSuccess){
            setFData({
                title: data?.title,
                description: data?.description
            })
        }
        if(updateSuccess){
            toast.success(updateData?.message)
        }
    },[isSuccess, data, updateSuccess, updateData?.message])
    if (isLoading || updateLoading) {
      return <Loading />;
    }
  return (
    <div>
        <h3 className='text-xl underline text-center'>Edit Discussion</h3>
        <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Discussion Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            onChange={handleChange}
            value={fData?.title}
            name='title'
            required
          />
        </label>
        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            onChange={handleChange}
            value={fData?.description}
            name='description'
            required
          ></textarea>
        </label>
        <label className="form-control w-full max-w-full lg:max-w-xs my-2">
          <input
            type="submit"
            className="btn text-white font-bold w-full max-w-full btn-info"
            value="Update"
          />
        </label>
      </form>
    </div>
  )
}

export default EditDiscussion