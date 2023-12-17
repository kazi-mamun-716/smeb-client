import React from 'react'
import { useLoggedInUserQuery } from '../../feature/usersApi'
import Loading from '../shared/Loading';

const MyForumData = () => {
    const {data, isLoading} = useLoggedInUserQuery();

    console.log(data?.forums)
    
    if(isLoading){
        return <Loading />
    }
  return (
    <section>
      <h4 className='text-xl text-center underline'>My Forums</h4>
      {
        data?.forums?.length>0?data?.forums?.map(forum=><div key={forum?._id}>
          <p>{forum?.title}</p>
        </div>):<p className='text-xl text-red-500 font-bold'>No Forum Create Yet!</p>
      }
    </section>
  )
}

export default MyForumData
