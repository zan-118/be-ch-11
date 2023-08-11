const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = require('../Login.controller');

jest.mock("@prisma/client");
jest.mock("jsonwebtoken");
jest.mock("bcrypt");

describe("Login Function", () => {
  const mockReq = {
    body: {
      Username: "testuser",
      Password: "testpassword",
    },
  };
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
    send: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if Username is empty", async () => {
    mockReq.body.Username = "";
    await login(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: "user cannot be empty!" });
  });

  it("should return 401 if Password is empty", async () => {
    mockReq.body.Password = "";
    await login(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: "password cannot be empty!" });
  });

  it("should return 401 if user is not found", async () => {
    const mockPrismaClient = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };
    PrismaClient.mockReturnValue(mockPrismaClient);

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({ msg: "user not found ea kaka !" });
  });

  it("should return 200 and generate token on successful login", async () => {
    const mockUser = {
      id: 123,
      Username: "testuser",
      Password: "hashedpassword",
      Biodata: "Some biodata",
      City: "Some city",
    };
    const mockPrismaClient = {
      user: {
        findUnique: jest.fn().mockResolvedValue(mockUser),
      },
    };
    PrismaClient.mockReturnValue(mockPrismaClient);

    bcrypt.compare.mockResolvedValue(true);

    const mockToken = "mocked.token.value";
    jwt.sign.mockReturnValue(mockToken);

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: true,
      status: "authorized",
      token: mockToken,
    });
  });

  it("should return 200 and 'password doesnt match' message on incorrect password", async () => {
    const mockUser = {
      id: 123,
      Username: "testuser",
      Password: "hashedpassword",
      Biodata: "Some biodata",
      City: "Some city",
    };
    const mockPrismaClient = {
      user: {
        findUnique: jest.fn().mockResolvedValue(mockUser),
      },
    };
    PrismaClient.mockReturnValue(mockPrismaClient);

    bcrypt.compare.mockResolvedValue(false);

    await login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: false,
      message: "password doesnt match",
    });
  });

  it("should handle errors by sending error message", async () => {
    const errorMessage = "Some error occurred.";
    const mockPrismaClient = {
      user: {
        findUnique: jest.fn().mockRejectedValue(new Error(errorMessage)),
      },
    };
    PrismaClient.mockReturnValue(mockPrismaClient);

    await login(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(errorMessage);
  });
});
