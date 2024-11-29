import { useNavigate } from "react-router-dom";
import styles from '../css_modules/card.module.css'

type CardProps={
    name?:string;
    id?:string;
    background?:string;
    cardType?:`bigCard`|`smallCard`|`campaignCard`;
    cardLink:string;
}

function Card(props:CardProps){
    const navigate=useNavigate();

    let divClass=(styles.card)
    if (props.cardType !=null){
        divClass=`${divClass} ${styles[props.cardType]}`;
    }

    return(

        <div className={divClass}
        style={{background:(props.background)}}

        onClick={()=>{navigate(props.cardLink);}}>
            
            <p>{props.name}</p>
            
        </div>

    );
}

export default Card