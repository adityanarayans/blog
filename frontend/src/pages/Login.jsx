 import { useContext, useState } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
      nav("/");
    } catch (error) {
      alert("Login failed: " + (error.response?.data?.message || error.message));
    }
    
  };

  return (
    <>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input placeholder="Password" type="password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button onClick={submit}>Login</button>
    </>
  );
}
