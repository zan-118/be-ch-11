const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const userController = require('../User.controller');

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

// Mock bcrypt
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('User Controller', () => {
  let prisma;
  beforeEach(() => {
    prisma = new PrismaClient();
  });

  // Test register function
  it('should register a new user', async () => {
    // Mock bcrypt.hash
    bcrypt.hash.mockResolvedValue('hashedPassword');

    // Mock prisma.user.create
    prisma.user.create.mockResolvedValue({});

    const req = {
      body: {
        Email: 'test@example.com',
        Username: 'testuser',
        Password: 'password',
        Total_score: 0,
        Biodata: '',
        City: '',
        image_url: '',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('password', 12);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        Email: 'test@example.com',
        Username: 'testuser',
        Password: 'hashedPassword',
        Total_score: 0,
        Biodata: '',
        City: '',
        image_url: '',
      },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'success create data !',
    });
  });

  // More tests for other functions...
});
