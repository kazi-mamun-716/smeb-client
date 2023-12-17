import React, { useEffect, useState } from "react";
import { useEmailVerificationMutation } from "../../feature/usersApi";
import Loading from "../shared/Loading";

const EmailVerification = ({ user }) => {
  const [sendEmailVerification, { isSuccess, isLoading }] =
    useEmailVerificationMutation();
  const [sendSuccess, setSendSuccess] = useState(false);
  const handleClick = () => {
    const url = `${window.location.origin}/emailVerify/${user?._id}`;
    sendEmailVerification({ url });
  };
  useEffect(() => {
    if (isSuccess) {
      setSendSuccess(true);
    }
  }, [isSuccess]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
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
