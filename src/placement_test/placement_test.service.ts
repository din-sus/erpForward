import { Injectable } from '@nestjs/common';
import { CreatePlacementTestDto } from './dto/create-placement_test.dto';
import { UpdatePlacementTestDto } from './dto/update-placement_test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlacementTest } from './entities/placement_test.entity';
import { Repository } from 'typeorm';
import { TestPaginationDto } from './dto/pagination-test.dto';

@Injectable()
export class PlacementTestService {
  constructor(@InjectRepository(PlacementTest) private readonly testRepo: Repository<PlacementTest>){}

  async create(createPlacementTestDto: CreatePlacementTestDto) {
    try {
      if(!createPlacementTestDto.module1) createPlacementTestDto.module1 = 0
      if(!createPlacementTestDto.module2) createPlacementTestDto.module2 = 0
      if(!createPlacementTestDto.module3) createPlacementTestDto.module3 = 0
      if(!createPlacementTestDto.writing) createPlacementTestDto.writing = ''
      if(!createPlacementTestDto.total) createPlacementTestDto.total = 0
      if(!createPlacementTestDto.level) createPlacementTestDto.level = 'Beginner'
      if(!createPlacementTestDto.writingMark) createPlacementTestDto.writingMark = 0

      createPlacementTestDto.total = createPlacementTestDto.module1 + createPlacementTestDto.module2 + createPlacementTestDto.module3

      if(createPlacementTestDto.total <= 10){
        createPlacementTestDto.level = 'Beginner'
        let create = this.testRepo.create(createPlacementTestDto)
        await this.testRepo.save(create)
        return {success: true, message: 'Successfully created✅'}
      }
      
      if(createPlacementTestDto.total >= 11 && createPlacementTestDto.total <= 20){
        createPlacementTestDto.level = 'Elementary'
        let create = this.testRepo.create(createPlacementTestDto)
        await this.testRepo.save(create)
        return {success: true, message: 'Successfully created✅'}
      }

      if(createPlacementTestDto.total >= 21 && createPlacementTestDto.total <= 30){
        createPlacementTestDto.level = 'Pre-intermediate'
        let create = this.testRepo.create(createPlacementTestDto)
        await this.testRepo.save(create)
        return {success: true, message: 'Successfully created✅'}
      }

      if(createPlacementTestDto.total >= 31 && createPlacementTestDto.total <= 40){
        createPlacementTestDto.level = 'Intermediate'
        let create = this.testRepo.create(createPlacementTestDto)
        await this.testRepo.save(create)
        return {success: true, message: 'Successfully created✅'}
      }

      if(createPlacementTestDto.total >= 41 && createPlacementTestDto.total <= 50){
        createPlacementTestDto.level = 'Upper-intermediate'
        let create = this.testRepo.create(createPlacementTestDto)
        await this.testRepo.save(create)
        return {success: true, message: 'Successfully created✅'}
      }

      if(createPlacementTestDto.total >= 51 && createPlacementTestDto.total <= 60){
        createPlacementTestDto.level = 'Advanced'
        let create = this.testRepo.create(createPlacementTestDto)
        await this.testRepo.save(create)
        return {success: true, message: 'Successfully created✅'}
      }

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll(paginationTest: TestPaginationDto) {
    try {
      return await this.testRepo.find({
        order: {id: 'DESC'},
        skip: paginationTest.skip,
        take: paginationTest.limit || 8
      })
    } catch (error) {
      return {success: false, message: error.message}   
    }
  }

  async findOne(id: number) {
    try {
      let check = await this.testRepo.find()

      if(!check) return {success: false, message: 'There is no such user❗'}
      return check

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async update(id: number, updatePlacementTestDto: UpdatePlacementTestDto) {
    try {
      let check = await this.testRepo.findOneBy({id})

      if(!check) return {success: false, message: 'There is no such user❗'}

      Object.assign(check, updatePlacementTestDto);

    // Пересчитать total
      check.total = 
          (check.module1 || 0) + 
          (check.module2 || 0) + 
          (check.module3 || 0);

      // Сохранить изменения
      return this.testRepo.save(check);

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async remove(id: number) {
    try {
      let check = await this.testRepo.findOneBy({id})

      if(!check) return {success: false, message: 'There is no such user❗'}
      await this.testRepo.delete(check)

      return {success: true, message: 'Deleted successfully✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }
}
