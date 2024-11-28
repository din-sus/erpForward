import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PlacementTestService } from './placement_test.service';
import { CreatePlacementTestDto } from './dto/create-placement_test.dto';
import { UpdatePlacementTestDto } from './dto/update-placement_test.dto';

@Controller('placement-test')
export class PlacementTestController {
  constructor(private readonly placementTestService: PlacementTestService) {}

  @Post('create')
  create(@Body() createPlacementTestDto: CreatePlacementTestDto) {
    return this.placementTestService.create(createPlacementTestDto);
  }

  @Get()
  findAll() {
    return this.placementTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.placementTestService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePlacementTestDto: UpdatePlacementTestDto) {
    return this.placementTestService.update(+id, updatePlacementTestDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.placementTestService.remove(+id);
  }
}
