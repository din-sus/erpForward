import { Injectable } from '@nestjs/common';
import { CreateLidDto } from './dto/create-lid.dto';
import { UpdateLidDto } from './dto/update-lid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lid } from './entities/lid.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LidService {
  constructor(@InjectRepository(Lid) private readonly lidRepo: Repository<Lid>){}

  async create(createLidDto: CreateLidDto) {
    try {
      let check = await this.lidRepo.findOne({where: {phoneNumber: createLidDto.phoneNumber}})

      if(check) return {success: false, message: 'You already sended a message❗'}

      let create = this.lidRepo.create(createLidDto)
      await this.lidRepo.save(create)

      return {success: true, message: 'Successfully sended✅, wait until the Administrator will call you'}

    } catch (error) {
      return {success: false, message: error.message}
    }
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

  async update(id: number, updateLidDto: UpdateLidDto) {
    try {
      let check = await this.lidRepo.findOne({where: {id: id}})

      if(!check) return {success: false, message: 'There is no such User❗'}

      let update = this.lidRepo.merge(check, updateLidDto)
      await this.lidRepo.save(update)

      return {success: true, message: 'Successfully updated✅'}
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let check = await this.lidRepo.findOne({where: {id: id}})

      if(!check) return {success: false, message: 'There is no such User❗'}

      await this.lidRepo.delete(check)

      return{ success: true, message: 'Deleted successfully✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }
}
