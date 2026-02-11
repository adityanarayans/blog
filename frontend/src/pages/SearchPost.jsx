import { useState, useEffect } from "react";
import api from "../api/axios";
function SearchPost(props) {
  const [title, setTitle] = useState("");

    
   


   const searchPost = async () => {
     try {
       if (!title) return;
      const r = await api.get("posts/searchpost", {
       params: { title },
     });
     console.log("Res :", r.data);
   } catch (error) {
     console.log("error : ", error);
    }
   };

 

  return (
    <>
      <form onClick={searchPost}>
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="search your article"
          value={title}
        />
        <input type="button" value="search" />
      </form>
    </>
  );
}

export default SearchPost;
