import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LidService } from './lid.service';
import { CreateLidDto } from './dto/create-lid.dto';
import { UpdateLidDto } from './dto/update-lid.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LidPaginationDto } from './dto/lid-pagination.dto';

@Controller('lid')
export class LidController {
  constructor(private readonly lidService: LidService) {}

  @ApiOperation({summary: 'Saving users info, in LID table'})
  @ApiOkResponse({description: "Successfully sended✅, wait until the Administrator will call you", type: CreateLidDto})
  @ApiBadRequestResponse({description: 'You already sended a message❗'})
  @Post('create')
  create(@Body() createLidDto: CreateLidDto) {
    return this.lidService.create(createLidDto);
  }

  @ApiOperation({summary: 'Getting users calls from LID table'})
  @ApiOkResponse({description: "Found successfully", type: CreateLidDto})
  @ApiBadRequestResponse({description: 'Data not found'})
  @Get()
  findAll(@Body() lidPaginationDto: LidPaginationDto) {
    return this.lidService.findAll(lidPaginationDto);
  }

  @ApiOperation({summary: 'Getting one exact users info from LID table'})
  @ApiOkResponse({description: "Found", type: CreateLidDto})
  @ApiBadRequestResponse({description: 'Data not found'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lidService.findOne(+id);
  }

  @ApiOperation({summary: 'Updating users info, in LID table'})
  @ApiOkResponse({description: "Successfully updated", type: CreateLidDto})
  @ApiBadRequestResponse({description: 'There is no such user'})
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateLidDto: UpdateLidDto) {
    return this.lidService.update(+id, updateLidDto);
  }

  @ApiOperation({summary: 'Deleting users info, in LID table'})
  @ApiOkResponse({description: "Successfully deleted", type: CreateLidDto})
  @ApiBadRequestResponse({description: 'There is no such user'})
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.lidService.remove(+id);
  }
}
