 import { useEffect, useState , Suspense ,lazy} from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
const SearchPost = lazy(() => import("./SearchPost"));
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(()=> {
    const fetchData  = async () => {
      try {
       const res = await api.get("/posts")
       console.log(res)
       if(!res || !res.data){
        setPosts([]);
        return ;
       }

       setPosts(res.data.posts|| res.data)
    } catch(error) {
      console.log(error.response|| error.message)
      setPosts([])
    }
   } ;
   fetchData() },[]);
  return (
    <>
      <h2>Course</h2>
      <Suspense  fallback={<h1> loading</h1>} >  
        <SearchPost posts={posts} />
      </Suspense>
      {posts.map((p)=>(
        <div key={p._id}>
          <Link to={`/posts/${p._id}`}>   <h4>{p.title}</h4> </Link>
          <small>{p.username} </small> 
        </div>
      ))}
    </>
  );
}
