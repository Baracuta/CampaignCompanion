import { Campaign } from "../types/Campaign";
import { Entity } from "../types/Entity";

function EntityList(campaign: Campaign) {
  return [
    ...(campaign?.npcs ?? []),
    ...(campaign?.locations ?? []),
    ...(campaign?.items ?? []),
    ...(campaign?.playerCharacters ?? []),
  ] as Array<Entity>;
}

export default EntityList;
