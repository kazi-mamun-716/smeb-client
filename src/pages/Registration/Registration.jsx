import React, { useEffect, useState } from "react";
import TermsCondition from "../../Components/shared/TermsCondition";
import {Link, useNavigate} from 'react-router-dom';
import { useRegisterMutation } from "../../feature/authApi";
import Loading from "../../Components/shared/Loading";
import setTokenLocalStorage from "../../utils/setTokenLocalStorage";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";

const Registration = () => {
  const [showCondition, setShowCondition] = useState(false);
  const [registerUser, {data, isLoading, isSuccess, isError, error}] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    whatsapp: "",
    telegram: "",
    gender: "",
  });
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = event =>{
    event.preventDefault();
    const {confirmPassword, ...rest} = inputData;
    registerUser(rest)
  };
  useEffect(()=>{
    if(isSuccess){
      setTokenLocalStorage(data?.token);
      dispatch(setToken(data?.token));
      navigate('/dashboard');
    }
    if(isError){
      console.log(error)
    }
  },[isSuccess, isError])
  if(isLoading){
    return <Loading />
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl underline">Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Name:</span>
          </label>
          <input
            type="text"
            placeholder="Your Name"
            name="name"
            value={inputData.name}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Email:</span>
          </label>
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            value={inputData.email}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Password:</span>
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
        {inputData.password !== inputData.confirmPassword && <p className="text-red-500">Password & Confirm Password Not Matched!</p>}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Select Your Gender</span>
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
            <span className="label-text">Your Mobile No:</span>
          </label>
          <input
            type="text"
            placeholder="Your Mobile No"
            name="mobile"
            value={inputData.mobile}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Your Whatsapp No:</span>
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
            <span className="label-text">Your Telegram Id:</span>
          </label>
          <input
            type="text"
            placeholder="Your Telegram Id"
            name="telegram"
            value={inputData.telegram}
            onChange={handleChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="flex items-center">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              checked={checked}
              className="checkbox checkbox-accent"
              onChange={() => setChecked(!checked)}
            />
          </label>
          <label
            htmlFor="terms_condition"
            onClick={() => setShowCondition(true)}
            className="cursor-pointer text-blue-500 text-xl hover:underline"
          >
            Terms & Condition
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <input
            type="submit"
            value="Signup"
            className="btn btn-success btn-sm"
            disabled={!checked || inputData.password !== inputData.confirmPassword || !inputData.password}
          />
        </div>
      </form>
      <div>
        <p>Already Have Account? <Link className='text-blue-500 hover:underline' to="/login">Login Here</Link></p>
      </div>
      {showCondition && <TermsCondition setShowCondition={setShowCondition} />}
    </div>
  );
};

export default Registration;
