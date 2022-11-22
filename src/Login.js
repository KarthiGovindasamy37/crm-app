import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { env } from "./config";
import context from "./Context"

function Login() {

  let Context=useContext(context)
  let navigate=useNavigate()

let formik=useFormik({
  initialValues:{
    email:"",
    password:""
  },
  validate:(values)=>{
    let errors={};
    if(formik.values.email===""){
      errors.email="Please enter email id"
    }
    if(formik.values.password===""){
      errors.password="Please enter password"
    }
    return errors;
  },
  onSubmit:async(values)=>{
    try {
      
     let userdata = await axios.post(`${env.api}/login`,values)
      if(userdata.status===200){
        window.localStorage.setItem("app-token",userdata.data.token)
        window.localStorage.setItem("app-role",userdata.data.role)
        Context.setMakeApi(true);
        Context.setMdata(true);
        navigate("/app/page")
    }
     } catch (error) {
      alert(error.response.data.message)
    }
  }
})

  return (
    <div className="container-fluid bg">
      <div className="row">
        <div className=" d-flex justify-content-center">
          <div className="signin col col-sm-8 col-md-6 col-lg-4 mt-5  mb-5">
            <div className="container">
              <div className="text-center mt-3">
                <h2>EPIC CRM</h2>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3 mt-3">
                  <label for="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <span style={{color:"red"}}>{formik.errors.email}</span>
                </div>
                <div className="mb-3 mt-3">
                  <label for="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <span style={{color:"red"}}>{formik.errors.password}</span>
                </div>
                <div className="d-flex justify-content-center mt-5">
                  <button type="submit" disabled={!formik.isValid} className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="d-flex justify-content-end mt-4 mb-3">
                <h6>
                  <Link to="/forgot">Forgot password?</Link>
                </h6>
              </div>
              <h4>For validation</h4>
              <h6>Role--Email--Password</h6>
              <h6>Admin--karthi@gmail.com--karthi</h6>
              <h6>Manager--mohan@gmail.com--mohan</h6>
              <h6>Employee with access--mahesh@gmail.com--mahesh</h6>
              <h6>Employee without access--dharun@gmail.com--dharun</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
