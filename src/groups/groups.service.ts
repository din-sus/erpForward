import { Injectable, Query } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { FilterLessonsDto } from './dto/filter-group.dto';
import { GroupPaginationDto } from './dto/pagination-group.dto';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class GroupsService {
  constructor(@InjectRepository(Group) private readonly groupRepo: Repository<Group>, @InjectRepository(Student) private readonly studentRepo: Repository<Student>){}

  async filter(filters: FilterLessonsDto) {
    const queryBuilder = this.groupRepo.createQueryBuilder('group');

    // Динамически применяем фильтры
    if (filters.name) {
      queryBuilder.andWhere('group.name ILIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.level) {
      queryBuilder.andWhere('group.level = :level', { level: filters.level });
    }
    if (filters.branch) {
      queryBuilder.andWhere('group.branch = :branch', { branch: filters.branch });
    }
    if (filters.daysOfLessons) {
      queryBuilder.andWhere('group.daysOfLessons = :daysOfLessons', { daysOfLesson: filters.daysOfLessons });
    }
    if (filters.status) {
      queryBuilder.andWhere('group.status = :status', { status: filters.status });
    }

    return await queryBuilder.getMany();
  }

  async create(createGroupDto: CreateGroupDto) {
    try {
      let checkUser = await this.groupRepo.findOne({where: {name: createGroupDto.name}})

      if(checkUser) return {success: false, message: 'Group is already exists❗'}
      let create = this.groupRepo.create(createGroupDto)
      await this.groupRepo.save(create)

      return {success: true, message: 'Group created successfully✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll(groupPagination: GroupPaginationDto) {
    try {
      return await this.groupRepo.find({
        order: {id: 'DESC'},
        skip: groupPagination.skip,
        take: groupPagination.limit || 8,
        relations: ['student']
      })
    } catch (error) {
      return {success: false, message: 'There is no data❗'}
    }
  }

  async findOne(id: number) {
    try {
      return await this.groupRepo.findOne({
        where: {id: id},
        order: {id: 'DESC'},
        relations: ['student']
      })
    } catch (error) {
      return {success: false, message: 'There is no data❗'}
    }
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    try {
      let check = await this.groupRepo.findOne({where: {id: id}})

      if(!check) return {success: false, message: 'There is no such Group❗'}

      let update = this.groupRepo.merge(check, updateGroupDto)
      await this.groupRepo.save(update)

      return {success: false, message: "Updated successfully✅"}

    } catch (error) {
      return {sucess: false, message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let check = await this.groupRepo.findOneBy({id: id})

      if(!check) return {success: false, message: 'There is no such User❗'}
      await this.groupRepo.delete(check)

      return {success: true, message: 'Deleted successfully✅'}
    } catch (error) {
      return {sucess: false, message: error.message}
    }
  }
}
