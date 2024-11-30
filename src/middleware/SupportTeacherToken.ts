import { NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

export class SupportTeacherToken implements NestMiddleware{
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let token: any = req.headers.token

            if(!token) {
                res.send({success: false, message: 'Give the token❗'})
                return
            }

            let {login}:any = verify(token, 'secret-key-erp-forward')

            if(!login) {
                res.send({success: false, message: 'Wrong token❗'})
                return
            }

            let checkUser = await this.userRepo.findOne({where: {login: login}})

            if(!checkUser) {
                res.send({success: false, message: 'You are not found💔'})
                return
            }
            if(checkUser.role != 'supportTeacher') res.send({success: false, message: 'You are not able to do this💔'})

            next()

        } catch (error) {
            res.send({success: false, message: 'Something wrong with token❗'})
        }
    }
}