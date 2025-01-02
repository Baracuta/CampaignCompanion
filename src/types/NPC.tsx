import { Entity } from "./Entity";

export interface NPC extends Entity{
    id:string;
    name?:string;
    description?:string;
    notes?:string;
    image?:string;
}