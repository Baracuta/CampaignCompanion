import { Campaign } from "../types/Campaign"

type compProps={
    thing:Campaign;
}

function EntityList(props:compProps){

    const campaign={props.thing}

    return [
        ...{props.campaign.npcs ?? []},
        ...{props.campaign.locations ?? []},
    ]
}


export default EntityList