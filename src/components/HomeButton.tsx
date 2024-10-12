import { useNavigate } from "react-router-dom";

function HomeButton(){
    const navigate=useNavigate();

    return(
        <button onClick={()=>{navigate("/");}}>
            Return to Splash Screen
        </button>
    )
}

export default HomeButton