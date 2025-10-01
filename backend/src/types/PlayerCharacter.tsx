import { Entity } from "./Entity";

export interface PC extends Entity {
  type: "PC";
  pc_class?: string;
  level?: string;
  player_name?: string;
}
