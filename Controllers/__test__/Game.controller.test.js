const { PrismaClient } = require("@prisma/client");
const {
  createRoom,
  getRooms,
} = require('../Game.controller'); // Ubah sesuai dengan path file Anda

jest.mock("@prisma/client");

describe("Room Management Functions", () => {
  describe("createRoom", () => {
    it("should create a new room and return success", async () => {
      const mockCreatedRoom = {
        id: 1,
        name: "Test Room",
        // Isi dengan properti lain yang sesuai
      };

      const mockPrismaClient = {
        game: {
          create: jest.fn().mockResolvedValue(mockCreatedRoom),
        },
      };
      PrismaClient.prototype.$transaction = jest.fn().mockReturnValue(mockPrismaClient);

      const mockReq = {
        body: {
          // Isi dengan data ruangan yang sesuai
        },
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await createRoom(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(202);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "success create room",
        data: mockCreatedRoom,
      });
    });

    // Tambahkan tes untuk skenario lainnya (mis. data kosong)
  });

  describe("getRooms Function", () => {
    it("should return a list of rooms", async () => {
      const mockRooms = [
        {
          id: 1,
          name: "Room 1",
          // Isi dengan properti lain yang sesuai
        },
        // Tambahkan data ruangan lainnya
      ];

      const mockPrismaClient = {
        game: {
          findMany: jest.fn().mockResolvedValue(mockRooms),
        },
      };
      PrismaClient.prototype.$transaction = jest.fn().mockReturnValue(mockPrismaClient);

      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockNext = jest.fn();

      await getRooms(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        result: "Success",
        rooms: mockRooms,
      });
    });

    it("should return 400 if no rooms are found", async () => {
      const mockPrismaClient = {
        game: {
          findMany: jest.fn().mockResolvedValue([]),
        },
      };
      PrismaClient.prototype.$transaction = jest.fn().mockReturnValue(mockPrismaClient);

      const mockReq = {};
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const mockNext = jest.fn();

      await getRooms(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        result: "error",
        message: "Tidak ada rooms",
      });
    });

    it("should handle errors by calling next", async () => {
      const mockError = new Error("Database error");
      const mockPrismaClient = {
        game: {
          findMany: jest.fn().mockRejectedValue(mockError),
        },
      };
      PrismaClient.prototype.$transaction = jest.fn().mockReturnValue(mockPrismaClient);

      const mockReq = {};
      const mockRes = {};
      const mockNext = jest.fn();

      await getRooms(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
