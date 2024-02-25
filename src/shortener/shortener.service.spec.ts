// Import necessary modules and the ShortenerService class
import { Test, TestingModule } from '@nestjs/testing';
import { ShortenerService } from './shortener.service';

// Mocking the shorteners model
const shortenersModelMock = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
};

// Mocking the environment variables
process.env = {
  host: 'localhost',
  port: '3000',
  hash_length: '8',
};

describe('ShortenerService', () => {
  let service: ShortenerService;

  beforeEach(async () => {
    // Creating a NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        {
          provide: 'SHORTENER_REPOSITORY',
          useValue: shortenersModelMock,
        },
      ],
    }).compile();

    // Creating an instance of the ShortenerService
    service = module.get<ShortenerService>(ShortenerService);
  });

  describe('getAll', () => {
    it('should return an array of shorteners with formatted URLs', async () => {
      // Mock data for findAll
      const mockData = [
        { id: 1, short: 'abc123', url: 'https://example.com', user_id: 1 },
      ];

      // Mocking the findAll method of shortenersModel
      shortenersModelMock.findAll.mockResolvedValue(mockData);

      // Calling the getAll method
      const result = await service.getAll();

      // Expectations
      expect(result).toEqual([
        {
          id: 1,
          short: 'localhost:3000/short/abc123',
          url: 'https://example.com',
          user_id: 1,
        },
      ]);
      // Verify that findAll was called
      expect(shortenersModelMock.findAll).toHaveBeenCalled();
    });
  });

  describe('getByShort', () => {
    it('should return a shortener by its short code', async () => {
      // Mock data for findOne
      const mockData = {
        id: 1,
        short: 'abc123',
        url: 'https://example.com',
        user_id: 1,
      };

      // Mocking the findOne method of shortenersModel
      shortenersModelMock.findOne.mockResolvedValue(mockData);

      // Calling the getByShort method
      const result = await service.getByShort('abc123');

      // Expectations
      expect(result).toEqual(mockData);
      // Verify that findOne was called with the correct parameters
      expect(shortenersModelMock.findOne).toHaveBeenCalledWith({
        where: { short: 'abc123' },
      });
    });
  });

  // Add more test cases for other methods (updateShort, create, generateHash, etc.)
});
