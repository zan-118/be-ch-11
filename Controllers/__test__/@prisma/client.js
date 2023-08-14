const mockPrisma = {
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
    // ...other methods
  },
  game: {
    create: jest.fn(),
  },
  // ...other models
};

module.exports = { PrismaClient: jest.fn(() => mockPrisma) };
