import { Entity } from "./Entity";

export interface PC extends Entity{
    type:"PC";
    pcClass?:string;
    level?:string;
    playerName?:string;
}