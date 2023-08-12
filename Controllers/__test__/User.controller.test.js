const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const {
  register,
  getPlayers,
  getPlayerById,
  updatePlayer,
  updateImage,
  deletePlayer,
} = require('../User.controller'); 

// Mock PrismaClient
jest.mock('@prisma/client');

// Mock bcrypt
jest.mock('bcrypt');

describe('Mock Tests for App Functions', () => {
  let mockPrismaClient;

  beforeAll(() => {
    // Create a mock instance of PrismaClient
    mockPrismaClient = new PrismaClient();

    // Mock PrismaClient methods
    mockPrismaClient.user = {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    // Mock bcrypt.hash
    bcrypt.hash = jest.fn((data, salt) => Promise.resolve(`hashed_${data}`));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should register a new player', async () => {
    const req = {
      body: {
        Email: 'test@example.com',
        Username: 'testuser',
        Password: 'testpassword',
        Total_score: 0,
        Biodata: 'Test bio',
        City: 'Test city',
        image_url: 'test.jpg',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrismaClient.user.create.mockResolvedValue({});
    bcrypt.hash.mockResolvedValue('hashed_testpassword');

    await register(req, res);

    expect(mockPrismaClient.user.create).toHaveBeenCalledWith({
      data: {
        Email: 'test@example.com',
        Username: 'testuser',
        Password: 'hashed_testpassword',
        Total_score: 0,
        Biodata: 'Test bio',
        City: 'Test city',
        image_url: 'test.jpg',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'success create data !' });
  });

  it('should get a list of players', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrismaClient.user.findMany.mockResolvedValue([
      { id: 1, Username: 'user1' },
      { id: 2, Username: 'user2' },
    ]);

    await getPlayers(req, res);

    expect(mockPrismaClient.user.findMany).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: 'Success',
      payload: [
        { id: 1, Username: 'user1' },
        { id: 2, Username: 'user2' },
      ],
    });
  });

  it('should get a player by ID', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrismaClient.user.findUnique.mockResolvedValue({ id: 1, Username: 'user1' });

    await getPlayerById(req, res);

    expect(mockPrismaClient.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success get player by id',
      data: { id: 1, Username: 'user1' },
    });
  });

  it('should update a player', async () => {
    const req = {
      params: {
        id: 1,
      },
      body: {
        Email: 'new@example.com',
        Username: 'newuser',
        Total_score: 100,
        Biodata: 'Updated bio',
        City: 'Updated city',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrismaClient.user.update.mockResolvedValue({ id: 1, Username: 'newuser' });

    await updatePlayer(req, res);

    expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        Email: 'new@example.com',
        Username: 'newuser',
        Total_score: 100,
        Biodata: 'Updated bio',
        City: 'Updated city',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: 'Success',
      message: 'User with id = 1 berhasil di update',
      data: { id: 1, Username: 'newuser' },
    });
  });

  it('should update a player image', async () => {
    const req = {
      params: {
        id: 1,
      },
      body: {
        image_url: 'new_image.jpg',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrismaClient.user.update.mockResolvedValue({ id: 1, image_url: 'new_image.jpg' });

    await updateImage(req, res);

    expect(mockPrismaClient.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: {
        image_url: 'new_image.jpg',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success change profile picture',
      data: { id: 1, image_url: 'new_image.jpg' },
    });
  });

  it('should delete a player', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrismaClient.user.delete.mockResolvedValue(true);

    await deletePlayer(req, res);

    expect(mockPrismaClient.user.delete).toHaveBeenCalledWith({
      where: {
        id: 1,
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'success delete players!' });
  });
});
