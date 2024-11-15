import React, { useEffect, useState } from "react";
import {
  useCheckParticipatesQuery,
  useEventByIdQuery,
  useNonRegisterdUserParticipateMutation,
  useParticipateMutation,
} from "../../feature/eventApi";
import Loading from "../../Components/shared/Loading";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NonRegisterd from "./NonRegisterd";

function SingleEvent() {
  const token = localStorage.getItem("authToken");
  const [nonRegisterdParticipate, setNonRegisterdParticipate] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
    intake: "",
    institute: "",
    isMarinner: true,
    isPaymentAccept: "",
    payment: 0,
    paymentInfo: "",
  });
  const { id } = useParams();
  const { data, isSuccess, isLoading } = useEventByIdQuery(id);
  const [
    nonRegisterdParticipation,
    {
      isLoading: nonLoading,
      isSuccess: nonSuccess,
      data: nonData,
      isError: isNonError,
      error: nonError,
    },
  ] = useNonRegisterdUserParticipateMutation();
  const {
    data: checkData,
    isLoading: checkLoading,
    isSuccess: checkSuccess,  
  } = useCheckParticipatesQuery(id);
  const [
    participate,
    {
      isLoading: participateLoading,
      isSuccess: participateSuccess,
      data: participateData,
      isError,
      error,
    },
  ] = useParticipateMutation();
  const [perticipants, setPerticipants] = useState({
    payment: 0,
    paymentInfo: "",
  });
  const handleSubmit = (event, params, isMarinner) => {
    event.preventDefault();
    if (params === "registerd") {
      participate({ id: data?._id, data: perticipants, params });
    } else {
      nonRegisterdParticipation({ id, data: {...nonRegisterdParticipate, isMarinner} });
    }
  };

  const handleNonRegisterdChange = (event) => {
    setNonRegisterdParticipate({
      ...nonRegisterdParticipate,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setPerticipants({
      ...perticipants,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
      setPerticipants((prev) => {
        return {
          ...prev,
          payment: data?.amount,
        };
      });
      setNonRegisterdParticipate((prev) => {
        return {
          ...prev,
          payment: data?.amount,
        };
      });
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (participateSuccess) {
      toast.success(participateData?.message);
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (nonSuccess) {
      toast.success("Successfully Participate on this event")
    }
    if (isNonError) {
      toast.error(nonError?.data?.message)
    }
  }, [
    participateSuccess,
    participateData,
    isError,
    error,
    nonSuccess,
    nonData,
    isNonError,
    nonError,
  ]);
  if (isLoading || participateLoading || checkLoading || nonLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h3 className="text-xl text-center font-bold">{data?.title}</h3>
      <p className="text-center">
        Author:{" "}
        <Link to={`/profile/${data?.author?._id}`} className="link-primary">
          {data?.author?.name}
        </Link>
      </p>
      {data?.reference && <p>Reference: {data?.reference}</p>}
      <p className="bg-gray-100 text-justify p-2 rounded my-2">
        {data?.description}
      </p>
      {token ? (
        checkSuccess && checkData !== null ? (
          <div>
            <p className="text-xl">
              You have already participate on this Event
            </p>
            {checkSuccess && checkData?.status === "pending" ? (
              <p className="text-warning">
                Your request are now {checkData?.status} situation. please wait
                for approval
              </p>
            ) : (
              <p className="text-success">
                <span className="text-xl font-bold">Congratulation!</span> you
                are successfully participate on this event
              </p>
            )}
          </div>
        ) : (
          <form onSubmit={(e) => handleSubmit(e, "registerd")}>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Amount / Fee</span>
              </div>
              <input
                type="number"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                name="payment"
                value={perticipants?.payment}
                onChange={handleChange}
                readOnly={data?.amount > 0 || data?.isPaymentAccept === false}
              />
            </label>
            {perticipants?.payment > 0 && (
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Transaction Info</span>
                </div>
                <textarea
                  placeholder="Transaction Info"
                  className="textarea textarea-bordered"
                  name="paymentInfo"
                  value={perticipants?.paymentInfo}
                  onChange={handleChange}
                />
              </label>
            )}
            <input
              className="btn btn-info my-2 text-white"
              type="submit"
              value="Perticipate"
            />
          </form>
        )
      ) : (
        <div>
          <p className="text-xl font-bold text-center my-2">
            Please{" "}
            <Link className="link hover:text-sky-400" to="login">
              login
            </Link>{" "}
            for participate
          </p>
          {data?.nonRegisterd && (
            <>
              <div className="divider">OR</div>
              <p className="text-center font-bold underline">
                Non Registered User Perticipation Area
              </p>
              <NonRegisterd
                handleNonRegisterdChange={handleNonRegisterdChange}
                handleSubmit={handleSubmit}
                nonRegisterdParticipate={nonRegisterdParticipate}
                data={data}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SingleEvent;
