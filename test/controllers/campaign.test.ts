import * as CampaignController from '../../src/controllers/CampaignController';
import { Request, Response } from 'express';

const mockRequest = (params, body) => {
    return {
        params: params,
        body: body,
    } as unknown as Request;
};

const mockResponse = () => {
    let res = {
        status: jest.fn(),
        json: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as unknown as Response;
};


describe('createCampaign', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create and return a campaign with 201 status', () => {
        let req = mockRequest({}, { name: 'Test Campaign', players: 4 });
        let res = mockResponse();

        CampaignController.createCampaign(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: expect.any(String),
            name: 'Test Campaign',
            players: 4,
        });
    });
})