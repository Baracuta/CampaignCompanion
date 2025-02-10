import { Campaign } from "../types/Campaign"
import { Entity } from "../types/Entity";

type compProps={
    campaign:Campaign;
}

function EntityList(props:compProps){

    return [
        ...(props.campaign.npcs ?? []),
        ...(props.campaign.locations ?? []),
        ...(props.campaign.items ?? []),
        ...(props.campaign.playerCharacters ?? [])
    ] as Array<Entity>
}


export default EntityList