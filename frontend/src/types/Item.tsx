import { Entity } from "./Entity";

export interface Item extends Entity {
  type: "Item";
  effect?: string;
  category?: string;
}
