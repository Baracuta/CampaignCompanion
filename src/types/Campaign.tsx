import { NPC } from "./NPC";
import { Location } from "./Location";
import { Item } from "./Item";
import { PlayerCharacter } from "./PlayerCharacter";
import { Entity } from "./Entity";

//For godsake, if there's a way to tell this thing "if undefined, actually just return an empty set" that'd be grand
export type Campaign={
    id:string;
    name?:string;
    game?:string;
    players?:number;
    entities?:Array<Entity>;
    npcs?:Array<NPC>;
    locations?:Array<Location>;
    items?:Array<Item>;
    playerCharacters?:Array<PlayerCharacter>;
}