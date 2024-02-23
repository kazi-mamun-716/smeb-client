import React from "react";

const RegFirstComp = ({ handleChange, inputData }) => {
  return (
    <section>
      <div className="lg:flex lg:gap-2">
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Name:</span>
            </label>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={inputData.name}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Father's Name:</span>
            </label>
            <input
              type="text"
              placeholder="Father's Name"
              name="father"
              value={inputData.father}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Mother's Name:</span>
            </label>
            <input
              type="text"
              placeholder="Mother's Name"
              name="mother"
              value={inputData.mother}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
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
              required
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
            {inputData.password && inputData.password.length < 6 && (
            <p className="text-red-500">
              Password Must Be 6 Character
            </p>
          )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Confirm Password:</span>
            </label>
            <input
              type="password"
              placeholder="Type Password Again"
              name="confirmPassword"
              value={inputData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          {inputData.password !== inputData.confirmPassword && (
            <p className="text-red-500">
              Both Password Not Matched!
            </p>
          )}
        </div>
        <div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select Your Gender</span>
            </label>
            <select
              name="gender"
              onChange={handleChange}
              className="select select-bordered"
              defaultValue="selected"
              required
            >
              <option disabled value="selected">
                Select Here
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Select Your Blood Group</span>
            </label>
            <select
              name="bloodGroup"
              onChange={handleChange}
              className="select select-bordered"
              defaultValue="selected"
              required
            >
              <option disabled value="selected">
                Select Here
              </option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (bg, index) => (
                  <option key={index} value={bg}>
                    {bg}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Mobile No with Country Code:</span>
            </label>
            <input
              type="text"
              placeholder="Your Mobile No"
              name="mobile"
              value={inputData.mobile}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Present Address:</span>
            </label>
            <input
              type="text"
              placeholder="Your Present Address"
              name="presentAddress"
              value={inputData.presentAddress}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Permanent Address:</span>
            </label>
            <input
              type="text"
              placeholder="Your Permanent Address"
              name="permanentAddress"
              value={inputData.permanentAddress}
              onChange={handleChange}
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Date Of Birth:</span>
            </label>
            <input
              type="date"
              name="birthDate"
              onChange={handleChange}
              value={inputData.birthDate}
              className="input input-bordered w-full max-w-xs"
            />
            {inputData.birthDate &&
              new Date().getFullYear() -
                new Date(inputData.birthDate).getFullYear() <=
                17 && (
                <p className="font-semibold text-red-600">Age Must Be 17+</p>
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegFirstComp;
