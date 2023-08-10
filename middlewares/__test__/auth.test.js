const jwt = require("jsonwebtoken");
const authOnly = require("../auth"); // Assuming your module is in a file named authOnly.js

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
    // Similar approach to the valid token test, but with invalid token
    // ...
  });

  it("should return 401 for missing authorization header", () => {
    // Similar approach, but mockReq doesn't have headers.authorization
    // ...
  });
});
