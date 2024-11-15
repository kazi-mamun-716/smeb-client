import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../feature/authApi";
import setTokenLocalStorage from "../../utils/setTokenLocalStorage";
import Loading from "../../Components/shared/Loading";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";
import {toast} from "react-toastify";
import ForgotPassword from "../../Components/Modals/ForgotPassword";

const Login = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [isForgot, setForgot] = useState(false);
  const token = localStorage.getItem("authToken");
  const [userLogin, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  let from = location.state?.from?.pathname || "/";
  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    userLogin({ ...inputData });
  };
  useEffect(() => {
    if (isSuccess || token) {
      toast.success("Login Successfull!")
      if (!token) {
        setTokenLocalStorage(data?.token);
        dispatch(setToken(data?.token));
      }
      navigate(from, { replace: true });
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, isError, token]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl underline">Login Here</h2>
      <form onSubmit={handleSubmit}>
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

        <div className="form-control w-full max-w-xs my-2">
          <input
            type="submit"
            value="Login"
            className="btn btn-info btn-sm"
            disabled={!inputData.email || !inputData.password}
          />
        </div>
      </form>
      <div>
        <p>
          Not Have any Account?{" "}
          <Link className="text-blue-500 hover:underline" to="/signup">
            Register Here
          </Link>
        </p>
        <label onClick={()=>setForgot(true)} htmlFor="forgot_pass_modal" className="cursor-pointer hover:underline hover:text-sky-400">Forgot Password</label>
      </div>
      {
        isForgot && <ForgotPassword setForgot={setForgot}/>
      }
    </div>
  );
};

export default Login;
