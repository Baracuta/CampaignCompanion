import * as UserController from '../../src/controllers/userController';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

// Mock CampaignService
jest.mock('../../src/services/CampaignServiceBackend', () => ({
    createUser: jest.fn().mockResolvedValue({
        id: 'mockUserId',
        email: 'mockuser@email.com',
        name: 'Mock User',
    }),
    getUser: jest.fn().mockResolvedValue({
        id: 'mockUserId',
        email: 'mockuser@email.com',
        name: 'Mock User',
    }),
}));

const mock_auth_token = 'mockToken';

const mockRequest = (params, body) => ({
    headers: { authorization: mock_auth_token },
    params,
    body,
} as unknown as Request);

const mockResponse = () => {
    let res = {
        status: jest.fn(),
        json: jest.fn(),
    };
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as unknown as Response;
};

// Mock the verifyIdToken function to return a resolved promise with a mock LoginTicket
jest.spyOn(OAuth2Client.prototype, 'verifyIdToken').mockImplementation(() =>
  Promise.resolve({
    getPayload: () => ({
        sub: 'mockUserId',
        email: 'mockuser@email.com',
        name: 'Mock User',
    }),
  } as any)
);

describe('createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create and return a user and 201 status', async () => {
        let req = mockRequest({}, {});
        let res = mockResponse();

        await UserController.createUser(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: 'mockUserId',
            email: 'mockuser@email.com',
            name: 'Mock User',
        });
    });
});

describe('getUser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should find and return a user and 200 status', async () => {
        let req = mockRequest({}, {});
        let res = mockResponse();

        await UserController.getUser(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: 'mockUserId',
            username: 'mockUsername',
            password: 'mockPassword',
        });
    });
});