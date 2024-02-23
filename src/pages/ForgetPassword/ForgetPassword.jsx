import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePassResetMutation } from "../../feature/usersApi";
import Loading from "../../Components/shared/Loading";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [passReset, { isSuccess, isError, isLoading, error }] =
    usePassResetMutation();
  const { id } = useParams();
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    passReset({ data: { password: input.password }, id });
    setInput({
      password: "",
      confirmPassword: "",
    });
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Reset Successfully");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
      <h4 className="text-xl underline">Reset Password</h4>
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
            <span className="label-text-alt">Minimum 6 Charecter</span>
          </div>
          <input
            type="password"
            placeholder="Input Your Password"
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
          className="btn btn-secondary mt-2"
          disabled={input.password !== input.confirmPassword}
          value="Reset"
        />
      </form>
    </div>
  );
};

export default ForgetPassword;
