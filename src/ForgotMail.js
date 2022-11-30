import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import { env } from "./config";
import { toast } from 'react-toastify'

function ForgotMail() {
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      let errors = {};
      if (formik.values.email == "") {
        errors.email = "Please enter email id";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        let user=await axios.post(`${env.api}/forgot`, values,{headers:{"authorization":window.localStorage.getItem("app-token"),
                                                                        "role":window.localStorage.getItem("app-role")}});
        toast.info(user.data.message,{toastId:"17"})
    } catch (error) {
      
        toast.error(error.response.data.message,{toastId:"18"})
      }
    },
  });

  return (
    <div className="container-fluid ebg">
      <div className="row">
        <div className=" d-flex justify-content-center mt-5 pt-5">
          <div className="signin col col-sm-8 col-md-6 col-lg-4 mt-5 ">
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
                <div className="d-flex justify-content-center mt-5 mb-3">
                  <button type="submit" disabled={!formik.isValid} className="btn btn-primary">Submit</button>
                </div>
              </form>
              <div className="d-flex justify-content-end mt-4 mb-2">
                <h6>
                  <Link to="/temp">Temporary password</Link>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotMail;
