import { useState, useEffect } from "react";
import { getItem, getLocation, getNPC, getPC, updateItem, updateLocation, updateNPC, updatePC } from "../services/CampaignService";
import { Entity } from "../types/Entity";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";

export const useUpdate = (id: string, thing: Entity) => {
  const [entity, setEntity] = useState<Entity>();

  useEffect(() => {
    if (thing.type === "NPC") {
      getNPC(id as string, thing.id).then((entity) => {
        setEntity(entity);
      });
      updateNPC(id as string, entity as NPC)
    }
    if (thing.type === "Location") {
        getLocation(id as string, thing.id).then((entity) => {
          setEntity(entity);
        });
        updateLocation(id as string, entity as Location)
    }
    if (thing.type === "Item") {
        getItem(id as string, thing.id).then((entity) => {
          setEntity(entity);
        });
        updateItem(id as string, entity as Item)
    }
    if (thing.type === "PC") {
        getPC(id as string, thing.id).then((entity) => {
          setEntity(entity);
        });
        updatePC(id as string, entity as PC)
    }
  }, [thing.id, thing.type, id, entity]);

  return {
    entity: entity as Entity,

  };
};
