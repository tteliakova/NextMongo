import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonAddKeynoteDto } from './dto/lesson-add-keynote.dto';
import { LessonAddVideoDto } from './dto/lesson-add-video.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    const lesson = new this.lessonModel(createLessonDto);
    return lesson.save();
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    return this.lessonModel
      .find()
      .populate('content.keynotes')
      .populate('content.videos')
      .skip(page)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const lesson = await this.lessonModel
      .findOne({ _id: id })
      .populate('content.keynotes')
      .populate('content.videos')
      .exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson #${id} not found`);
    }
    return lesson;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    const existinglesson = await this.lessonModel
      .findOneAndUpdate({ _id: id }, { $set: updateLessonDto }, { new: true })
      .exec();
    if (!existinglesson) {
      throw new NotFoundException(`Lesson #${id} not found`);
    }
    return existinglesson;
  }

  async remove(id: string) {
    const lesson = await this.findOne(id);
    return lesson.remove();
  }

  async addVideo(lessonHash: string, lessonAddVideoDto: LessonAddVideoDto) {
    const lesson = await this.lessonModel.findOne({ _id: lessonHash }).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonHash} not found`);
    }
    const { videoHash } = lessonAddVideoDto;
    const lessonVideos = lesson.content?.videos;

    if (lessonVideos.includes(videoHash)) {
      return lesson;
    }

    lesson.content.videos.push(videoHash);
    lesson.save();

    return lesson;
  }

  async addKeynote(
    lessonHash: string,
    lessonAddKeynoteDto: LessonAddKeynoteDto,
  ) {
    const lesson = await this.lessonModel.findOne({ _id: lessonHash }).exec();
    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonHash} not found`);
    }
    const { keynoteHash } = lessonAddKeynoteDto;
    const lessonKeynotes = lesson.content?.keynotes;

    if (lessonKeynotes.includes(keynoteHash)) {
      return lesson;
    }

    lesson.content.keynotes.push(keynoteHash);
    lesson.save();

    return lesson;
  }

  async findLessonVideo(lessonHash: string, videoHash: string) {
    const lesson = await this.lessonModel
    .findOne({ _id: lessonHash,  'content.videos': videoHash }, { videoHash })
    .populate('content.videos', null, {_id: videoHash})
    .exec();

    if (!lesson) {
      throw new NotFoundException(`Video #${videoHash} in lesson #${lessonHash} not found`);
    }

    return lesson;
  }

  async removeLessonVideo(lessonHash: string, videoHash: string) {
    const lesson = await this.lessonModel.findOne({ _id: lessonHash }).exec();
    // .findOneAndUpdate({ _id: lessonHash }, { $pull: { 'content.videos':  lessonHash} }, {useFindAndModify: false})
    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonHash} not found`);
    }

    const lessonVideos = lesson.content.videos;

    if (!lessonVideos || !lessonVideos.includes(videoHash)) {
      throw new NotFoundException(`Video #${videoHash} in lesson #${lessonHash} not found`);
    }

    lessonVideos.splice(lessonVideos.indexOf(videoHash, 1))
    lesson.save()
    return lesson;
  }

  async findLessonKeynote(lessonHash: string, keynoteHash: string) {
    const lesson = await this.lessonModel
    .findOne({ _id: lessonHash,  'content.keynotes': keynoteHash }, { keynoteHash })
    .populate('content.keynotes', null, {_id: keynoteHash})
    .exec();

    if (!lesson) {
      throw new NotFoundException(`Video #${keynoteHash} in lesson #${lessonHash} not found`);
    }

    return lesson;
  }

  async removeLessonKeynote(lessonHash: string, keynoteHash: string) {
    const lesson = await this.lessonModel.findOne({ _id: lessonHash }).exec();

    if (!lesson) {
      throw new NotFoundException(`Lesson #${lessonHash} not found`);
    }

    const lessonKeynotes = lesson.content.keynotes;

    if (!lessonKeynotes || !lessonKeynotes.includes(keynoteHash)) {
      throw new NotFoundException(`Keynote #${keynoteHash} in lesson #${lessonHash} not found`);
    }

    lessonKeynotes.splice(lessonKeynotes.indexOf(keynoteHash, 1))
    lesson.save()
    return lesson;
  }

}
