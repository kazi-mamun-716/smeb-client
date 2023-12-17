import React, { useEffect, useState } from "react";
import { useAddMemberMutation } from "../../../feature/authApi";
import Loading from "../../../Components/shared/Loading";
import { toast } from "react-toastify";

const AddUser = () => {
  const [addMember, { isLoading, isSuccess, isError, error }] = useAddMemberMutation();
  const [inputData, setInputData] = useState({
    smebId: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    whatsapp: "",
    telegram: "",
    gender: "",
  });
  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { confirmPassword, ...rest } = inputData;
    addMember(rest)
  };
  useEffect(()=>{
    if(isSuccess){
      toast.success("Member Added Successfully")
    }
    if(isError){
      toast.error(error?.data?.message)
    }
  },[isSuccess, isError, error])
  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl underline">Add Member</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Member's ID:</span>
          </label>
          <input
            type="number"
            placeholder="SMEB ID"
            name="smebId"
            value={inputData.smebId}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="text"
            placeholder="Member's Name"
            name="name"
            value={inputData.name}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email:</span>
          </label>
          <input
            type="email"
            placeholder="Member's Email"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Password:</span>
          </label>
          <input
            type="password"
            placeholder="Type Password"
            name="password"
            value={inputData.password}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Confirm Password:</span>
          </label>
          <input
            type="password"
            placeholder="Type Password Again"
            name="confirmPassword"
            value={inputData.confirmPassword}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        {inputData.password !== inputData.confirmPassword && (
          <p className="text-red-500">
            Password & Confirm Password Not Matched!
          </p>
        )}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Member Gender</span>
          </label>
          <select
            name="gender"
            onChange={handleChange}
            className="select select-bordered"
            defaultValue="selected"
            required
          >
            <option disabled value="selected">
              Select Here
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Mobile No:</span>
          </label>
          <input
            type="text"
            placeholder="Mobile No"
            name="mobile"
            value={inputData.mobile}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Whatsapp No:</span>
          </label>
          <input
            type="text"
            placeholder="Your Whatsapp No"
            name="whatsapp"
            value={inputData.whatsapp}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Telegram Id:</span>
          </label>
          <input
            type="text"
            placeholder="Telegram Id"
            name="telegram"
            value={inputData.telegram}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <input
            type="submit"
            value="Add Member"
            className="btn btn-success btn-sm"
            disabled={
              inputData.password !== inputData.confirmPassword ||
              !inputData.password
            }
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
