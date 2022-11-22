import { useFormik } from 'formik'
import React, { useContext } from 'react'
import "./App.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { env } from './config';
import context from './Context';

function CreateUser() {

  let Context=useContext(context)
  let navigate=useNavigate()
  let formik=useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      email:"",
      role:"",
      password:"",
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
      if(values.password===""){
        errors.password="Please enter password"
      }
      
      
      
      return errors;
    },
    onSubmit :async(values)=>{
      try{
      let user = await axios.post(`${env.api}/createuser`,values,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                           "role":window.localStorage.getItem("app-role")}})
     alert(user.data.message)
      if(user.status==200){
      formik.setValues({
        firstname:"",
      lastname:"",
      email:"",
      role:"",
      password:"",
      access:""
      })
      Context.setUserModified(true)
      navigate("/app/users")

    }
    } 
    catch(error){
   alert(error.response.data.message)
    }
    
  }
})
  
  return (
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
        <div class="input-group ">
       <select class="form-select" id="inputGroupSelect02"
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
        <div className='col-md-6 mt-3 '>
        <label>Password</label>
        <input className='form-control' type="text"
        name="password"
        onChange={formik.handleChange}
        value={formik.values.password}/>
        <span style={{color:"red"}}>{formik.errors.password}</span>
        </div>
       
        <div className=' col-md-6 mt-3 '>
        <label>If role is employee mention access to edit</label>
        <div class="input-group ">
       <select class="form-select" id="inputGroupSelect02"
       name="access"
       onChange={formik.handleChange}
       value={formik.values.access}>
      <option value="true" selected>true</option>
      <option value="false">false</option>
      
      </select>
      </div>
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

export default CreateUser