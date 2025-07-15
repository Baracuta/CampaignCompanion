import * as EntityController from "../../src/controllers/EntityController";
import { Request, Response } from "express";
import * as uuid from "uuid";

const TEST_ID = "eb579531-abbe-49b5-9ea8-033e865e713b";
const CAMPAIGN_ID = "11111111-2222-3333-4444-555555555555";
const ENTITY_ID = "99999999-8888-7777-6666-555555555555";

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

jest.spyOn(uuid, "v4").mockReturnValue(ENTITY_ID as any);

// NPC Tests
describe("NPC Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an NPC with 201 status", async () => {
    let req = mockRequest({}, { name: "Test NPC", campaignId: CAMPAIGN_ID });
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getCampaign").mockResolvedValue({ id: CAMPAIGN_ID });
    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "createNPC").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.createNPC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("NPC created successfully");
  });

  it("should get an NPC with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, npcId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getCampaign").mockResolvedValue({ id: CAMPAIGN_ID });
    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getNPC").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.getNPC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("NPC retrieved successfully");
  });

  it("should update an NPC with 200 status", async () => {
    let req = mockRequest(
      { campaignId: CAMPAIGN_ID, npcId: ENTITY_ID },
      { name: "Updated NPC" }
    );
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getCampaign").mockResolvedValue({ id: CAMPAIGN_ID });
    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getNPC").mockResolvedValue({ id: ENTITY_ID });
    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "updateNPC").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.updateNPC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("NPC updated successfully");
  });

  it("should delete an NPC with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, npcId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getCampaign").mockResolvedValue({ id: CAMPAIGN_ID });
    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getNPC").mockResolvedValue({ id: ENTITY_ID });
    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "deleteNPC").mockResolvedValue({});

    await EntityController.deleteNPC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("NPC deleted successfully");
  });
});

// Location Tests
describe("Location Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a Location with 201 status", async () => {
    let req = mockRequest({}, { name: "Test Location", campaignId: CAMPAIGN_ID });
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "createLocation").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.createLocation(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("Location created successfully");
  });

  it("should get a Location with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, locationId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getLocation").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.getLocation(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Location retrieved successfully");
  });

  it("should update a Location with 200 status", async () => {
    let req = mockRequest(
      { campaignId: CAMPAIGN_ID, locationId: ENTITY_ID },
      { name: "Updated Location" }
    );
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "updateLocation").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.updateLocation(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Location updated successfully");
  });

  it("should delete a Location with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, locationId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "deleteLocation").mockResolvedValue({});

    await EntityController.deleteLocation(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Location deleted successfully");
  });
});

// Item Tests
describe("Item Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create an Item with 201 status", async () => {
    let req = mockRequest({}, { name: "Test Item", campaignId: CAMPAIGN_ID });
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "createItem").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.createItem(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("Item created successfully");
  });

  it("should get an Item with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, itemId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getItem").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.getItem(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Item retrieved successfully");
  });

  it("should update an Item with 200 status", async () => {
    let req = mockRequest(
      { campaignId: CAMPAIGN_ID, itemId: ENTITY_ID },
      { name: "Updated Item" }
    );
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "updateItem").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.updateItem(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Item updated successfully");
  });

  it("should delete an Item with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, itemId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "deleteItem").mockResolvedValue({});

    await EntityController.deleteItem(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("Item deleted successfully");
  });
});

// PC Tests
describe("PC Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a PC with 201 status", async () => {
    let req = mockRequest({}, { name: "Test PC", campaignId: CAMPAIGN_ID });
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "createPC").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.createPC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith("PC created successfully");
  });

  it("should get a PC with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, pcId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "getPC").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.getPC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("PC retrieved successfully");
  });

  it("should update a PC with 200 status", async () => {
    let req = mockRequest(
      { campaignId: CAMPAIGN_ID, pcId: ENTITY_ID },
      { name: "Updated PC" }
    );
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "updatePC").mockResolvedValue({ id: ENTITY_ID });

    await EntityController.updatePC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("PC updated successfully");
  });

  it("should delete a PC with 200 status", async () => {
    let req = mockRequest({ campaignId: CAMPAIGN_ID, pcId: ENTITY_ID }, {});
    let res = mockResponse();

    jest.spyOn(require("../../src/services/CampaignServiceConnect"), "deletePC").mockResolvedValue({});

    await EntityController.deletePC(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith("PC deleted successfully");
  });
});

