import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";




export default function CreateEdit() {
  const { id } = useParams();
  const [post,setPost] = useState({ title:"", imageURL:"", content:"" });
  const nav = useNavigate();

  useEffect(()=>{
    if(id) api.get(`/posts/${id}`).then(r=>setPost(r.data)).catch(e=>console.error(e));
  },[id]);

  const save = async ()=>{
    try {
      if(id) await api.put(`/posts/${id}`, post);
      else await api.post("/posts", post);
      nav("/");
    } catch (error) {
      alert("Save failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <>
      <h2>{id ? "Edit" : "Create"} Post</h2>
      <label htmlFor = "title"> Title</label>
      <input id= "title" name = "title" value={post.title} onChange={e=>setPost({...post,title:e.target.value})}/>
      <label htmlFor = "image"> image url</label>
      <input id ="image" name = "image" value={post.imageURL} onChange={e=>setPost({...post,imageURL:e.target.value})}/>
     
      <textarea name="content" placeholder=" write your blog here" value={post.content} onChange={e=>setPost({...post,content:e.target.value})}/>
      <button onClick={save}>Save</button>
    </>
  );
}
