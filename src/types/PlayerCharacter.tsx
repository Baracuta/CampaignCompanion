import { Entity } from "./Entity";

export interface PlayerCharacter extends Entity{
    type:"PC";
    pcClass?:string;
    level?:string;
    playerName?:string;
}