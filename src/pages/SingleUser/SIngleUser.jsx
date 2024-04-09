import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleUserQuery } from "../../feature/usersApi";
import { toast } from "react-toastify";
import Loading from "../../Components/shared/Loading";

const SIngleUser = () => {
  const { id } = useParams();
  const { isLoading, isError, error, data } = useSingleUserQuery(id);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);
  if (isLoading) {
    return <Loading />;
  }
//   console.log(data);
  return (
    <div>
      <section className="flex flex-col lg:flex-row gap-2 justify-center items-center">
        <img width="250px" src={data?.member?.photo} alt={data?.member?.name} />
        <div className="">
          <p>SMEB ID: {data?.member?.smebId}</p>
          <p>Name: {data?.member?.name}</p>
          <p>Mobile: {data?.member?.mobile}</p>
          <p>Email: {data?.member?.email}</p>
        </div>
      </section>
      <section>
        <h5 className="text-center underline text-xl font-bold">Academic Info</h5>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Course</th>
                <th>Intake</th>
                <th>Institute</th>
                <th>Passing Year</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <td>{data?.member?.academicInfo?.course}</td>
                <td>{data?.member?.academicInfo?.intake}</td>
                <td>{data?.member?.academicInfo?.institute}</td>
                <td>{data?.member?.academicInfo?.passed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default SIngleUser;
