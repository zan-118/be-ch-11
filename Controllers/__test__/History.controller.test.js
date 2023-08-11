const { PrismaClient } = require('@prisma/client');
const historyController = require('../History.controller');

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    historyGame: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  })),
}));

describe('History Controller', () => {
  let prisma;
  beforeEach(() => {
    prisma = new PrismaClient();
  });

  // Test postHistory function
  it('should post a new game history', async () => {
    // Mock prisma.historyGame.create
    prisma.historyGame.create.mockResolvedValue({});

    const req = {
      body: {
        user_id: 1,
        result_game: 'win',
        recent_game: 'Chess',
        recent_score: 100,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await historyController.postHistory(req, res);

    expect(prisma.historyGame.create).toHaveBeenCalledWith({
      data: {
        user_id: 1,
        result_game: 'win',
        recent_game: 'Chess',
        recent_score: 100,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      meta: {
        code: '200_002',
        message: 'success create data',
      },
      data: {},
    });
  });

  // Test getHistory function
  it('should get game history for a user', async () => {
    // Mock prisma.historyGame.findMany
    prisma.historyGame.findMany.mockResolvedValue([
      {
        id: 1,
        user_id: 1,
        result_game: 'win',
        recent_game: 'Chess',
        recent_score: 100,
      },
    ]);

    const req = {
      params: {
        user_id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await historyController.getHistory(req, res);

    expect(prisma.historyGame.findMany).toHaveBeenCalledWith({
      where: {
        user_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      meta: {
        code: '200_003',
        message: 'succes get data history id',
      },
      data: [
        {
          id: 1,
          user_id: 1,
          result_game: 'win',
          recent_game: 'Chess',
          recent_score: 100,
        },
      ],
    });
  });
});
