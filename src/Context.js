import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "./config";
import { toast } from "react-toastify";

 export let context=createContext()


export let Provider=({children})=>{
    
   

    let[users,setUsers]=useState([])
    let[userLoading,setUserLoading]=useState(false)
    let[userModified,setUserModified]=useState(false)

    let[leads,setLeads]=useState([])
    let[leadLoading,setLeadLoading]=useState(false)
    let[leadModified,setLeadModified]=useState(false)

    let[services,setServices]=useState([])
    let[serviceLoading,setServiceLoading]=useState(false)
    let[serviceModified,setServiceModified]=useState(false)

    let navigate=useNavigate()
    

    

    useEffect(()=>{
            if(userModified === true){
                loadUsers();
                
            }
         },[userModified])

    useEffect(()=>{
      if(leadModified === true){
                loadLeads();
                
      }  
         },[leadModified])

    useEffect(()=>{
            if(serviceModified === true){
                loadServices();
                
            } 
         },[serviceModified])
     

     
    let loadUsers=async()=>{
        try
        {
        setUserLoading(true)
        
       let users=await axios.get(`${env.api}/users`,{headers:{"authorization":window.localStorage.getItem("app-token")}});
      
        if(users.status === 200){
            setUsers(users.data);
            setUserLoading(false)
            setUserModified(false)
        }       
    
    }catch(error){
      if(error.response.status === 440) {
        navigate("/")
        setUserModified(false)
       }
      toast.error(error.response.data.message,{toastId:Math.random()})
      
    }
}

    let loadLeads=async()=>{
    try {
      setLeadLoading(true)
      let lead=await axios.get(`${env.api}/lead`,{headers:{"authorization":window.localStorage.getItem("app-token")}})
      if(lead.status === 200){
      setLeads(lead.data)
      setLeadLoading(false)
      setLeadModified(false)
      }
      
    } catch (error) {
      if(error.response.status === 440) {
        navigate("/")
        setLeadModified(false)
       }
      toast.error(error.response.data.message,{toastId:Math.random()})
      
    }
}

    let loadServices=async()=>{
    try {
        setServiceLoading(true)
      let service=await axios.get(`${env.api}/service`,{headers:{"authorization":window.localStorage.getItem("app-token")}})
      if(service.status === 200){
        setServices(service.data)
        setServiceLoading(false)
        setServiceModified(false)
        
      }
    
    } catch (error) {
      if(error.response.status === 440) {
        navigate("/")
        setServiceModified(false)
       }
      toast.error(error.response.data.message,{toastId:Math.random()})
      
    }
}


    return(
    <context.Provider value={{users,setUsers,userLoading,leads,setLeads,leadLoading,
    services,setServices,serviceLoading,setUserModified,setLeadModified,setServiceModified}}>
        {children}
    </context.Provider>
    )
}
export default context;