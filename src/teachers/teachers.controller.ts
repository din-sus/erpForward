import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post('create')
  @ApiOperation({summary: 'Creating a teacher'})
  @ApiOkResponse({
    description: 'Teacher successfully created',
    type: CreateTeacherDto
  })
  @ApiBadRequestResponse({
    description: 'Teacher already exists'
  })
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     filename(req, file, callback) {
  //       callback(null, 'file.png')
  //     },
  //   })
  // }))
  create(@Body() createTeacherDto: CreateTeacherDto) {
    // console.log(file)
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({summary: 'Getting teachers groups'})
  @ApiOkResponse({
    description: 'Found',
    type: CreateTeacherDto
  })
  @ApiBadRequestResponse({
    description: 'Not found'
  })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
