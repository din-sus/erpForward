import { Module } from '@nestjs/common';
import { LidService } from './lid.service';
import { LidController } from './lid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lid } from './entities/lid.entity';
import { LidColumnEntity } from './entities/column.lid.dto';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lid, LidColumnEntity, Student])],
  controllers: [LidController],
  providers: [LidService],
})
export class LidModule {}
