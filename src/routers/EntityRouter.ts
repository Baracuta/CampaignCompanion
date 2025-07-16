import { Router } from "express";
import * as EntityController from "../controllers/EntityController";

const npcRouter = Router();

npcRouter.post("/", EntityController.createNPC);
npcRouter.get("/:id", EntityController.getNPC);
npcRouter.put("/:id", EntityController.updateNPC);
npcRouter.delete("/:id", EntityController.deleteNPC);

export { npcRouter };

const locationRouter = Router();
locationRouter.post("/", EntityController.createLocation);
locationRouter.get("/:id", EntityController.getLocation);
locationRouter.put("/:id", EntityController.updateLocation);
locationRouter.delete("/:id", EntityController.deleteLocation);

export { locationRouter };

const itemRouter = Router();
itemRouter.post("/", EntityController.createItem);
itemRouter.get("/:id", EntityController.getItem);
itemRouter.put("/:id", EntityController.updateItem);
itemRouter.delete("/:id", EntityController.deleteItem);

export { itemRouter };

const pcRouter = Router();
pcRouter.post("/", EntityController.createPC);
pcRouter.get("/:id", EntityController.getPC);
pcRouter.put("/:id", EntityController.updatePC);
pcRouter.delete("/:id", EntityController.deletePC);

export { pcRouter };