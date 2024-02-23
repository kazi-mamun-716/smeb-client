import React, { useState } from "react";
import {
  useCreateAcademiMutation,
  useGetAllAcademiQuery,
} from "../../../feature/basicApi";
import Loading from "../../../Components/shared/Loading";

const Academi = () => {
  const [academiDetails, setAcademiDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    district: "",
  });
  const [createAcademi, { isLoading: academiLoading }] =
    useCreateAcademiMutation();
  const { data, isLoading } = useGetAllAcademiQuery();
  const handleChange = (event) => {
    setAcademiDetails({
      ...academiDetails,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    createAcademi(academiDetails);
    setAcademiDetails({
      name: "",
      mobile: "",
      email: "",
      address: "",
      district: "",
    });
  };
  if (isLoading || academiLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
      <section>
        <form onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Name Of Academi:</span>
            </div>
            <input
              type="text"
              placeholder="Academi Name"
              className="input input-bordered w-full max-w-xs"
              name="name"
              value={academiDetails.name}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Contact No:</span>
            </div>
            <input
              type="text"
              placeholder="Academi Contact No"
              className="input input-bordered w-full max-w-xs"
              name="mobile"
              value={academiDetails.mobile}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email Of Academi:</span>
            </div>
            <input
              type="email"
              placeholder="Academi Contact Email"
              className="input input-bordered w-full max-w-xs"
              name="email"
              value={academiDetails.email}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Address:</span>
            </div>
            <input
              type="text"
              placeholder="Academi Address"
              className="input input-bordered w-full max-w-xs"
              name="address"
              value={academiDetails.address}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">District:</span>
            </div>
            <input
              type="text"
              placeholder="District"
              className="input input-bordered w-full max-w-xs"
              name="district"
              value={academiDetails.district}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs my-2">
            <input type="submit" className="btn btn-accent" value="Submit" />
          </label>
        </form>
      </section>
      <section>
        <h3 className="text-xl text-center underline">Academi List</h3>
        {data?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table table-zebra table-xs">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>District</th>
                  <th>Mobile</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((academi, index) => (
                  <tr key={academi?._id}>
                    <th>{index + 1}</th>
                    <td>{academi?.name}</td>
                    <td>{academi?.district}</td>
                    <td>{academi?.mobile}</td>
                    <td>{academi?.email}</td>
                  </tr>
                ))}
                {/* row 1 */}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-500 font-bold">No Academi Found!</p>
        )}
      </section>
    </div>
  );
};

export default Academi;
