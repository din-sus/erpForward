import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Teacher])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
