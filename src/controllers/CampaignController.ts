import type { RequestHandler } from "express";
import * as CampaignService from '../services/CampaignService';

export const createCampaign: RequestHandler = async (req, res, next) => {
    try {
        const campaign = await CampaignService.createCampaign(req.body);
        res.json(campaign);
    } catch (err) {
        next(err);
    }
}
export const getCampaign: RequestHandler = async (req, res, next) => {
    try {
        const campaign = await CampaignService.getCampaign(req.params.id);
        res.json(campaign);
    } catch (err) {
        next(err);
    }
}
export const updateCampaign: RequestHandler = async (req, res, next) => {
    try {
        const updatedCampaign = await CampaignService.updateCampaign(await CampaignService.getCampaign(req.params.id));
        res.json(updatedCampaign);
    } catch (err) {
        next(err);
    }
}
export const deleteCampaign: RequestHandler = async (req, res, next) => {
    try {
        await CampaignService.deleteCampaign(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
}