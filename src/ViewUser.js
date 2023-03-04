import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { env } from './config'
import { toast } from 'react-toastify'

function ViewUser() {
    let params=useParams()
    let[user,setuser]=useState({})
    let [loading,setloading]=useState(false)
    let navigate = useNavigate()
   
    useEffect(()=>{
      userdata();
    },[])

    let userdata=async()=>{
        try {
            setloading(true)
            let viewdata = await axios.get(`${env.api}/user/${params.id}`,{headers:{"authorization":window.localStorage.getItem("app-token")}})
          if(viewdata.status === 200){
            setuser(viewdata.data)
            setloading(false)
         }                                                                             
        } catch (error) {
         if(error.response.status === 440) navigate("/")
         if(error.response.status === 401) navigate("/app/users")
         toast.error(error.response.data.message,{toastId:"37"}) 
        }
      
    }
  return (
    <div>
        {
        loading ? <div style={{height:"400px"}} className="d-flex justify-content-center align-items-center">
        <div  className="spinner-border text-primary" role="status">
        </div>
      </div> :
      <div className='createbg'>
      <h1>{`Id : ${user._id}`}</h1>
      <h1>{`Name : ${user.firstname}`}</h1>
      <h1>{`Role : ${user.role}`}</h1>
      <h1>{`Email : ${user.email}`}</h1>
      <h1>{`Access: ${user.access}`}</h1>
      </div>
        }
    </div>
  )
}

export default ViewUser
















