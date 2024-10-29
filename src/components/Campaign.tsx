import { useParams } from "react-router-dom";

export type Campaign={
    id:number;
    name:string;
    game?:string;
}


export const getCampaigns = async (): Promise<Campaign[]> => {
    return[
        {
            id:1,
            name: 'Campaign 1',
        },
        {
            id:2,
            name: 'Campaign 2',
        },
        {
            id:3,
            name: 'Campaign 3',
        }
    ]
}