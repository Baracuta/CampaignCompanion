import { Entity } from "./Entity";

export interface Location extends Entity {
  type: "Location";
  maps?: Array<string>;
}
