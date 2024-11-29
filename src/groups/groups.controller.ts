import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { FilterLessonsDto } from './dto/filter-group.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get('filter')
  @ApiOperation({
    summary: 'Getting Groups with filtering'
  })
  @ApiOkResponse({
    description: 'Successfully found',
    type: FilterLessonsDto
  })
  async filter(@Query() filters: FilterLessonsDto) {
    return this.groupsService.filter(filters);
  }

  @Post('create')
  @ApiOperation({
    summary: 'Creating Group'
  })
  @ApiOkResponse({
    description: 'Successfully found',
    type: FilterLessonsDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user'
  })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Getting all Groups'
  })
  @ApiOkResponse({
    description: 'Successfully found',
    type: CreateGroupDto
  })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({
    summary: 'Updating Group'
  })
  @ApiOkResponse({
    description: 'Updated successfully',
    type: UpdateGroupDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user'
  })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deleting Group'
  })
  @ApiOkResponse({
    description: 'Successfully Deleted',
    type: FilterLessonsDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user'
  })
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
