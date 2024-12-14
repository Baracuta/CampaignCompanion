//This component is going to be the actual pop-open window that appears on-screen when an entity card is clicked.
//If you click on an NPC, it'll present the npc stuff. If you click on a location, it'll present the location stuff.
//Going to make this one strictly for NPCs for the time being, and if it turns out that there's a way to make one component function to provide for all 4 entity types, then we'll do that.

type DisplayProps={
    name?:string;
    description?:string;
    notes?:string;
    image?:string;
}

function NPCDisplay(props:DisplayProps){
    
}