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
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateKeynoteoDto } from './dto/create-keynote.dto';
import { UpdateKeynoteDto } from './dto/update-keynote.dto';
import { KeynotesService } from './keynotes.service';

@ApiTags('Keynotes')
@Controller('keynotes')
export class KeynotesController {
  constructor(private readonly keynotesService: KeynotesService) {}
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.keynotesService.findAll(paginationQuery);
  }

  @Get(':keynoteHash')
  findOne(@Param('keynoteHash') keynoteHash: string) {
    return this.keynotesService.findOne(keynoteHash);
  }

  @Post()
  create(@Body() createKeynoteDto: CreateKeynoteoDto) {
    return this.keynotesService.create(createKeynoteDto);
  }

  @Put(':keynoteHash')
  update(@Param('keynoteHash') keynoteHash: string, @Body() updateKeynoteDto: UpdateKeynoteDto) {
    return this.keynotesService.update(keynoteHash, updateKeynoteDto);
  }

  @Delete(':keynoteHash')
  remove(@Param('keynoteHash') keynoteHash: string) {
    return this.keynotesService.remove(keynoteHash);
  }
}
