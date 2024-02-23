import React, { useState } from "react";
import { useGetAllAcademiQuery } from "../../feature/basicApi";
import Loading from "../shared/Loading";

const RegSecondComp = ({ handleChange, inputData, checked, setChecked }) => {
  const { data, isLoading } = useGetAllAcademiQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <section>
      <div className="lg:flex lg:gap-2">
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Course Name:</span>
            </div>
            <select
              className="select select-bordered"
              name="course"
              value={inputData.course}
              onChange={handleChange}
              required
            >
              <option disabled value="">
                Select Your Course
              </option>
              <option value="DEMT">DEMT</option>
              <option value="DEST">DEST</option>
              <option value="MDEA">MDEA</option>
              <option value="SBW">SBW</option>
              <option value="SBMD">SBMD</option>
              <option value="SF">SF</option>
            </select>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Institute Name:</span>
            </div>
            <select
              className="select select-bordered"
              name="institute"
              value={inputData.institute}
              onChange={handleChange}
              required
            >
              <option disabled value="">
              Select Your Institute
              </option>
              {data?.map((academi) => (
                <option
                  key={academi?._id}
                  value={`${academi?.name}, ${academi?.district}`}
                >
                  {academi?.name}, {academi?.district}
                </option>
              ))}
            </select>
          </label>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Intake NO:</span>
            </label>
            <input
              type="number"
              placeholder="Intake No"
              name="intake"
              value={inputData.intake}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Passing Year:</span>
            </label>
            <input
              type="number"
              placeholder="Passing Year"
              name="passed"
              value={inputData.passed}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Nationality:</span>
            </label>
            <input
              type="text"
              placeholder="Bangladeshi"
              name="nationality"
              value={inputData.nationality}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div>
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
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Emergency Contact Person:</span>
            </label>
            <input
              type="text"
              placeholder="Type Contact Person Name"
              name="emergencyPerson"
              value={inputData.emergencyPerson}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Relation with Contact Person:</span>
            </label>
            <input
              type="text"
              placeholder="Relation"
              name="relation"
              value={inputData.relation}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Emergency Contact Number:</span>
            </label>
            <input
              type="text"
              placeholder="Emergency Contact Number"
              name="emergencyNo"
              value={inputData.emergencyNo}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
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
    </section>
  );
};

export default RegSecondComp;
