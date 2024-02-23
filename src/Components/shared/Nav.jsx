import { Link, useLocation, useNavigate } from "react-router-dom";
import Smeb from "../../assets/images/smeb.jpeg";
import { useDispatch } from "react-redux";
import { setToken } from "../../feature/rootSlice";
import { useLoggedInUserQuery } from "../../feature/usersApi";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const {data:user} = useLoggedInUserQuery();
  const dispatch = useDispatch();
  const handleLogOut = () =>{
    localStorage.removeItem('authToken');
    navigate('/login')
    dispatch(setToken(null));
  }
  const navLinks = (
    <>
      {/* 
      <li>
        <Link to="/forum">Forum</Link>
      </li> */}
      {token && (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="lg:hidden">
            <p className="cursor-pointer" onClick={handleLogOut}>Logout</p>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className={`dropdown ${!token && "hidden"}`}>
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/">
          <img src={Smeb} width={35} className="rounded" alt="SMEB" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {token ? (
          <div className="dropdown">
            <button onClick={handleLogOut} className="btn btn-sm btn-outline btn-warning hidden lg:block">Logout</button>
            <label
              tabIndex={0}
              htmlFor="dashboard-drawer"
              className={`btn m-1 lg:hidden ${
                !location.pathname.includes("dashboard") && "hidden"
              }`}
            >
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photo} alt={user?.name} />
                </div>
              </div>
            </label>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-outline btn-info">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
