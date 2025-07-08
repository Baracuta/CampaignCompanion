import { any } from 'joi';
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

    it('should create and return a campaign with 201 status', async () => {
        let req = mockRequest({}, { name: 'Test Campaign', players: 4 });
        let res = mockResponse();

        await CampaignController.createCampaign(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: expect.any(String),
            name: 'Test Campaign',
            players: 4,
        });
    });
})

describe('getCampaign', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should take an ID and return a matching campaign with 200 status', async () => {
        let req = mockRequest({id:'eb579531-abbe-49b5-9ea8-033e865e713b'}, {});
        let res = mockResponse();

        await CampaignController.getCampaign(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 'eb579531-abbe-49b5-9ea8-033e865e713b',
            name: expect.any(String),
            players: expect.any(Number),
        });
    });
});

describe('updateCampaign', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should update and return a campaign with 200 status', async () => {
        let req = mockRequest({id:'eb579531-abbe-49b5-9ea8-033e865e713b'}, { name: 'Updated Campaign', players: 5 });
        let res = mockResponse();

        await CampaignController.updateCampaign(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 'eb579531-abbe-49b5-9ea8-033e865e713b',
            name: 'Updated Campaign',
            players: 5,
        });
    });
});

describe('deleteCampaign', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a campaign and return 204 status', async () => {
        let req = mockRequest({id:'eb579531-abbe-49b5-9ea8-033e865e713b'}, {});
        let res = mockResponse();

        await CampaignController.deleteCampaign(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith("Campaign deleted successfully");
    });
});