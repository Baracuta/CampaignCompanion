import { useNavigate } from "react-router-dom";

function HomeButton(){
    const navigate=useNavigate();

    return(
        <button onClick={()=>{navigate("/");}}>

        </button>
    )
}

export default HomeButton