import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { env } from './config';

function Page() {

  let formik=useFormik({
    initialValues:{
      name:"",
      email:"",
      contact:""  
    },
    validate:(values)=>{
      let errors={};
      if(values.name===""){
        errors.name="Please enter your name"
      }
      if(values.email===""){
        errors.email="Please enter email"
      }
      if(values.contact===""){
        errors.contact="Please enter contact number"
      }
      return errors;
    },
    onSubmit :async(values)=>{
      try{
      let enquiry = await axios.post(`${env.api}/enquiry`,values)
     alert(enquiry.data.message)
      
    } 
    catch(error){
        
   alert(error.response.data.message)
    }
    
  }
})
  return (
    <div className="container-fluid bg-primary divbg">
    <div className="container ">
      <div className="row">
        <div className="col-md-8 mt-5 mb-5">
            <h1 className='head'>CLIENT SATISFACTION</h1>
            <h1 className='head'>IS OUR GOAL.</h1>
            <h2 className='head'>Go for it.....!!!</h2>
            <h3>Bring the very best out of your customer-facing teams with robust automation, comprehensive analytics, personalized solutions, and more. Sign up and 
              get started in no time—the fastest implementation in the enterprise CRM market.</h3>
        </div>
        <div className="col-md-4 mt-5">
       
      
        </div>
      </div>
    </div>
  </div>

  )
}

export default Page