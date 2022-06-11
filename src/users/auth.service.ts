import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){};

    async signin(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if(!user) {
            throw new NotFoundException("User not found");
        }

        const [salt, pwd] = user.password.split('.');

        // hash password with salt
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(pwd !== hash.toString('hex')) {
            throw new BadRequestException("Invalid password");
        }

        return user;
    }

    async signup(email, password) {
        // check if email in use
        const [user] = await this.usersService.find(email);

        if(user) {
            throw new NotFoundException("Email is in use");
        }

        // create salt
        const salt = randomBytes(8).toString('hex');

        // hash password
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // create new password
        const newPwd = salt + '.' + hash.toString('hex');

        return this.usersService.create(email, newPwd);
    }
}