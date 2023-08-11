const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const authController = require('../ForgotPassword');

// Mock PrismaClient
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn(() => ({
    user: {
      findUnique: jest.fn(),
    },
  })),
}));

// Mock crypto
jest.mock('crypto', () => ({
  randomBytes: jest.fn(),
}));

describe('Auth Controller', () => {
  let prisma;
  beforeEach(() => {
    prisma = new PrismaClient();
  });

  // Test forgotPassword function
  it('should initiate password reset process for a registered email', async () => {
    // Mock prisma.user.findUnique
    prisma.user.findUnique.mockResolvedValue({});

    // Mock crypto.randomBytes
    crypto.randomBytes.mockReturnValue(Buffer.from('mockedtoken'));

    const req = {
      body: {
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await authController.forgotPassword(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: 'test@example.com',
      },
    });
    expect(crypto.randomBytes).toHaveBeenCalledWith(20);
    expect(res.status).toHaveBeenCalledWith(200);
    // You can add more specific expectations for your email sending logic here.
  });

  // More tests...
});
