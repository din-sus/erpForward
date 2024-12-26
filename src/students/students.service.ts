import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/users.entity';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private readonly studentRepo: Repository<Student>, @InjectRepository(Group) private readonly groupRepo: Repository<Group>, @InjectRepository(User) private readonly userRepo: Repository<User>){}

  async create(createStudentDto: CreateStudentDto) {
    try {
      let checkStudent = await this.studentRepo.findOne({where: {phoneNumber: createStudentDto.phoneNumber}})

      let checkGroup = await this.groupRepo.findOne({where: {name: createStudentDto.groupName}})

      if(checkStudent) return {success: false, message: 'Student already studies in the group❗'}
      
      if(!checkGroup) return {success: false, message: 'There is no such group❗'}

      let create = this.studentRepo.create({
        ...createStudentDto,
        level: checkGroup.level,
        branch: checkGroup.branch,
        courseStartingDate: checkGroup.courseStartingDate,
        courseEndingDate: checkGroup.courseEndingDate,
        group: checkGroup,
      })

      await this.studentRepo.save(create)

      return {success: true, message: 'Created successfully✅'}
    
    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll() {
    try {
      return await this.studentRepo.find({relations: ['group']})

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findInDept() {
    try {
      let all = await this.studentRepo.find({relations: ['group']})
      let depts = all.filter((el) => Number(el.balance) < 0)
      
      return depts

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findOne(id: number) {
    try {
      return await this.studentRepo.findOne({where: {id: id}, relations: ['group']})

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    let checkStudent = await this.studentRepo.findOne({where: {id: id}})

    let checkGroup = await this.groupRepo.findOne({where: {name: updateStudentDto.groupName}})

    let checkUser = await this.userRepo.findOne({where: {phoneNumber: updateStudentDto.phoneNumber}})

    if(!checkStudent) return {success: false, message: 'There is no such Student❗'}

    if(!checkGroup) return {success: false, message: 'There is no such Group❗'}

    let update = this.studentRepo.merge(checkStudent, updateStudentDto)
    await this.studentRepo.save(update)

    return {success: true, message: 'Updated successfully✅'}
  }

  async remove(id: number) {
    let checkStudent = await this.studentRepo.findOne({where: {id: id}})

    if(!checkStudent) return {success: false, message: 'There is no such Student'}

    let Delete = this.studentRepo.delete(checkStudent)

    return {success: true, message: 'Deleted successfully✅'}
  }
}
