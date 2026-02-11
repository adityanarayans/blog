 import{useEffect , useState, useTransition}   from  "react";
import MyPosts from "./MyPosts";
 import Myresult from "./Myresult";


 export default  function SearchMyPost({posts}) {
      const[type , setType] =  useState("");
      const[pending, startTransition]= useTransition()
      const[search  ,   setSearch]  =  useState([]);
      const[ isSelecting , setIsSelecting]  =  useState(false);
      const[submitted , setSubmitted] = useState(false);
     
           useEffect(  () =>{
             if(isSelecting){
                setIsSelecting(false);
                return;
            }
            if(!type.trim()){
                setSearch([]);
                  return ;
            }
           
        const result = posts.filter((p) =>
      p.title.toLowerCase().includes(type.toLowerCase()) )
         setSearch(result)
      } ,[type, posts]);
    

    const searching =(e) =>{
        console.log("djjj")
        e.preventDefault()
     setSubmitted(true)
    }


      return(<div  style = {{ position:"relative"}}>

     {submitted && (<Myresult search = {search} />)}

              <form onSubmit = {searching}>
                  <input  type ="text" value= {type} onChange ={ (e) => setType(e.target.value)}  />
                  <input type= "submit"  value ="submit" />
                  </form>

  {search.length > 0 && (
    <ul
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        border: "1px solid #ccc",
        background: "#fff",
        listStyle: "none",
        margin: 0,
        padding: 0,
        zIndex: 10
      }}
    >
      {search.map((p) => (
        <li
          key={p._id}
          style={{
            padding: "8px",
            cursor: "pointer"
          }}
          onClick={() => {
              setSearch([]); 
            setType(p.title); 
            setIsSelecting(true);
            
          }}
        >
          {p.title}
        </li>
      ))}
    </ul>
  )}

 
            </div>)}
