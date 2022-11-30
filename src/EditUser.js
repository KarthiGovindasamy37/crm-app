import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import "./App.css"
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { env } from './config';
import context from './Context';
import { toast } from 'react-toastify'

function EditUser() {

  let Context=useContext(context)
  let navigate=useNavigate()
  let params=useParams()
  let[loading,setloading]=useState(false)

  useEffect(()=>{
    loaduser()
  },[])

  let loaduser=async()=>{
    try {
      setloading(true)
        let user=await axios.get(`${env.api}/user/${params.id}`,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                             "role":window.localStorage.getItem("app-role")}})
 if(user.status==200){
  setloading(false)
    formik.setValues({
        firstname:user.data.firstname,
        lastname:user.data.lastname,
        email:user.data.email,
        role:user.data.role,
        access:user.data.access 
    })
 }else{
    toast.info(user.data.message,{toastId:"13"})    
}
    } catch (error) {
        
     toast.error(error.response.data.message,{toastId:"14"})   
    }
 }
 
  let formik=useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      email:"",
      role:"",
      access:""
    },
    validate:(values)=>{
      let errors={};
      if(values.firstname===""){
        errors.firstname="Please enter firstname"
      }
      if(values.lastname===""){
        errors.lastname="Please enter lastname"
      }
      if(values.email===""){
        errors.email="Please enter email id"
      }
      if(values.role===""){
      errors.role="Please select role"
      }
      
      return errors;
    },
    onSubmit :async(values)=>{
      try{
      let user = await axios.put(`${env.api}/edituser/${params.id}`,values,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                           "role":window.localStorage.getItem("app-role")}})
     toast.success(user.data.message,{toastId:"15"})
      if(user.status==200){
      formik.setValues({
        firstname:"",
      lastname:"",
      email:"",
      role:"",
      access:""
      })
      Context.setUserModified(true)
      navigate("/app/users")

    }
    } 
    catch(error){
        toast.error(error.response.data.message,{toastId:"16"})
    }
    
  }
})
  
  return (
    <div>
    {
      loading ? <div style={{height:"400px"}} className="d-flex justify-content-center align-items-center">
      <div  className="spinner-border text-primary" role="status">
      </div>
    </div> :
    <div className='container-fluid createbg'>
    <div className='container '>
      <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col-md-6 6 mt-3'>
        <label>First Name</label>
        <input className="form-control"  type="text"
        name="firstname"
        onChange={formik.handleChange}
        value={formik.values.firstname}
        />
        <span style={{color:"red"}}>{formik.errors.firstname}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>Last Name</label>
        <input className="form-control" type="text"
        name="lastname"
        onChange={formik.handleChange}
        value={formik.values.lastname}
        />
        <span style={{color:"red"}}>{formik.errors.lastname}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>User Name</label>
        <input className="form-control" type="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        />
        <span style={{color:"red"}}>{formik.errors.email}</span>
        </div>
        <div className='col-md-6 6 mt-3'>
        <label>Role</label>
        <div className="input-group ">
       <select className="form-select" id="inputGroupSelect02"
       name="role"
       onChange={formik.handleChange}
       value={formik.values.role}>
      <option value="Admin" selected>Admin</option>
      <option value="Manager">Manager</option>
      <option value="Employee">Employee</option>
     
      </select>
      </div>
        <span style={{color:"red"}}>{formik.errors.role}</span>
        </div>
       
        <div className=' col-md-6 mt-3 '>
        <label>If role is employee mention access to edit</label>
        <div className="input-group ">
       <select className="form-select" id="inputGroupSelect02"
       name="access"
       onChange={formik.handleChange}
       value={formik.values.access}>
      <option value="true" selected>true</option>
      <option value="false">false</option>
      
      </select>
      </div>
        </div>
        </div>
        <div className=' d-flex justify-content-center mt-3 '>
        <input style={{width:"300px "}} className='btn btn-primary mt-2' type="submit" value="submit"
        disabled={!formik.isValid}/>
      </div>
      
      </form>
      </div>
      </div>
    }
      </div>
    )
}

export default EditUser