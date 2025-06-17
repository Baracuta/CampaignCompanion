import { NPC } from "./NPC";
import { Location } from "./Location";
import { Item } from "./Item";
import { PC } from "./PlayerCharacter";
import { Entity } from "./Entity";

export type Campaign = {
  id: string;
  name?: string;
  game?: string;
  players?: number;
  entities?: Array<Entity>;
  npcs?: Array<NPC>;
  locations?: Array<Location>;
  items?: Array<Item>;
  playerCharacters?: Array<PC>;
};
