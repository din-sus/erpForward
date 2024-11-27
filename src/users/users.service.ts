import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

  async register(registerUserDto: RegisterUserDto) {
    let checkUser = await this.userModel.find(registerUserDto)

    if(checkUser) return {success: false, message: 'You registered before, please login❗'}

    let registerUser = await this.userModel.create(registerUserDto)
    await registerUser.save()
    return {success: true, message: 'You have successsfully registered✅'}
  }

  async login(loginUserDto: LoginUserDto) {
    let checkLogin = await this.userModel.find(loginUserDto)

    if(!checkLogin) return {success: false, message: 'You cannot login, first you have to register❗'}

    let token = sign({login: loginUserDto.login}, 'secret-key-erp-forward')
    return {success: true, message: 'You have successfully logined✅', token: token}
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
