import { ASSETS_PATH } from '../constants/assets_path';
import styles from '../css_modules/addthing.module.css'
import { useNavigate } from "react-router-dom";

type ThingProps={
    formLink:string;
}

//Set it up to have a similar style to a card, but with unique properties
function AddThing(props:ThingProps){
    const navigate=useNavigate();

    return(
        <div className={styles.add_thing}

        onClick={()=>{navigate(props.formLink);}}>

            <img src={`${ASSETS_PATH}/health-normal.png`}/>

        </div>
       
    )
}

export default AddThing