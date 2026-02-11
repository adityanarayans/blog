import { useEffect, useState  } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import   SearchMyPost  from  "./SearchmyPost";
import {createPortal}  from "react-dom";




export default function MyPosts(){
  const [posts,setPosts] = useState([]);
   
  const portalview = document.getElementById("root1")

  useEffect(()=>{
    api.get("/posts/me").then(r=>setPosts(r.data)).catch(e=>console.error(e));
  },[]);

  return createPortal(
    <div  >
      <h2>My Posts</h2>
      <SearchMyPost posts ={ posts}  />
      <ul>
      {posts.map(p=>(
        <li key={p._id}>
        <Link to={`/posts/${p._id}`} key={p._id}>{p.title}</Link>
        </li>
      ))}
      </ul>
    </div>
    , portalview );
}


