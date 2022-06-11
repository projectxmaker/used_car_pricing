import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){};

    async create(email: string, password: string) {
        const user = this.repo.create({email, password});
        return this.repo.save(user);
    }
    
    find(email: string) {
        return this.repo.find({where:{email}});
    }

    findOne(id: number) {
        return this.repo.findOne({where:{id}});
    }

    async update(id:number, newInfo: Partial<User>) {
        const user = await this.repo.findOne({where:{id}});

        if(!user) {
            throw new NotFoundException("User not found");
        }
        Object.assign(user, newInfo);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.repo.findOne({where: {id}});

        if(!user) {
            throw new NotFoundException("User not found");
        }

        return this.repo.remove(user);
    }
}
