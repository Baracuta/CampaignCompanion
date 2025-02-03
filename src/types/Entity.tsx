export interface Entity {
    type: "NPC"|"Location"|"Item"|"PlayerCharacter";
    id:string;
    name?:string;
    description?:string;
    notes?:string;
    image?:string;
    isfavourite?:boolean;
}