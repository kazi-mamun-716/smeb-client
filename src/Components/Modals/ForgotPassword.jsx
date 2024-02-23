import React, { useEffect, useState } from "react";
import {
  useForgotPassMutation,
  usePassResetMutation,
} from "../../feature/usersApi";
import Loading from "../shared/Loading";
import { toast } from "react-toastify";

const ForgotPassword = ({ setForgot }) => {
  const [display, setDisplay] = useState(false);
  const [resetInput, setResetInput] = useState({
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [
    forgot,
    { isLoading: forgotLoading, isSuccess, isError, error, data },
  ] = useForgotPassMutation();
  const [reset, { isLoading, isSuccess: resetSuccess }] =
    usePassResetMutation();

  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    forgot({ email });
  };
  const handleChange = (event) => {
    setResetInput({
      ...resetInput,
      [event.target.name]: event.target.value,
    });
  };
  const handleReset = (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("verificationCode");
    reset({ password: resetInput.password, code: resetInput.code, email, token });
  };
  useEffect(() => {
    if (isSuccess) {
      setDisplay(true);
      console.log(data);
      const existsCode = sessionStorage.getItem("verificationCode");
      if (existsCode) {
        sessionStorage.removeItem("verificationCode");
        sessionStorage.setItem("verificationCode", data?.code);
      } else {
        sessionStorage.setItem("verificationCode", data?.code);
      }
    }
  }, [isSuccess]);
  useEffect(()=>{
    if(resetSuccess){
      toast.success("Password Reset Successfully!")
      sessionStorage.removeItem("verificationCode");
      setResetInput({
        password: "",
        confirmPassword: "",
        code: "",
      })
      setForgot(false)
    }
  },[resetSuccess])
  if (isLoading || forgotLoading) {
    <Loading />;
  }
  return (
    <div>
      <input type="checkbox" id="forgot_pass_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          {display ? (
            <div className="flex flex-col items-center">
              <h4 className="text-xl underline">Reset Password</h4>
              <p>
                Please check your mail inbox or spam folder to get verification
                code
              </p>
              <form onSubmit={handleReset}>
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
                    value={resetInput.password}
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
                    value={resetInput.confirmPassword}
                    disabled={resetInput.password.length < 6}
                  />
                  {resetInput.password !== resetInput.confirmPassword && (
                    <p className="fw-semibold text-red-400">
                      Password Not Matched!
                    </p>
                  )}
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Verification Code</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Verification Code"
                    className="input input-bordered w-full max-w-xs"
                    name="code"
                    onChange={handleChange}
                    value={resetInput.code}
                    required
                  />
                </label>
                <input
                  type="submit"
                  className="btn btn-secondary mt-2"
                  disabled={resetInput.password !== resetInput.confirmPassword}
                  value="Reset"
                />
              </form>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg">Forgot Password!</h3>
              <form onSubmit={handleSubmit}>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Your Registered Email:</span>
                  </div>
                  <input
                    type="email"
                    placeholder="Type Your Registered Email"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <div className="label">
                    <span className="label-text-alt">
                      You will get Verification Code on your email
                    </span>
                  </div>
                </label>
                <input
                  type="submit"
                  value="Send"
                  className="btn btn-accent mt-2"
                />
              </form>
              {isError && (
                <p className="text-red-400 font-semibold">
                  {error?.data?.message}
                </p>
              )}
            </>
          )}
          <div className="modal-action">
            <label
              onClick={() => {
                setForgot(false)
                sessionStorage.removeItem("verificationCode");
              }}
              htmlFor="forgot_pass_modal"
              className="btn"
            >
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
