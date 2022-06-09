import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){};

    createUser(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }
}
