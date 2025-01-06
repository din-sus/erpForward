import { NestMiddleware } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Model } from "mongoose";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

export class VerifyToken implements NestMiddleware{
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>){}

    async use(req: Request, res: Response, next: NextFunction) {
        try {
            let token: any = req.headers.token

            if(!token) {
                res.send({success: false, message: 'Give the token❗'})
                return
            }

            let {login}:any = verify(token, 'secret-key-erp-forward')
            let {newLogin}:any = verify(token, 'secret-key-erp-forward')

            if(!login) {
                if(!newLogin) {
                    res.send({success: false, message: 'Wrong token❗'})
                    return
                }
            }

            let checkUser = await this.userRepo.findOne({where: {login: login}})

            if(!checkUser) {
                res.send({success: false, message: 'You are not found💔'})
                return
            }
            if(checkUser.role != 'admin') res.send({success: false, message: 'You are not able to do this💔'})

            next()

        } catch (error) {
            res.send({success: false, message: error.message})
        }
    }
}