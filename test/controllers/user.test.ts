import {mock} from 'node:test';
import * as UserController from '../../src/controllers/userController';
import { Request, Response } from 'express';

const mockRequest = (body, id) => {
    return {
        body: body,
        id: id,
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


describe('createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should create a user and return 200 status', () => {
        let req = mockRequest({ username: 'John Doe', password: 'password' }, {});
        let res = mockResponse();

        UserController.createUser(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: expect.any(String),
            username: 'John Doe',
            password:'password'
        });
    })
})