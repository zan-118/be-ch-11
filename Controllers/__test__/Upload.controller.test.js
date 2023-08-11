/* eslint-disable no-unused-vars */
const cloudinary = require("cloudinary").v2;
const { uploadImage } = require('../Upload.controller');

jest.mock("cloudinary");

describe("Upload Image Function", () => {
  const mockReq = {
    file: {
      path: "mocked-file-path.jpg",
    },
  };
  const mockRes = {
    status: jest.fn(() => mockRes),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if no file is uploaded", async () => {
    mockReq.file = undefined;

    await uploadImage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "No file uploaded" });
  });

  it("should return 200 and image URL on successful upload", async () => {
    const mockResult = {
      secure_url: "https://mocked-cloudinary-url/image.jpg",
    };
    cloudinary.uploader.upload.mockImplementation((path, options, callback) => {
      callback(null, mockResult);
    });

    await uploadImage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "upload success !",
      imageUrl: mockResult.secure_url, // Mengambil secure_url dari mockResult
    });
  });
  // eslint-disable-next-line no-unused-vars
  it("should return 500 on error during upload", async () => {
    const mockError = new Error("Upload error");
    cloudinary.uploader.upload.mockImplementation((path, options, callback) => {
      callback(mockError, null);
    });

    await uploadImage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Error uploading file" });
  });

  it("should handle other errors by sending error message", async () => {
    const errorMessage = "Some error occurred.";
    cloudinary.uploader.upload.mockImplementation((path, options, callback) => {
      throw new Error(errorMessage);
    });

    await uploadImage(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
