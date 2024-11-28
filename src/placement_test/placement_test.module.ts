import { Module } from '@nestjs/common';
import { PlacementTestService } from './placement_test.service';
import { PlacementTestController } from './placement_test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacementTest } from './entities/placement_test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlacementTest])],
  controllers: [PlacementTestController],
  providers: [PlacementTestService],
})
export class PlacementTestModule {}
