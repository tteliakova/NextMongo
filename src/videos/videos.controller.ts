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
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideosService } from './videos.service';

@ApiTags('Videos')
@Controller('videos')
export class VideosController {
  constructor(private readonly videoService: VideosService) {}
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.videoService.findAll(paginationQuery);
  }

  @Get(':videoHash')
  findOne(@Param('videoHash') videoHash: string) {
    return this.videoService.findOne(videoHash);
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  @Put(':videoHash')
  update(@Param('videoHash') videoHash: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(videoHash, updateVideoDto);
  }

  @Delete(':videoHash')
  remove(@Param('videoHash') videoHash: string) {
    return this.videoService.remove(videoHash);
  }
}
