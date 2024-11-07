
type CardProps={
    name:string;
    id?:string;
    background?:string;
    className?:string;
}

function Card(props:CardProps){

    return(

        <div className={props.className}>
            <img src={props.background} alt=""/>
            {props.name}
        </div>

    );

}

export default Card