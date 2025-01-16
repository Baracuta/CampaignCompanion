import { Entity } from "./Entity";

export interface Item extends Entity{
    id:string;
    type:"Item";
    name?:string;
    description?:string;
    notes?:string;
    effect?:string;
    category?:string;
}