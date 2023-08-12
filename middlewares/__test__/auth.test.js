const jwt = require("jsonwebtoken");
const authOnly = require("../auth"); 

// Mock the jsonwebtoken module
jest.mock("jsonwebtoken");

describe("Authorization Middleware", () => {
  it("should pass with a valid token", () => {
    // Mock the necessary objects
    const mockToken = "mocked.token.value";
    const mockUser = { id: 123, username: "testuser" };
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
      send: jest.fn(),
    };
    const mockNext = jest.fn();

    // Mock the verify function
    jwt.verify.mockImplementation((token, secret, callback) => {
      if (token === mockToken && secret === process.env.TOKEN) {
        const mockUser = { id: 123, username: "testuser" };
        callback(null, mockUser);
      } else {
        callback(new Error("Invalid token"));
      }
    });

    // Call the authOnly middleware
    authOnly(mockReq, mockRes, mockNext);

    // Assert that the mockNext function was called
    expect(mockNext).not.toHaveBeenCalled();

    // Assert that res.status and res.send were called with 403
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.send).toHaveBeenCalledWith("Forbidden");
  });

  // Handle missing authorization header scenario
  it("should return 401 for missing authorization header", () => {
    const mockReq = {
      headers: {}, // No authorization header
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockNext = jest.fn();

    // Call the authOnly middleware
    authOnly(mockReq, mockRes, mockNext);

    // Assert that the mockNext function was not called
    expect(mockNext).not.toHaveBeenCalled();

    // Assert that res.status and res.send were called with 401
    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.send).toHaveBeenCalledWith("Unauthorized");
  });
});
