
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import CreateEdit from "./pages/Createedit";
import MyPosts from "./pages/MyPosts";
import ProtectedRoute from "./components/ProtectedRoutes";
import Foot from "./pages/Foot"
import "./App.css";



export default function App(){
  return(<div  className= "app">
    
    
      <BrowserRouter>
      <header> 
         <Navbar/>
      </header>
        <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts/:id" element={<PostDetail/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create" element={<ProtectedRoute><CreateEdit/></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><CreateEdit/></ProtectedRoute>} />
          <Route path="/me" element={<ProtectedRoute><MyPosts/></ProtectedRoute>} />
        </Routes>
        </main>

        <footer>
           <Foot />
        </footer>
      </BrowserRouter>

  </div>);
}

