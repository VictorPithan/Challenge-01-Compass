import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
  Res,
  Request as Req,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseUserDto } from './dto/response-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/pagination.dto';
import { ResponseUserListDto } from './dto/response-user-list.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@ApiTags('Users')
@Controller({ path: 'users', version: '1' })
@ApiBearerAuth('jwt-token')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Infos user created',
    type: ResponseUserDto
  })
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Show all users',
    type: ResponseUserListDto
  })
  findAll(@Query() pagination: PaginationDto): Promise<ResponseUserListDto> {
    return this.usersService.findAll(pagination);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Infos user authenticated',
    type: ResponseUserDto
  })
  async profile(@Req() req: Request): Promise<ResponseUserDto> {
    const token = req.headers.authorization?.split(' ')[1];
    const tokenPayload = await this.authService.getUserFromToken(token);

    return this.usersService.findOne(tokenPayload?.sub);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Infos user',
    type: ResponseUserDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Infos user updated',
    type: ResponseUserDto
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUserDto
  ): Promise<ResponseUserDto> {
    return this.usersService.update(id, updateUser);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted'
  })
  @ApiResponse({
    status: 404,
    description: 'User not found'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response> {
    await this.usersService.delete(id);
    return res.status(204).send();
  }
}
