import { Entity } from "./Entity";
import { LocationMap } from "./LocationMap";

export interface Location extends Entity{
    id:string;
    type:"Location";
    name?:string;
    description?:string;
    notes?:string;
    image?:string;
    maps?:Array<LocationMap>;
}