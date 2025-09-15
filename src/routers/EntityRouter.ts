import { Router } from "express";
import * as EntityController from "../controllers/EntityController";

const npcRouter = Router({ mergeParams: true });

npcRouter.post("/", EntityController.createNPC);
npcRouter.get("/:id", EntityController.getNPC);
npcRouter.get("/", EntityController.getNPCs);
npcRouter.put("/:id", EntityController.updateNPC);
npcRouter.delete("/:id", EntityController.deleteNPC);

export { npcRouter };

const locationRouter = Router({ mergeParams: true });
locationRouter.post("/", EntityController.createLocation);
locationRouter.get("/:id", EntityController.getLocation);
locationRouter.get("/", EntityController.getLocations);
locationRouter.put("/:id", EntityController.updateLocation);
locationRouter.delete("/:id", EntityController.deleteLocation);

export { locationRouter };

const itemRouter = Router({ mergeParams: true });
itemRouter.post("/", EntityController.createItem);
itemRouter.get("/:id", EntityController.getItem);
itemRouter.get("/", EntityController.getItems);
itemRouter.put("/:id", EntityController.updateItem);
itemRouter.delete("/:id", EntityController.deleteItem);

export { itemRouter };

const pcRouter = Router({ mergeParams: true });
pcRouter.post("/", EntityController.createPC);
pcRouter.get("/:id", EntityController.getPC);
pcRouter.get("/", EntityController.getPCs);
pcRouter.put("/:id", EntityController.updatePC);
pcRouter.delete("/:id", EntityController.deletePC);

export { pcRouter };