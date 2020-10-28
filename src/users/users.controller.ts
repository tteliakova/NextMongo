import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  @Get(':userHash')
  findOne(@Param('userHash') userHash: string) {
    return this.usersService.findOne(userHash);
  }

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':userHash')
  update(@Param('userHash') userHash: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userHash, updateUserDto);
  }

  @Delete(':userHash')
  remove(@Param('userHash') userHash: string) {
    return this.usersService.remove(userHash);
  }
}
