import { Injectable, Req } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Request } from 'express';
import { SelfTeacherUpdateDto } from './dto/self-teacher-update.dto';

@Injectable()
export class TeachersService {
  constructor(@InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>, 
              @InjectRepository(Group) private readonly groupRepo: Repository<Group>){}

  async create(createTeacherDto: CreateTeacherDto) {
    try {
      let check = await this.teacherRepo.findOne({where: {login: createTeacherDto.login}})
      let findTheGroup = await this.groupRepo.find({where: {teacherName: createTeacherDto.fullname}})

      if(check) return {success: false, message: 'The teacher already exists❗'}
      
      let createTeacher = this.teacherRepo.create(createTeacherDto)

      if(!findTheGroup) {
        createTeacher.group = []
        await this.teacherRepo.save(createTeacher)
        return {success: true, message: 'Successfully created✅'}
      }

      createTeacher.group = findTheGroup
      await this.teacherRepo.save(createTeacher)

      return {success: true, message: 'Successfully created✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll() {
    try {
      return await this.teacherRepo.find({
        relations: ['group']
      })
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAllTeachers() {
    try {
      return await this.teacherRepo.find()

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    try {
      let checkTeacher = await this.teacherRepo.findOne({where: {id: id}})
      let checkGroup = await this.groupRepo.findOne({where: {teacherName: updateTeacherDto.fullname}})

      if(!checkTeacher) return {success: false, message: 'There is no such Teacher❗'}
      if(!checkGroup) return {success: false, message: 'There is no such Group❗'}

      let update = this.teacherRepo.merge(checkTeacher, updateTeacherDto)
      await this.teacherRepo.save(update)

      return {success: true, message: 'Successfully updated✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async selfUpdate(id: number, selfUpdateDto: SelfTeacherUpdateDto){
    try {
      let check = await this.teacherRepo.findOne({where: {id: id}})

      if(!check) return {success: false, message: 'There is no such Teacher❗'}

      let update = this.teacherRepo.merge(check, selfUpdateDto)
      await this.teacherRepo.save(update)

      return {success: true, message: 'Successfully updated✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let check = await this.teacherRepo.findOne({where: {id: id}})

      if(!check) return {success: false, message: 'There is no such Teacher❗'}

      await this.teacherRepo.delete(check)
      return {success: true, message: 'Successfully deleted✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }
}
