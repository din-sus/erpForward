import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

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
  @ApiOperation({summary: 'User creating side'})
  @ApiOkResponse({
    description: 'User created successfully',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({
    description: 'This user already exists',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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

  @Get(':id')
  @ApiOperation({summary: 'Getting one exact user side'})
  @ApiOkResponse({
    description: 'Found successfully',
    type: CreateUserDto
  })
  @ApiBadRequestResponse({
    description: 'There is no such user',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
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
