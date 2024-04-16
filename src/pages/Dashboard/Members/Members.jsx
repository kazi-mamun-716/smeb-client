import React, { useEffect, useState } from "react";
import { useCountMemberQuery, useGetAllMemberQuery } from "../../../feature/usersApi";
import Loading from "../../../Components/shared/Loading";
import { Link } from "react-router-dom";
import Pagination from "../../../Components/shared/Pagination";

const Members = () => {
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [size, setSize] = useState(30);
  //end pagination
  const {data:count, isLoading: countLoading} = useCountMemberQuery()
  const { isLoading, isError, isSuccess, data, error } = useGetAllMemberQuery({
    page: currentPage,
    size,
    filter: "active",
  });
  useEffect(() => {
    if (isSuccess) {
      // console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError]);
  if (isLoading || countLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center">
      <p className="underline">Active Members</p>
      {data?.users?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-xs table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>SL</th>
                <th>ID</th>
                <td>Name</td>
                <td>Course</td>
                <td>Intake</td>
                <td>Institute</td>
              </tr>
            </thead>
            <tbody>
              {data?.users?.map((member, index) => (
                <tr key={member?._id}>
                  <th>{index + 1}</th>
                  <th>{member?.smebId}</th>
                  <td>
                    <Link
                      className="link hover:text-primary"
                      to={`/profile/${member?._id}`}
                    >
                      {member?.name}
                    </Link>
                  </td>
                  <td>{member?.academicInfo?.course}</td>
                  <td>{member?.academicInfo?.intake}</td>
                  <td>{member?.academicInfo?.institute}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Member Found!</p>
      )}
      {count?.count > size && (
        <Pagination
          count={count?.count}
          size={size}
          setSize={setSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Members;
