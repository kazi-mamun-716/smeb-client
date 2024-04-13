import { Link, Outlet } from "react-router-dom";
import { useLoggedInUserQuery } from "../../feature/usersApi";
import Loading from "../../Components/shared/Loading";

const Dashboard = () => {
  const { data, isLoading } = useLoggedInUserQuery();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <p className="text-xl font-bold underline text-center">Dashboard</p>
      <div className="drawer lg:drawer-open">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content mx-2">
          <Outlet />
        </div>
        <div className="drawer-side z-[100]">
          <label
            htmlFor="dashboard-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard">Profile</Link>
            </li>
            <li>
              <Link to="my-forum">My Forum</Link>
            </li>
            <li>
              <Link to="my-blog">My Blog</Link>
            </li>
            <li>
              <Link to="my-payment">My Payment</Link>
            </li>
            <li>
              <Link to="members">All Member</Link>
            </li>
            <li>
              <Link to="search-member">Search Member</Link>
            </li>
            <li>
              <Link to="change-password">Change Password</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
