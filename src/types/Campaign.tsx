import { NPC } from "./NPC";


export type Campaign={
    id:string;
    name?:string;
    game?:string;
    players?:number;
    npcs?:Array<NPC>;
}