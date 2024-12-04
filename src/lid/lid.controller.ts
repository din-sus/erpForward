import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LidService } from './lid.service';
import { CreateLidDto } from './dto/create-lid.dto';
import { UpdateLidDto } from './dto/update-lid.dto';

@Controller('lid')
export class LidController {
  constructor(private readonly lidService: LidService) {}

  @Post('create')
  create(@Body() createLidDto: CreateLidDto) {
    return this.lidService.create(createLidDto);
  }

  @Get()
  findAll() {
    return this.lidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lidService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLidDto: UpdateLidDto) {
    return this.lidService.update(+id, updateLidDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.lidService.remove(+id);
  }
}
