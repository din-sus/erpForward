import { Module } from '@nestjs/common';
import { LidService } from './lid.service';
import { LidController } from './lid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lid } from './entities/lid.entity';
import { LidColumnEntity } from './entities/column.lid.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Lid, LidColumnEntity])],
  controllers: [LidController],
  providers: [LidService],
})
export class LidModule {}
