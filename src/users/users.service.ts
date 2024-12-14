import { Injectable, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { sign, verify } from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity';
import { Request, request } from 'express';
import { UpdateStudentDto } from 'src/students/dto/update-student.dto';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>, @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>){}

  async register(registerUserDto: RegisterUserDto) {
    try {
      let checkUser = await this.userRepo.findOne({where: {login: registerUserDto.login}})

      if(checkUser) return {success: false, message: 'You registered before, please login❗'}

      let registerUser = this.userRepo.create(registerUserDto)
      await this.userRepo.save(registerUser)

      return {success: true, message: 'You have successsfully registered✅'}
      
    } catch (error) {
      return {succes: false, message: error.message}
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let checkLogin = await this.userRepo.findOne({where: {login: loginUserDto.login, password: loginUserDto.password}})
    let teacherCheck = await this.teacherRepo.findOne({where: {login: loginUserDto.login, password: loginUserDto.password}})

    if(!checkLogin) {
      if(!teacherCheck) {
        return {success: false, message: 'You cannot login, first you have to register❗'}
      }
    }

    let token = sign({login: loginUserDto.login}, 'secret-key-erp-forward')
    return {success: true, message: 'You have successfully logined✅', token: token}
  }

  async create(createUserDto: CreateUserDto) {
    try {
      let checkIfExists = await this.userRepo.findOne({where: {login: createUserDto.login}})

      if(checkIfExists) return {success: false, message: 'This user already exists❗'}

      let createUser = this.userRepo.create(createUserDto)
      await this.userRepo.save(createUser)

      return {success: true, message: 'Created successfully✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll() {
    try {
      return await this.userRepo.find()
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findOne(@Req() request: Request) {
    let token:any = request.headers.token
    let {login}:any = verify(token, 'secret-key-erp-forward')
    let {newLogin}:any = verify(token, 'secret-key-erp-forward')

    if(!login) {
      if(!newLogin) {
        return {success: false, message: 'Token hato❗'}
      }
    }

    let checkUser = await this.userRepo.findOne({where: {login: login || newLogin}})
    let checkTeacher = await this.teacherRepo.findOne({where: {login: login}})

    if(!checkUser) {
      if(!checkTeacher){
        return {success: false, message: 'There is no such User❗'}
      }
    }

    if(checkUser && !checkTeacher) return checkUser
    if(!checkUser && checkTeacher) return checkTeacher
  }

  async update(@Req() request: Request, id: number, updateUserDto: UpdateUserDto) {
    let check = await this.userRepo.findOne({where: {id: id}})

    if(!check) return {success: false, message: 'There is no such user💔'}

    let update = this.userRepo.merge(check, updateUserDto)

    let token:any = request.headers.token
    let {login}: any = verify(token, 'secret-key-erp-forward')
    let newLogin = login
    newLogin = updateUserDto.login

    let newToken = sign({newLogin}, 'secret-key-erp-forward')

    await this.userRepo.save(update)

    return {success: true, message: 'Updated successfully✅', token: newToken}
  }

  async remove(id: number) {
    let deleteUser = await this.userRepo.findOne({where: {id}})

    if(!deleteUser) return {success: false, message: 'There is no such User💔'}
    
    let d = await this.userRepo.delete(deleteUser)
    return {success: true, message: 'Successfully deleted✅'}
  }
}
