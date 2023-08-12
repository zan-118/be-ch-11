const jwt = require("jsonwebtoken");
const authOnly = require("../auth"); // Assuming the script is in a file named authOnly.js

// Mock the jsonwebtoken module
jest.mock("jsonwebtoken");

describe("Authorization Middleware", () => {
  it("should pass with a valid token", () => {
    // Mock the necessary objects
    const mockToken = "mocked.token.value";

    const mockUser = {
      id: "5d64bbf0-b7d8-4c76-a4ce-9cb157d1f52c",
      username: "admin",
    };
    const mockReq = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    };
    const mockRes = {};
    const mockNext = jest.fn();

    // Mock the verify function
    jwt.verify.mockImplementation((token, secret, callback) => {
      if (token === mockToken && secret === process.env.TOKEN) {
        callback(null, mockUser);
      } else {
        callback(new Error("Invalid token"));
      }
    });

    // Call the authOnly middleware
    authOnly(mockReq, mockRes, mockNext);

    // Assert that the mockNext function was called
    expect(mockNext).toHaveBeenCalled();

    // Assert that req.user was set correctly
    expect(mockReq.user).toEqual(mockUser);
  });

  it("should return 403 for an invalid token", () => {
    const mockToken = "invalid.token.value";
    const mockReq = {
      headers: {
        authorization: `Bearer ${mockToken}`,
      },
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    // Mock the verify function
    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error("Invalid token"));
    });

    // Call the authOnly middleware
    authOnly(mockReq, mockRes, mockNext);

    // Assert that the mockNext function was not called
    expect(mockNext).not.toHaveBeenCalled();

    // Assert that res.status and res.json were called with 403
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: false,
      message: "forbidden",
    });
  });

  it("should return 401 for missing authorization header", () => {
    const mockReq = {
      headers: {}, // No authorization header
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockNext = jest.fn();

    // Call the authOnly middleware
    authOnly(mockReq, mockRes, mockNext);

    // Assert that the mockNext function was not called
    expect(mockNext).not.toHaveBeenCalled();

    // Assert that res.status and res.json were called with 401
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      auth: false,
      message: "Unauthorized",
    });
  });
});
