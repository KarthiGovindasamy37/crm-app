import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { env } from './config'
import { toast } from 'react-toastify'

function TemporaryPass() {

  let navigate=useNavigate()
  let formik=useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validate:(values)=>{
      let errors={}
      if(formik.values.email==""){
        errors.email="Please enter email"
      }
      if(formik.values.password==""){
        errors.password="Please enter temporary password"
      }
      return errors;
    },
    onSubmit:async(values)=>{
      try {
        let info = await axios.post(`${env.api}/temporarypass`,values,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                              "role":window.localStorage.getItem("app-role")}})
       if(info.status === 200){
          toast.success(info.data.message,{toastId:"28"})
          navigate("/reset")
        formik.setValues({
          email:"",
          password:""
        })
      }
      } catch (error) {
        
        toast.error(error.response.data.message,{toastId:"29"})
      }
    }
  })
  return (
    <div className="container-fluid pbg">
        <div className="row">
        <div className=" d-flex justify-content-center mt-5 pt-5">
           
            <div className="signin col col-sm-8 col-md-6 col-lg-4 mt-5 ">
                <div className="container">
                <div className="text-center mt-3">
                    <h2>EPIC CRM</h2>
                </div>
                <form onSubmit={formik.handleSubmit}>
                   <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" 
                        id="email" 
                        onChange={formik.handleChange}
                        value={formik.values.email}/>
                        <span style={{color:"red"}}>{formik.errors.email}</span>
                      </div>
                    <div className="mb-3 mt-3">
                        <label for="password" className="form-label">Temporary password</label>
                        <input type="text" className="form-control" 
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}/>
                        <span style={{color:"red"}}>{formik.errors.password}</span>
                      </div>
                      <div className="d-flex justify-content-center mt-5 mb-3">
                        <button type='submit' disabled={!formik.isValid} className="btn btn-primary">Submit</button>
                      </div>
                </form>
                
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default TemporaryPass