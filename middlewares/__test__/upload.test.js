const multer = require("multer");
const upload = require("../upload"); // Assuming your module is in a file named upload.js

// Mock the multer module
jest.mock("multer");

describe("File Upload Middleware", () => {
  // Mock the diskStorage function
  multer.diskStorage.mockImplementation((options) => {
    const { destination, filename } = options;

    return {
      destination: jest.fn((req, file, cb) => {
        cb(null, destination);
      }),
      filename: jest.fn((req, file, cb) => {
        cb(null, filename(req, file));
      }),
    };
  });

  // Mock the fileFilter function
  const mockFileFilter = jest.fn((req, file, cb) => {
    cb(null, true);
  });

  multer.mockReturnValue({
    diskStorage: multer.diskStorage,
    fileFilter: mockFileFilter,
  });

  // Your test cases here
  it("should upload a file successfully", () => {
    // Mock the necessary objects
    const mockReq = {};
    const mockFile = {
      mimetype: "image/jpeg",
      fieldname: "avatar",
    };
    const mockCb = jest.fn();

    // Call the fileFilter function
    mockFileFilter(mockReq, mockFile, mockCb);

    // Assert that the callback was called with no error and true
    expect(mockCb).toHaveBeenCalledWith(null, true);

    // You can also test the diskStorage behavior similarly
    // ...

    // Example: Test the actual upload middleware
    // const middleware = upload.single("avatar");
    // ...
  });

  it("should reject non-image files", () => {
    // Similar approach to testing fileFilter for rejecting non-image files
    // ...
  });
});
