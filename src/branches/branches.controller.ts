import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('branches')
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('locationImage', {
      storage: diskStorage({
        destination: './uploads/branches', // Папка для сохранения файлов
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Получение расширения файла
          callback(null, `branch-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiOperation({description: "Creating Branches"})
  @ApiOkResponse({
    description: "Successfully created✅",
    type: CreateBranchDto
  })
  @ApiBadRequestResponse({description: "This room in this branch already exists❗"})
  create(@Body() createBranchDto: CreateBranchDto, @UploadedFile() locationImg: Express.Multer.File) {
    return this.branchesService.create(createBranchDto, locationImg?.filename);
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
  @UseInterceptors(
    FileInterceptor('locationImage', {
      storage: diskStorage({
        destination: './uploads/branches', // Папка для сохранения файлов
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname); // Получение расширения файла
          callback(null, `branch-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  @ApiOperation({description: "Updating Branches"})
  @ApiOkResponse({
    description: "Successfully updated✅",
    type: UpdateBranchDto
  })
  @ApiBadRequestResponse({description: "This room in this branch already exists❗ | There is no such Branch❗"})
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto, @UploadedFile() locationImg: Express.Multer.File) {
    return this.branchesService.update(+id, updateBranchDto, locationImg?.filename);
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
