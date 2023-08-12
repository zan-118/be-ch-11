const multer = require("multer");
const upload = require("../upload"); 

jest.mock("multer");

describe("upload", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should export the upload middleware function", () => {
    expect(typeof upload).toBe("function");
  });

  it("should set the correct destination for uploaded files", () => {
    upload();

    const storageOptions = multer.mock.calls[0][0].storage;
    const destinationMock = jest.fn();
    storageOptions.destination(null, null, destinationMock);

    expect(destinationMock).toHaveBeenCalledWith(null, "uploads/");
  });

  it("should generate unique filenames for uploaded files", () => {
    upload();

    const storageOptions = multer.mock.calls[0][0].storage;
    const filenameMock = jest.fn();
    const fakeFile = { fieldname: "test-fieldname" };
    storageOptions.filename(null, fakeFile, filenameMock);

    // Check if the generated filename contains the expected fieldname
    expect(filenameMock).toHaveBeenCalledWith(
      null,
      expect.stringContaining("test-fieldname")
    );
  });

  it("should limit the file size to 5 MB", () => {
    upload();

    const limits = multer.mock.calls[0][0].limits;
    expect(limits.fileSize).toBe(1024 * 1024 * 5);
  });

  it("should allow only image files", () => {
    upload();

    const fileFilter = multer.mock.calls[0][0].fileFilter;
    const allowedFile = { mimetype: "image/png" };
    const disallowedFile = { mimetype: "application/pdf" };
    const allowMock = jest.fn();
    const disallowMock = jest.fn();

    fileFilter(null, allowedFile, allowMock);
    fileFilter(null, disallowedFile, disallowMock);

    expect(allowMock).toHaveBeenCalledWith(null, true);
    expect(disallowMock).toHaveBeenCalledWith(
      new Error("Only image files are allowed.")
    );
  });
});
