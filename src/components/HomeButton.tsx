import { useNavigate } from "react-router-dom";

//A simple button to return the used to the splash screen. May have different functionality in the future.
function HomeButton(){
    const navigate=useNavigate();

    return(
        <button onClick={()=>{navigate("/");}}>
            Return to Splash Screen
        </button>
    )
}

export default HomeButton