import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {useLoggedInUserQuery} from '../../feature/usersApi';
import Loading from "../shared/Loading";
import EmailVerification from "./EmailVerification";
import ActiveMember from "./ActiveMember";

const PrivateOutlet = () => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const {data, isLoading} = useLoggedInUserQuery();
  if(isLoading){
    return <Loading />
  }
  return <div>{token ? (data?.emailVerified ? (data?.status === "active" ? <Outlet />: <ActiveMember member={data} />) : <EmailVerification user={data} /> ): <Navigate to="/login" state={{from : location}} replace />}</div>;
};

export default PrivateOutlet;
