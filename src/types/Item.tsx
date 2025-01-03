import { Entity } from "./Entity";

export interface Item extends Entity{
    id:string;
    name?:string;
    description?:string;
    type?:string;
    effect?:string;
}