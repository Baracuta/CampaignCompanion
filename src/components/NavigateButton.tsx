import { useNavigate } from "react-router-dom";

type NavigateButtonProps={
    text:string;
    destination:string;
}

//A simple button to return the used to the splash screen. May have different functionality in the future.
function NavigateButton(props:NavigateButtonProps){
    const navigate=useNavigate();

    return(
        <button onClick={()=>{navigate(props.destination);}}>
            (props.text)
        </button>
    )
}

export default NavigateButton