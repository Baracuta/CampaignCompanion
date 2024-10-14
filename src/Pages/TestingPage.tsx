import { useNavigate } from "react-router-dom"
import HomeButton from "../components/HomeButton"

//This is a page used for testing purposes.
function TestPage(){
    const navigate=useNavigate();
    return((
        <div>

            <h1>Testing!</h1>
            <HomeButton/>
            <button onClick={()=>navigate("/campaign-list")}>Campaign List</button>
        </div>
    ))
}

export default TestPage