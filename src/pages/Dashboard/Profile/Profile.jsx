import React from 'react'
import { useLoggedInUserQuery } from '../../../feature/usersApi';
import Loading from '../../../Components/shared/Loading';

const Profile = () => {
  const {data: user, isLoading} = useLoggedInUserQuery();
  if(isLoading){
    return <Loading />
  }
  return (
    <div>
      {user?.name}
    </div>
  )
}

export default Profile
