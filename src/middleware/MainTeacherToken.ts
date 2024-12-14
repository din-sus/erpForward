import { NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Teacher } from "src/teachers/entities/teacher.entity";
import { User } from "src/users/entities/users.entity";
import { Repository } from "typeorm";

export class MainTeacherToken implements NestMiddleware{
    constructor(@InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>){}

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

            let checkUser = await this.teacherRepo.findOne({where: {login: login}})
            console.log(checkUser)

            if(!checkUser) {
                res.send({success: false, message: 'You are not found💔'})
                return
            }
            if(checkUser.role != 'mainTeacher') res.send({success: false, message: 'You are not able to do this💔'})

            next()

        } catch (error) {
            res.send({success: false, message: 'Something wrong with token❗'})
        }
    }
}