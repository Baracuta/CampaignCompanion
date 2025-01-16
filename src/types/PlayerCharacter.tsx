import { Entity } from "./Entity";

export interface PlayerCharacter extends Entity{
    id:string;
    type:"PlayerCharacter";
    name?:string;
    description?:string;
    pcClass?:string;
    level?:string;
    playerName?:string;
    notes?:string;
}