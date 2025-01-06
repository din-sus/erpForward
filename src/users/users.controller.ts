import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Request, request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({summary: 'Registering side'})
  @ApiOkResponse({
    description: 'Registered successfully',
    type: RegisterUserDto
  })
  @ApiBadRequestResponse({
    description: 'You registered before, please login',
  })
  register(@Body() registerUserDto: RegisterUserDto){
    return this.usersService.register(registerUserDto)
  }

  @Post('login')
  @ApiOperation({summary: 'Logining side'})
  @ApiOkResponse({
    description: 'Logined successfully',
    type: LoginUserDto
  })
  @ApiBadRequestResponse({
    description: 'Please register, or check your login and password',
  })
  login(@Body() loginUserDto: LoginUserDto){
    return this.usersService.login(loginUserDto)
  }

  @Post('create')
  @UseInterceptors(
      FileInterceptor('photo', {
        storage: diskStorage({
          destination: './uploads/users', // Папка для сохранения файлов
          filename: (req, file, callback) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname); // Получение расширения файла
            callback(null, `user-${uniqueSuffix}${ext}`);
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
  @ApiOperation({summary: 'User creating side'})
  @ApiOkResponse({
    description: 'User created successfully',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({
    description: 'This user already exists',
  })
  create(@Body() createUserDto: CreateUserDto, @UploadedFile() photo: Express.Multer.File) {
    return this.usersService.create(createUserDto, photo?.filename);
  }

  @Get('all')
  @ApiOperation({summary: 'Getting all users side'})
  @ApiOkResponse({
    description: 'Found successfully',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({
    description: 'No such info found',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('one')
  @ApiOperation({summary: 'Getting one exact user side'})
  @ApiOkResponse({
    description: 'Found successfully',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user',
  })
  findOne(@Req() request: Request) {
    return this.usersService.findOne(request);
  }

  @Patch('update/:id')
  @ApiOperation({summary: 'User updating side'})
  @ApiOkResponse({
    description: 'Updated successfully',
    type: UpdateUserDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user',
  })
  update(@Req() request: Request, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(request, +id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({summary: 'User deleting side'})
  @ApiOkResponse({
    description: 'Deleted successfully',
    type: RegisterUserDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
