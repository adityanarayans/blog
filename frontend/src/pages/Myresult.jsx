

export default function Myresult({search})


{   
    return(<> 
          
    <ul>
     { search.map(id => <li> id </li>) }
    </ul>
    </>)
}