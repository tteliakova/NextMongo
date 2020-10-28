import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CreateKeynoteoDto } from './dto/create-keynote.dto';
import { UpdateKeynoteDto } from './dto/update-keynote.dto';
import { Keynote } from './entities/keynote.entity';

@Injectable()
export class KeynotesService {
  constructor(
    @InjectModel(Keynote.name) private readonly keynoteModel: Model<Keynote>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    return this.keynoteModel
      .find()
      .skip(page)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const keynote = await this.keynoteModel.findOne({ _id: id }).exec();
    if (!keynote) {
      throw new NotFoundException(`Keynote #${id} not found`);
    }
    return keynote;
  }

  create(createKeynoteDto: CreateKeynoteoDto) {
    const keynote = new this.keynoteModel(createKeynoteDto);
    return keynote.save();
  }

  async update(id: string, updateKeynoteDto: UpdateKeynoteDto) {
    const existingKeynote = await this.keynoteModel
      .findOneAndUpdate({ _id: id }, { $set: updateKeynoteDto }, { new: true })
      .exec();
    if (!existingKeynote) {
      throw new NotFoundException(`Keynote #${id} not found`);
    }
    return existingKeynote;
  }

  async remove(id: string) {
    const keynote = await this.findOne(id);
    return keynote.remove();
  }
}
