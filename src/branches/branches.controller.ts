import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post('create')
  @ApiOperation({description: "Creating Branches"})
  @ApiOkResponse({
    description: "Successfully created✅",
    type: CreateBranchDto
  })
  @ApiBadRequestResponse({description: "This room in this branch already exists❗"})
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({description: "Getting all Branches"})
  @ApiOkResponse({
    type: CreateBranchDto
  })
  @ApiBadRequestResponse({description: "Not found❗"})
  findAll() {
    return this.branchesService.findAll();
  }

  @Get(':id')
  @ApiOperation({description: "Getting one Branch"})
  @ApiOkResponse({
    type: CreateBranchDto
  })
  @ApiBadRequestResponse({description: "Not found❗"})
  findOne(@Param('id') id: string) {
    return this.branchesService.findOne(+id);
  }

  @Patch('update/:id')
  @ApiOperation({description: "Updating Branches"})
  @ApiOkResponse({
    description: "Successfully updated✅",
    type: UpdateBranchDto
  })
  @ApiBadRequestResponse({description: "This room in this branch already exists❗ | There is no such Branch❗"})
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @Delete('delete/:id')
  @ApiOperation({description: "Deleting Branch"})
  @ApiOkResponse({
    description: "Successfully deleted✅",
  })
  @ApiBadRequestResponse({description: "There is no such Branch❗"})
  remove(@Param('id') id: string) {
    return this.branchesService.remove(+id);
  }
}
