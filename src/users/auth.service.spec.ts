import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { doesNotMatch } from 'assert';
import { Hash } from 'crypto';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];

        const fakeUserService = {
            find: (email: string) => {
                const filteredUser = users.filter((user) => user.email === email);
                return Promise.resolve(filteredUser);
            },
            create: (email: string, password: string) => {
                const user = {id: Math.floor(Math.random() * 99999), email, password} as User;
                users.push(user);
                return Promise.resolve(user);
            }
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile();

        service = module.get(AuthService);
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('create a new user with a saltd and hashed password', async () => {
        const user = await service.signup('aaa@gmail.com', 'aaaaa');
        
        expect(user.password).not.toEqual('aaaaa');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throw an error if user signs up with email that is in use', async () => {
        await service.signup('aaaa@ggmail.com', 'aaaa');

        await service.signup('aaaa@ggmail.com', 'aaaa')
        .catch((err: BadRequestException) => {
            expect(err.message).toEqual('Email is in use');
        });
    });

    it('return a user if correct password is provide', async () => {
        await service.signup('aaaa@ggmail.com', 'aaaa');

        const user = await service.signin('aaaa@ggmail.com', 'aaaa');
        expect(user).toBeDefined();
    })
})