import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router()

router.post('/', UserController.createUser);
router.get('/', UserController.getUser);

export default router