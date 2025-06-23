import {mock} from 'node:test';
import * as UserController from '../../src/controllers/userController';
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


describe('createUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should create and return a user and 200 status', () => {
        let req = mockRequest({},{ username: 'John Doe', password: 'password' });
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

describe('getUser', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('should find and return a user and 200 status', () => {
        let req = mockRequest({id:'123'}, {});
        let res = mockResponse();

        UserController.getUser(req, res, () => {});

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            id: '123',
            username: expect.any(String),
            password: expect.any(String)
        });
    })
})