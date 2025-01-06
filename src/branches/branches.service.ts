import { Injectable } from '@nestjs/common';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';

@Injectable()
export class BranchesService {
  constructor(@InjectRepository(Branch) private readonly branchRepo: Repository<Branch>,
             @InjectRepository(Group) private readonly groupRepo: Repository<Group>){}
  async create(createBranchDto: CreateBranchDto, locationImg: any) {
    try {
      let checkRoomInBranch = await this.branchRepo.findOne({where: {roomName: createBranchDto.roomName, name: createBranchDto.name}})

      if(checkRoomInBranch) return {success: false, message: 'This room already exists in this Branch❗'}

      let create = this.branchRepo.create(createBranchDto)
      create.locationImg = locationImg
      create.group = await this.groupRepo.find({where: {branch: createBranchDto.name}})
      await this.branchRepo.save(create)

      return {success: true, message: 'Successfully created✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async findAll() {
    return await this.branchRepo.find({relations: ['group'], order: {id: 'DESC'}})
  }

  async findOne(id: number) {
    return await this.branchRepo.findOne({where: {id: id}, relations: ['group']})
  }

  async update(id: number, updateBranchDto: UpdateBranchDto, locationImage: any) {
    try {
      let checkBranch = await this.branchRepo.findOne({where: {id: id}})
      let checkRoomInBranch = await this.branchRepo.findOne({where: {roomName: updateBranchDto.roomName, name: updateBranchDto.name}})

      if(!checkBranch) return {success: false, message: 'There is no such Branch❗'}
      if(checkRoomInBranch) return {success: false, message: 'This room already exists in this Branch❗'}

      let update = this.branchRepo.merge(checkBranch, updateBranchDto)
      if(locationImage != null) update.locationImg = locationImage
      await this.branchRepo.save(update)

      return {success: true, message: 'Successfully updated✅'}

    } catch (error) {
      return {success: false, message: error.message}
    }
  }

  async remove(id: number) {
    let check = await this.branchRepo.findOne({where: {id: id}})

    if(!check) return {success: false, message: 'There is no such Branch❗'}

    await this.branchRepo.delete(check)
    return {success: true, message: 'Deleted successfully✅'}
  }
}
