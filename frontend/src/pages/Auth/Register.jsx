import React from 'react'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../styles/AuthStyles.css"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

//form function
const handleSubmit = async (e) => {
    e.preventDefault();
      try{
        // const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
        const res = await axios.post("/api/v1/auth/register",
           {name,
            email,
            password,
            phone,
            address,
            answer});
           if(res.data.success){
            toast.success(res.data.message)
            navigate('/login');
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
    <Layout title={"register - to luxora"}>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h4 className="title">REGISTER HERE</h4>
   <div className="mb-3">
    <input type="text" 
    className="form-control"    
    value={name} 
    onChange={(e) => setName(e.target.value)}
    placeholder = "Enter your name" 
    required
    id="exampleInputName1"  />
  </div>
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

    <input type="text" className="form-control" 
    value={phone}
     onChange={(e) => setPhone(e.target.value)}
    placeholder = "Enter your phone no."
    required
    id="exampleInputPhone1" />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" 
    value={address}
     onChange={(e) => setAddress(e.target.value)}
    placeholder = "Enter your address"
    
    id="exampleInputAddress1" />
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" 
    value={answer}
     onChange={(e) => setAnswer(e.target.value)}
    placeholder = " Favorite game (secret question)"
     />
  </div>
  
  <button type="submit" className="btn btn-primary">REGISTER</button>
</form>

        </div>
    </Layout>
  )
}

export default Register