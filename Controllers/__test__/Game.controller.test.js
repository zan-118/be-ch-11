const {
  createRoom,
  getRooms,
  getRoomById,
  updateScore,
} = require("../Game.controller"); // Replace with your actual handler module path

jest.mock("../Game.controller.js", () => {
  createRoom: jest.fn().mockResolveValue({
    Name: "test",
    Description: "test_desc",
    thumbnail_url: "test_url",
    Game_url: "testgame",
    play_count: 0,
  });
});

