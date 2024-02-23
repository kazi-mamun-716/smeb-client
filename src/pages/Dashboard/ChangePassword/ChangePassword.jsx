import React, { useEffect, useState } from "react";
import { usePassChangeMutation } from "../../../feature/usersApi";
import Loading from "../../../Components/shared/Loading";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const [input, setInput] = useState({
    current: "",
    password: "",
    confirmPassword: "",
  });
  const [passChange, { isLoading, isError, isSuccess, error, data }] =
    usePassChangeMutation();
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    passChange({ current: input.current, password: input.password });
    setInput({
      current: "",
      password: "",
      confirmPassword: "",
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Current Password</span>
          </div>
          <input
            type="password"
            placeholder="Input Your Current Password"
            className="input input-bordered w-full max-w-xs"
            name="current"
            onChange={handleChange}
            value={input.current}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">New Password</span>
            <span className="label-text-alt">Minimum 6 Charecter</span>
          </div>
          <input
            type="password"
            placeholder="Your New Password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            onChange={handleChange}
            value={input.password}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            placeholder="Input Your Password Again"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            onChange={handleChange}
            value={input.confirmPassword}
            disabled={input.password.length < 6}
          />
        </label>
        <input
          type="submit"
          className="btn btn-info mt-2"
          disabled={input.password !== input.confirmPassword}
          value="Submit"
        />
      </form>
    </div>
  );
};

export default ChangePassword;
