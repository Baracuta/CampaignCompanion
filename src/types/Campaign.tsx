import { NPC } from "./NPC";
import { Location } from "./Location";
import { Item } from "./Item";
import { PlayerCharacter } from "./PlayerCharacter";


export type Campaign={
    id:string;
    name?:string;
    game?:string;
    players?:number;
    npcs?:Array<NPC>;
    locations?:Array<Location>;
    items?:Array<Item>;
    playerCharacters?:Array<PlayerCharacter>;
}