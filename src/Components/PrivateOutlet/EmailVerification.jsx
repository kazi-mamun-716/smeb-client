import React, { useEffect, useState } from "react";
import {
  useEmailVerificationMutation,
  useVerifyVCodeMutation,
} from "../../feature/usersApi";
import { toast } from "react-toastify";
import Loading from "../shared/Loading";

const EmailVerification = ({ user }) => {
  const [vCode, setVCode] = useState("");
  const [sendEmailVerification, { isSuccess, isLoading, data }] =
    useEmailVerificationMutation();
  const [
    verifyVCode,
    { isSuccess: verifySuccess, isLoading: verifyVCodeLoading, isError, error, data: verifyData },
  ] = useVerifyVCodeMutation();
  const [sendSuccess, setSendSuccess] = useState(false);
  const handleClick = () => {
    const url = `${window.location.origin}/emailVerify/${user?._id}`;
    sendEmailVerification({ url });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const existsCode = sessionStorage.getItem("verificationCode");
    if (!existsCode) {
      toast.error("This code are incorrect or expired!");
    } else {
      verifyVCode({token: existsCode, code: vCode})
    }
  };
  useEffect(()=>{
    if(verifySuccess){
      sessionStorage.removeItem("verificationCode")
    }
    if(isError){
      console.log(error)
      toast.error(error?.data?.message)
    }
  },[verifySuccess, isError])
  useEffect(() => {
    if (isSuccess) {
      setSendSuccess(true);
      const existsCode = sessionStorage.getItem("verificationCode");
      if (existsCode) {
        sessionStorage.removeItem("verificationCode");
        sessionStorage.setItem("verificationCode", data?.code);
      } else {
        sessionStorage.setItem("verificationCode", data?.code);
      }
    }
  }, [isSuccess]);
  if (isLoading || verifyVCodeLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">What is your name?</span>
          </div>
          <input
            type="number"
            placeholder="Input Your Verification Code"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setVCode(e.target.value)}
            value={vCode}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <input
            type="submit"
            value="Submit"
            className="btn btn-outline my-2"
          />
        </label>
      </form>
      {sendSuccess ? (
        <div>
          <p>Email Send Successfull</p>
          <p>Please check your inbox or spam folder.</p>
        </div>
      ) : (
        <div>
          <p>We have send verification Link on your Email.</p>
          <p>Please check your inbox or spam and Verify First.</p>
          <p>
            Not find any Email?{" "}
            <button onClick={handleClick} className="btn btn-sm btn-info">
              Resend Email
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
