import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useVerifyEmailQuery } from '../../feature/usersApi';
import Loading from '../../Components/shared/Loading';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
    const {id} = useParams();
    const {isLoading, isSuccess, isError, error} = useVerifyEmailQuery(id);
    const [displayError, setError] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(isSuccess){
            setError(false)
            navigate("/dashboard")
        }
        if(isError){
            toast.error(error?.data?.message) 
            setError(true)           
        }
    },[isSuccess, isError])
    if(isLoading){
        return <Loading />
    }
  return (
    <div>
      {displayError ? <p className='text-center text-xl text-red-500 font-bold'>User Not Found!</p>: <p className='text-center text-xl'>Email Verify Successfull</p>}
    </div>
  )
}

export default VerifyEmail
