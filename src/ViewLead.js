import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { env } from './config'
function ViewLead() {
    let params=useParams()
    let[lead,setlead]=useState({})
    let [loading,setloading]=useState(false)
   
    useEffect(()=>{
      leaddata();
    },[])

    let leaddata=async()=>{
        try {
            setloading(true)
            let lead = await axios.get(`${env.api}/lead/${params.id}`,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                                    "role":window.localStorage.getItem("app-role")}})
          
         if(lead.status==200){
            setlead(lead.data)
            setloading(false)
         }else{
            alert(lead.data.message)
         }
                                                                             
        } catch (error) {
           alert(error.response.data.message) 
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
      <h1>{`Id : ${lead._id}`}</h1>
      <h1>{`Name : ${lead.name}`}</h1>
      <h1>{`Address : ${lead.address}`}</h1>
      <h1>{`Email : ${lead.email}`}</h1>
      <h1>{`Contact : ${lead.contact}`}</h1>
      <h1>{`Status : ${lead.status}`}</h1>
      <h1>Description : </h1>
      <p style={{textIndent:"230px",fontSize:"1.5rem"}}>{lead.description}</p>
      </div>
        }
    </div>
  )
}

export default ViewLead