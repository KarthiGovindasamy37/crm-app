import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { env } from './config';
import { context } from './Context';

function EditRequest() {

  let Context=useContext(context)
  let navigate=useNavigate()
  let[loading,setLoading]=useState(false)
  let params=useParams()

  useEffect(()=>{
    loadrequest()
  },[])

  let loadrequest=async()=>{
     try {
      setLoading(true)
        let requestdata=await axios.get(`${env.api}/service/${params.id}`,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                             "role":window.localStorage.getItem("app-role")}})
         
            if(requestdata.status==200){
              
            let data=requestdata.data
            formik.setValues({
                name:data.name,
                requestDescription:data.requestDescription,
                status:data.status,
                statusDescription:data.statusDescription,
              
            })
            setLoading(false)
         }else{
           
            alert(requestdata.data.message)
         }

     } catch (error) {
       
       alert(error.response.data.message) 
     }
  }
  let formik=useFormik({
    initialValues:{
      name:"",
      requestDescription:"",
      status:"",
      statusDescription:"",
      
    },
    validate:(values)=>{
      let errors={};
      if(values.name===""){
        errors.name="Please enter name"
      }
      if(values.requestDescription===""){
        errors.requestDescription="Please add some description"
      }
      if(values.status===""){
        errors.status="Please update status"
      }
      if(values.statusDescription===""){
        errors.statusDescription="Please add some description about status"
      }
      
      return errors;
    },
    onSubmit :async(values)=>{
      try{
      let service = await axios.put(`${env.api}/service/${params.id}`,values,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                           "role":window.localStorage.getItem("app-role")}})
     alert(service.data.message)
      if(service.status==200){
      Context.setServiceModified(true)
      navigate("/app/requests")

    }
    } 
    catch(error){
        
   alert(error.response.data.message)
    }
    
  }
})
  
  return (
    loading ? <div style={{height:"400px"}} className="d-flex justify-content-center align-items-center">
      <div  className="spinner-border text-primary" role="status">
      </div>
    </div> :
    <div className='container-fluid createbg'>
    <div className='container '>
      <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col-md-6 6 mt-3'>
        <label>Client Name</label>
        <input className="form-control"  type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        />
        <span style={{color:"red"}}>{formik.errors.name}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>Status</label>
        <div class="input-group ">
       <select class="form-select" id="inputGroupSelect02"
       name="status"
       onChange={formik.handleChange}
       value={formik.values.status}>
      <option value="New" selected>Created</option>
      <option value="Contacted">Open</option>
      <option value="Qualified">In process</option>
      <option value="Lost">Released</option>
      <option value="Cancelled">Cancelled</option>
      <option value="Confirmed">Completed</option>
      </select>
      </div>
        <span style={{color:"red"}}>{formik.errors.status}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <div class="">
       <label for="exampleFormControlTextarea1" class="form-label mb-0">Request Description</label>
       <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
        name="requestDescription"
        onChange={formik.handleChange}
        value={formik.values.requestDescription}
       ></textarea>
       </div>
       <span style={{color:"red"}}>{formik.errors.requestDescription}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <div class="mb-3">
       <label for="exampleFormControlTextarea1" class="form-label mb-0">Status Description</label>
       <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
        name="statusDescription"
        onChange={formik.handleChange}
        value={formik.values.statusDescription}
       ></textarea>
       </div>
       <span style={{color:"red"}}>{formik.errors.statusDescription}</span>
        </div>
        </div>
       
        <div className=' d-flex justify-content-center mt-3'>
        <input style={{width:"300px "}} className='btn btn-primary mt-2' type="submit" value="submit"
        disabled={!formik.isValid}/>
      </div>
      
      </form>
      </div>
      </div>
      
    )
}

export default EditRequest
