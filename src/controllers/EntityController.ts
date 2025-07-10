import type { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceConnect";
import Joi from "joi";

// Basically, all the logic that handles the different entity types
// is going to be in this controller.



// NPC Section

const NPCSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().required(),
};

export const createNPC: RequestHandler = async (req, res): Promise<void> => {

};

export const getNPC: RequestHandler = async (req, res): Promise<void> => {

};

export const updateNPC: RequestHandler = async (req, res): Promise<void> => {

};

export const deleteNPC: RequestHandler = async (req, res): Promise<void> => {

};



// Location Section

const LocationSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().required(),
};

export const createLocation: RequestHandler = async (req, res): Promise<void> => {

};

export const getLocation: RequestHandler = async (req, res): Promise<void> => {

};

export const updateLocation: RequestHandler = async (req, res): Promise<void> => {

};

export const deleteLocation: RequestHandler = async (req, res): Promise<void> => {

};



// Item Section

const ItemSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().required(),
};

export const createItem: RequestHandler = async (req, res): Promise<void> => {

};

export const getItem: RequestHandler = async (req, res): Promise<void> => {

};

export const updateItem: RequestHandler = async (req, res): Promise<void> => {

};

export const deleteItem: RequestHandler = async (req, res): Promise<void> => {

};



// PC Section

const PCSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().required(),
};

export const createPC: RequestHandler = async (req, res): Promise<void> => {

};

export const getPC: RequestHandler = async (req, res): Promise<void> => {

};

export const updatePC: RequestHandler = async (req, res): Promise<void> => {

};

export const deletePC: RequestHandler = async (req, res): Promise<void> => {

};
