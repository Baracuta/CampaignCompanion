import { Campaign } from "../types/Campaign"

type compProps={
    campaign:Campaign;
}

function EntityList(props:compProps){

    return [
        ...(props.campaign.npcs ?? []),
        ...(props.campaign.locations ?? []),
        ...(props.campaign.items ?? []),
        ...(props.campaign.playerCharacters ?? [])
    ]
}


export default EntityList