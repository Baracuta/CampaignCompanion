import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router()

router.post('/', UserController.createUser);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router