import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Video } from './entities/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    return this.videoModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const video = await this.videoModel.findOne({ _id: id }).exec();
    if (!video) {
      throw new NotFoundException(`Video #${id} not found`);
    }
    return video;
  }

  create(createVideoDto: CreateVideoDto) {
    const video = new this.videoModel(createVideoDto);
    return video.save();
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    const existingVideo = await this.videoModel
      .findOneAndUpdate({ _id: id }, { $set: updateVideoDto }, { new: true })
      .exec();
    if (!existingVideo) {
      throw new NotFoundException(`Video #${id} not found`);
    }
    return existingVideo;
  }

  async remove(id: string) {
    const video = await this.findOne(id);
    return video.remove();
  }
}
