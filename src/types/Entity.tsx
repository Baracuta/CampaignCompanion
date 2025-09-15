export interface Entity {
  type: "NPC" | "Location" | "Item" | "PC";
  id: string;
  name?: string;
  description?: string;
  notes?: string;
  image?: string;
  isfavourite?: boolean;
  modifieddate: number;
}
