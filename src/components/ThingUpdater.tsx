import { updateNPC, updateLocation, updateItem, updatePC, deleteNPC, deleteLocation, deleteItem, deletePC } from "../services/CampaignService";
import { Entity } from "../types/Entity";
import { Item } from "../types/Item";
import { Location } from "../types/Location";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";


export const updateThing = (id: string, thing: Entity) => {
    if (thing.type === "NPC") {
        return updateNPC(id as string, thing as NPC)
    }
    if (thing.type === "Location") {
        return updateLocation(id as string, thing as Location)
    }
    if (thing.type === "Item") {
        return updateItem(id as string, thing as Item)
    }
    if (thing.type === "PC") {
        return updatePC(id as string, thing as PC)
    }
}

export const deleteThing = (id: string, thing: Entity) => {
    if (thing.type === "NPC") {
        return deleteNPC(id as string, thing.id)
    }
    if (thing.type === "Location") {
        return deleteLocation(id as string, thing.id)
    }
    if (thing.type === "Item") {
        return deleteItem(id as string, thing.id)
    }
    if (thing.type === "PC") {
        return deletePC(id as string, thing.id)
    }
}