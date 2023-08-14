// eslint-disable-next-line import/no-extraneous-dependencies
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const app = require("../app"); // Replace with the path to your Express app setup

jest.mock("@prisma/client");
jest.mock("../Game.controller.js", () => ({
  createRoom: jest.fn().mockResolvedValue({
    Name: "test",
    Description: "test_desc",
    thumbnail_url: "test_url",
    // ...
  }),
}));
describe("Game Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a room and return success message", async () => {
    // Set up your mocked PrismaClient and create mockResolvedValue

    // Mock PrismaClient methods for create
    const mockCreate = jest
      .fn()
      .mockResolvedValue({ id: 1, Name: "Test Room" });
    PrismaClient.prototype.game = {
      create: mockCreate,
    };

    const response = await request(app).post("/create-room").send({
      Name: "Test Room",
      Description: "Test description",
      thumbnail_url: "test_thumbnail.jpg",
      Game_url: "test_game_url",
      play_count: 0,
    });

    // Assert the response
    expect(response.status).toBe(202);
    expect(response.body.message).toBe("success create room ");
    expect(response.body.data).toEqual({ id: 1, Name: "Test Room" });

    // Optionally, assert that the PrismaClient methods were called
    expect(mockCreate).toHaveBeenCalled();
  });

  it("should get rooms and return success result", async () => {
    // Set up your mocked PrismaClient and create mockResolvedValue

    // Mock PrismaClient methods for findMany
    const mockFindMany = jest.fn().mockResolvedValue([
      { id: 1, Name: "Room 1" },
      { id: 2, Name: "Room 2" },
    ]);
    PrismaClient.prototype.game = {
      findMany: mockFindMany,
    };

    const response = await request(app).get("/get-rooms");

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body.result).toBe("Success");
    expect(response.body.rooms).toEqual([
      { id: 1, Name: "Room 1" },
      { id: 2, Name: "Room 2" },
    ]);

    // Optionally, assert that the PrismaClient methods were called
    expect(mockFindMany).toHaveBeenCalled();
  });

  // Repeat similar test cases for other functions (getRoomById, updateScore)...
});
