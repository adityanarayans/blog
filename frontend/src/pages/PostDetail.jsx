import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const nav = useNavigate();

  {console.log(`user ${user?.id}`)} 
          {console.log(post?.data?.username)}

  useEffect(()=>{
    const postDetails = async() => {
      try {
        const res =  await api.get(`/posts/${id}`)
          console.log(res)
        if(!res) {
          setPost(null)
        }
        setPost(res)
      }
       catch (error) {
            console.log(error)  
            setPost(null)
       }
  }; postDetails()},[id]);

  const del = async () => {
    await api.delete(`/posts/${id}`);
    nav("/");
  };
    if(!post) return null;

  return (
    <>
      <h2>{post?.data?.title}</h2>
      {post?.data?.imageURL && <img src={post?.data?.imageURL} width="300" />}
      <p>{post?.data?.content}</p>
      {user?.id === post?.data?.username && (
        <>
         
          <button onClick={()=>nav(`/edit/${id}`)}>Edit</button>
          <button onClick={del}>Delete</button>
        </>
      )}
    </>
  );
}
