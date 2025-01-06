import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SelfTeacherUpdateDto } from './dto/self-teacher-update.dto';
import { extname } from 'path';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post('create')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'teacherImg', maxCount: 1 }, // Поле для teacherImg
        { name: 'IELTSscoreImg', maxCount: 1 }, // Поле для IELTSscoreImg
      ],
      {
        storage: diskStorage({
          destination: './uploads/teachers', // Папка для загрузки файлов
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname); // Получаем расширение файла
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Уникальное имя файла
          },
        }),
        fileFilter: (req, file, callback) => {
          // Фильтр для проверки формата файла (только изображения)
          if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      },
    ),
  )
  @ApiOperation({summary: 'Creating a teacher'})
  @ApiOkResponse({
    description: 'Teacher successfully created',
    type: CreateTeacherDto
  })
  @ApiBadRequestResponse({
    description: 'Teacher already exists'
  })
  create(@Body() createTeacherDto: CreateTeacherDto, @UploadedFiles() files: {
    teacherImg?: Express.Multer.File[];
    IELTSscoreImg?: Express.Multer.File[];
  }) {
    let IELTSscoreImg = files.IELTSscoreImg.find((el) => el.filename).filename
    let teacherImg = files.teacherImg.find((el) => el.filename).filename
    return this.teachersService.create(createTeacherDto, IELTSscoreImg, teacherImg);
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


  @Get('all')
  @ApiOperation({summary: 'Getting all teachers'})
  @ApiOkResponse({
    description: 'Found',
    type: CreateTeacherDto
  })
  @ApiBadRequestResponse({
    description: 'Not found'
  })
  findAllTeachers() {
    return this.teachersService.findAllTeachers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }

  @Patch('update/:id')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'teacherImg', maxCount: 1 }, // Поле для teacherImg
        { name: 'IELTSscoreImg', maxCount: 1 }, // Поле для IELTSscoreImg
      ],
      {
        storage: diskStorage({
          destination: './uploads/teachers', // Папка для загрузки файлов
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname); // Получаем расширение файла
            callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Уникальное имя файла
          },
        }),
        fileFilter: (req, file, callback) => {
          // Фильтр для проверки формата файла (только изображения)
          if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      },
    ),
  )
  @ApiOperation({summary: 'Updating Teachers'})
  @ApiOkResponse({
    description: 'Successfully updated',
    type: UpdateTeacherDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such Teacher | There is no such Group'
  })
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto, @UploadedFiles() files: {teacherImg?: Express.Multer.File[], IELTSscoreImg?: Express.Multer.File[]}) {
    let teacherImg = files.teacherImg.find((el) => el.filename).filename
    let IELTSscoreImg = files.IELTSscoreImg.find((el) => el.filename).filename
    return this.teachersService.update(+id, updateTeacherDto, teacherImg, IELTSscoreImg);
  }

  @Patch('me/update/:id')
  @UseInterceptors(
      FileInterceptor('teacherImg', {
        storage: diskStorage({
          destination: './uploads/teachers', // Папка для сохранения файлов
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname); // Получение расширения файла
            callback(null, `teacher-${uniqueSuffix}${ext}`);
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
  @ApiOperation({summary: 'Updating Self teachers info'})
  @ApiOkResponse({
    description: 'Successfully updated',
    type: UpdateTeacherDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such Teacher'
  })
  selfUpdate(@Param('id') id: string, @Body() selfUpdateTeacherDto: SelfTeacherUpdateDto, @UploadedFile() teacherImg: Express.Multer.File) {
    return this.teachersService.selfUpdate(+id, selfUpdateTeacherDto, teacherImg?.filename);
  }

  @Delete('delete/:id')
  @ApiOperation({summary: 'Deleting Teachers'})
  @ApiOkResponse({
    description: 'Successfully deleted'
  })
  @ApiBadRequestResponse({
    description: 'There is no such Teacher'
  })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
