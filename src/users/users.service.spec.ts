import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

// Mocking the users model
const usersModelMock = {
  findOne: jest.fn(),
  create: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    // Creating a NestJS testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'USER_REPOSITORY',
          useValue: usersModelMock,
        },
      ],
    }).compile();

    // Creating an instance of the UsersService
    service = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('should return a user by username', async () => {
      // Mock data for findOne
      const mockData = {
        id: 1,
        username: 'john.doe',
        password: 'hashedpassword',
      };

      // Mocking the findOne method of usersModel
      usersModelMock.findOne.mockResolvedValue(mockData);

      // Calling the findOne method
      const result = await service.findOne('john.doe');

      // Expectations
      expect(result).toEqual(mockData);
      // Verify that findOne was called with the correct parameters
      expect(usersModelMock.findOne).toHaveBeenCalledWith({
        where: { username: 'john.doe' },
      });
    });

    it('should return undefined if user is not found', async () => {
      // Mocking the findOne method to return undefined
      usersModelMock.findOne.mockResolvedValue(undefined);

      // Calling the findOne method
      const result = await service.findOne('nonexistentuser');

      // Expectation
      expect(result).toBeUndefined();
      // Verify that findOne was called with the correct parameters
      expect(usersModelMock.findOne).toHaveBeenCalledWith({
        where: { username: 'nonexistentuser' },
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Mock data for create
      const mockData = {
        id: 2,
        username: 'newuser',
        password: 'hashedpassword',
      };

      // Mocking the create method of usersModel
      usersModelMock.create.mockResolvedValue(mockData);

      // Calling the create method
      const result = await service.create('newuser', 'password123');

      // Expectations
      expect(result).toEqual(mockData);
      // Verify that create was called with the correct parameters
      expect(usersModelMock.create).toHaveBeenCalledWith({
        username: 'newuser',
        password: 'password123',
      });
    });
  });

  // Add more test cases for other methods if needed
});
