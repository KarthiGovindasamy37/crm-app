import { useFormik } from 'formik'
import React, { useContext } from 'react'
import "./App.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { env } from './config';
import { context } from './Context';
import { toast } from 'react-toastify'
function CreateLead() {

  let Context=useContext(context)
  let navigate=useNavigate()
  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      address:"",
      contact:"",
      description:"",
      status:""
      
    },
    validate:(values)=>{
      let errors={};
      if(values.name===""){
        errors.name="Please enter name"
      }
      if(values.email===""){
        errors.email="Please enter email"
      }
      if(values.address===""){
        errors.address="Please enter address"
      }
      if(values.contact===""){
        errors.contact="Please enter contact number"
      }
      if(values.status===""){
        errors.status="Please enter status"
      }
      return errors;
    },
    onSubmit :async(values)=>{
      try{
      let lead = await axios.post(`${env.api}/createlead`,values,{headers:{"authorization":window.localStorage.getItem("app-token")}})
     if(lead.status === 200){
        toast.success(lead.data.message,{toastId:"1"})
        Context.setLeadModified(true)
        navigate("/app/leads")
      }
    } 
    catch(error){
   if(error.response.status === 440) navigate("/")
   if(error.response.status === 401) navigate("/app/leads")
   toast.error(error.response.data.message,{toastId:"2"})
    }
    
  }
})
  
  return (
    <div className='container-fluid createbg'>
    <div className='container '>
      <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col-md-6 6 mt-3'>
        <label>Name</label>
        <input className="form-control"  type="text"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        />
        <span style={{color:"red"}}>{formik.errors.name}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>Email</label>
        <input className="form-control" type="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        />
        <span style={{color:"red"}}>{formik.errors.email}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <div className="">
       <label for="exampleFormControlTextarea1" className="form-label mb-0">Address</label>
       <textarea className="form-control" id="exampleFormControlTextarea1" rows="1"
        name="address"
        onChange={formik.handleChange}
        value={formik.values.address}
       ></textarea>
       </div>
       <span style={{color:"red"}}>{formik.errors.address}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>Contact</label>
        <input className="form-control" type="text"
        name="contact"
        onChange={formik.handleChange}
        value={formik.values.contact}
        />
        <span style={{color:"red"}}>{formik.errors.contact}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <div className="mb-3">
       <label for="exampleFormControlTextarea1" className="form-label mb-0">Status description</label>
       <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
       ></textarea>
       </div>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>Status</label>
        <div className="input-group ">
       <select className="form-select" id="inputGroupSelect02"
       name="status"
       onChange={formik.handleChange}
       value={formik.values.status}>
      <option value="New" selected>New</option>
      <option value="Contacted">Contacted</option>
      <option value="Qualified">Qualified</option>
      <option value="Lost">Lost</option>
      <option value="Cancelled">Cancelled</option>
      <option value="Confirmed">Confirmed</option>
      
      </select>
      </div>
        <span style={{color:"red"}}>{formik.errors.status}</span>
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

export default CreateLead

