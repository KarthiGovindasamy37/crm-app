import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { env } from './config'
import { toast } from 'react-toastify'

function ViewRequest() {
    let params=useParams()
    let[request,setrequest]=useState({})
    let [loading,setloading]=useState(false)
   
    useEffect(()=>{
      requestdata();
    },[])

    let requestdata=async()=>{
        try {
            setloading(true)
            let requestdata = await axios.get(`${env.api}/service/${params.id}`,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                                    "role":window.localStorage.getItem("app-role")}})
          
         if(requestdata.status==200){
            setrequest(requestdata.data)
            setloading(false)
         }else{
            toast.info(requestdata.data.message,{toastId:"34"})
         }
                                                                             
        } catch (error) {
           toast.error(error.response.data.message,{toastId:"35"}) 
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
      <h1>{`Id : ${request._id}`}</h1>
      <h1>{`Client Name : ${request.name}`}</h1>
      <h1>{`Request Description : ${request.requestDescription}`}</h1>
      <h1>{`Status : ${request.status}`}</h1>
      <h1>{`Status Description: ${request.statusDescription}`}</h1>
      </div>
        }
    </div>
  )
}

export default ViewRequest