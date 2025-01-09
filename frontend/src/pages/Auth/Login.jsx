
import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate ,useLocation} from 'react-router-dom';
import axios from "axios";
import "../../styles/AuthStyles.css"
import { useAuth } from '../../context/auth';

function Login() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [auth, setAuth] = useAuth();
      const navigate = useNavigate();
      const location =useLocation();
      //form function
const handleSubmit = async (e) => {
    e.preventDefault();
      try{
        // const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
        const res = await axios.post("/api/v1/auth/login",
           {email,password});
           if(res.data.success){
            toast.success(res.data.message);
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            })
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || '/');
           }else{
            toast.error(res.data.message)
           }
      }
      catch(error){
        console.log(error);
        toast.error("Something went wrong");
      }
        
      }

  return (
    <Layout title={"login - to luxora"}>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <h4 className="title">LOGIN HERE</h4>
      
       <div className="mb-3">
        <input type="email" 
        className="form-control" 
        value={email}
         onChange={(e) => setEmail(e.target.value)}
        placeholder = "Enter your email"
        required
        id="exampleInputEmail1"  />
      </div>
      <div className="mb-3">
        <input type="password" className="form-control"
        value={password}
         onChange={(e) => setPassword(e.target.value)}
        placeholder = "Enter password"
        
        id="exampleInputPassword1" />
      </div>
      
      
      <div className="mb-3">
        
      <button type="submit" className="btn btn-primary"
      onClick={()=>{navigate('/forgot-password')}} >
        FORGOT PASSWORD</button>
      </div>

      <button type="submit" className="btn btn-primary">LOGIN</button>
    </form>
    
            </div>
        </Layout>
  )
}

export default Login
