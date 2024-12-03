import { Injectable } from '@nestjs/common';
import { CreateLidDto } from './dto/create-lid.dto';
import { UpdateLidDto } from './dto/update-lid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lid } from './entities/lid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LidService {
  constructor(@InjectRepository(Lid) private readonly lidRepo: Repository<Lid>){}

  create(createLidDto: CreateLidDto) {
    return 'This action adds a new lid';
  }

  async findAll() {
    try {
      return await this.lidRepo.find()
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findOne(id: number) {
    try {
      return await this.lidRepo.findOne({where: {id: id}})
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  update(id: number, updateLidDto: UpdateLidDto) {
    return `This action updates a #${id} lid`;
  }

  async remove(id: number) {
    try {
      let check = await this.lidRepo.findOne({where: {id: id}})

      if(!check) return {success: false, message: 'There is no such User'}

      await this.lidRepo.delete(check)

      return{ success: true, message: 'Found'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }
}
