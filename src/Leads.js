import axios from 'axios'
import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { env } from './config'
import { context } from './Context'
import { toast } from 'react-toastify'

function Leads() {

    let Context=useContext(context)

    useEffect(()=>{
        Context.setLeadModified(true)
    },[])

    let deletelead=async(id)=>{
        try{
       let ask=window.confirm("Confirm delete")     
       if(ask){
        let lead = await axios.delete(`${env.api}/lead/${id}`,{headers:{"authorization":window.localStorage.getItem("app-token")},
        "role":window.localStorage.getItem("app-role")})
        toast.success(lead.data.message,{toastId:"19"})
        
        if(lead.status===200){
        let exist=Context.leads.filter(ele=>ele._id !== id)
        Context.setleads(exist)
    }
       }
       }catch(error){
        
        if(error.response.status===404){
            toast.error("Sorry file not found",{toastId:"20"})
        }else{
            toast.error(error.response.data.message,{toastId:"21"}) 

        }
        }
    }
  return (
    <div>
        {
        Context.leadLoading ? <div style={{height:"400px"}} className="d-flex justify-content-center align-items-center">
        <div  className="spinner-border text-primary" role="status">
        </div>
      </div> :
    
    <div className="container-fluid mt-3">

    
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Leads</h1>
                        <Link to="/app/create-lead"style={{width:"100px"}} className="d-none d-sm-inline-block btn btn-sm btn-success shadow-sm"><i
                                className="fas fa-download fa-sm text-white-50"></i>Create Lead</Link>
                    </div>
    
     <div className="card shadow mb-4">
        <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Total Number of leads - {`${Context.leads.length}`}</h6>
        </div>
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>


                        </tr>
                    </thead>
                    <tfoot>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        
                        </tr>
                    </tfoot>
                    <tbody>
                        {
                       Context.leads.map((lead,index)=>{
                           return <tr>
                            <td>{index+1}</td>
                            <td>{lead.name}</td>
                            <td>{lead.address}</td>
                            <td>{lead.contact}</td>
                            <td>{lead.status}</td>
                            <td>
                                <Link to={`/app/view-lead/${lead._id}`} style={{width:"80px"}} className='btn btn-primary ms-2'>View</Link>
                                <Link to={`/app/edit-lead/${lead._id}`} style={{width:"80px"}} className='btn btn-warning ms-2'>Edit</Link>
                                <button onClick={()=>deletelead(lead._id)} style={{width:"80px"}} className='btn btn-danger ms-2'>Delete</button>
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

export default Leads