import type { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceConnect";
import Joi from "joi";

// Basically, all the logic that handles the different entity types
// is going to be in this controller.