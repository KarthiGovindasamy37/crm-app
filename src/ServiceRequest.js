import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { env } from './config'
import { serviceContext } from './Context2'

function Requests() {

    let context=useContext(serviceContext)

    useEffect(()=>{
        context.setmdata(1)
       },[])

    let deletelead=async(id)=>{
        try{
       let ask=window.confirm("Confirm delete")     
       if(ask){
        let servicedata = await axios.delete(`${env.api}/service/${id}`,{headers:{"authorization":window.localStorage.getItem("app-token")},
        "role":window.localStorage.getItem("app-role")})
        alert(servicedata.data.message)
        
        if(servicedata.status==200){
        let exist=context.service.filter(ele=>ele._id != id)
        context.setservice(exist)
    }
       }
       }catch(error){
        
        if(error.response.status==404){
            alert("Sorry file not found")
        }else{
            alert(error.response.data.message) 

        }
        }
    }
  return (
    <div>
        {
        context.loading ? <div style={{height:"400px"}} className="d-flex justify-content-center align-items-center">
        <div  className="spinner-border text-primary" role="status">
        </div>
      </div> :
    
    <div className="container-fluid mt-3">

    
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Service Requests</h1>
                        
                    </div>
    
     <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Total Number of Requests - {`${context.service.length}`}</h6>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Client Name</th>
                            <th>Request Description</th>
                            <th>Status</th>
                            <th>Actions</th>


                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Sl</th>
                            <th>Client Name</th>
                            <th>Request Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                       context.service.map((service,index)=>{
                           return <tr>
                            <td>{index+1}</td>
                            <td>{service.name}</td>
                            <td>{service.requestDescription}</td>
                            <td>{service.status}</td>
                            <td>
                                <Link to={`/app/view-request/${service._id}`} style={{width:"80px"}} className='btn btn-primary ms-2'>View</Link>
                                <Link to={`/app/edit-request/${service._id}`} style={{width:"80px"}} className='btn btn-warning ms-2'>Edit</Link>
                                <button onClick={()=>deletelead(service._id)} style={{width:"80px"}} className='btn btn-danger ms-2'>Delete</button>
                            </td>
                        </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    

</div>
                }
</div>
  )
}

export default Requests