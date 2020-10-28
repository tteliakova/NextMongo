import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonAddKeynoteDto } from './dto/lesson-add-keynote.dto';
import { LessonAddVideoDto } from './dto/lesson-add-video.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsService } from './lessons.service';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonService: LessonsService) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.create(createLessonDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.lessonService.findAll(paginationQuery);
  }

  @Get(':lessonHash')
  findOne(@Param('lessonHash') lessonHash: string) {
    return this.lessonService.findOne(lessonHash);
  }

  @Put(':lessonHash')
  update(
    @Param('lessonHash') lessonHash: string,
    @Body() updateLessonDto: UpdateLessonDto,
  ) {
    return this.lessonService.update(lessonHash, updateLessonDto);
  }

  @Delete(':lessonHash')
  @HttpCode(204)
  remove(@Param('lessonHash') lessonHash: string) {
    return this.lessonService.remove(lessonHash);
  }

  @Post(':lessonHash/videos')
  @HttpCode(204)
  addVideo(
    @Param('lessonHash') lessonHash: string,
    @Body() lessonAddVideoDto: LessonAddVideoDto,
  ) {
    return this.lessonService.addVideo(lessonHash, lessonAddVideoDto);
  }

  @Post(':lessonHash/keynotes')
  @HttpCode(204)
  addKeynote(
    @Param('lessonHash') lessonHash: string,
    @Body() lessonAddKeynoteDto: LessonAddKeynoteDto,
  ) {
    return this.lessonService.addKeynote(lessonHash, lessonAddKeynoteDto);
  }

  @Get(':lessonHash/videos/:videoHash')
  findLesonVideo(
    @Param('lessonHash') lessonHash: string,
    @Param('videoHash') videoHash: string,
  ) {
    return this.lessonService.findLessonVideo(lessonHash, videoHash);
  }

  @Delete(':lessonHash/videos/:videoHash')
  @HttpCode(204)
  removeLessonVideo(
    @Param('lessonHash') lessonHash: string,
    @Param('videoHash') videoHash: string,
  ) {
    return this.lessonService.removeLessonVideo(lessonHash, videoHash);
  }


  @Get(':lessonHash/keynotes/:keynoteHash')
  findLesonLeynote(
    @Param('lessonHash') lessonHash: string,
    @Param('keynoteHash') keynoteHash: string,
  ) {
    return this.lessonService.findLessonKeynote(lessonHash, keynoteHash);
  }

  @Delete(':lessonHash/keynotes/:keynoteHash')
  @HttpCode(204)
  removeLessonKeynote(
    @Param('lessonHash') lessonHash: string,
    @Param('keynoteHash') keynoteHash: string,
  ) {
    return this.lessonService.removeLessonKeynote(lessonHash, keynoteHash);
  }
}
