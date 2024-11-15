import { useNavigate } from "react-router-dom";

type CardProps={
    name:string;
    id?:string;
    background?:string;
    className?:string;
    cardLink:string;
}

function Card(props:CardProps){
    const navigate=useNavigate();

    return(

        <div className={props.className}
        style={{background:(props.background)}}
        onClick={()=>{navigate(props.cardLink);}}>
            {props.name}
        </div>

    );

}

export default Card