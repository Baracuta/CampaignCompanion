import { Entity } from "./Entity";

export interface PlayerCharacter extends Entity{
    type:"PlayerCharacter";
    pcClass?:string;
    level?:string;
    playerName?:string;
}