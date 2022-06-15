import { Injectable, NestMiddleware } from "@nestjs/common";
import { UsersService } from "../users.service";
import { Request, Response, NextFunction } from 'express';
import { ExpressAdapter } from "@nestjs/platform-express";
import { User } from '../users.entity';

 declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
 }

@Injectable()
export class CurrentUserMiddleWare implements NestMiddleware {
    constructor(private usersService: UsersService){}

    async use( req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {};

        req.currentUser = await this.usersService.findOne(userId);

        next();
    }
}