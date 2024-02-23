import React, { useEffect, useState } from "react";
import TermsCondition from "../../Components/shared/TermsCondition";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../feature/authApi";
import Loading from "../../Components/shared/Loading";
import setTokenLocalStorage from "../../utils/setTokenLocalStorage";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";
import RegSecondComp from "../../Components/RegComp/RegSecondComp";
import RegFirstComp from "../../Components/RegComp/RegFirstComp";
import RegPrevComp from "../../Components/RegComp/RegPrevComp";
import { toast } from "react-toastify";

const Registration = () => {
  const [checked, setChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [showCondition, setShowCondition] = useState(false);
  const [preview, setPreview] = useState(false);
  const [registerUser, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    name: "",
    father: "",
    mother: "",
    email: "",
    birthDate: "",
    presentAddress: "",
    permanentAddress: "",
    bloodGroup: "",
    nationality: "",
    course: "",
    institute: "",
    intake: "",
    passed:"",
    password: "",
    confirmPassword: "",
    mobile: "",
    whatsapp: "",
    telegram: "",
    gender: "",
    emergencyPerson: "",
    relation: "",
    emergencyNo: "",
  });
  const validateForm = () => {
    const { name, email, mobile, bloodGroup, birthDate } = inputData;
    // Add your custom validation logic here
    return (
      name.trim() !== "" &&
      email.trim() !== "" &&
      mobile.trim() !== "" &&
      bloodGroup.trim() !== "" &&
      birthDate.trim() !== "" 
    );
  };
  const nextStep = () => {
    if (validateForm()) {
      setStep((prevStep) => prevStep + 1);
    } else {
      toast.error("Please fill in all required fields.");
    }
  };
  const handleChange = (event) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { confirmPassword, ...rest } = inputData;    
    registerUser({...rest, url: window.location.origin});
  };
  useEffect(() => {
    if (isSuccess) {
      setTokenLocalStorage(data?.token);
      sessionStorage.setItem("verificationCode", data?.code)
      dispatch(setToken(data?.token));
      navigate("/dashboard");
    }
    if (isError) {
      toast.error(error?.data?.message)
    }
  }, [isSuccess, isError]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl underline">Registration Form</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {step === 1 && (
          <RegFirstComp handleChange={handleChange} inputData={inputData} />
        )}
        {step === 2 && (
          <RegSecondComp
            handleChange={handleChange}
            inputData={inputData}
            setPreview={setPreview}
            checked={checked}
            setChecked={setChecked}
          />
        )}
        <div className="flex justify-around my-2">
          {step > 1 && (
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </button>
          )}
          {step > 1 ? (
            <label
              htmlFor="reg_prev_modal"
              onClick={() => setPreview(true)}
              className="btn btn-success"
            >
              Preview
            </label>
          ) : (
            <button type="button" className="btn btn-info" onClick={nextStep}>
              Next
            </button>
          )}
          {step === 2 && (
            <input
              type="submit"
              disabled={!checked}
              value="Submit"
              className="btn btn-primary"
            />
          )}
        </div>
      </form>
      {preview && <RegPrevComp setPreview={setPreview} inputData={inputData} />}
      <div>
        <p>
          Already Have Account?{" "}
          <Link className="text-blue-500 hover:underline" to="/login">
            Login Here
          </Link>
        </p>
      </div>
      {showCondition && <TermsCondition setShowCondition={setShowCondition} />}
    </div>
  );
};

export default Registration;
