const multer = require("multer");
// eslint-disable-next-line no-unused-vars
const uploadMiddleware = require("../upload");

// Mock the multer module
jest.mock("multer");

describe("Upload Middleware", () => {
  // You've already added this part to mock the multer module
  jest.mock("multer");

  // Add the new test cases here
  it("should correctly set the destination for uploaded files", () => {
    // Mock functions and objects
    const mockCb = jest.fn();

    // Call the destination function
    const mockDestination = multer.diskStorage.mock.calls[0][0].destination;
    mockDestination(null, {}, mockCb);

    // Assert that the destination function was called with the correct parameters
    expect(mockCb).toHaveBeenCalledWith(null, "uploads/");
  });

  it("should generate unique filenames for uploaded files", () => {
    // Mock functions and objects
    const mockCb = jest.fn();

    // Call the filename function
    const mockFilename = multer.diskStorage.mock.calls[0][0].filename;
    mockFilename(null, {}, mockCb);

    // Assert that the filename function was called with the correct parameters
    expect(mockCb).toHaveBeenCalledWith(
      null,
      // eslint-disable-next-line comma-dangle
      expect.stringMatching(/^[^-]+-\d+-\d+$/)
    );
  });

  it("should allow only image files", () => {
    // Mock functions and objects
    const mockCb = jest.fn();

    // Call the file filter function with a valid image
    const mockFileFilter = multer.mock.calls[0][0].fileFilter;
    const mockValidImage = { mimetype: "image/jpeg" };
    mockFileFilter(null, mockValidImage, mockCb);

    // Assert that the file filter function allowed the valid image
    expect(mockCb).toHaveBeenCalledWith(null, true);

    // Call the file filter function with an invalid file
    const mockInvalidFile = { mimetype: "application/pdf" };
    mockFileFilter(null, mockInvalidFile, mockCb);

    // Assert that the file filter function rejected the invalid file
    expect(mockCb).toHaveBeenCalledWith(expect.any(Error));
  });

  // ... other test cases you may have ...
});
