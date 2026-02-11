import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";




export default function Register() {
  const [form, setForm] = useState({ username:"", email:"", password:"" });
  const nav = useNavigate();

  const submit = async () => {
    try {
      await api.post("/auth/register", form);
      nav("/login");
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

 
  return (
    <>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e)=>setForm({...form,username:e.target.value})}/>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Register</button>
    </>
  );
}
