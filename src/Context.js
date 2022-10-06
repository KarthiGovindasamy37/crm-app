import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "./config";

 let context=createContext()


export let UserProvider=({children})=>{
     
    let[mdata,setmdata]=useState(0)

    let[user,setusers]=useState([])
    let[loading,setloading]=useState(false)
    let navigate=useNavigate()

    

    useEffect(()=>{
        loadusers();
        setmdata(0)
         },[mdata])
     

     
    let loadusers=async()=>{
        try
        {
        setloading(true)
       let users=await axios.get(`${env.api}/users`,{headers:{"authorization":window.localStorage.getItem("app-token"),
       "role":window.localStorage.getItem("app-role")}});
      
        if(users.status==200){
            setusers(users.data);
            setloading(false)
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


    return(
    <context.Provider value={{user,setusers,setmdata,loading,mdata}}>
        {children}
    </context.Provider>
    )
}





export default context;