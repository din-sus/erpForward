import { Injectable } from '@nestjs/common';
import { CreateLidDto } from './dto/create-lid.dto';
import { UpdateLidDto } from './dto/update-lid.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lid } from './entities/lid.entity';
import { Repository } from 'typeorm';
import { LidPaginationDto } from './dto/lid-pagination.dto';
import { LidColumnEntity } from './entities/column.lid.dto';
import { ColumnsDto } from './dto/create-columns.dto';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class LidService {
  constructor(@InjectRepository(Lid) private readonly lidRepo: Repository<Lid>,
  @InjectRepository(LidColumnEntity) private readonly lidColumn: Repository<LidColumnEntity>,
  @InjectRepository(Student) private readonly studentRepo: Repository<Student>){}

  async create(createLidDto: CreateLidDto) {
    try {
      let check = await this.lidRepo.findOne({where: {phoneNumber: createLidDto.phoneNumber}})

      if(check) return {success: false, message: 'You already sended a message❗'}

      let create = this.lidRepo.create(createLidDto)
      create.student = await this.studentRepo.findOne({where: {phoneNumber: createLidDto.phoneNumber}})
      create.column = await this.lidColumn.findOne({where: {status: createLidDto.status}})
      await this.lidRepo.save(create)

      return {success: true, message: 'Successfully sended✅, wait until the Administrator will call you'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async createLidColumn(lidColumnDto: ColumnsDto){
    try {
      let check = await this.lidColumn.findOne({where: {title: lidColumnDto.title}})

      if(check) return {success: false, message: 'Column already exists❗'}

      let create = this.lidColumn.create(lidColumnDto)
      create.items = await this.lidRepo.find({where: {status: lidColumnDto.status}})
      await this.lidColumn.save(create)
      console.log(create)
      return {success: true, message: 'Successfully created✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async getLidColumns(){
    try {
      return await this.lidColumn.find({relations: ['items']})

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll(lidPagination: LidPaginationDto) {
    try {
      return await this.lidRepo.find({
        order: {id: 'DESC'},
        skip: lidPagination.skip,
        take: lidPagination.limit || 8,
        relations: ['student', 'column']
      })
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
      update.column = await this.lidColumn.findOne({where: {status: updateLidDto.status}})
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
