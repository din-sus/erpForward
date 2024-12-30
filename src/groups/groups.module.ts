import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Student } from 'src/students/entities/student.entity';
import { Branch } from 'src/branches/entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Student, Branch])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
