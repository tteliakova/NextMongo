import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { ClassAddLessonDto } from './dto/class-add-lesson.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { StudentEnrollDto } from './dto/student-enroll';
import { StudentExpelDto } from './dto/student-expel';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
    @InjectModel(Lesson.name) private readonly lessonModel: Model<Lesson>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createClassDto: CreateClassDto) {
    const class_ = new this.classModel(createClassDto);
    return class_.save();
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, page } = paginationQuery;
    return this.classModel
      .find()
      .populate('users')
      .populate('lessons')
      .skip(page)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    const class_ = await this.classModel
      .findOne({ _id: id })
      .populate('users')
      .populate('lessons')
      .exec();
    if (!class_) {
      throw new NotFoundException(`Class #${id} not found`);
    }
    return class_;
  }

  async update(id: string, updateClassDto: UpdateClassDto) {
    const existingClass = await this.classModel
      .findOneAndUpdate({ _id: id }, { $set: updateClassDto }, { new: true })
      .exec();
    if (!existingClass) {
      throw new NotFoundException(`Class #${id} not found`);
    }
    return existingClass;
  }

  async remove(id: string) {
    const class_ = await this.findOne(id);
    return class_.remove();
  }

  async addLesson(classHash: string, classAddLesson: ClassAddLessonDto) {
    console.log(classHash, 'classHash');

    const class_ = await this.classModel.findOne({ _id: classHash }).exec();
    console.log(class_, 'class_')
    if (!class_) {
      throw new NotFoundException(`Class #${classHash} not found`);
    }
    const { lessonHash } = classAddLesson;
    const lessons = await this.lessonModel.find().exec();
    const filteredLesson = lessons.filter(
      ({ _id }) => _id.toString() === lessonHash,
    )[0];
      console.log(filteredLesson, 'filteredLesson-')
    if (!filteredLesson) {
      throw new NotFoundException(`Lesson #${lessonHash} not found`);
    }

    const classLessons = class_.lessons;

    if (!classLessons.includes(lessonHash)) {
      class_.lessons.push(lessonHash);
      class_.save();
    }

    return class_;
  }

  async removeLesson(classHash: string, lessonHash: string) {
    const class_ = await this.classModel.findOne({ _id: classHash }).exec();
    if (!class_) {
      throw new NotFoundException(`Class #${classHash} not found`);
    }

    const classLessons = class_.lessons;

    if (!classLessons.includes(lessonHash)) {
      throw new NotFoundException(`Lesson #${lessonHash} not found`);
    }
    classLessons.splice(classLessons.indexOf(lessonHash), 1);
    class_.save();

    return class_;
  }

  async enroll(classHash: string, studentEnroll: StudentEnrollDto) {
    const class_ = await this.classModel.findOne({ _id: classHash }).exec();
    try {
      if (!class_) {
        throw new NotFoundException(`Class #${classHash} not found`);
      }

      const { userHash } = studentEnroll;

      const isValidObjectId = Types.ObjectId.isValid(userHash);

      if (!isValidObjectId) {
        throw new BadRequestException(`userHash #${userHash} not a valid hash`);
      }
      const user = await this.userModel.findOne({ _id: userHash });

      if (!user) {
        throw new NotFoundException(`User #${userHash} not found`);
      }
      const classUsers = class_.users;
      console.log(classUsers, 'classUsers');

      if (classUsers.includes(userHash)) {
        console.log('user already in class');
      }
      console.log(userHash, 'userHash');

      classUsers.push(userHash);
      console.log(classUsers, 'classUsers');
      class_.save();
    } catch (err) {
      console.log(err, 'err');
    }
    return class_;
  }

  async expel(classHash: string, studentExpel: StudentExpelDto) {
    const class_ = await this.classModel.findOne({ _id: classHash }).exec();
    if (!class_) {
      throw new NotFoundException(`Class #${classHash} not found`);
    }

    const { userHash } = studentExpel;

    const isValidObjectId = Types.ObjectId.isValid(userHash);

    if (!isValidObjectId) {
      throw new BadRequestException(`userHash #${userHash} not a valid hash`);
    }
    const user = await this.userModel.findOne({ _id: userHash });

    if (!user) {
      throw new NotFoundException(`User #${userHash} not found`);
    }
    const classUsers = class_.users;

    if (!classUsers.includes(userHash)) {
      console.log('user already not in class');
    }

    classUsers.splice(classUsers.indexOf(userHash, 1));

    class_.save();

    return class_;
  }
}
