import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "./config";

 export let context=createContext()


export let Provider=({children})=>{
    
    let[makeApi,setMakeApi]=useState(false)
    let[mdata,setMdata]=useState(false)

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
        if(makeApi === true && mdata === true){  
        loadUsers();
        loadLeads();
        loadServices();
        setMdata(false); 
        }
         },[mdata])

    useEffect(()=>{
            if(makeApi === true && userModified === true){
                loadUsers();
                setUserModified(false)
            }
         },[userModified])

    useEffect(()=>{
            if(makeApi === true && leadModified === true){
                loadLeads();
                setLeadModified(false)
            }
         },[leadModified])

    useEffect(()=>{
            if(makeApi === true && serviceModified === true){
                loadServices();
                setServiceModified(false)
            } 
         },[serviceModified])
     

     
    let loadUsers=async()=>{
        try
        {
        setUserLoading(true)
       let users=await axios.get(`${env.api}/users`,{headers:{"authorization":window.localStorage.getItem("app-token"),
       "role":window.localStorage.getItem("app-role")}});
      
        if(users.status==200){
            setUsers(users.data);
            setUserLoading(false)
        }else{
            alert(users.data.message)
        }
       
    
    }catch(error){
     
      alert(error.response.data.message)
      if(error.response.status==440) {
        navigate("/")
       }
    }
}

    let loadLeads=async()=>{
    try {
      setLeadLoading(true)
      let lead=await axios.get(`${env.api}/lead`,{headers:{"authorization":window.localStorage.getItem("app-token"),
      "role":window.localStorage.getItem("app-role")}})
      if(lead.status=200){
      setLeads(lead.data)
      setLeadLoading(false)
      }else{
          alert(lead.data.message)
      }
      
    } catch (error) {
      alert(error.response.data.message)
      if(error.response.status==440) {
        navigate("/")
       }
    }
}

    let loadServices=async()=>{
    try {
        setServiceLoading(true)
      let service=await axios.get(`${env.api}/service`,{headers:{"authorization":window.localStorage.getItem("app-token"),
      "role":window.localStorage.getItem("app-role")}})
      if(service.status==200){
        setServices(service.data)
        setServiceLoading(false)
        
      }else{
        alert(service.data.message)
      }
      
    
    } catch (error) {
      alert(error.response.data.message)
      if(error.response.status==440) {
        navigate("/")
       }
    }
}


    return(
    <context.Provider value={{users,setUsers,userLoading,leads,setLeads,leadLoading,
    services,setServices,serviceLoading,setUserModified,setLeadModified,setServiceModified,
    setMdata,setMakeApi}}>
        {children}
    </context.Provider>
    )
}
export default context;