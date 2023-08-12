const { postHistory, getHistory } = require('../History.controller'); // Update the path accordingly
const { PrismaClient } = require('@prisma/client');

jest.mock('@prisma/client');

describe('postHistory function', () => {
  let mockPrisma;
  let req;
  let res;

  beforeEach(() => {
    mockPrisma = new PrismaClient();
    req = {
      body: {
        user_id: 1,
        result_game: 'win',
        recent_game: 'Chess',
        recent_score: 100,
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create history and return success response', async () => {
    mockPrisma.historyGame.create.mockResolvedValue({ /* mocked created history data */ });

    await postHistory(req, res);

    expect(mockPrisma.historyGame.create).toHaveBeenCalledWith({
      data: {
        user_id: 1,
        result_game: 'win',
        recent_game: 'Chess',
        recent_score: 100,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      meta: { code: '200_002', message: 'success create data' },
      data: expect.any(Object),
    }));
  });

  it('should return error response if history creation fails', async () => {
    mockPrisma.historyGame.create.mockRejectedValue(new Error('Database error'));

    await postHistory(req, res);

    expect(mockPrisma.historyGame.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      meta: { code: '500_002', message: 'Database error' },
    }));
  });
});

describe('getHistory function', () => {
  let mockPrisma;
  let req;
  let res;

  beforeEach(() => {
    mockPrisma = new PrismaClient();
    req = {
      params: {
        user_id: 1,
      },
    };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get user history and return success response', async () => {
    mockPrisma.historyGame.findMany.mockResolvedValue([/* mocked history data */]);

    await getHistory(req, res);

    expect(mockPrisma.historyGame.findMany).toHaveBeenCalledWith({
      where: {
        user_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      meta: { code: '200_003', message: 'success get data history id' },
      data: expect.any(Array),
    }));
  });

  it('should return empty history if user_id is not provided', async () => {
    req.params.user_id = undefined;

    await getHistory(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'play the game to make history',
      data: [],
    }));
  });

  it('should return error response if history retrieval fails', async () => {
    mockPrisma.historyGame.findMany.mockRejectedValue(new Error('Database error'));

    await getHistory(req, res);

    expect(mockPrisma.historyGame.findMany).toHaveBeenCalledWith({
      where: {
        user_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      meta: { code: '500_002', message: 'Database error' },
    }));
  });

  it('should return error response if user history is not found', async () => {
    mockPrisma.historyGame.findMany.mockResolvedValue([]);

    await getHistory(req, res);

    expect(mockPrisma.historyGame.findMany).toHaveBeenCalledWith({
      where: {
        user_id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      meta: { code: '404_001', message: 'user history not found' },
    }));
  });
});
