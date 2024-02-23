import React from "react";
import { useLoggedInUserQuery } from "../../../feature/usersApi";
import Loading from "../../../Components/shared/Loading";
import QrCode from "../../../Components/QrCode/QrCode";

const Profile = () => {
  const { data: user, isLoading } = useLoggedInUserQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col items-center my-2">
      <section>
        <img src={user?.photo} className="rounded" width={150} alt={user?.name} />
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Mobile: {user?.mobile}</p>
      </section>
      <section className="my-4">
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Father</th>
                <th>Mother</th>
                <th>Birth Date</th>
                <th>Blood Group</th>
                <th>Present Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user?.personalInfo?.father}</td>
                <td>{user?.personalInfo?.mother}</td>
                <td>{user?.personalInfo?.birthDate}</td>
                <td>{user?.personalInfo?.bloodGroup}</td>
                <td>{user?.personalInfo?.presentAddress}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>Course</th>
                <th className="text-center">Institute</th>
                <th>Intake</th>
                <th>Passing Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user?.academicInfo?.course}</td>
                <td>{user?.academicInfo?.institute}</td>
                <td>{user?.academicInfo?.intake}</td>
                <td>{user?.academicInfo?.passed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <QrCode user={user} />
    </div>
  );
};

export default Profile;
