import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Saving info about a student'
  })
  @ApiOkResponse({
    description: 'Successfully created',
    type: CreateStudentDto
  })
  @ApiBadRequestResponse({
    description: 'This student already exists | There is no such group | There is no such user'
  })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Getting all students and all info about them'
  })
  @ApiOkResponse({
    description: 'Successfully found'
  })
  @ApiBadRequestResponse({
    description: 'No such relations found'
  })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Getting info about one exact student'
  })
  @ApiOkResponse({
    description: 'Successfully found'
  })
  @ApiBadRequestResponse({
    description: 'No such relation found'
  })
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Updating info about a student'
  })
  @ApiOkResponse({
    description: 'Successfully updated',
    type: UpdateStudentDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such student | There is no such group | There is no such user'
  })
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: 'Deleting info about a student'
  })
  @ApiOkResponse({
    description: 'Successfully deleted'
  })
  @ApiBadRequestResponse({
    description: 'There is no such student'
  })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
