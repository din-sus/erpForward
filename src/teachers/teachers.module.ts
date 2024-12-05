import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { Group } from 'src/groups/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, Group])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
