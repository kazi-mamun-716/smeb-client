/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import EmailCheckingModal from "../../Components/Modals/EmailCheckingModal";
import { useCheckNonRegisterParticipationMutation } from "../../feature/eventApi";
import Loading from "../../Components/shared/Loading";

function NonRegisterd({
  handleSubmit,
  handleNonRegisterdChange,
  nonRegisterdParticipate,
  data
}) {
  const [isMarinner, setIsMarinner] = useState(true);
  const [isOpenModal, setOpenModal] = useState(null)
  const [email, setEmail] = useState("");  
  const [checkData,{isLoading, isSuccess, data:dataByEmail}] = useCheckNonRegisterParticipationMutation();
  const handleClick=()=>{
    checkData({email, id: data?._id})
  }
  useEffect(()=>{    
    if(isSuccess){
      setOpenModal(dataByEmail)
    }
  },[dataByEmail, isSuccess])
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
      <div className="flex gap-2 my-2">
        <p>
          If you are already participated then check your participation by email: 
        </p>
        <div className="flex gap-2">
        <label className="form-control w-full max-w-xs">
            <input
              type="email"
              placeholder="Your Registered Email"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        <label onClick={handleClick} htmlFor="checking_modal" className="btn btn-primary btn-xs my-2 text-white" >
        Check Participation
        </label>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e, "non registerd", isMarinner)}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
            name="name"
            value={nonRegisterdParticipate?.name}
            onChange={handleNonRegisterdChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="text"
            placeholder="Your Email"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={nonRegisterdParticipate?.email}
            onChange={handleNonRegisterdChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Mobile</span>
          </div>
          <input
            type="text"
            placeholder="Your Contact No"
            className="input input-bordered w-full max-w-xs"
            name="mobile"
            value={nonRegisterdParticipate?.mobile}
            onChange={handleNonRegisterdChange}
            required
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Amount / Fee</span>
          </div>
          <input
            type="number"
            placeholder="0"
            className="input input-bordered w-full max-w-xs"
            name="payment"
            value={nonRegisterdParticipate?.payment}
            onChange={handleNonRegisterdChange}
            readOnly={data?.isPaymentAccept === false || data?.amount>0}
          />
        </label>
        <label className="form-control w-full max-w-xs mt-2">
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="isMarinner"
                className="radio radio-accent"
                value={nonRegisterdParticipate?.isMarinner}
                onChange={() => {
                    setIsMarinner(true)
                    handleNonRegisterdChange
                }}
                defaultChecked={isMarinner}
              />
              <span>Marinner</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="isMarinner"
                className="radio radio-accent"
                value={nonRegisterdParticipate?.isMarinner}
                onChange={() => {
                    setIsMarinner(false)
                    handleNonRegisterdChange
                }}
              />
              <span>Non Marinner</span>
            </div>
          </div>
        </label>
        {nonRegisterdParticipate?.payment > 0 && (
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Transaction Info</span>
            </div>
            <textarea
              placeholder="Transaction Info"
              className="textarea textarea-bordered"
              name="paymentInfo"
              value={nonRegisterdParticipate?.paymentInfo}
              onChange={handleNonRegisterdChange}
              required
            />
          </label>
        )}
        {isMarinner && (
          <>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Course</span>
              </div>
              <input
                type="text"
                placeholder="Your Course Name"
                className="input input-bordered w-full max-w-xs"
                name="course"
                value={nonRegisterdParticipate?.course}
                onChange={handleNonRegisterdChange}
                required
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Intake</span>
              </div>
              <input
                type="number"
                placeholder="Your Course Intake"
                className="input input-bordered w-full max-w-xs"
                name="intake"
                value={nonRegisterdParticipate?.intake}
                onChange={handleNonRegisterdChange}
                required
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Institute</span>
              </div>
              <input
                type="text"
                placeholder="Your Institute Name"
                className="input input-bordered w-full max-w-xs"
                name="institute"
                value={nonRegisterdParticipate?.institute}
                onChange={handleNonRegisterdChange}
                required
              />
            </label>
          </>
        )}
        <input
          className="btn btn-info my-2 text-white"
          type="submit"
          value="Perticipate"
        />
      </form>
      {
        isOpenModal !== null && isSuccess && <EmailCheckingModal data={isOpenModal} setOpenModal={setOpenModal} />
      }
    </div>
  );
}

export default NonRegisterd;
