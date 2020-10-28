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
import { ClassesService } from './classes.service';
import { ClassAddLessonDto } from './dto/class-add-lesson.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { StudentEnrollDto } from './dto/student-enroll';
import { UpdateClassDto } from './dto/update-class.dto';

@ApiTags('Classes')
@Controller('classes')
export class ClassesController {
  constructor(private readonly classesService: ClassesService) {}

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classesService.create(createClassDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.classesService.findAll(paginationQuery);
  }

  @Get(':classHash')
  findOne(@Param('classHash') classHash: string) {
    return this.classesService.findOne(classHash);
  }

  @Put(':classHash')
  update(
    @Param('classHash') classHash: string,
    @Body() updateClassDto: UpdateClassDto,
  ) {
    return this.classesService.update(classHash, updateClassDto);
  }

  @Delete(':classHash')
  @HttpCode(204)
  remove(@Param('classHash') classHash: string) {
    return this.classesService.remove(classHash);
  }

  @Post(':classHash/lessons')
  addLesson(
    @Param('classHash') classHash: string,
    @Body() classAddLesson: ClassAddLessonDto,
  ) {
    return this.classesService.addLesson(classHash, classAddLesson);
  }

  @Delete(':classHash/lessons/:lessonHash')
  @HttpCode(204)
  removeLesson(
    @Param('classHash') classHash: string,
    @Param('lessonHash') lessonHash: string,
  ) {
    return this.classesService.removeLesson(classHash, lessonHash);
  }

  @Post(':classHash/enroll')
  enroll(
    @Param('classHash') classHash: string,
    @Body() studentEnrol: StudentEnrollDto,
  ) {
    return this.classesService.enroll(classHash, studentEnrol);
  }
}
