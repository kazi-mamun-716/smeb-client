import { Link, Outlet } from "react-router-dom";
import { useLoggedInUserQuery } from "../../feature/usersApi";
import Loading from "../../Components/shared/Loading";

const Dashboard = () => {
  const {data, isLoading} = useLoggedInUserQuery();
  // console.log(data)
  if(isLoading){
    return <Loading />
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
        <div className="drawer-side">
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
           {
            (data?.role === "general secretary") || (data?.role === "admin secretary") || (data?.role === "president") || (data?.role === "admin") ?  <li>
            <details close="true">
              <summary>Admin Panel</summary>
              <ul>
                <li>
                  <Link to="members">Members</Link>
                </li>
              </ul>
            </details>
          </li>: ""
           }
            <li>
              <Link to="my-forum">My Forum</Link>
            </li>            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
