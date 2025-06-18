import { Campaign } from "../types/Campaign";
import { User } from "../types/User";
import Joi from "joi";

const UserSchema = Joi.object<User>({
    id: Joi.string().uuid(),
    username: Joi.string().min(3).max(21),
    password: Joi.string().min(6).max(21),
    campaigns: Joi.array<Campaign>,
})