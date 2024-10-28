
type CardProps={
    text:string;
    id?:string;
}

function Card(props:CardProps){

    return(

        <div>
            
            {props.text};
        </div>

    );

}

export default Card