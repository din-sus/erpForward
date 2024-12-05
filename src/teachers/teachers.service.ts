import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';

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

  async findOne(id: number) {
    return `This action returns a #${id} teacher`;
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  async remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
