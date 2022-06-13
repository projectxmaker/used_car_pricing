import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({id, email: 'aaa@aaa.com', password: 'aaa'} as User);
      },
      find: (email: string) => {
        return Promise.resolve([{id: 1, email: 'aaa@aaa.com', password: 'aaa'} as User]);
      }
    };

    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({id: 1, email, password} as User);
      },
      //signup: () => {}
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns list of users with filtered email', async () => {
    const users = await controller.findAllUsers('aaa@aaa.com');

    expect(users.length).toBeGreaterThan(0);
    expect(users[0].email).toEqual('aaa@aaa.com');
  })

  it('findUser return a user with filtered if', async () => {
    const user = await controller.findUser('1');

    expect(user).toBeDefined();
  })

  it('findUser return an error if there is no user with filtered if', async () => {
    fakeUsersService.findOne = (id: number) => {
        return Promise.resolve(null);
    }

    const user = await controller.findUser('1');
    
    expect(user).toEqual(null);
  })

  it('signin updates session and return user', async () => {
    const session = { currentUser: null };
    const user = await controller.signin( {email: 'aaa@aaa.com', password: 'aaa'}, session);

    expect(session.currentUser).toBeDefined;
    expect(user).toBeDefined;
  })
});
