import * as CampaignController from "../../src/controllers/CampaignController";
import { Request, Response } from "express";
import * as uuid from "uuid";
import { Campaign } from "../../src/types/Campaign";

const TEST_ID = "eb579531-abbe-49b5-9ea8-033e865e713b";
const USER_ID = "11111111-2222-3333-4444-555555555555";

const mockRequest = (params:any, body:any) => {
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

jest.spyOn(uuid, "v4").mockReturnValue(TEST_ID as any);

describe("createCampaign", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create and return a campaign with 201 status", async () => {
    let req = mockRequest(
      { id: TEST_ID },
      { name: "Test Campaign", players: 4}
    );
    let res = mockResponse();

    await CampaignController.createCampaign(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: TEST_ID,
      name: "Test Campaign",
      players: 4
    });
  });
});

describe("getCampaign", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should take an ID and return a matching campaign with 200 status", async () => {
    let req = mockRequest({ id: TEST_ID }, {});
    let res = mockResponse();

    await CampaignController.getCampaign(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: TEST_ID,
      name: "Test Campaign",
      players: 4,
      game: null,
      userid: null
    });
  });
});

describe("updateCampaign", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update and return a campaign with 201 status", async () => {
    let req = mockRequest(
      { id: TEST_ID },
      { name: "Updated Campaign", players: 5 }
    );
    let res = mockResponse();

    await CampaignController.updateCampaign(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: TEST_ID,
      name: "Updated Campaign",
      players: 5,
      game: null,
      userid: null
    });
  });
});

describe("deleteCampaign", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a campaign and return 204 status", async () => {
    let req = mockRequest({ id: TEST_ID }, {});
    let res = mockResponse();

    await CampaignController.deleteCampaign(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith("Campaign deleted successfully");
  });
});
