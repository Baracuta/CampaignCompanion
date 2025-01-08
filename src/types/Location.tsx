import { Entity } from "./Entity";

export interface Location extends Entity{
    id:string;
    type:"Location";
    name?:string;
    description?:string;
    notes?:string;
    maps?:string;
}