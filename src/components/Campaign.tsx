import { useParams } from "react-router-dom";

function Campaign(){
    const params=useParams();

    const id1=params.id1;
    const id2=params.id2;
    const id3=params.id3;

    return((
        <div>
            <h1>(id1) / (id2) / (id3)</h1>
        </div>
    ))
}

export default Campaign

export type Campaign={
    id:number;
    name:string;
}